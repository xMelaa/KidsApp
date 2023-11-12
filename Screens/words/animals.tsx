import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
  Dimensions,
  SafeAreaView,
  PixelRatio,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Animals } from "../../data/data";
import { useRef, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

type RootStackParamList = {
  Second: undefined;
  choose: undefined;
  words: undefined;
  games: undefined;
  animal: { animalName: string };
};

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Second">;
};
const { width, height } = Dimensions.get("window");
const fontScale = PixelRatio.getFontScale();
const getFontSize = (size: number) => size / fontScale;
const fontSize = getFontSize(width * 0.022);

export default function AnimalsScreen({ navigation }: HomeScreenProps) {
  const animalNames = Object.keys(Animals);
  const itemsPerRow = 5;
  const rowsPerPage = height > 500 ? 3 : height < 350 ? 1 : 2;
  const initialPage = 1;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const scrollX = useRef(new Animated.Value(0)).current;

  // Funkcja do renderowania elementów na danej stronie
  const renderPage = (page: number) => {
    const startIndex = (page - 1) * rowsPerPage * itemsPerRow;
    const endIndex = startIndex + rowsPerPage * itemsPerRow;
    return animalNames.slice(startIndex, endIndex);
  };

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  return (
    <View style={styles.container}>
      <Image
        source={require("../../img/animals.png")}
        style={[styles.backgroundImage]}
        blurRadius={6}
      />
      <View style={styles.overlay}></View>
      <View style={styles.contentContainer}>
        <View style={styles.iconButton}>
          {currentPage > 1 && (
            <TouchableOpacity
              onPress={() => setCurrentPage(currentPage - 1)}
              style={styles.iconContainer}>
              <Icon name="chevron-left" size={fontSize * 3} color="lightgray" />
            </TouchableOpacity>
          )}
        </View>
        <SafeAreaView style={styles.buttonsContainer}>
          <FlatList
            data={renderPage(currentPage)}
            keyExtractor={(animalName) => animalName}
            numColumns={itemsPerRow}
            horizontal={false}
            renderItem={({ item: animalName }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.push("animal", { animalName: animalName })
                }
                style={styles.itemContainer}>
                <Image
                  source={Animals[animalName].photo}
                  style={styles.image}
                />
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              {
                useNativeDriver: false,
              }
            )}
            viewabilityConfig={viewConfig}
            scrollEventThrottle={16}
          />
        </SafeAreaView>

        <View style={styles.iconButton}>
          {currentPage <
            Math.ceil(animalNames.length / (itemsPerRow * rowsPerPage)) && (
            <TouchableOpacity
              onPress={() => setCurrentPage(currentPage + 1)}
              style={styles.iconContainer}>
              <Icon
                name="chevron-right"
                size={fontSize * 3}
                color="lightgray"
              />
            </TouchableOpacity>
          )}
        </View>
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
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonsContainer: {
    width: "80%",
    marginVertical: 20,
  },
  itemContainer: {
    margin: "1%",
    marginHorizontal: "2%",
    width: "16%",
    aspectRatio: 1,
    border: "solid",
    borderColor: "black",
    borderWidth: 3,
  },

  iconButton: {
    backgroundColor: "transparent",
    padding: 10,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    height: "100%",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  backgroundImage: {
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});
