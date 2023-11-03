import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  Animated,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useRef, useState } from "react";

// type RootStackParamList = {
//    Second: undefined;
//     choose: undefined;
//     memory: undefined;
//   };

// type HomeScreenProps = {
//     navigation: NativeStackNavigationProp<RootStackParamList, "Second">; // Upewnij się, że to jest zgodne z Twoją konfiguracją nawigatora
//   };

const cardImages = [
  { symbol: require("../../img/apple.jpg"), matched: false },
  { symbol: require("../../img/blueberry.jpg"), matched: false },
  { symbol: require("../../img/pear.jpg"), matched: false },
  { symbol: require("../../img/pomegranade.jpg"), matched: false },
];

interface Card {
  symbol: any;
  id: number;
  matched: boolean;
}

function SingleCard({
  card,
  handleChoice,
  flipped,
}: {
  card: Card;
  handleChoice: (card: Card) => void;
  flipped: any;
}) {
  const flipAnimation = useRef(new Animated.Value(0)).current;
  // const [cardStyle, setCardStyle] = useState({});

  let flipRotation = 0;
  flipAnimation.addListener(({ value }) => (flipRotation = value));

  const handleClick = () => {
    if (flipped) {
      flipToBack(); // Obróć na stronę tylną tylko jeśli karta nie jest odwrócona
    } else {
      handleChoice(card); // W przeciwnym razie obsłuż kliknięcie
    }
  };

  const flipToFrontStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ["0deg", "180deg"],
        }),
      },
    ],
  };
  const flipToBackStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ["180deg", "0deg"],
        }),
      },
    ],
  };

  const flipToFront = () => {
    Animated.timing(flipAnimation, {
      toValue: 180,
      duration: 800,
      useNativeDriver: false,
    }).start();
  };
  const flipToBack = () => {
    Animated.timing(flipAnimation, {
      toValue: 0,
      duration: 800,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        flipRotation
          ? (flipToBack(), setTimeout(handleClick, 300))
          : flipToFront()
      }>
      <Animated.View
        style={[
          styles.cardContainer,
          flipped ? flipToFrontStyle : flipToBackStyle,
        ]}>
        {flipped ? ( //jesli karta jest odkryta
          <TouchableOpacity onPress={handleClick} style={styles.front}>
            <Image style={styles.front} source={card.symbol} />
          </TouchableOpacity>
        ) : (
          //jesli jest zakryta
          <TouchableOpacity onPress={handleClick} style={styles.back}>
            <Image
              style={styles.back}
              source={require("../../img/cover.png")}
            />
          </TouchableOpacity>
        )}
      </Animated.View>
    </Pressable>
  );
}

export default function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState<Card | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<Card | null>(null);

  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5) //losowosc
      .map((card) => ({ ...card, id: Math.random() }));
    
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffleCards);
    setTurns(0);
  };

  const handleChoice = (card: Card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //porownanie dwohc kart
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.symbol === choiceTwo.symbol) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.symbol === choiceOne.symbol) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);
  console.log(cards);
  //reset choices
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1); // turns+1
  };

  // useEffect(() => {
  //   if (turns === 0) {
  //     shuffleCards();
  //   }
  // }, [turns]);

  return (
    <View style={styles.container}>
      <Text>Memory</Text>
      <Button title="Start" onPress={shuffleCards} />
      <View style={styles.cardGrid}>
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
          />
        ))}
      </View>
      <Text>Ruchy: {turns}</Text>
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
    width: "100%",
  },
  front: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    borderRadius: 6,
  },
  back: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    borderColor: "#fff",
    borderRadius: 6,
    borderWidth: 2,
    borderStyle: "solid",
    //position: "absolute"

    //backfaceVisibility: "hidden",
  },
  card: {
    position: "relative",
    width: "20%",
    aspectRatio: 1,
  },
  cardGrid: {
    marginTop: 40,
    width: "75%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },

  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    borderColor: "#fff",
    borderRadius: 6,
    borderWidth: 2,
    borderStyle: "solid",
    transformStyle: "preserve-3d", //perspektywa??
  },
});