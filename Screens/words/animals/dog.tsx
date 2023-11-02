import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button , Image} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Animals } from "../../../data/data";

// type RootStackParamList = {
//    Second: undefined;
//    Animals: undefined;
//     choose: undefined;
//     words: undefined;
//     games: undefined;
//     dog: undefined;
//   };

export default function DogScreen() {
  return (
    <View style={styles.container}>
    
      <Text>Pies</Text>
      <Text>{Animals.Dog.name}</Text>
      <Image source={Animals.Dog.photo} style={{ width: 200, height: 200 }} />
      <Text>Sound: {Animals.Dog.sound}</Text>
      <Text>Ciekawostki:</Text>
      {Animals.Dog.ciekawostki.map((fact, index) => (
        <Text key={index}>{fact}</Text>
      ))}
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
 
  },
  buttonsContainer:{
    flexDirection: "row",
    alignItems: "center",
    gap: 50
  }
});
