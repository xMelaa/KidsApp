import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { Overlay } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import quizData from "./quizData";

type RootStackParamList = {
  Second: undefined;
  choose: undefined;
  memory: undefined;
  quizresult: undefined;
  games: undefined;
};

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Second">;
};

export default function QuizGame({ navigation }: HomeScreenProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  // const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswerOverlayVisible, setCorrectAnswerOverlayVisible] = useState(false);
  const [incorrectAnswerOverlayVisible, setIncorrectAnswerOverlayVisible] = useState(false);

  // const toggleOverlay = () => {
  //   setVisible(!visible);
  // }
  const handleAnswer = (selectedAnswerOption: any) => {
    const answer = quizData[currentQuestion]?.answer;
    if (answer === selectedAnswerOption.name) {
      setScore((prevScore) => prevScore + 1);
      setCorrectAnswerOverlayVisible(true);
    } else {
      setIncorrectAnswerOverlayVisible(true);
      setTimeout(() => setIncorrectAnswerOverlayVisible(false), 2000); 
    }

    const nextQ = currentQuestion + 1;
    if (nextQ < quizData.length) {
      //setCurrentQuestion(nextQ);
      //setSelectedAnswer(null);
    } else {
      setShowScore(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Quiz</Text>
      {showScore ? (
        <View>
          <Text>Quiz Result</Text>
          <Text>{score}</Text>
          <TouchableOpacity>
            <Button title="Powrót" onPress={() => navigation.push("games")} />
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.question}>
            <Text>{quizData[currentQuestion]?.question}</Text>
          </View>
          <View style={styles.answers}>
            {quizData[currentQuestion]?.options.map((item) => {
              return (
                <>
                  {" "}
                  <TouchableOpacity
                    onPress={() => handleAnswer(item)}
                    style={[
                      styles.answer,
                      // selectedAnswer === item ? styles.selectedAnswer : null,
                    ]}>
                    <Text>{item.name}</Text>
                    <Image style={styles.answerImage} source={item.src} />
                  </TouchableOpacity>
                </>
              );
            })}
          </View>
        </>
      )}
       <Overlay isVisible={correctAnswerOverlayVisible} onBackdropPress={() => setCorrectAnswerOverlayVisible(false)}>
        <Text>Prawidłowa odpowiedź!</Text>
        <TouchableOpacity onPress={() => setCorrectAnswerOverlayVisible(false)}>
          <Text>Dalej</Text>
        </TouchableOpacity>
      </Overlay>

      <Overlay isVisible={incorrectAnswerOverlayVisible} onBackdropPress={() => setIncorrectAnswerOverlayVisible(false)}>
        <Text>Zła odpowiedź. Spróbuj ponownie.</Text>
        <TouchableOpacity onPress={() => setIncorrectAnswerOverlayVisible(false)}>
          <Text>Zamknij</Text>
        </TouchableOpacity>
      </Overlay>

      
      <View style={styles.buttons}>
        <TouchableOpacity>
          <Text>WRÓĆ</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>DALEJ</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push("quizresult")}>
          <Text>END</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 12,
    height: "100%",
  },
  question: {
    marginVertical: 20,
  },
  answers: {
    marginVertical: 20,
    //height: "100%",
    width: "75%",
    gap: 30,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  answer: {
    width: "20%",
    position: "relative",
    aspectRatio: 1,
  },
  answerImage: {
    aspectRatio: 1 / 1,
  },
  buttons: {
    marginBottom: 16,
    paddingVertical: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    gap: 20,
  },
  selectedAnswer: {
    borderWidth: 2,
    borderColor: "green", // You can choose a different color
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});
