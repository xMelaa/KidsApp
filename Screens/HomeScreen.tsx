import { StyleSheet, Text, View, Button } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
    Home: undefined;
    Second: undefined;
    choose: undefined;
  };

type HomeScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
  };
  
export default function HomeScreen({ navigation }: HomeScreenProps) {
    
  return (
    <View style={styles.container}>
      <Button title="Second Screen"
      onPress={()=> navigation.navigate("Second")}/>
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
