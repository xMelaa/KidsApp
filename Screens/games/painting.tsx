import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  GestureResponderEvent,
  ScrollView,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
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

export default function PaintingScreen() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState("black");
  const [brushSize, setBrushSize] = useState(5);
  const [paths, setPaths] = useState<
    Array<{ color: string; brush: number; path: string }>
  >([]);
  const [randomImage, setRandomImage] = useState<string | null>("");
  const changeBrushColor = (color: React.SetStateAction<string>) => {
    setBrushColor(color);
  };
  const changeBrushSize = (size: React.SetStateAction<number>) => {
    setBrushSize(size);
  };

  const windowWidth = Dimensions.get("window").width;
  const canHeight =
    Dimensions.get("window").height - 65 - 65 - styles.container.height; //65 - wysokosc headera, 35 + 20 wysokos buttona do czyszcenia canvas - do zmiany na

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * coloringPages.length);
    const randomImage = coloringPages[randomIndex];
    setRandomImage(randomImage);
  }, []);

  const reroll = () => {
    clearCanvas();
    const randomIndex = Math.floor(Math.random() * coloringPages.length);
    const randomImage = coloringPages[randomIndex];
    setRandomImage(randomImage);
  };
  const handlePanResponderMove = (
    e: any,
    gestureState: { moveX: any; moveY: any }
  ) => {
    const { moveX, moveY } = gestureState;
    setPaths((prevPaths) => [
      ...prevPaths.slice(0, -1),
      {
        color: brushColor,
        brush: brushSize,
        path: `${prevPaths[prevPaths.length - 1].path} L${moveX} ${moveY}`,
      },
    ]);
  };

  const startDrawing = ({ nativeEvent }: GestureResponderEvent) => {
    const { locationX, locationY } = nativeEvent;
    setPaths((prevPaths) => [
      ...prevPaths,
      {
        color: brushColor,
        brush: brushSize,
        path: `M${locationX} ${locationY}`,
      },
    ]);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    setIsDrawing(false);
  };
 
  const draw = ({ nativeEvent }: GestureResponderEvent) => {
    if (!isDrawing) return;

    const { locationX, locationY } = nativeEvent;
    setPaths((prevPaths) => [
      ...prevPaths.slice(0, -1),
      {
        brush: brushSize,
        color: brushColor,
        path: `${
          prevPaths[prevPaths.length - 1].path
        } L${locationX} ${locationY}`,
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
        <ScrollView
          style={styles.colorPicker}
          horizontal={false}
          contentContainerStyle={{ alignItems: "center" }}>
          {brushColors.map((color) => (
            <TouchableOpacity
              key={color}
              onPress={() => changeBrushColor(color)}
              style={[
                styles.color,
                { backgroundColor: color },
              ]}></TouchableOpacity>
          ))}
        </ScrollView>
        {randomImage && (
          <Image
            source={
              typeof randomImage === "string"
                ? { uri: randomImage }
                : randomImage
            }
            resizeMode="center"
            style={[styles.bgImg, { width: windowWidth, height: canHeight }]}
          />
        )}
        <Svg
          width={windowWidth - 120}
          height={"100%"}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={finishDrawing}>
          {paths.map(({ color, brush, path }, index) => (
            <Path
              key={index}
              d={path}
              stroke={color}
              strokeWidth={brush}
              fill="transparent"
            />
          ))}
        </Svg>
        <ScrollView
          style={styles.brushSizePicker}
          contentContainerStyle={{ alignItems: "center" }}>
          {brushSizes.map((size) => (
            <TouchableOpacity
              key={size}
              onPress={() => changeBrushSize(size)}
              style={styles.sizes}>
              <Text style={styles.sizeText}>{size.toString()}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.buttonContainer}>
        <TouchableOpacity onPress={reroll} style={styles.buttonClear}>
          <Text style={styles.buttonClearText}>Nowy obrazek</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={clearCanvas} style={styles.buttonClear}>
          <Text style={styles.buttonClearText}>Wyczyść</Text>
        </TouchableOpacity>
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
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "600",
  },
  canvasContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: "70%",
  },
  toolContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  colorPicker: {
    width: 40,
    marginLeft: 10,
    marginTop: 5,
  },
  color: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginVertical: 2,
  },
  sizes: {
    width: 40,
    height: 40,
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
    width: 40,
    marginRight: 10,
    marginTop: 5,
  },
  buttonClear: {
    width: "25%",
    height: 35,
    backgroundColor: "cornflowerblue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    alignSelf: "center",
    marginTop: "0.3%",
  },
  buttonClearText: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
  },
  bgImg: {
    position: "absolute",
    zIndex: -20,
  },
});
