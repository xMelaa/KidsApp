import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Animals } from "../../../data/data";
import { VolumeUp } from "@mui/icons-material";
import { Audio } from "expo-av";
import { speak } from "expo-speech";
import { useState } from "react";

// type RootStackParamList = {
//    Second: undefined;
//    Animals: undefined;
//     choose: undefined;
//     words: undefined;
//     games: undefined;
//     dog: undefined;
//   };

export default function DogScreen() {
  const playSound = async () => {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(Animals.Dog.sound);
      await soundObject.playAsync();
    } catch (error) {
      console.error("Błąd odtwarzania dźwięku", error);
    }
  };

  const speakAnimalName = () => {
    speak(Animals.Dog.name, { language: "pl", _voiceIndex: 1 }); // Speak the animal's name in Polish
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={playSound} style={styles.image}>
          <Image source={Animals.Dog.photo} style={styles.image} />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <TouchableOpacity onPress={speakAnimalName}>
         <Text>{Animals.Dog.name}</Text> 
          <VolumeUp />
        </TouchableOpacity>

        <View style={styles.funfact}>
          Ciekawostki:
          {Animals.Dog.ciekawostki.map((fact, index) => (
            <View key={index}>{fact} </View>
          ))}
        </View>
      </View>
    </View>
  );
}

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
    backgroundColor: "purple",
  },
});
