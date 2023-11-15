import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type WordType = {
  title: string;
  routeName: keyof RootStackParamList;
  src: any;
};

const words: WordType[] = [
  {
    title: "Memory",
    routeName: "memory",
    src: require("../img/memory_cards.png"),
  },
  {
    title: "Quiz",
    routeName: "quiz",
    src: require("../img/quiz2.png"),
  },
  {
    title: "Quiz (Trudny)",
    routeName: "shufflequiz",
    src: require("../img/quiz1.png"),
  },
  {
    title: "Kolorowanki",
    routeName: "painting",
    src: require("../img/coloring.png"),
  },
];

type RootStackParamList = {
  Second: undefined;
  choose: undefined;
  memory: undefined;
  quiz: undefined;
  shufflequiz: undefined;
  sorting: undefined;
  dragging: undefined;
  painting: undefined;
};

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Second">;
};

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size: number) => size / fontScale;

export default function GamesScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <Image
        resizeMode="cover"
        source={require("../img/toys.png")}
        style={[styles.backgroundImage]}
        blurRadius={6}
      />
      <View style={styles.overlay}></View>
      <View style={styles.buttonsContainer}>
        {words.map((word, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.push(word.routeName)}
            style={styles.buttonContainer}>
            <Image
              resizeMode="cover"
              source={word.src}
              style={[
                styles.backgroundImage,
                { borderRadius: 30, opacity: 0.8 },
              ]}
              blurRadius={0.7}
            />
            <Text style={styles.buttonText}>{word.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const { width } = Dimensions.get("window");
const fontSize = getFontSize(width * 0.018);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
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
    paddingVertical: 10,
  },
  buttonContainer: {
    height: "30%",
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  buttonText: {
    fontSize: fontSize,
    color: "white",
    fontWeight: "700",
    backgroundColor: "cornflowerblue",
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
    shadowOpacity: 0.6,
    shadowRadius: 18.0,
    elevation: 26,
  },
});
