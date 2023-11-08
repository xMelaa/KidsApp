import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  FlatList
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Animals } from "../../data/data";

type RootStackParamList = {
  Second: undefined;
  choose: undefined;
  words: undefined;
  games: undefined;
  animal: { animalName: string };
};

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Second">; // Upewnij się, że to jest zgodne z Twoją konfiguracją nawigatora
};

export default function AnimalsScreen({ navigation }: HomeScreenProps) {
  const animalNames = Object.keys(Animals);
  return (
    <View style={styles.container}>
      <Text>Zwierzęta</Text>
      <View style={styles.buttonsContainer}>
        {animalNames.map((animalName) => (
          <>
            <TouchableOpacity
              key={animalName}
              onPress={() =>
                navigation.push("animal", { animalName: animalName })
              }>
              <Image
                source={Animals[animalName].photo}
                style={{ width: 200, height: 200 }}></Image>
            </TouchableOpacity>
          </>
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
    width: "100%",
    height: "100%"
  },
  buttonsContainer: {
    width: "85%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center", 
    gap: 50,
    height: "100%",
    marginVertical: 20
  },
});
