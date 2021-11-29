import React,{useState,useLayoutEffect,useContext,useEffect} from "react";
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    Alert,
    ActivityIndicator,
} from "react-native";

import FormInput from "../components/FormInput";
import FormInputFontAwesome from "../components/FormInputFontAwesome";
import FormButton from "../components/FormButton";
import FormPassword from "../components/FormPassword";
import appbg from "../assests/appbg.png";
import Logo from "../assests/unnamed.jpg";
import Axios from 'axios';
//import Routes from "../navigation/Routes";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
//import {windowWidth,windowHeight} from "../utils/Dimension";

const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [loading, setloading] = useState(1);

  const storeData = async (userids,name,email,phonenumber) => {
    try {
      const storage_Key='Login'
      await AsyncStorage.setItem('storage_Key_Login', storage_Key);
      await AsyncStorage.setItem('userids', userids.toString());
      await AsyncStorage.setItem('names', name);
      await AsyncStorage.setItem('emails', email);
      await AsyncStorage.setItem('phonenumber', phonenumber);
      setloading(1);
    } catch (e) {
      console.log(e);
    }
  }

  const handlePress = () => {
    setloading(0);
    let responses=null;
    let userids=null;
    let user_names=null;
    let user_emails=null;
    let user_phoneNumber=null;
    if (!name) {
      setloading(1);
      Alert.alert('First name is required');
    } else if (!email) {
      setloading(1);
      Alert.alert('Email field is required.');
    } else if (!password) {
      setloading(1);
      Alert.alert('Password field is required.');
    } else if (!confirmPassword) {
      setloading(1);
      //setPassword('');
      Alert.alert('Confirm password field is required.');
    } else if (password !== confirmPassword) {
      setloading(1);
      Alert.alert('Password does not match!');
    } else {
      console.log(email,password);
      try {
        console.log(email,password);
        Axios.post('http://192.168.1.104:5000/api/auth/signup', {
          username:name,
          email: email,
          phonenumber:phoneNumber,
          password:password,
          roles:""
        })
        .then(function (response) {
          console.log(response);
         responses=response.data.status;
          console.log("Hiiiiiiiiiiiiiiiiii",responses);
          try {
            if(responses=='success'){
              console.log("Hiiiiiiiiiiiiiiiiiiiiiiiiiiii");
    
              //navigation.replace("Home");
              Axios.post('http://192.168.1.104:5000/api/auth/signin', {
                email: email,
                password:password,
              })
              .then(function (response) {
                console.log(response);
                userids=response.data.id;
                user_names=response.data.username;
                user_emails=response.data.email;
                user_phoneNumber=response.data.phonenumber;
                console.log(userids,user_names,user_emails,user_phoneNumber);
                storeData(userids,user_names,user_emails,user_phoneNumber);
                Snackbar.show({
                  text: 'Account Successfully create!',
                  backgroundColor:"green",
                  duration: Snackbar.LENGTH_SHORT,
                  action: {
                    textColor: 'black',
                  },
                });
                navigation.replace("Home");
              })
              .catch(function (error) {
                setloading(1);
                Alert.alert('something went wrong');
              });
            }else{
              setloading(1);
              Alert.alert('user is already exists');
            }
          } catch (error) {
            setloading(1);
            Alert.alert(response.data.message);
          }
        })
        .catch(function (error) {
          setloading(1);
          Alert.alert('something went wrong');
        });
      } catch (error) {
        setloading(1);
        Alert.alert('something went wrong');
      }
    }
  };

  if (!loading)
  {
     return(
        <View style={styles.spinner}>
           <ActivityIndicator size="large" color="'#22B5BC" />
        </View>
     )
  }else{
    return (
      <View style={styles.views}>
         <ImageBackground source={appbg} style={styles.image}>
           <ScrollView contentContainerStyle={styles.container}>
             <View> 
               <View style={styles.containers}>
  
                  <FormInputFontAwesome
                      labelValue={name}
                      onChangeText={(userName) => setName(userName)}
                      placeholderText="Name"
                      iconType="user"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                  />

                  <FormInput
                      labelValue={email}
                      onChangeText={(userEmail) => setEmail(userEmail)}
                      placeholderText="Email"
                      iconType="email"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                  />

                 <FormInput
                      labelValue={phoneNumber}
                      onChangeText={(userphoneNumber) => setPhoneNumber(userphoneNumber)}
                      placeholderText="Phone-Number"
                      iconType="phone"
                      keyboardType="phone-pad"
                      autoCapitalize="none"
                      autoCorrect={false}
                  />

                  <FormPassword
                      labelValue={password}
                      onChangeText={(userPassword) => setPassword(userPassword)}
                      placeholderText="Password"
                      iconType="lock"
                  />
                  
                  <FormPassword
                      labelValue={confirmPassword}
                      onChangeText={(userConfirmPassword) => setConfirmPassword(userConfirmPassword)}
                      placeholderText="Confirm-Password"
                      iconType="lock"
                  />     
                  
                  <FormButton
                      buttonTitle="Sign In"
                      onPress={handlePress}
                  />

                  <TouchableOpacity
                    style={styles.navButton}
                    onPress={() => navigation.navigate('Login')}
                    >
                    <Text style={styles.navButtonText}>Have an account? Sign In</Text>
                  </TouchableOpacity>

                  <View style={{justifyContent: 'center',alignItems: 'center',marginTop:20}}>
                          <Image
                          style={styles.logo}
                          source={Logo}
                          />
                  </View>
               </View>
           </View>
          </ScrollView>
         </ImageBackground>     
        </View>
    );
  }
};

export default SignupScreen;

const styles = StyleSheet.create({
  views:{
    flex:1,
    backgroundColor: '#fff',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  containers: {
    flex: 1,
    marginTop:105,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    marginLeft:0
  },
  tinyLogo:{
    width:266,
    height:200,
    marginBottom:50,
  },
  logo:{
    width:266,
    height:90,
    //marginTop:windowHeight-680,
  },
  button: {
    backgroundColor: '#2270BC',
    paddingHorizontal:30,
    paddingVertical:10,
    borderRadius:30,
    marginBottom:100,
  }, 
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
   
  text: {
    fontSize: 15,
    marginBottom: 6,
    color: '#2e64e5', 
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    paddingHorizontal:74
  },
  spinner:{
    flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: "white",
   },
   footer: {
    position: 'absolute',
    flex:0.1,
    left: 0,
    right: 0,
    bottom: -10,
    height:100,
    alignItems:'center',
    marginBottom:20
  },
});