import HomeScreen from "./Screens/HomeScreen";
import ChooseScreen from "./Screens/chooseScreen";
import NewWordsScreen from "./Screens/newWordScreen";
import GamesScreen from "./Screens/gamesScreen";
import AnimalsScreen from "./Screens/words/animals";
import VehiclesScreen from "./Screens/words/vehicles";
import FruitsScreen from "./Screens/words/fruits";
import LettersScreen from "./Screens/words/letters";
import AnimalScreen from "./Screens/words/animals/animal";
import MemoryGame from "./Screens/games/memory";
import QuizGame from "./Screens/games/quiz/quiz";
import QuizShuffleGame from "./Screens/games/quiz/quizShuffle";
import Drag from "./Screens/games/dragging";
import SortingGame from "./Screens/games/sorting";
import PaintingScreen from "./Screens/games/painting";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const screens: {
  name: string;
  component: any;
  options?: object;
}[] = [
  { name: "Home", component: HomeScreen, options: { headerShown: false } },
  { name: "words", component: NewWordsScreen },
  { name: "painting", component: PaintingScreen },
  { name: "animals", component: (props: any) => <AnimalsScreen {...props} /> },
  { name: "animal", component: (props: any) => <AnimalScreen {...props} /> },
  { name: "choose", component: ChooseScreen },

  { name: "games", component: GamesScreen },
  { name: "letters", component: LettersScreen },
  { name: "vehicles", component: VehiclesScreen },
  { name: "fruits", component: FruitsScreen },
  { name: "memory", component: MemoryGame },
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
            // options={{ title: screen.title || undefined }}
            options={screen.options}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
