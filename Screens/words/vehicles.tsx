import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";



type RootStackParamList = {
   Second: undefined;
    choose: undefined;
    words: undefined;
    games: undefined;
  };

type HomeScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, "Second">; // Upewnij się, że to jest zgodne z Twoją konfiguracją nawigatora
  };

export default function VehiclesScreen({ navigation }: HomeScreenProps) {
    
  return (
    <View style={styles.container}>
      <h1>Pojazdy</h1>
      
      <StatusBar style="auto" />
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
