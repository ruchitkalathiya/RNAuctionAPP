import React,{useState,useEffect,useContext} from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import Onboarding from '../screens/OnboardingScreen';
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();

const AuthStack=({routeName})=> {

  const [isFirstLaunch, setIsFirstLunch] = useState(0);

  return (
      <Stack.Navigator initialRouteName={routeName}>
        <Stack.Screen name="Onboarding" component={Onboarding} options={{header:()=>null}}/>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
  );
}

export default AuthStack;