import HomeScreen from "./Screens/HomeScreen";
import SecondScreen from "./Screens/SecondScreen";
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator()

export default function App() {
  return (
   <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options = {{title: "Welcome"}}
      />
      <Stack.Screen
        name="Second"
        component={SecondScreen}
        options = {{title: "Welcome"}}
      />
    </Stack.Navigator>
   </NavigationContainer>
  );
}

