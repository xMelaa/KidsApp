import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Second: undefined;
  choose: undefined;
  words: undefined;
  games: undefined;
};

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Second">;
};

export default function ChooseScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => navigation.push("words")}
          style={styles.buttonContainer}>
          <Image
            source={require("../img/books.png")}
            style={styles.backgroundImage} blurRadius={1.5}
          />
          <View style={styles.overlay}></View>
          <Text style={styles.buttonText}>Poznaj nowe słówka</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.push("games")}
          style={styles.buttonContainer}>
          <Image
            source={require("../img/toys.png")}
            style={styles.backgroundImage}
            blurRadius={1.5}
          />
          <View style={styles.overlay}></View>
          <Text style={styles.buttonText}>Gry i zabawy</Text>
        </TouchableOpacity>
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
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  backgroundImage: {
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    height: "100%",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 24,
    color: "white",
    fontWeight: "700",
    backgroundColor: "rgba(0,	191, 255, 0.9)",
    textTransform: "uppercase",
    paddingVertical: 20,
    paddingHorizontal: 60,
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
