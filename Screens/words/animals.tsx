import { StyleSheet, Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Animals} from "../../data/data";

type RootStackParamList = {
   Second: undefined;
    choose: undefined;
    words: undefined;
    games: undefined;
    animal: {animalName: string};
  };

type HomeScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, "Second">; // Upewnij się, że to jest zgodne z Twoją konfiguracją nawigatora
  };

export default function AnimalsScreen({ navigation }: HomeScreenProps) {
  const animalNames = Object.keys(Animals);
  return (
    <View style={styles.container}>
      <Text>Zwierzęta</Text>
      {animalNames.map((animalName) => (
        <Button
          key={animalName}
          title={animalName}
          onPress={() => navigation.push("animal", { animalName: animalName })}
        />
      ))}
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
