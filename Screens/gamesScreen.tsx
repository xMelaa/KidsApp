import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


type RootStackParamList = {
   Second: undefined;
    choose: undefined;
    memory: undefined;
    quiz: undefined;
    shufflequiz: undefined;
    sorting: undefined;
    dragging: undefined;
    painting: undefined
  };

type HomeScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, "Second">;
  };

export default function GamesScreen({ navigation }: HomeScreenProps) {
    
  return (
    <View style={styles.container}>
      
      <Text>Gry i zabawy</Text>
      <Button title="Memory" onPress={() => navigation.push("memory")} />
      <Button title="Quiz" onPress={() => navigation.push("quiz")} />
      <Button title="Quiz (Trudny)" onPress={() => navigation.push("shufflequiz")} />
      <Button title="Sortowanie" onPress={() => navigation.push("sorting")} />
      <Button title="Przeciąganie" onPress={() => navigation.push("dragging")} />
      <Button title="Kolorowanki" onPress={() => navigation.push("painting")} />
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
});
