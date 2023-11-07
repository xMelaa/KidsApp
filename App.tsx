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
import MemoryGame from "./Screens/games/memory";
import QuizGame from "./Screens/games/quiz/quiz";
import QuizShuffleGame from "./Screens/games/quiz/quizShuffle";
import Drag from "./Screens/games/dragging";
import SortingGame from "./Screens/games/sorting";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const screens = [ { name: "memory", component: MemoryGame },
  { name: "dog", component: DogScreen },
  { name: "Home", component: HomeScreen, title: "Welcome" },
  { name: "Second", component: SecondScreen, title: "Welcome" },
  { name: "choose", component: ChooseScreen },
  { name: "words", component: NewWordsScreen },
  { name: "games", component: GamesScreen },
  { name: "animals", component: AnimalsScreen },
  { name: "letters", component: LettersScreen },
  { name: "vehicles", component: VehiclesScreen },
  { name: "fruits", component: FruitsScreen },
  
 
  { name: "quiz", component: QuizGame },
  { name: "shufflequiz", component: QuizShuffleGame },
  { name: "sorting", component: SortingGame },
  { name: "dragging", component: Drag },
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
