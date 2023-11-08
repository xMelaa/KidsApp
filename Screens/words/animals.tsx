import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Animals } from "../../data/data";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

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
    <>
      <Text>Zwierzęta</Text>
      <View style={styles.container}>
        <View style={styles.iconButton}>
          {currentPage > 1 && (
            <TouchableOpacity              
              onPress={() => setCurrentPage(currentPage - 1)}>
              <ChevronLeft style={styles.icon} />
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
                style={{ width: 200, height: 200 }}
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
          scrollEventThrottle={32}
        />
        <View style={styles.iconButton}>
          {currentPage <
          Math.ceil(animalNames.length / (itemsPerRow * rowsPerPage)) && (
          <TouchableOpacity
            
            onPress={() => setCurrentPage(currentPage + 1)}>
            <ChevronRight style={styles.icon} />
          </TouchableOpacity>
        )}
        </View>
        
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    flexDirection: "row",
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
    margin: 20,
    marginHorizontal: 50,
  },
 
  iconButton: {
    backgroundColor: "transparent",
    padding: 10,
    width: 100,
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    fontSize: 52,
    color: "gray"
  },
});
