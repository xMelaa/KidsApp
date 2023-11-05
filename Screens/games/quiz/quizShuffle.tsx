import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from "react-native";
import { Overlay } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import quizData from "./quizData";

type RootStackParamList = {
  quizresult: undefined;
  games: undefined;
};

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "games">;
};

//random answers
function shuffleArray(array: any) {
  const shuffledArray = [...array]; 
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export default function QuizShuffleGame({ navigation }: HomeScreenProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [correctAnswerOverlayVisible, setCorrectAnswerOverlayVisible] =
    useState(false);
  const [incorrectAnswerOverlayVisible, setIncorrectAnswerOverlayVisible] =
    useState(false);
    
  const shuffledAnswers = shuffleArray(quizData[currentQuestion]?.options);

  const handleNextQuestion = () => {
    setCorrectAnswerOverlayVisible(false);
    setCurrentQuestion(currentQuestion + 1);
    if (currentQuestion + 1 >= quizData.length) {
      setShowScore(true);
    }
  };

  const handleAnswer = (selectedAnswerOption: any) => {
    const answer = quizData[currentQuestion]?.answer;
    if (answer === selectedAnswerOption.name) {
      setScore((prevScore) => prevScore + 1);
      setCorrectAnswerOverlayVisible(true);
    } else {
      setIncorrectAnswerOverlayVisible(true);
      setTimeout(() => setIncorrectAnswerOverlayVisible(false), 3000);
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
            {shuffledAnswers.map((item) => (
              <TouchableOpacity
                onPress={() => handleAnswer(item)}
                style={styles.answer}>
                <Text>{item.name}</Text>
                <Image style={styles.answerImage} source={item.src} />
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
      <Overlay
        isVisible={correctAnswerOverlayVisible}
        onBackdropPress={() => setCorrectAnswerOverlayVisible(false)}
        overlayStyle={styles.overlay}>
        <Text>Prawidłowa odpowiedź!</Text>
        <TouchableOpacity onPress={handleNextQuestion}>
          <Text>Dalej</Text>
        </TouchableOpacity>
      </Overlay>

      <Overlay
        isVisible={incorrectAnswerOverlayVisible}
        onBackdropPress={() => setIncorrectAnswerOverlayVisible(false)}
        overlayStyle={styles.overlay}>
        <Text>Zła odpowiedź. Spróbuj ponownie.</Text>
        <TouchableOpacity
          onPress={() => setIncorrectAnswerOverlayVisible(false)}>
          <Text>Zamknij</Text>
        </TouchableOpacity>
      </Overlay>

      <View style={styles.buttons}>
        <TouchableOpacity>
          <Text>WRÓĆ</Text>
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
  overlay: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    height: "70%",
    width: "70%",
  },
});
