import HomeScreen from "./Screens/HomeScreen";
import ChooseScreen from "./Screens/chooseScreen";
import NewWordsScreen from "./Screens/newWordScreen";
import GamesScreen from "./Screens/gamesScreen";
import AnimalsScreen from "./Screens/words/animals";
import VehiclesScreen from "./Screens/words/vehicles";
import FruitsScreen from "./Screens/words/fruits";
import VegetablesScreen from "./Screens/words/vegetables";
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
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { useEffect, useState } from "react";
import LetterScreen from "./Screens/words/letters/letter";
import FruitScreen from "./Screens/words/fruits/fruit";
import VegetableScreen from "./Screens/words/vegetables/vegetable";
import VehicleScreen from "./Screens/words/vehicles/vehicle";

const Stack = createNativeStackNavigator();
const screens: {
  name: string;
  component: any;
  options?: object;
}[] = [{ name: "games", component: GamesScreen },
  { name: "Home", component: HomeScreen, options: { headerShown: false } },
  { name: "words", component: NewWordsScreen },
  { name: "painting", component: PaintingScreen },
  { name: "animals", component: AnimalsScreen },
  { name: "animal", component: AnimalScreen },
  { name: "fruit", component: FruitScreen },
  { name: "vegetable", component: VegetableScreen },
  { name: "vehicle", component: VehicleScreen },
  { name: "letters", component: LettersScreen },
  { name: "letter", component: LetterScreen },
  { name: "choose", component: ChooseScreen },
  { name: "vehicles", component: VehiclesScreen },
  { name: "fruits", component: FruitsScreen },
  { name: "vegetables", component: VegetablesScreen },
 
  { name: "memory", component: MemoryGame },
  { name: "quiz", component: QuizGame },
  { name: "shufflequiz", component: QuizShuffleGame },
  { name: "sorting", component: SortingGame },
  { name: "dragging", component: Drag },
];
export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        //  // Montserrat: require('./assets/fonts/Montserrat-Regular.ttf'),
        //   'PlaypenSans-Regular': require('./assets/fonts/PlaypenSans-Regular.ttf'),
        //   'PlaypenSans-Bold': require('./assets/fonts/PlaypenSans-Bold.ttf'),
        //   'PlaypenSans-Italic': require('./assets/fonts/PlaypenSans-Italic.ttf'),
      });

      setFontLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {screens.map((screen, index) => (
          <Stack.Screen
            key={index}
            name={screen.name}
            // options={{ title: screen.title || undefined }}
            options={screen.options}>
            {(props) => <screen.component {...props} />}
          </Stack.Screen>
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
