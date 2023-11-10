import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
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
  navigation: NativeStackNavigationProp<RootStackParamList, "Second">; // Upewnij się, że to jest zgodne z Twoją konfiguracją nawigatora
};

export default function AnimalsScreen({ navigation }: HomeScreenProps) {
  const animalNames = Object.keys(Animals);
  const itemsPerRow = 5;
  const rowsPerPage = 3;
  const initialPage = 1;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const scrollX = useRef(new Animated.Value(0)).current;
  // Funkcja do renderowania elementów na danej stronie
  const renderPage = (page: number) => {
    const startIndex = (page - 1) * rowsPerPage * itemsPerRow;
    const endIndex = startIndex + rowsPerPage * itemsPerRow;
    return animalNames.slice(startIndex, endIndex);
  };

  // const viewableItemsChanged = useRef(({viewableItems}) => {
  //   setCurrentPage(viewableItems[0].index)
  // }).current

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  return (
    <View style={styles.container}>
      <Text>Zwierzęta</Text>
      <View style={styles.contentContainer}>
        <View style={styles.iconButton}>
          {currentPage > 1 && (
            <TouchableOpacity onPress={() => setCurrentPage(currentPage - 1)}>
              <Icon name="chevron-left" size={48} color="gray" />
            </TouchableOpacity>
          )}
        </View>
        <FlatList
          data={renderPage(currentPage)}
          keyExtractor={(animalName) => animalName}
          numColumns={itemsPerRow}
          renderItem={({ item: animalName }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.push("animal", { animalName: animalName })
              }
              style={styles.itemContainer}>
              <Image
                source={Animals[animalName].photo}
                style={{ width: "100%", aspectRatio: 1 }}
              />
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator
          pagingEnabled
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          // onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          scrollEventThrottle={16}
          
        />
        <View style={styles.iconButton}>
          {currentPage <
            Math.ceil(animalNames.length / (itemsPerRow * rowsPerPage)) && (
            <TouchableOpacity onPress={() => setCurrentPage(currentPage + 1)}>
              <Icon name="chevron-right" size={48} color="gray" />
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
    width: "85%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 50,
    height: "100%",
    marginVertical: 20,
  },
  itemContainer: {
    margin: "2%",
    marginHorizontal: "4%",
    width: "12%",
  },

  iconButton: {
    backgroundColor: "transparent",
    padding: 10,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
