import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import React from "react";

const brushColors = [
  "black",
  "white",
  "red",
  "green",
  "yellow",
  "blue",
  "pink",
  "purple",
];
const brushSizes = [0.5, 1, 2, 4, 5, 6, 8, 10];
const coloringPages = [
  require("../../img/ColoringPages/a.png"),
  require("../../img/ColoringPages/b.png"),
  require("../../img/ColoringPages/bus.png"),
  require("../../img/ColoringPages/cat.png"),
  require("../../img/ColoringPages/forest.png"),
  require("../../img/ColoringPages/frog.png"),
  require("../../img/ColoringPages/fruits.png"),
  require("../../img/ColoringPages/giraffe.png"),
  require("../../img/ColoringPages/husky.png"),
  require("../../img/ColoringPages/police.png"),
  require("../../img/ColoringPages/puppy.png"),
  require("../../img/ColoringPages/vegetables.png"),
];

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
  const windowDimensions = useWindowDimensions();
  useEffect(() => {
    const windowWidth = Dimensions.get("window").width;
    const canHeight =
      Dimensions.get("window").height - 65 - 65 - styles.container.height; //65 - wysokosc headera, 35 + 20 wysokos buttona do czyszcenia canvas - do zmiany na
    const canWidth = (windowWidth * canHeight) / window.innerHeight;
    const canvas = canvasRef.current!;
    canvas.width =
      canWidth * 2 -
      (styles.brushSizePicker.width + styles.colorPicker.width) * 2;
    canvas.height = canHeight * 2;
    canvas.style.width = `${
      canWidth - (styles.brushSizePicker.width + styles.colorPicker.width)
    }px`;
    canvas.style.height = `${canHeight}px`;
    canvas.style.backgroundColor = "rgba(255,255,255,0.7)";

    const context = canvas.getContext("2d")!;
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "black";

    context.lineWidth = 5;
    contextRef.current = context;

    const randomIndex = Math.floor(Math.random() * coloringPages.length);
    const randomImage = coloringPages[randomIndex];

    const bgImg = new Image();
    bgImg.src = randomImage;
    bgImg.onload = function () {
      const imgAspectRatio = bgImg.width / bgImg.height;
      const bgHeight = canHeight;
      const bgWidth = bgHeight * imgAspectRatio;
      const xOffset = (canWidth - bgWidth) / 2;
      console.log(bgImg.width);
      context.drawImage(bgImg, xOffset, 0, bgWidth, bgHeight);
    };
  }, [windowDimensions]);

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
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;
    context.clearRect(0, 0, canvas.width, canvas.height);
    const randomIndex = Math.floor(Math.random() * coloringPages.length);
    const randomImage = coloringPages[randomIndex];
    const bgImg = new Image();
    bgImg.src = randomImage;
    bgImg.onload = function () {
      const imgAspectRatio = bgImg.width / bgImg.height;
      const bgHeight = windowHeight - 65 - 35 - styles.container.height;
      const bgWidth = bgHeight * imgAspectRatio;
      const xOffset =
        ((windowWidth * bgHeight) / window.innerHeight - bgWidth) / 2;
      context.drawImage(bgImg, xOffset, 0, bgWidth, bgHeight);
    };
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.titleText}>Pokoloruj obrazek</Text>
      </View>
      <View style={styles.canvasContainer}>
        <View style={styles.colorPicker}>
          {brushColors.map((color) => (
            <TouchableOpacity
              key={color}
              onPress={() => changeBrushColor(color)}
              style={[styles.color, { backgroundColor: color }]}></TouchableOpacity>
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
            <TouchableOpacity
              key={size}
              onPress={() => changeBrushSize(size)}
              style={styles.sizes}>
              <Text style={styles.sizeText}>{size.toString()}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity onPress={clearCanvas} style={styles.buttonClear}>
        <Text style={styles.buttonClearText}>Wyczyść</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  titleText: {
    fontSize: 22,
    fontWeight: "600",
  },
  canvasContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  toolContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  colorPicker: {
    width: 50,
    marginLeft: 10,
  },
  color: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginVertical: 2,
  },
  sizes: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 2,
  },
  sizeText: {
    fontSize: 16,
    color: "white",
  },
  brushSizePicker: {
    width: 50,

    marginRight: 10,
  },
  buttonClear: {
    width: "30%",
    height: 35,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    marginHorizontal: "auto",
    marginVertical: "auto",
  },
  buttonClearText: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
  },
});
