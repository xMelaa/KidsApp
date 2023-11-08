import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  Animated,
  Pressable,
} from "react-native";
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Animals } from "../../../data/data";
import { VolumeUp } from "@mui/icons-material";
import { Audio } from "expo-av";
import { speak } from "expo-speech";
import React, { useEffect, useRef, useState } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
} from "react-native-reanimated";

type RootStackParamList = {
  animal: {animalName: string}
};

type AnimalScreenRouteProp = RouteProp<RootStackParamList, "animal">;

type AnimalScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "animal">;
  //route: AnimalScreenRouteProp  & { params: RouteParams };
};
interface RouteParams {
  animalName: string;
}

export default function AnimalScreen() {
  const route = useRoute();
  const { animalName } = route.params as RouteParams;
  const animalData = Animals[animalName];
 
  console.log("Received animalName:", animalData);
  if (!animalData) {
    // Handle the case when the animal data is not found
    return (
      <View>
        <Text>Animal data not found for {animalName}</Text>
      </View>
    );
  }

  function SingleCard() {
    const flipAnimation = useRef(new Animated.Value(0)).current;
    const [flipped, setFlipped] = useState(false);
    const [randomFactIndex, setRandomFactIndex] = useState<number | null>(null); //do losowej ciekwostki

    let flipRotation = 0;
    flipAnimation.addListener(({ value }) => (flipRotation = value));

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
    const rotate = useSharedValue(0);
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

    return (
      <Pressable
        onPress={() =>
          flipRotation ? backAnimatedStyles : frontAnimatedStyles
        }>
        <Animated.View
          style={[flipped ? frontAnimatedStyles : backAnimatedStyles]}>
          {!flipped ? ( //jesli karta jest odkryta
            <TouchableOpacity onPress={handleClick} style={styles.funfact}>
              <Text>Ciekawostka</Text>
            </TouchableOpacity>
          ) : (
            //jesli jest zakryta
            <TouchableOpacity onPress={handleClick} style={styles.funfact}>
              <Text>Czy wiesz że...</Text>
              {randomFactIndex !== null ? (
                <View>{animalData.ciekawostki[randomFactIndex]}</View>
              ) : (
                <Text>Kliknij, aby poznać ciekawostkę</Text>
              )}
            </TouchableOpacity>
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
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      width: "100%",
      height: "100%",
    },
    buttonsContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 50,
    },
    image: {
      height: "100%",
      width: "100%",
    },
    imageContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      width: "50%",
    },
    infoContainer: {
      flex: 1,
      alignItems: "center",
      height: "100%",
      width: "50%",
    },
    funfact: {
      backgroundColor: "lightgreen",
      padding: 10,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={playSound} style={styles.image}>
          <Image source={animalData.photo} style={styles.image} />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <TouchableOpacity onPress={speakAnimalName}>
          <Text>{animalData.name}</Text>
          <VolumeUp />
        </TouchableOpacity>
        <SingleCard />
      </View>
    </View>
  );
}