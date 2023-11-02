import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button , Image} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Animals } from "../../../data/data";
import {VolumeUp} from '@mui/icons-material';
import Sound from 'react-native-sound';

// type RootStackParamList = {
//    Second: undefined;
//    Animals: undefined;
//     choose: undefined;
//     words: undefined;
//     games: undefined;
//     dog: undefined;
//   };
const sound = new Sound(Animals.Dog.sound, Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('Błąd ładowania dźwięku', error);
      return;
    }
  });
  
  const playSound = () => {
    sound.play((success) => {
      if (success) {
        console.log('Dźwięk został pomyślnie odtworzony');
      } else {
        console.log('Błąd odtwarzania dźwięku');
      }
    });
  };
export default function DogScreen() {
  return (
    <View style={styles.container}>
     <View style={styles.imageContainer}><Image source={Animals.Dog.photo} style={styles.image} /></View>
     <View style={styles.infoContainer}>
      <Text>{Animals.Dog.name}</Text><VolumeUp/> 
      <Button title="Kliknij mnie" onPress={playSound} />  
      <Text>Sound: {Animals.Dog.sound}</Text>
      <View style={styles.funfact}><Text>Ciekawostki:</Text>
      {Animals.Dog.ciekawostki.map((fact, index) => (
        <Text key={index}>{fact}</Text>
      ))}</View></View>
      
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
    width: '100%',
    height: '100%'
  },
  buttonsContainer:{
    flexDirection: "row",
    alignItems: "center",
    gap: 50
  },
  image: {
    height: '100%',
    width: '100%'
  
  },
  imageContainer: {
    flex: 1, 
    alignItems: "center",
    justifyContent: "center",
    height: '100%',
    width: '50%'
  },
  infoContainer: {
    flex: 1, 
    alignItems: "center",
    height: '100%',
    width: '50%'
  },
  funfact: {
    backgroundColor: "purple",
    
  }

});
