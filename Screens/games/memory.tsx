import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
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
}: {
  card: Card;
  handleChoice: (card: Card) => void;
}) {
  const handleClick = () => {
    handleChoice(card);
  };

  return (
    <View style={styles.card}>
      <View style={styles.front}>
        <Text style={styles.front}>{card.symbol}</Text>
      </View>
      <View style={styles.back}>
        <TouchableOpacity onPress={handleClick} style={styles.back}>
          <Image style={styles.back} source={require("../../img/cover.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function MemoryGame() {
  const [cards, setCards] = useState<{ symbol: string; id: number }[]>([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState<Card | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<Card | null>(null);

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
        resetTurn();
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
          <SingleCard key={card.id} card={card} handleChoice={handleChoice} />
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
    // height: "100%",
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
    // height: "100%",
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
    // marginHorizontal: 10,
  },
  cardGrid: {
    marginTop: 40,
    width: "75%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",

    //marginHorizontal: -10,
    gap: 10,
  },
});
