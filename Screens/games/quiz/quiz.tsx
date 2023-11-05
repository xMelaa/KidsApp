import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import quizData from "./quizData";

type RootStackParamList = {
  Second: undefined;
  choose: undefined;
  memory: undefined;
  quizresult: undefined;
};

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Second">; // Upewnij się, że to jest zgodne z Twoją konfiguracją nawigatora
};

export default function QuizGame({ navigation }: HomeScreenProps) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
   // const getQuiz = async () => {};
    useEffect(() => {
        //getQuiz();
       // console.log(quizData[0].options[2].src) //test quizdata
    }, [])
    
    const handleAnswer = (selectedAnswer: any) => {
      const answer = quizData[currentQuestion]?.answer
      if(answer === selectedAnswer.name){
        alert("Prawidłowa odpowiedź!")
      }else{
        alert("Zła odpowiedź. Spróbuj ponownie.")
      }
    }
  
    return (
    <View style={styles.container}>
      <Text>Quiz</Text>
      <View style={styles.question}>
        <Text>{quizData[currentQuestion]?.question}</Text>
      </View>
      <View style={styles.answers}>
        {quizData[currentQuestion]?.options.map((item) => {
          return <TouchableOpacity onPress={()=>handleAnswer(item)} style={styles.answer}>
          <Text>{item.name}</Text>
          <Image style={styles.answerImage} source={item.src} />
        </TouchableOpacity>
        })}
       
      </View>
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
  answer:{    
    width: "20%",
    position: "relative",
    aspectRatio: 1,
  },
  answerImage:{ 
    aspectRatio: 1/1
  },
  buttons: {
    marginBottom: 16,
    paddingVertical: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    gap: 20,
  },
});
