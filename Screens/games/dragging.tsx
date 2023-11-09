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
  constructor(props: {} ) {
    super(props);

    this.state = {
      showDraggable: true,
      dropAreaValues: null,
      pan: new Animated.ValueXY(),
      opacity: new Animated.Value(1)
    };
  }
  _val = { x: 0, y: 0 };
  
  panResponder: PanResponderInstance | null = null;
  //drop area, dropzone powyzej y=200 (y: 0 - 200)
  isDropArea(gesture: { moveY: number }) {
    return gesture.moveY < 200; 
  }
  componentWillMount() {
    //this._val = { x: 0, y: 0 };
    this.state.pan.addListener((value: { x: number; y: number; }) => (this._val = value));

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gesture) => {
        this.state.pan.setOffset({
          x: this._val.x,
          y:this._val.y
        })
        this.state.pan.setValue({ x:0, y:0})
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
    transform: this.state.pan.getTranslateTransform()
  }
  if (this.state.showDraggable) {
    return (
      <View style={{ position: "absolute" }}>
        <Animated.View
          {...(this.panResponder?.panHandlers)}
          style={[panStyle, styles.circle, {opacity:this.state.opacity}]}
        />
      </View>
    );
  }
}}

class Screen extends Component {
  render() {
    return (
      <View style={zoneStyles.mainContainer}>
        <View style={zoneStyles.dropZone}>
          {/* <Text style={zoneStyles.text}>Drop them here!</Text> */}
        </View>
        <View style={zoneStyles.ballContainer} />
        <View style={zoneStyles.row}>
          <Draggable />
          <Draggable />
          <Draggable />
          <Draggable />
          <Draggable />
        </View>
      </View>
    );
  }
}

export default function Drag({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <Text>dragging</Text>
      <Screen />
    </View>
  );
}

let CIRCLE_RADIUS = 30;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  circle: {
    backgroundColor: "skyblue",
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
  },
});

const zoneStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "75%"
  },
  ballContainer: {
    height: 200,
  },
  row: {
    flexDirection: "row",
  },
  dropZone: {
    height: 200,
    backgroundColor: "#00334d",
  },
  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
  },
});
