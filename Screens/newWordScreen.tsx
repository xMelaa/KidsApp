import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Second: undefined;
  choose: undefined;
  animals: undefined;
  letters: undefined;
  vehicles: undefined;
  fruits: undefined;
};

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Second">; // Upewnij się, że to jest zgodne z Twoją konfiguracją nawigatora
};

export default function newWordsScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <h1>Poznaj słówka</h1>
      <View style={styles.types}>
        <Button title="Zwierzęta" onPress={() => navigation.push("animals")} />
        <Button title="Literki" onPress={() => navigation.push("letters")} />
        <Button title="Pojazdy" onPress={() => navigation.push("vehicles")} />
        <Button title="Owoce" onPress={() => navigation.push("fruits")} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    
  },
  types: {gap: 20},
});
