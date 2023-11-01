import HomeScreen from "./Screens/HomeScreen";
import SecondScreen from "./Screens/SecondScreen";
import ChooseScreen from "./Screens/chooseScreen";
import newWordsScreen from "./Screens/newWordScreen";
import gamesScreen from "./Screens/gamesScreen";
import AnimalsScreen from "./Screens/words/animals";
import VehiclesScreen from "./Screens/words/vehicles";
import FruitsScreen from "./Screens/words/fruits";
import LettersScreen from "./Screens/words/letters";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen
          name="Second"
          component={SecondScreen}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen name="choose" component={ChooseScreen} />
        
        <Stack.Screen name="words" component={newWordsScreen} />
        <Stack.Screen name="games" component={gamesScreen} />

        <Stack.Screen name="animals" component={AnimalsScreen} />
        <Stack.Screen name="letters" component={LettersScreen} />
        <Stack.Screen name="vehicles" component={VehiclesScreen} />
        <Stack.Screen name="fruits" component={FruitsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
