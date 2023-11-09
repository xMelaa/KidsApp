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

export default function ChooseScreen({ navigation }: HomeScreenProps) {
    
  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button title="Poznaj nowe słówka"
      onPress={()=> navigation.push("words")}/>
      <Button title="Gry i zabawy"
      onPress={()=> navigation.push("games")}/>
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
    justifyContent: "center",
 
  },
  buttonsContainer:{
    flexDirection: "row",
    alignItems: "center",
    gap: 50
  }
});
