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
// import FlipCard, { RotateAxis } from "react-native-flip"
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
  // const [side, setSide] = useState(1);
  // const [rotate, setRotate] = useState<RotateAxis>(RotateAxis.X);
  // const changeSide = () => {
  //   setSide((prevSide) => (prevSide === 1 ? -1 : 1));
  // };

  // const Front = (
  //   <View
  //     style={{
  //       backgroundColor: "#ed8936",
  //       alignItems: "center",
  //       padding: 100,
  //       borderRadius: 12,
  //     }}
  //   >
  //     <Text style={{ fontSize: 18, color: "black" }}>Front</Text>
  //     <TouchableOpacity
  //       onPress={changeSide}
  //       style={{
  //         padding: 10,
  //         marginTop: 20,
  //         backgroundColor: "white",
  //         borderRadius: 12,
  //       }}
  //     >
  //       <Text>Click here to Flip</Text>
  //     </TouchableOpacity>
  //   </View>
  // )
  // const Back = (
  //   <View
  //     style={{
  //       backgroundColor: "#007AFF",
  //       alignItems: "center",
  //       padding: 100,
  //       borderRadius: 12,
  //     }}
  //   >
  //     <Text style={{ fontSize: 18, color: "white" }}>Back</Text>
  //     <TouchableOpacity
  //       onPress={changeSide}
  //       style={{
  //         padding: 10,
  //         marginTop: 20,
  //         backgroundColor: "white",
  //         borderRadius: 12,
  //       }}
  //     >
  //       <Text>Click here to Flip</Text>
  //     </TouchableOpacity>
  //   </View>
  // )

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={playSound} style={styles.image}>
          {" "}
          <Image source={Animals.Dog.photo} style={styles.image} />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <TouchableOpacity onPress={speakAnimalName}>
          {Animals.Dog.name}
          <VolumeUp />
        </TouchableOpacity>

        <View style={styles.funfact}>
          Ciekawostki:
          {Animals.Dog.ciekawostki.map((fact, index) => (
           <View key={index}>{fact} </View>
          ))}
        </View>
        {/* <Button
        title={`Change rotation. The card rotation is: ${rotate}`}
        onPress={() => {
          setRotate((rotation) => (rotation === RotateAxis.X ? RotateAxis.Y : RotateAxis.X))
        }}
      />
      <Button title={`Flip: ${side}`} onPress={changeSide} />
      <FlipCard
        side={side}
        rotate={rotate}
        style={styles.container}
        front={Front}
        back={Back}
      /> */}
      </View>

      <StatusBar style="auto" />
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
