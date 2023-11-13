import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  useWindowDimensions,
  Pressable,
  TouchableOpacity,
  GestureResponderEvent,
  PanResponder,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import Svg, { Path } from "react-native-svg";

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
  const [paths, setPaths] = useState<Array<{ color: string; path: string }>>([]);

  const changeBrushColor = (color: React.SetStateAction<string>) => {
    setBrushColor(color);
  };
  const changeBrushSize = (size: React.SetStateAction<number>) => {
    setBrushSize(size);
  };
  const windowDimensions = useWindowDimensions();

  const handlePanResponderMove = (
    e: any,
    gestureState: { moveX: any; moveY: any }
  ) => {
    const { moveX, moveY } = gestureState;
    const newPath = `${paths[paths.length - 1]} L${moveX} ${moveY}`;
    setPaths((prevPaths) => [
      ...prevPaths.slice(0, -1),
      {
        color: brushColor,
        path: `${prevPaths[prevPaths.length - 1].path} L${moveX} ${moveY}`,
      },
    ]);
  };

  const startDrawing = ({ nativeEvent }: GestureResponderEvent) => {
    const { locationX, locationY } = nativeEvent;
    setPaths((prevPaths) => [
      ...prevPaths,
      { color: brushColor, path: `M${locationX} ${locationY}` },
    ]);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    setIsDrawing(false);
  };
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: handlePanResponderMove,
    onPanResponderRelease: finishDrawing,
  });
  const draw = ({ nativeEvent }: GestureResponderEvent) => {
    if (!isDrawing) return;

    const { locationX, locationY } = nativeEvent;
    setPaths((prevPaths) => [
      ...prevPaths.slice(0, -1),
      {
        color: brushColor,
        path: `${prevPaths[prevPaths.length - 1].path} L${locationX} ${locationY}`,
      },
    ]);
  };

  const clearCanvas = () => {
    setPaths([]);
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
              style={[
                styles.color,
                { backgroundColor: color },
              ]}></TouchableOpacity>
          ))}
        </View>
        <Svg
          width="100%"
          height="100%"
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={finishDrawing}>
          {paths.map(({ color, path }, index) => (
            <Path
              key={index}
              d={path}
              stroke={color}
              strokeWidth={brushSize}
              fill="transparent"
            />
          ))}
        </Svg>
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
    fontSize: 16,
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
