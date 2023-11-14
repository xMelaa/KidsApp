import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Pressable,
  PixelRatio,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Animated from "react-native-reanimated";

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

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size: number) => size / fontScale;
const { width, height } = Dimensions.get("window");
const fontSize = getFontSize(width * 0.015);

function SingleCard({
  card,
  handleChoice,
  flipped,
}: {
  card: Card;
  handleChoice: (card: Card) => void;
  flipped: any;
}) {
  const flipAnimation = useSharedValue(0);
  let flipRotation = 0;

  const handleClick = () => {
    handleChoice(card);
    rotate.value = 1;
  };
  const rotate = useSharedValue(1);
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
  useEffect(() => {
    return () => {
      flipAnimation.value = 0;
    };
  }, []);

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
  const [gameStarted, setGameStarted] = useState(false);

  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5) //losowosc
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffleCards);
    setTurns(0);
    setGameStarted(true);
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
      <Image
        resizeMode="cover"
        source={require("../../img/waves/wavesBlue.png")}
        style={styles.backgroundImage}
        blurRadius={3}
      />
      <View style={styles.container2}>
        {!gameStarted ? (
         <TouchableOpacity style={styles.button} onPress={shuffleCards}>
            <Text style={styles.buttonText} >START</Text>
          </TouchableOpacity>
        ) : (
          <>           
            <TouchableOpacity style={styles.button} onPress={shuffleCards}>
            <Text style={styles.buttonText} >NOWA GRA</Text>
          </TouchableOpacity>
            <View style={styles.cardGrid}>
              {cards.map((card) => (
                <SingleCard
                  key={card.id}
                  card={card}
                  handleChoice={handleChoice}
                  flipped={
                    card === choiceOne || card === choiceTwo || card.matched
                  }
                />
              ))}
            </View>
            <View style={styles.turnsContainer}>
              <Text style={styles.turnsText}>Ruchy: </Text>
              <Text style={styles.counterText}>{turns}</Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "cornflowerblue",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flexDirection: "row",
  },
  container2: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  button:{
    backgroundColor: "darkorange",
    paddingHorizontal: "2%",
    paddingVertical: "1.5%",
    borderRadius: 50,
    borderColor: "chocolate",
    borderWidth: 2,
    width: "15%",
    alignItems: "center",
    marginLeft: "1.5%",
    marginRight: "0.5%"
  },
  buttonText:{
color: "white",
fontWeight: "600"
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
    margin: 10,
  },
  cardGrid: {
    width: "70%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",   
    borderRadius: 6, 
    // transformStyle: "preserve-3d", //perspektywa??
  },
  turnsContainer: {
    alignItems: "center",
    width: "15%"
  },
  turnsText: {
    fontSize: fontSize * 1.5,
    fontWeight: "600",
    marginBottom: "5%",
    color: "#323f54"
  },
  counterText: {
    marginTop: "5%",
    fontSize: fontSize * 3,
    fontWeight: "700",
    color: "darkorange"
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});
