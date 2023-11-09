import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
//import { Animals, Vehicles } from "../data/data";


type RootStackParamList = {
    Home: undefined;
    Second: undefined;
    choose: undefined;
  };

type HomeScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, "Home">; // Upewnij się, że to jest zgodne z Twoją konfiguracją nawigatora
  };
  
export default function HomeScreen({ navigation }: HomeScreenProps) {
    
  return (
    <View style={styles.container}>
      <Button title="Second Screen"
      onPress={()=> navigation.navigate("Second")}/>

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
});
