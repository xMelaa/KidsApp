import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/MaterialIcons";

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
      <Image
        source={require("../img/firstPage.png")}
        style={styles.backgroundImage}
        resizeMode= "cover"
      />
      <Pressable
        onPress={() => navigation.navigate("choose")}
        style={styles.button}>
        <Text style={styles.buttonText}>ZAGRAJ</Text>
        <Icon name="play-arrow" size={44} color="white" />
      </Pressable>
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
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  button: {
    color: "white",
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
  buttonText: {
    fontSize: 30,
    fontWeight: "600",
    color: "white",
    paddingLeft: 12,
    paddingRight: 6,
  },
});
