import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Dimensions,
  PixelRatio,
  TouchableOpacity,
} from "react-native";
import { Icon, Overlay } from "react-native-elements";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import quizData from "./quizData";
import { speak } from "expo-speech";

type RootStackParamList = {
  quizresult: undefined;
  games: undefined;
};

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "games">;
};

//randomize
function shuffleArray(array: any) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size: number) => size / fontScale;
const { width } = Dimensions.get("window");
const fontSize = getFontSize(width * 0.015);

export default function QuizShuffleGame({ navigation }: HomeScreenProps) {
  const [questions, setQuestions] = useState(shuffleArray(quizData));
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

  const speakName = () => {
    speak(questions[currentQuestion].question, {
      language: "pl",
      _voiceIndex: 1,
    }); // Speak name in Polish
  };

  return (
    <View style={styles.container}>
      <Image
        resizeMode="cover"
        source={require("../../../img/waves/wavesOrange.png")}
        style={styles.backgroundImage}
        blurRadius={3}
      />
      {showScore ? (
        <View style={styles.endContainer}>
          <Text style={styles.goodJob}>Dobra robota!</Text>
          <Image
            source={require("../../../img/trophee-transparent.png")}
            style={styles.picture}
            resizeMode="cover"
          />

          <TouchableOpacity
            onPress={() => navigation.push("games")}
            style={styles.button}>
            <Text style={styles.buttonText}>Następny poziom</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.questionContainer}>
          <TouchableOpacity
            onPress={speakName}
            style={{ flexDirection: "row" }}>
            <Text style={styles.questionText}>
              {questions[currentQuestion]?.question}
            </Text>
            <Icon name="volume-up" size={fontSize * 2.7} color="#222" />
          </TouchableOpacity>
          <View style={styles.answers}>
            {shuffledAnswers.map((item) => (
              <TouchableOpacity
                onPress={() => handleAnswer(item)}
                style={styles.answer}>
                <Image style={styles.answerImage} source={item.src} resizeMode="cover"/>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <Overlay
        isVisible={correctAnswerOverlayVisible}
        onBackdropPress={() => setCorrectAnswerOverlayVisible(false)}
        overlayStyle={styles.overlay}>
        <Text style={styles.goodAnswer}>Dobrze!</Text>
        <Image
          source={require("../../../img/OK.png")}
          style={styles.pictureAnswer}
          resizeMode="cover"
        />
        <TouchableOpacity onPress={handleNextQuestion} style={styles.button}>
          <Text style={styles.buttonText}>Dalej</Text>
        </TouchableOpacity>
      </Overlay>

      <Overlay
        isVisible={incorrectAnswerOverlayVisible}
        onBackdropPress={() => setIncorrectAnswerOverlayVisible(false)}
        overlayStyle={styles.overlay}>
        <Text style={styles.badAnswer}>Zła odpowiedź. </Text>
        <Text style={styles.badAnswer2}>Spróbuj ponownie.</Text>
        <Image
          source={require("../../../img/BAD.png")}
          style={styles.pictureAnswer}
          resizeMode="cover"
        />
        <TouchableOpacity
          onPress={() => setIncorrectAnswerOverlayVisible(false)}
          style={styles.button}>
          <Text style={styles.buttonText}>Zamknij</Text>
        </TouchableOpacity>
      </Overlay>
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
  questionContainer: {
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    height: "90%",
    marginTop: "-3%",
  },
  endContainer: {
    flex: 1,
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  picture: {
    height: "70%",
    aspectRatio: 1,
  },
  pictureAnswer: {
    height: "60%",
    aspectRatio: 1,
  },
  button: {
    backgroundColor: "cornflowerblue",
    paddingHorizontal: "12%",
    paddingVertical: "2%",
    borderRadius: 50,
    borderColor: "darkslateblue",
    borderWidth: 3,
    alignItems: "center",
    marginTop: "-4%",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: fontSize * 1.2,
  },
  questionText: {
    fontSize: fontSize * 2,
    fontWeight: "600",
    color: "#1e2a3d",
    marginRight: fontSize * 0.85,
  },
  goodJob: {
    fontSize: fontSize * 3,
    fontWeight: "700",
    color: "#1e2a3d",
    marginBottom: "-6%",
  },
  goodAnswer: {
    fontSize: fontSize * 2.5,
    fontWeight: "700",
    color: "green",
    marginBottom: "-4%",
  },
  badAnswer: {
    fontSize: fontSize * 2.5,
    fontWeight: "700",
    color: "tomato",
    marginBottom: "-2%",
  },
  badAnswer2: {
    fontSize: fontSize * 1.5,
    color: "#291814",
    fontWeight: "500",
    marginBottom: "-4%",
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
    borderWidth: 3,
  },
  buttons: {
    marginBottom: 16,
    paddingVertical: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    gap: 20,
  },
  overlay: {
    backgroundColor: "linen",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "90%",
    width: "50%",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  question: {},
});
