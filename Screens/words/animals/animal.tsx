import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  PixelRatio,
  Dimensions,
  // Animated
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Animals } from "../../../data/data";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Audio } from "expo-av";
import { speak } from "expo-speech";
import React, { useEffect, useRef, useState } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
} from "react-native-reanimated";
import Animated from "react-native-reanimated";

interface RouteParams {
  animalName: string;
}

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size: number) => size / fontScale;
const { width, height } = Dimensions.get("window");
const fontSize = getFontSize(width * 0.015);

export default function AnimalScreen() {
  const route = useRoute();
  const { animalName } = route.params as RouteParams;
  const animalData = Animals[animalName];

  if (!animalData) {
    return (
      <View>
        <Text>Animal data not found for {animalName}</Text>
      </View>
    );
  }

  function SingleCard() {
    const flipAnimation = useSharedValue(0);
    const [flipped, setFlipped] = useState(false);
    const [randomFactIndex, setRandomFactIndex] = useState<number | null>(null); //do losowej ciekwostki

    let flipRotation = 0;

    const handleClick = () => {
      setFlipped(!flipped);
      rotate.value = 1;
      if (!flipped) {
        const randomIndex = Math.floor(
          Math.random() * animalData.ciekawostki.length
        );
        setRandomFactIndex(randomIndex);
      } else {
        setRandomFactIndex(null);
      }
    };
    const rotate = useSharedValue(1);
    const frontAnimatedStyles = useAnimatedStyle(() => {
      const rotateValue = interpolate(rotate.value, [0, 1], [0, 180]);
      return {
        transform: [
          {
            rotateY: withTiming(`${rotateValue}deg`, { duration: 600 }),
          },
        ],
      };
    });
    const backAnimatedStyles = useAnimatedStyle(() => {
      const rotateValue = interpolate(rotate.value, [0, 1], [180, 360]);
      return {
        transform: [
          {
            rotateY: withTiming(`${rotateValue}deg`, { duration: 600 }),
          },
        ],
      };
    });
    useEffect(() => {
      return () => {
        flipAnimation.value = 0;
      };
    }, []);

    return (
      <Pressable
        onPress={() =>
          flipRotation ? backAnimatedStyles : frontAnimatedStyles
        }
        style={styles.funfactContainer}>
        <Animated.View
          style={[
            flipped ? frontAnimatedStyles : backAnimatedStyles,
            {
              height: "100%",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}>
          {!flipped ? ( //jesli karta jest odkryta
            <Pressable onPress={handleClick} style={styles.funfact}>
              <Image
                resizeMode="cover"
                source={require("../../../img/questionMark.jpg")}
                style={styles.backgroundImage}
              />
              {/* <Text
                style={{
                  fontSize: fontSize * 1.5,
                  fontWeight: "600",
                  color: "#555",
                }}>
                Ciekawostka
              </Text> */}
            </Pressable>
          ) : (
            //jesli jest zakryta
            <Pressable onPress={handleClick} style={[styles.funfact, {backgroundColor: "mediumpurple"}]}>
              <Text style={styles.knowtext}>Czy wiesz że...</Text>
              {randomFactIndex !== null ? (
                <Text style={styles.facttext}>{animalData.ciekawostki[randomFactIndex]}</Text>
              ) : (
                <Text style={styles.facttext}>Kliknij, aby poznać ciekawostkę</Text>
              )}
            </Pressable>
          )}
        </Animated.View>
      </Pressable>
    );
  }

  const playSound = async () => {
    const soundObject = new Audio.Sound();
    try {
      if (animalData.sound) {
        await soundObject.loadAsync(animalData.sound);
        await soundObject.playAsync();
      } else {
        console.error("No sound data available for this animal.");
      }
    } catch (error) {
      console.error("Błąd odtwarzania dźwięku", error);
    }
  };

  const speakAnimalName = () => {
    speak(animalData.name, { language: "pl", _voiceIndex: 1 }); // Speak the animal's name in Polish
  };

  const styles = StyleSheet.create({
    knowtext:{
      fontSize: fontSize * 1.6,
      fontWeight: "600",
      color: "white",
      paddingVertical: "6%",
      flex: 3
    },
    facttext:{
      paddingVertical: "1%",
      paddingHorizontal: "5%",
      fontSize: fontSize * 0.9,
      color: "white",
      textAlign: "center",
      flex: 5
    },
    container: {
      flex: 1,
      backgroundColor: "linen",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      width: "100%",
      height: "100%",
    },
    image: {
      height: "100%",
      width: "100%",
      aspectRatio: 1,
    },
    imageContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      width: "50%",
      borderRight: "solid",
      borderColor: "lavender",
      borderRightWidth: 5,
    },
    infoContainer: {
      flex: 1,
      alignItems: "center",
      height: "100%",
      width: "50%",
    },
    funfact: {
      width: "100%",
      height: "100%",
      borderStyle: "solid",
      borderColor: "lavender",
      borderWidth: 4,
      alignItems: "center",
      //justifyContent: "center",
      aspectRatio: 5 / 3,
    },
    funfactContainer: {
      marginTop: "2%",
      width: "60%",
      height: "45%",
      alignItems: "center",
      justifyContent: "center",
    },
    nameContainer: {
      flexDirection: "row",
      height: "40%",
      alignItems: "center",
      justifyContent: "center",
    },
    name: {
      fontSize: fontSize * 3,
      marginRight: fontSize * 0.85,
      fontWeight: "600",
      color: "#222",
    },
    backgroundImage: {
      position: "absolute",
      width: "100%",
      height: "100%",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Pressable onPress={playSound} style={styles.image}>
          <Image
            source={animalData.photo}
            style={styles.image}
            resizeMode="cover"
          />
        </Pressable>
      </View>
      <View style={styles.infoContainer}>
        <Image
          resizeMode="cover"
          source={require("../../../img/waves/wavesPurple.png")}
          style={styles.backgroundImage}
        />
        <Pressable onPress={speakAnimalName} style={styles.nameContainer}>
          <Text style={styles.name}>{animalData.name}</Text>
          <Icon name="volume-up" size={fontSize * 2.7} color="#222" />
        </Pressable>
        <SingleCard />
      </View>
    </View>
  );
}
