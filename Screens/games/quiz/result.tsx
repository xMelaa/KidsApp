import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";

type RootStackParamList = {
   Second: undefined;
    choose: undefined;
    memory: undefined;
    games: undefined;
  };

type HomeScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, "Second">; // Upewnij się, że to jest zgodne z Twoją konfiguracją nawigatora
  };

export default function QuizResult({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <Text>Quiz Result</Text>

      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => navigation.push("games")}>
          <Text>STRONA GŁÓWNA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 12,
    height: "100%",
  },
  question: {
    marginVertical: 20,
  },
  answers: {
    marginVertical: 20,
    flex: 1,
  },
  buttons: {
    marginBottom: 16,
    paddingVertical: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    gap: 20,
  },
});
