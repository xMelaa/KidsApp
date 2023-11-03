import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";

// type RootStackParamList = {
//    Second: undefined;
//     choose: undefined;
//     memory: undefined;
//   };

// type HomeScreenProps = {
//     navigation: NativeStackNavigationProp<RootStackParamList, "Second">; // Upewnij się, że to jest zgodne z Twoją konfiguracją nawigatora
//   };

const cardImages = [
  { symbol: "X" },
  { symbol: "?" },
  { symbol: "O" },
  { symbol: "#" },
];

interface Card {
    symbol: string;
    id: number;
  }

function SingleCard({card}: { card: Card }) {
  return (
    <View style={styles.card} >
      <View style={styles.front}>
        <Text style={styles.front}>{card.symbol}</Text>
      </View>
      <View style={styles.back}>
        <Image style={styles.back} source={require("../../img/cover.png")} />
      </View>
    </View>
  );
}

export default function MemoryGame() {
  const [cards, setCards] = useState<{ symbol: string; id: number }[]>([]);
  const [turns, setTurns] = useState(0);
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5) //losowosc
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffleCards);
    setTurns(0);
  };

  console.log(cards, turns);

  return (
    <View style={styles.container}>
      <Text>Memory</Text>
      <Button title="Start" onPress={shuffleCards}></Button>
      <View style={styles.cardGrid}>{cards.map((card) => <SingleCard key={card.id} card={card}/>)}</View>
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
     borderStyle: "solid"
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
    borderStyle: "solid"
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
    width:"75%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
   
    //marginHorizontal: -10,
    gap: 10
  },
});
