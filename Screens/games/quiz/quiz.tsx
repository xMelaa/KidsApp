import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  PixelRatio,
  Dimensions,
} from "react-native";
import { Overlay } from "react-native-elements";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import quizData from "./quizData";

type RootStackParamList = {
  quizresult: undefined;
  games: undefined;
};

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "games">;
};

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size: number) => size / fontScale;
const { width } = Dimensions.get("window");
const fontSize = getFontSize(width * 0.015);

function shuffleArray(array: any) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export default function QuizGame({ navigation }: HomeScreenProps) {
  const [questions, setQuestions] = useState(shuffleArray(quizData));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [correctAnswerOverlayVisible, setCorrectAnswerOverlayVisible] =
    useState(false);
  const [incorrectAnswerOverlayVisible, setIncorrectAnswerOverlayVisible] =
    useState(false);

  const handleNextQuestion = () => {
    setCorrectAnswerOverlayVisible(false);
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  const handleAnswer = (selectedAnswerOption: any) => {
    const answer = questions[currentQuestion]?.answer;
    if (answer === selectedAnswerOption.name) {
      setScore((prevScore) => prevScore + 1);
      setCorrectAnswerOverlayVisible(true);
    } else {
      setIncorrectAnswerOverlayVisible(true);
      setTimeout(() => setIncorrectAnswerOverlayVisible(false), 3000);
    }
  };

  useEffect(() => {
    setQuestions(shuffleArray(quizData));
    //setCurrentQuestion(0);
  }, [quizData]);

  return (
    <View style={styles.container}>
      <Image
        resizeMode="cover"
        source={require("../../../img/waves/wavesOrange.png")}
        style={styles.backgroundImage}
        blurRadius={3}
      />
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
            <Text style={styles.questionText}>
              {questions[currentQuestion]?.question}
            </Text>
          </View>
          <View style={styles.answers}>
            {quizData[currentQuestion]?.options.map((item) => (
              <TouchableOpacity
                onPress={() => handleAnswer(item)}
                style={styles.answer}>
                {/* <Text>{item.name}</Text> */}
                <Image
                  style={styles.answerImage}
                  source={item.src}
                  resizeMode="cover"
                />
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
        <TouchableOpacity onPress={() => navigation.push("quizresult")}>
          {/* <Text>END</Text> */}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  question: {
    marginVertical: 20,
  },
  questionText: {
    fontSize: fontSize * 2,
    fontWeight: "600",
    color: "#1e2a3d"
  },
  answers: {
    width: "75%",
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
    width: "100%",
    height: "100%",
    aspectRatio: 1,
    borderColor: "white",
    borderWidth: 3
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
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});
