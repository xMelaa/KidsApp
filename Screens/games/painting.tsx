import { StyleSheet, Text, View, Button } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import React from "react";

type RootStackParamList = {
  Second: undefined;
  choose: undefined;
  words: undefined;
  games: undefined;
};

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Second">;
};

export default function PaintingScreen() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const contextRef = useRef<CanvasRenderingContext2D | null>(null)
    const [isDrawing, setIsDrawing] = useState(false)

    useEffect(() =>{
        const canvas = canvasRef.current!
        canvas.width = window.innerWidth *2
        canvas.height = window.innerHeight *2
        canvas.style.width = `${window.innerWidth}px`
        canvas.style.height = `${window.innerHeight}px`

        const context = canvas.getContext("2d")!
        context.scale(2,2)
        context.lineCap = "round"
        context.strokeStyle = "black"
        context.lineWidth = 5
        contextRef.current = context;
    }, [])
    const startDrawing = ({nativeEvent}: React.MouseEvent<HTMLCanvasElement>) => {
        const {offsetX, offsetY} = nativeEvent
        contextRef.current?.beginPath()
        contextRef.current?.moveTo(offsetX, offsetY)
        setIsDrawing(true)
    }
    const finishDrawing = () => {
        contextRef.current?.closePath()
        setIsDrawing(false)
    }
    const draw = ({nativeEvent}: React.MouseEvent<HTMLCanvasElement>) => {
        if(!isDrawing || contextRef.current === null){
            return
        }
        const {offsetX, offsetY} = nativeEvent
        contextRef.current.lineTo(offsetX, offsetY)
        contextRef.current.stroke()
    }
    const clearCanvas = () => {
        const canvas = canvasRef.current!;
        const context = canvas.getContext("2d")!;
        context.clearRect(0, 0, canvas.width, canvas.height);
      };

  return (
    <>
      <View style={styles.container}>
        <Text>Painting</Text>
      </View>
      <canvas 
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}
      />
      <Button title="Wyczyść" onPress={clearCanvas}/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
