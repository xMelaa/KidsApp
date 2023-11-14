import {
  StyleSheet,
  Text,
  View,
  Image,
  PixelRatio,
  Dimensions,
  TouchableOpacity,
  // Animated
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Letters } from "../../../data/data";
import Icon from "react-native-vector-icons/MaterialIcons";
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
  letterName: string;
}

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size: number) => size / fontScale;
const { width, height } = Dimensions.get("window");
const fontSize = getFontSize(width * 0.015);

export default function LetterScreen() {
  const route = useRoute();
  const { letterName } = route.params as RouteParams;
  const letterData = Letters[letterName];

  if (!letterData) {
    return (
      <View>
        <Text>letter data not found for {letterName}</Text>
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
          Math.random() * letterData.examples.length
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
      <TouchableOpacity
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
          {!flipped ? ( //jesli karta jest zakryta
            <TouchableOpacity onPress={handleClick} style={styles.funfact}>
              <Image
                resizeMode="cover"
                source={require("../../../img/questionMark.jpg")}
                style={styles.backgroundImage}
              />
            </TouchableOpacity>
          ) : (
            //jesli jest odkryta
            <TouchableOpacity
              onPress={handleClick}
              style={[styles.funfact, { backgroundColor: "mediumpurple" }]}>
              <TouchableOpacity
                onPress={speakName}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <Text style={styles.card}>
                  {letterData.examples[randomFactIndex]?.name}
                </Text>
                <Icon name="volume-up" size={fontSize * 2} color="#fff" />
              </TouchableOpacity>
              {randomFactIndex !== null ? (
                <Image
                  source={letterData.examples[randomFactIndex]?.src}
                  style={styles.image2}
                  resizeMode="cover"
                />
              ) : (
                <Text style={styles.facttext}>
                  Tu powinna być ciekawostka, ale jej nie ma :(
                </Text>
              )}
            </TouchableOpacity>
          )}
        </Animated.View>
      </TouchableOpacity>
    );
  }

  const speakLetterName = () => {
    speak(letterData.uppercase, { language: "pl", _voiceIndex: 1 }); // Speak the letter's name in Polish
  };
  const speakName = () => {
    speak("Agrest", { language: "pl", _voiceIndex: 1 }); // Speak the letter's name in Polish
  };

  const styles = StyleSheet.create({
    card: {
      fontSize: fontSize * 1.6,
      fontWeight: "600",
      color: "white",
      paddingVertical: "1%",
      marginRight: "2%",
    },
    facttext: {
      paddingVertical: "1%",
      paddingHorizontal: "5%",
      fontSize: fontSize * 0.9,
      color: "white",
      textAlign: "center",
      flex: 5,
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
    image2: {
      aspectRatio: 1,
      height: "100%",
      //width: "100%",
      flex: 2,
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
      aspectRatio: 4 / 3,
    },
    funfactContainer: {
      marginTop: "2%",
      width: "60%",
      height: "53%",
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
        <TouchableOpacity onPress={speakLetterName} style={styles.image}>
          <Image
            source={letterData.photo}
            style={styles.image}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Image
          resizeMode="cover"
          source={require("../../../img/waves/wavesPurple.png")}
          style={styles.backgroundImage}
        />
        <TouchableOpacity
          onPress={speakLetterName}
          style={styles.nameContainer}>
          <Text style={styles.name}>
            {letterData.uppercase} {letterData.lowercase}
          </Text>
          <Icon name="volume-up" size={fontSize * 2.7} color="#222" />
        </TouchableOpacity>
        <SingleCard />
      </View>
    </View>
  );
}
