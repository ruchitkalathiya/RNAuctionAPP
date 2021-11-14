import React,{useState,useEffect,useContext} from "react";
import {
    Text,
    Image,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    View,
    Alert,
    ActivityIndicator,
    BackHandler
} from "react-native";


import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import SocialButton from "../components/SocialButton";
import FormPassword from "../components/FormPassword";
import { windowHeight } from "../utils/Dimension";
import Logo from "../assests/logo.png";
import fblogin from "../assests/fblogin.png";
import appbg from "../assests/appbg.png";
import anew from "../assests/anew1.jpg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import Logo1 from "../assests/unnamed.jpg";
import {Header} from "react-native-elements";
import Snackbar from 'react-native-snackbar';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
//import {Header} from "react-native-elements";


const LoginScreen=({navigation})=>{
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setloading] = useState(1);
    const [user, setUser] = useState(null);
   

    useEffect(() => {
      GoogleSignin.configure({
        //scopes: ['https://www.googleapis.com/auth/drive.readonly'], // [Android] what API you want to access on behalf of the user, default is email and profile
        webClientId: '629940716137-6tq9rhgqq77gdc1fqfsp3isq5o7gfc2o.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        forceConsentPrompt: true,
        forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      });

     // isSignedIn();
    }, []);

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

    // const signIn = async () => {
    //   try {
    //     await GoogleSignin.hasPlayServices();
    //     console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
    //     const userInfo = await GoogleSignin.signIn();
    //     console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
    //     setUser(userInfo);
    //     console.log("Hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",userInfo);
    //   } catch (error) {
    //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //       // user cancelled the login flow
    //     } else if (error.code === statusCodes.IN_PROGRESS) {
    //       // operation (e.g. sign in) is in progress already
    //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //       // play services not available or outdated
    //     } else {
    //       // some other error happened
    //     }
    //   }
    // };

    const googlesignIn = async () => {
      try {
        await GoogleSignin.hasPlayServices();
        console.log("*************8888");
        const userInfo = await GoogleSignin.signIn();
        console.log(userInfo);
        this.setState({ userInfo });
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
        } else {
          // some other error happened
          console.log("hello");
        }
      }
      // try {
      //   // Get the users ID token
      //   const { idToken } = await GoogleSignin.signIn();

      //   // Create a Google credential with the token
      //   const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      //   console.log(googleCredential);
      //   // Sign-in the user with the credential
      //   //await auth().signInWithCredential(googleCredential)
      // } catch(error) {
      //   console.log({error});
      // }
      // try {
      //   await GoogleSignin.hasPlayServices();
      //   const userInfo = await GoogleSignin.signIn();
      //   setUser(userInfo);
      // } catch (error) {
      //   if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      //     // when user cancels sign in process,
      //     Alert.alert('Process Cancelled');
      //   } else if (error.code === statusCodes.IN_PROGRESS) {
      //     // when in progress already
      //     Alert.alert('Process in progress');
      //   } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      //     // when play services not available
      //     Alert.alert('Play services are not available');
      //   } else {
      //     // some other error
      //     Alert.alert('Something else went wrong... ', error.toString());
      //     //setError(error);
      //     console.log(error);
      //   }
      // }
    //   try {
    //     await GoogleSignin.hasPlayServices();
    //     const userInfo = await GoogleSignin.signIn();
    //     // this.setState({ userInfo, error: null });
    //     Alert.alert("success:" + JSON.stringify(userInfo));

    // } catch (error) {
    //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //         // sign in was cancelled
    //         Alert.alert('cancelled');
    //     } else if (error.code === statusCodes.IN_PROGRESS) {
    //         // operation in progress already
    //         Alert.alert('in progress');
    //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //         Alert.alert('play services not available or outdated');
    //     } else {
    //         Alert.alert('Something went wrong', error.toString());
    //     }
    // }
    };

    const isSignedIn = async () => {
      const isSignedIn = await GoogleSignin.isSignedIn();
      if(!!isSignedIn){
        getCurrentUserInfo()
      }else{
        console.log('login');
      }
    };    

    const getCurrentUserInfo = async () => {
      try {
        const userInfo = await GoogleSignin.signInSilently();
        setUser(userInfo);
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_REQUIRED) {
          // user has not signed in yet
        } else {
          // some other error
        }
      }
    };

    const handlePress = () => {
      setloading(0);
      let responses=null;
      let userids=null;
      let user_names=null;
      let user_emails=null;
      let user_phoneNumber=null;
      if (!email) {
        setloading(1);
        Alert.alert('Email field is required.');
      }
  
      if (!password) {
        setloading(1);
        Alert.alert('Password field is required.');
      }
  
     try {
      Axios.post('http://192.168.1.104:5000/api/auth/signin', {
        email: email,
        password:password,
      })
      .then(function (response) {
        console.log(response);
        responses=response.data.status;
        console.log(responses);
        
       try {
        if(responses=='success'){
          userids=response.data.id;
          user_names=response.data.username;
          user_emails=response.data.email;
          user_phoneNumber=response.data.phonenumber;
          console.log(userids,user_names,user_emails,user_phoneNumber);
          storeData(userids,user_names,user_emails,user_phoneNumber);
          Snackbar.show({
            text: 'Login Successfully!',
            duration: Snackbar.LENGTH_INDEFINITE,
            action: {
              textColor: 'green',
            },
          });
          navigation.replace("Home");
        }else{
          setEmail('');
          setPassword('');
          setloading(1);
          Alert.alert('user not found');
        }
       } catch (error) {
         setloading(1);
         Alert.alert('something went wrong');
       }
      })
      .catch(function (error) {
        setloading(1);
        Alert.alert(error);
      });
     } catch (error) {
       setloading(1);
       Alert.alert('something went wrong');
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
              <Header
                     statusBarProps={{ barStyle: 'light-content' }}
                     barStyle="light-content"
                     placement="left"
                     leftComponent={{ text:'Login', style: { color: 'black',fontWeight:'bold',fontSize:20,marginLeft:20 } }}
                     containerStyle={{
                        backgroundColor: 'white',
                           justifyContent: 'space-around',
                     }}
               />
        <ImageBackground source={appbg} style={styles.image}> 
        <ScrollView contentContainerStyle={styles.container}>
          <View>
             <View style={styles.containers}>
              <Image
                style={styles.tinyLogo}
                source={fblogin}
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

              <FormPassword
                  labelValue={password}
                  onChangeText={(userPassword) => setPassword(userPassword)}
                  placeholderText="Password"
                  iconType="lock"
              />     
              
              <FormButton
                  buttonTitle="Sign In"
                  onPress={handlePress}
              />

              <TouchableOpacity style={styles.forgotButton}>
                  <Text style={styles.text}>Forgot Password?</Text>
              </TouchableOpacity>

              <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                {/* <SocialButton
                  buttonTitle="Facebook"
                  btnType="facebook-square"
                  color="#4867aa"
                  backgroundColor="#e6eaf4"
                  //onPress={loginWithFacebook}
                /> */}
      
                <SocialButton
                  buttonTitle="Sign In with Google"
                  btnType="google"
                  color="#de4d41"
                  backgroundColor="#f5e7ea"
                  onPress={googlesignIn}
              />
              </View>

              <TouchableOpacity
                  style={styles.forgotButton}
                  onPress={() => navigation.navigate('SignUp')}
                  >
                  <Text style={styles.navButtonText}>
                      Don't have an acount? Create one here
                  </Text>
              </TouchableOpacity>
              <View style={{justifyContent: 'center',alignItems: 'center',marginTop:20}}>
                          <Image
                          style={styles.logo}
                          source={Logo1}
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

export default LoginScreen;

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
    justifyContent: 'center',
    alignItems: 'center',
  },
  tinyLogo:{
    width:266,
    height:200,
    marginBottom:15,
  },
  logo:{
    width:250,
    height:80,
    //marginTop:30
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
     marginTop: 1,
   },
  forgotButton: {
    marginTop:15,
    marginBottom: 10,
   },
  navButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#2e64e5',
    paddingHorizontal:40,
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