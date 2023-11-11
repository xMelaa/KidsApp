import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  Dimensions,
  PixelRatio,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { fonts } from "react-native-elements/dist/config";

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
const fontScale = PixelRatio.getFontScale();
const getFontSize = (size: number) => size / fontScale;


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


const { width, height } = Dimensions.get("window");
const fontSize = getFontSize(width * 0.02)

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
    paddingVertical: 10
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
    fontSize: fontSize,
    color: "white",
    fontWeight: "700",
    backgroundColor: "rgba(0,	191, 255, 0.85)",
    textTransform: "uppercase",
    paddingVertical: fontSize * 0.6,
    paddingHorizontal: fontSize * 3,
    alignItems: "center",
    borderRadius: 50,
    letterSpacing: 1,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 16,
    },
    shadowOpacity: 0.8,
    shadowRadius: 18.0,
    elevation: 26,
  },
});
