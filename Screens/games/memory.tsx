import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";

// type RootStackParamList = {
//    Second: undefined;
//     choose: undefined;
//     memory: undefined;
//   };

// type HomeScreenProps = {
//     navigation: NativeStackNavigationProp<RootStackParamList, "Second">; // Upewnij się, że to jest zgodne z Twoją konfiguracją nawigatora
//   };

const cardImages = [
  { symbol: "X", matched: false },
  { symbol: "?", matched: false },
  { symbol: "O", matched: false },
  { symbol: "#", matched: false },
];

interface Card {
  symbol: string;
  id: number;
}

function SingleCard({
  card,
  handleChoice,
  flipped,
  rotation
}: {
  card: Card;
  handleChoice: (card: Card) => void;
  flipped: any;
  rotation: Animated.Value;
}) {
  

  const flipCard = () => {
    Animated.timing(rotation, {
      toValue: 1,
      duration: 500, // Czas trwania animacji w milisekundach
      useNativeDriver: false, // Wymagane, jeśli używasz Animated.View
    }).start();
  };

  const handleClick = () => {
    handleChoice(card);
    flipCard();
  };

  const frontStyle = [
    styles.front,
    {
      transform: [
        {
          rotateY: rotation.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "180deg"],
          }),
        },
      ],
    },
  ];

  const backStyle = [
    styles.back,
    {
      transform: [
        {
          rotateY: rotation.interpolate({
            inputRange: [0, 1],
            outputRange: ["180deg", "0deg"],
          }),
        },
      ],
    },
  ];
  return (
    <View style={styles.card}>
       {flipped ? (
        <TouchableWithoutFeedback onPress={handleClick}>
          <Animated.View style={[frontStyle]}>
            <Text style={styles.front}>{card.symbol}</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      ) : (
        <TouchableWithoutFeedback onPress={handleClick}>
          <Animated.View style={[backStyle]}>
            <Image
              style={styles.back}
              source={require("../../img/cover.png")}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}

export default function MemoryGame() {
  const [cards, setCards] = useState<
    {
      matched: boolean;
      symbol: string;
      id: number;
    }[]
  >([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState<Card | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<Card | null>(null);
  const [rotation] = useState(new Animated.Value(0));

  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5) //losowosc
      .map((card) => ({ ...card, id: Math.random() }));
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
    setTurns((prevTurns) => prevTurns + 1);
  };

  return (
    <View style={styles.container}>
      <Text>Memory</Text>
      <Button title="Start" onPress={shuffleCards}></Button>
      <View style={styles.cardGrid}>
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            rotation={rotation}
          />
        ))}
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
    width: "100%",
    // height: "100%",
  },
  front: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30,
    height: "100%",
    width: "100%",
    borderColor: "#fff",
    borderRadius: 6,
    borderWidth: 2,
    borderStyle: "solid",

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
  
  },
  card: {
    position: "relative",
    width: "20%",
    //height: "100%",
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "white",
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
});
