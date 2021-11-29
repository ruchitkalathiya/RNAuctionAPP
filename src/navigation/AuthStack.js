import React,{useState,useEffect,useContext} from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import Onboarding from '../screens/OnboardingScreen';
import HomeScreen from "../screens/HomeScreen";
import Sell from "../screens/AuctionSell";
import Profile from "../screens/Profile";
import Buy from "../screens/Buy";
import Screen1 from "../screens/AuctionScreens/Screen1";
import Screen2 from "../screens/AuctionScreens/Screen2";
import Screen3 from "../screens/AuctionScreens/Screen3";
import Screen4 from "../screens/AuctionScreens/Screen4";
import Screen5 from "../screens/AuctionScreens/Screen5";
import Screen6 from "../screens/AuctionScreens/Screen6";
import Screen7 from "../screens/AuctionScreens/Screen7";
import Screen8 from "../screens/AuctionScreens/Screen8";
import ModelComponent from "../components/view";
import Myauctionview from "../components/Myauctionview";
import Winnerhistory from "../screens/winnerhistory";
import MyAuction from "../screens/AuctionScreens/MyAuction";

const Stack = createNativeStackNavigator();

const AuthStack=({routeName})=> {

  const [isFirstLaunch, setIsFirstLunch] = useState(0);

  return (
      <Stack.Navigator initialRouteName={routeName}>
        <Stack.Screen name="Onboarding" component={Onboarding} options={{header:()=>null}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{header:()=>null}} />
        <Stack.Screen name="SignUp" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} options={{header:()=>null}}/>
        <Stack.Screen name="Sell" component={Sell} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Buy" component={Buy} />
        <Stack.Screen name="Screen1" component={Screen1} options={{ title: 'Electronics' }}/>
        <Stack.Screen name="Screen2" component={Screen2} options={{ title: 'Phones' }}/>
        <Stack.Screen name="Screen3" component={Screen3} options={{ title: 'Art' }}/>
        <Stack.Screen name="Screen4" component={Screen4} options={{ title: 'Cars' }}/>
        <Stack.Screen name="Screen5" component={Screen5} options={{ title: 'Antic' }}/>
        <Stack.Screen name="Screen6" component={Screen6} options={{ title: 'Jewelry' }}/>
        <Stack.Screen name="Screen7" component={Screen7} options={{ title: 'Cookwear' }}/>
        <Stack.Screen name="Screen8" component={Screen8} options={{ title: 'Books' }}/>
        <Stack.Screen name="ModelComponent" component={ModelComponent} />
        <Stack.Screen name="Myauctionview" component={Myauctionview} />
        <Stack.Screen name="Winnerhistory" component={Winnerhistory} />
        <Stack.Screen name="MyAuction" component={MyAuction} />
      </Stack.Navigator>
  );
}

export default AuthStack;