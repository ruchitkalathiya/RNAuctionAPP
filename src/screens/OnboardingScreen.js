import React,{useEffect} from "react";
import {
    Text,
    View,
    Image,
    Button,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

import Onboarding from 'react-native-onboarding-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OnboardingScreen= ({navigation}) => {

  useEffect(() => {
    storeData();
  }, []);

  const storeData = async () => {
    try {
      const storage_Key='true';
      await AsyncStorage.setItem('storage_Key_OnboardingScreen', storage_Key);
    } catch (e) {
      console.log(e);
    }
  }

  const skip=({...props})=>(
    <TouchableOpacity
      style={{marginHorizontal:10}}
      {...props}>
        <Text style={{fontSize:16}}>Skip</Text>
    </TouchableOpacity>
  )

  const Next=({...props})=>(
    <TouchableOpacity
      style={{marginHorizontal:10}}
      {...props}>
        <Text style={{fontSize:16}}>Next</Text>
    </TouchableOpacity>
  )

  const Done=({...props})=>(
    <TouchableOpacity
      style={{marginHorizontal:10}}
      {...props}>
        <Text style={{fontSize:16}}>Done</Text>
    </TouchableOpacity>
  )

  const Dots=({selected})=>{
    let backgroundColor;

    backgroundColor=selected?"rgba(0,0,0,0.8)":"rgba(0,0,0,0.3)";

    return(
          <View style={{width:5,height:5,marginHorizontal:3,backgroundColor}}/>
    );

  }

     return(
        <Onboarding
        SkipButtonComponent={skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onSkip={()=>navigation.replace("Login")}
        onDone={()=>navigation.replace("Login")}
        pages={[
          {
            backgroundColor: '#FFFFFF',
            image: <Image source={require("../assests/boarding8.jpg")} style={styles.forimage}/>,
            title: 'WELCOME TO AUCTION APP',
            subtitle: 'One stop place to buy and sell',
          },
          {
            backgroundColor: '#FFFFFF',
            image: <Image source={require('../assests/boarding7.jpg')} style={styles.forimage2}/>,
            title: 'ONLINE AUCTION',
            subtitle: 'Bid Online for collectable and need dimmer thing',
          },
          {
            backgroundColor: '#FFFFFF',
            image: <Image source={require('../assests/boarding1.jpg')} style={styles.forimage3}/>,
            title: 'PRIVATE AUCTION',
            subtitle: 'Organise your private auction whatever you want',
          },
        ]}
      />
     );
};

export default OnboardingScreen;

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:'center',
    },
    forimage:{
      height:350,
      width:350,
    },
    forimage2:{
      height:350,
      width:400,
    },
    forimage3:{
      height:350,
      width:350,
    }
});