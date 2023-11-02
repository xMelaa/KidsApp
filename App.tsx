import HomeScreen from "./Screens/HomeScreen";
import SecondScreen from "./Screens/SecondScreen";
import ChooseScreen from "./Screens/chooseScreen";
import NewWordsScreen from "./Screens/newWordScreen";
import GamesScreen from "./Screens/gamesScreen";
import AnimalsScreen from "./Screens/words/animals";
import VehiclesScreen from "./Screens/words/vehicles";
import FruitsScreen from "./Screens/words/fruits";
import LettersScreen from "./Screens/words/letters";
import DogScreen from "./Screens/words/animals/dog";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const screens = [
  { name: "Home", component: HomeScreen, title: "Welcome" },
  { name: "Second", component: SecondScreen, title: "Welcome" },
  { name: "choose", component: ChooseScreen },
  { name: "words", component: NewWordsScreen },
  { name: "games", component: GamesScreen },
  { name: "animals", component: AnimalsScreen },
  { name: "letters", component: LettersScreen },
  { name: "vehicles", component: VehiclesScreen },
  { name: "fruits", component: FruitsScreen },
  { name: "dog", component: DogScreen },
];
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      {screens.map((screen, index) => (
          <Stack.Screen
            key={index}
            name={screen.name}
            component={screen.component}
            options={{ title: screen.title || undefined }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
