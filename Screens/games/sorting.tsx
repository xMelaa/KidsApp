import {
  StyleSheet,
  Text,
  View,
  Button,
  PanResponder,
  Animated,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { Component } from "react";
import { PanResponderInstance } from "react-native";

type RootStackParamList = {
  Second: undefined;
  choose: undefined;
};

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Second">;
};
interface DraggableState {
  showDraggable: boolean;
  dropAreaValues: any;
  pan: Animated.ValueXY;
  opacity: Animated.Value;
}
class Draggable extends Component<{}, DraggableState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      showDraggable: true,
      dropAreaValues: null,
      pan: new Animated.ValueXY(),
      opacity: new Animated.Value(1),
    };
  }
  _val = { x: 0, y: 0 };

  panResponder: PanResponderInstance | null = null;
  isDropArea(gesture: { moveX: number, moveY: number }) {
    const dropZoneOneX = 30; // X pozycja początkowa dropZoneOne
    const dropZoneOneY = 460; // Y pozycja początkowa dropZoneOne
    const dropZoneOneWidth = 500; // Szerokość dropZoneOne
    const dropZoneOneHeight = 300; // Wysokość dropZoneOne
  
    const dropZoneTwoX = 530; // X pozycja początkowa dropZoneTwo
    const dropZoneTwoY = 460; // Y pozycja początkowa dropZoneTwo
    const dropZoneTwoWidth = 500; // Szerokość dropZoneTwo
    const dropZoneTwoHeight = 300; // Wysokość dropZoneTwo
    
    const isInsideDropZoneOne =
      gesture.moveX >= dropZoneOneX &&
      gesture.moveX <= dropZoneOneX + dropZoneOneWidth &&
      gesture.moveY >= dropZoneOneY &&
      gesture.moveY <= dropZoneOneY + dropZoneOneHeight;
  
    const isInsideDropZoneTwo =
      gesture.moveX >= dropZoneTwoX &&
      gesture.moveX <= dropZoneTwoX + dropZoneTwoWidth &&
      gesture.moveY >= dropZoneTwoY &&
      gesture.moveY <= dropZoneTwoY + dropZoneTwoHeight;      
  
    return isInsideDropZoneOne || isInsideDropZoneTwo;
   }
  componentWillMount() {
    this._val = { x: 0, y: 0 };
    this.state.pan.addListener(
      (value: { x: number; y: number }) => (this._val = value)
    );

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gesture) => {
        this.state.pan.setOffset({
          x: this._val.x,
          y: this._val.y,
        });
        this.state.pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([
        null,
        { dx: this.state.pan.x, dy: this.state.pan.y },
      ]),
      onPanResponderRelease: (e, gesture) => {
        if (this.isDropArea(gesture)) {
          Animated.timing(this.state.opacity, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
          }).start(() =>
            this.setState({
              showDraggable: false,
            })
          );
        } else {
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 },
            friction: 5,
            useNativeDriver: false,
          }).start();
        }
        this.state.pan.flattenOffset();
      },
    });
  }

  render() {
    return (
      <View style={{ width: "20%", alignItems: "center" }}>
        {this.renderDraggable()}
      </View>
    );
  }
  renderDraggable() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform(),
    };
    if (this.state.showDraggable) {
      return (
        <View style={{  position: "absolute"  }}>
          {this.isDropArea({ moveX: 0, moveY: 0 })}
         
          <Animated.View
            {...this.panResponder?.panHandlers}
            style={[panStyle, styles.circle, { opacity: this.state.opacity }]}
          />
        </View>
      );
    }
  }
}

class Screen extends Component {
  render() {
    return (<>
      <View style={zoneStyles.mainContainer}>   
        <View style={zoneStyles.ballContainer} />
        <View style={zoneStyles.row}>
          <Draggable />
          <Draggable />
          <Draggable />
          <Draggable />
          <Draggable />
        </View>
        <View style={zoneStyles.ballContainer} />
       <View style={zoneStyles.dropContainer}>
       
          <View style={zoneStyles.dropZoneOne}>
            {/* <Text style={zoneStyles.text}>Koszyk 1</Text> */}
          </View>
          <View style={zoneStyles.dropZoneTwo}>
            {/* <Text style={zoneStyles.text}>Koszyk 2</Text> */}
          </View>
        </View>
        
      </View>
        </>
    );
  }
}

export default function SortingGame({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>  
      {/* //<Text>Sortowanie</Text> */}
      <Screen />
    </View>
  );
}

let CIRCLE_RADIUS = 30;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
    alignItems: "center",
  },
  circle: {
    backgroundColor: "skyblue",
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
    zIndex: 10
  },
});

const zoneStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "75%",
   // alignItems: "center"
  },
  ballContainer: {
    height: 200,
  },
  row: {
    flexDirection: "row",
    height: 60
  },
  dropContainer: {
    //paddingHorizontal: 30,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  
  dropZoneOne: {
    width: 500,
    height: 300,
    backgroundColor: "lightpink",
    opacity: 0.3,
    zIndex: -1,
  },
  dropZoneTwo: {
    width: 500,
    height: 300,
    backgroundColor: "lightgreen",
    opacity: 0.3,
    zIndex: -1
  },
  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
