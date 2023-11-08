import { StyleSheet, Text, View, Button, Dimensions } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import React from "react";

const brushColors = ["black", "white", "red", "green", "yellow", "blue", "pink", "purple"]
const brushSizes = [0.5, 1, 2, 4, 5, 6, 8, 10]
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
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;
    canvas.width = windowWidth * 2;
    canvas.height = windowHeight * 2;
    canvas.style.width = `${windowWidth}px `;
    canvas.style.height = `${windowHeight}px`;
   

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
      <View style={styles.canvasContainer}>
        <View style={styles.colorPicker}>
        {brushColors.map((color) => (
            <Button
              key={color}
              title={color}
              onPress={() => changeBrushColor(color)}
              color={color}
            />
          ))}          
        </View>
        <canvas
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={draw}
          ref={canvasRef}
        />
        <View style={styles.brushSizePicker}>
        {brushSizes.map((size) => (
            <Button
              key={size}
              title={size.toString()}
              onPress={() => changeBrushSize(size)}
            />
          ))}
        </View>
        
      </View><Button title="Wyczyść" onPress={clearCanvas} />
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
 
  canvasContainer:{
    flexDirection: "row",
    justifyContent: "space-between",
   
  },
  toolContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  colorPicker: {
    width: 50
  },
  brushSizePicker: {
    width: 50
  },
});
