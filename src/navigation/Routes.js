import React,{useState,useEffect,useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator
} from 'react-native';

import {NavigationContainer} from "@react-navigation/native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Routes = () => {
   
  const [value, setvalue] = useState(null);
  const [Onboarding, setOnboarding] = useState(null);
  const [loading, setloading] = useState(0);
  
    useEffect(() => {
      getData();
    }, []);

  const getData = async () => {
      try {
        const hello = await AsyncStorage.getItem('storage_Key_Login');
        const hello1 = await AsyncStorage.getItem('storage_Key_OnboardingScreen');
        setvalue(hello);
        setOnboarding(hello1);
        setloading(1)
      } catch(e) {
        // error reading value
      }
  }

  if (!loading)
  {
     return(
        <View style={style.spinner}>
           <ActivityIndicator size="large" color="'#22B5BC" />
        </View>
     )
  }else{
    if(value) {
        return(
            <NavigationContainer>
                <AuthStack routeName="Home"/>
            </NavigationContainer>
        );
    }else{
      if(Onboarding){
        return(
          <NavigationContainer>
              <AuthStack routeName="Login"/>
          </NavigationContainer>
        );
      }else{
        return(
          <NavigationContainer>
              <AuthStack routeName="Onboarding"/>
          </NavigationContainer>
        );
      }
    }
  }
    

};

export default Routes;

const style=StyleSheet.create({
    spinner:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white",
      },
})
  
//     return (
//       <NavigationContainer>
//         {value ? <AppStack /> : <AuthStack />}
//       </NavigationContainer>
//     );
// };

// export default Routes;