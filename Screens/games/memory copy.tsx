import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Animated,
  Pressable,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

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

  let flipRotation = 0;
  flipAnimation.addListener(({ value }) => (flipRotation = value));

  const handleClick = () => {
    handleChoice(card);
    rotate.value = 1;
  };

  const rotate = useSharedValue(0);
  const frontAnimatedStyles = useAnimatedStyle(() => {
    const rotateValue = interpolate(rotate.value, [0, 1], [0, 180]);
    return {
      transform: [
        {
          rotateY: withTiming(`${rotateValue}deg`, { duration: 600 }),
        },
      ],
    };
  });
  const backAnimatedStyles = useAnimatedStyle(() => {
    const rotateValue = interpolate(rotate.value, [0, 1], [180, 360]);
    return {
      transform: [
        {
          rotateY: withTiming(`${rotateValue}deg`, { duration: 600 }),
        },
      ],
    };
  });

  return (
    <Pressable
      style={styles.card}
      onPress={() => (flipRotation ? backAnimatedStyles : frontAnimatedStyles)}>
      <Animated.View
        style={[
          styles.cardContainer,
          flipped ? frontAnimatedStyles : backAnimatedStyles,
        ]}>
        {flipped ? ( //jesli karta jest odkryta
          <Pressable onPress={handleClick} style={styles.front}>
            <Image style={styles.front} source={card.symbol} />
          </Pressable>
        ) : (
          //jesli jest zakryta
          <Pressable onPress={handleClick} style={styles.back}>
            <Image
              style={styles.back}
              source={require("../../img/cover.png")}
            />
          </Pressable>
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

    setChoiceOne(null);
    setChoiceTwo(null);
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
    backfaceVisibility: "hidden",
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
    //position: "absolute",
    backfaceVisibility: "hidden",
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
    // transformStyle: "preserve-3d", //perspektywa??
  },
});
