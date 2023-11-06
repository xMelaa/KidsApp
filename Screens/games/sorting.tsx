import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, PanResponder, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { Component } from 'react'
import { PanResponderInstance } from "react-native";


type RootStackParamList = {
   Second: undefined;
    choose: undefined;
  };

type HomeScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, "Second">; // Upewnij się, że to jest zgodne z Twoją konfiguracją nawigatora
  };

  class Draggable extends Component {
    state = {
      pan: new Animated.ValueXY()
    };
  
    _val = { x: 0, y: 0 };
    panResponder: PanResponderInstance | null = null;
  
    componentWillMount() {
      this.state.pan.addListener((value) => (this._val = value));
  
      this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([
          null, { dx: this.state.pan.x, dy: this.state.pan.y }
        ]),
        onPanResponderRelease: (e, gesture) => {
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 },
            friction: 5,
            useNativeDriver: false
          }).start();
        }
      });
    }
  
    render() {
      const panStyle = {
        transform: this.state.pan.getTranslateTransform()
      };
  
      return (
        <Animated.View
          {...(this.panResponder?.panHandlers)}
          style={[panStyle, styles.circle]}
        />
      );
    }
  }

export default function SortingGame({ navigation }: HomeScreenProps) {
    
  return (
    <View style={styles.container}>
      
      <Text>Sortowanie</Text>
      <Draggable/>

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
    borderRadius: CIRCLE_RADIUS
  }
});
