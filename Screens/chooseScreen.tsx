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
            style={styles.backgroundImage}
          />
          <Text style={styles.buttonText}>Poznaj nowe słówka</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.push("games")}
          style={styles.buttonContainer}>
          <Image
            source={require("../img/toys.png")}
            style={styles.backgroundImage}
          />
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
    fontSize: 20,
    color: "white",
    fontWeight: "600",
    backgroundColor: "deepskyblue",
    paddingVertical: 15,
    paddingHorizontal: 50,
    alignItems: "center",
    borderRadius: 50,
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
