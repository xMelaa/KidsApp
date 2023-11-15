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
  title?: string;
}[] = [
  { name: "Home", component: HomeScreen, options: { headerShown: false } },
  { name: "choose", component: ChooseScreen, title: "Wybierz jak chcesz się uczyć" },
  { name: "words", component: NewWordsScreen, title: "Poznaj nowe słówka" },
  { name: "games", component: GamesScreen, title: "Gry i zabawy" },
  { name: "animals", component: AnimalsScreen, title: "Zwierzęta" },
  { name: "vehicles", component: VehiclesScreen, title: "Pojazdy" },
  { name: "fruits", component: FruitsScreen, title: "Owoce" },
  { name: "vegetables", component: VegetablesScreen, title: "Warzywa" },
  { name: "letters", component: LettersScreen, title: "Litery" },
  { name: "animal", component: AnimalScreen, title: "Powrót" },
  { name: "fruit", component: FruitScreen, title: "Powrót" },
  { name: "vegetable", component: VegetableScreen, title: "Powrót" },
  { name: "vehicle", component: VehicleScreen, title: "Powrót" },
  { name: "letter", component: LetterScreen, title: "Powrót" },
  { name: "memory", component: MemoryGame, title: "Memory" },
  { name: "quiz", component: QuizGame, title: "Quiz" },
  { name: "shufflequiz", component: QuizShuffleGame, title: "Quiz (Trudny)" },
  { name: "painting", component: PaintingScreen, title: "Kolorowanka" },
  { name: "sorting", component: SortingGame, title: "Sortowanie" },
  { name: "dragging", component: Drag, title: "Przeciąganie" },
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
            options={{
              ...(screen.options || {}),
              title: screen.title || undefined,
            }}>
            {(props) => <screen.component {...props} />}
          </Stack.Screen>
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
