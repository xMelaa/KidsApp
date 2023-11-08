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
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState("black");
  const [brushSize, setBrushSize] = useState(5);

  const changeBrushColor = (color: React.SetStateAction<string>) => {
    setBrushColor(color);
  };
  const changeBrushSize = (size: React.SetStateAction<number>) => {
    setBrushSize(size);
  };

  useEffect(() => {
    const canvas = canvasRef.current!;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d")!;
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);
  const startDrawing = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current?.beginPath();
    contextRef.current?.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };
  const finishDrawing = () => {
    contextRef.current?.closePath();
    setIsDrawing(false);
  };
  const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || contextRef.current === null) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.strokeStyle = brushColor;
    contextRef.current.lineWidth = brushSize;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };
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
      <View>
        <View style={styles.colorPicker}>
          <Button
            title="Black"
            onPress={() => changeBrushColor("black")}
            color="black"
          />
          <Button
            title="Red"
            onPress={() => changeBrushColor("red")}
            color="red"
          />
          <Button
            title="Blue"
            onPress={() => changeBrushColor("blue")}
            color="blue"
          />
          {/* Dodaj inne kolory według potrzeb */}
        </View>
        <canvas
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={draw}
          ref={canvasRef}
        />
        <View style={styles.brushSizePicker}>
          <Button title="Small" onPress={() => changeBrushSize(2)} />
          <Button title="Medium" onPress={() => changeBrushSize(5)} />
          <Button title="Large" onPress={() => changeBrushSize(10)} />
          {/* Dodaj inne rozmiary według potrzeb */}
        </View>
        <Button title="Wyczyść" onPress={clearCanvas} />
      </View>
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
  colorPicker: {
    width: 50,
  },
  brushSizePicker: {
    width: 50,
  },
});
