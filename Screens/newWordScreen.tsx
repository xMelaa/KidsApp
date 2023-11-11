import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type WordType = {
  title: string;
  routeName: keyof RootStackParamList;
  src: any;
};

const words: WordType[] = [
  {
    title: "Zwierzęta",
    routeName: "animals",
    src: require("../img/animals.png"),
  },
  {
    title: "Literki",
    routeName: "letters",
    src: require("../img/letters.png"),
  },
  {
    title: "Pojazdy",
    routeName: "vehicles",
    src: require("../img/vehicles.png"),
  },
  { title: "Owoce", routeName: "fruits", src: require("../img/fruits.png") },
  {
    title: "Warzywa",
    routeName: "vegetables",
    src: require("../img/vegetables.png"),
  },
];

type RootStackParamList = {
  Second: undefined;
  choose: undefined;
  animals: undefined;
  letters: undefined;
  vehicles: undefined;
  fruits: undefined;
  vegetables: undefined;
};

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Second">;
};

export default function NewWordsScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../img/books2.png")}
        style={[styles.backgroundImage, { overlayColor: "rgba(0, 0, 0, 0.9)"}]}
        blurRadius={6}
      />
       <View style={styles.overlay}></View>
      <View style={styles.buttonsContainer}>
        {words.map((word, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.push(word.routeName)}
            style={styles.buttonContainer}>
              
            <Image source={word.src} style={[styles.backgroundImage,{ borderRadius: 50, opacity: 0.8} ]} blurRadius={0.7} />
            <Text style={styles.buttonText}>{word.title}</Text>
          </TouchableOpacity>
        ))}
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
  },
  overlay:{
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    gap: 15,
    paddingVertical: 50
  },
  buttonContainer: {
    height: "30%",
    width: "45%",
    alignItems: "center",
    justifyContent: "center",  
   
  },
  backgroundImage: {
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  buttonText: {
    fontSize: 26,
    color: "white",
    fontWeight: "700",
    backgroundColor: "rgba(80,	125, 125, 0.8)",
    textTransform: "uppercase",
    paddingVertical: 15,
    paddingHorizontal: 60,
    alignItems: "center",
    borderRadius: 50,
    letterSpacing: 3,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 16,
    },
    shadowOpacity: 0.6,
    shadowRadius: 18.0,
    elevation: 26,
  },
});
