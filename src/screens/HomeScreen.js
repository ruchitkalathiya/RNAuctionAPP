import React,  { useState,useEffect,useContext } from 'react';
import { StyleSheet,ImageBackground, ScrollView, Image, Text, View, TouchableOpacity, Dimensions,Alert,BackHandler,TouchableHighlight} from 'react-native';
import appbg from "../assests/appbg.png";
import Logo from "../assests/text2.jpg";
import {Header} from "react-native-elements";
import Icon from "react-native-vector-icons/Entypo";
import Icon1 from "react-native-vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';
//import * as Font from 'expo-font';

 const HomeScreen=({navigation}) => {

  const [active, setactive] = useState(0);
  //console.log("width");
  // let currentUserUID = firebase.auth().currentUser.uid;
  const [firstName, setFirstName] = useState('');
  const [fontsLoaded, setFontsLoaded] = useState(false);


  const imageslider = [
    'https://www.conceptzhomeandproperty.com/wp-content/uploads/2021/06/istockphoto-917901978-612x612-1.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Microcosm_of_London_Plate_006_-_Auction_Room%2C_Christie%27s_%28colour%29.jpg/1200px-Microcosm_of_London_Plate_006_-_Auction_Room%2C_Christie%27s_%28colour%29.jpg',
    'https://lh3.googleusercontent.com/proxy/tMkNGo8f2I0PlUd0bvMW_OK20lr06MGrOct3EBJhvRSwl6zAJ4vQuSaE3HIbn_mkQIjP2F_BuhmJqoherzxINAjpBjku5kyW3eU8BGysI5B3Rwa7LtuRUg52NjKf1CP6dw',  
]

  const { width } = Dimensions.get("window");
  const height = width * 0.6; //60%

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'YES', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
     }, [])


  const handlePress = () => {
    removeValue();
    navigation.replace("Login");
  };

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('storage_Key_Login')
      await AsyncStorage.removeItem('userids')
      await AsyncStorage.removeItem('names')
      await AsyncStorage.removeItem('emails')
      await AsyncStorage.removeItem('phonenumber')
    } catch(e) {
      console.log(e);
    }
  }

    // useEffect(() => {
    //   getData();
    //   const backAction = () => {
    //     Alert.alert('Hold on!', 'Are you sure you want to exit?', [
    //       {
    //         text: 'Cancel',
    //         onPress: () => null,
    //         style: 'cancel',
    //       },
    //       { text: 'YES', onPress: () => BackHandler.exitApp() },
    //     ]);
    //     return true;
    //   };
  
    //   const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
  
    //   return () => backHandler.remove();
    //    }, [])


  return (
    <View style={styles.container}>

    <Header
    statusBarProps={{ barStyle: 'light-content' }}
    barStyle="light-content"
    placement="left"
    centerComponent={{ text: 'Home', style: { color: 'black',fontWeight:'bold',fontSize:20 } }}
    rightComponent={<TouchableOpacity onPress={handlePress}>
                        <Icon name="log-out" size={30} color="black" />
                    </TouchableOpacity>}
    containerStyle={{
        backgroundColor: 'white',
        justifyContent: 'space-around',
    }}
    />

      <ImageBackground source={appbg} style={styles.image}>
      <ScrollView style={styles.scrollArea}>
      
      <View style={styles.logocenter}>
      
        <Image
          style={styles.logo}
          source={Logo}
        />
     
      
      </View>
      
{/* 
      ++++++++++++++++++++++++++++++++++++++++++
      Image Slider
      ++++++++++++++++++++++++++++++++++++++++++ */}

      <ScrollView 
      paddingEnabled 
      horizontal 
      // onScroll={change()}
      showsHorizontalScrollIndicator={false}
      style={{width, height}}>
         

      {
        imageslider.map((imageslider,index) => (
          <Image
          key={index}
          style={{ width, height, resizeMode:'contain',borderRadius:35, }}
          source={{uri:imageslider}}
        />
        ))
      }
    </ScrollView>


    {/* 
      ++++++++++++++++++++++++++++++++++++++++++
      Image Slider End
      ++++++++++++++++++++++++++++++++++++++++++ */}
      
    {/* <View style={{flexDirection:'row', position:'absolute',  alignSelf:'center'}}>
      {
        imageslider.map((i,k) => (
          <Text key={k} style={k == active ? {fontSize:(width/30), color:'#888',} : {fontSize:(width / 30), color:'#222',}}>⬤</Text>
        ))
      }
     
    </View> */}



{/* 
      ++++++++++++++++++++++++++++++++++++++++++
     First Cat Section Start
      ++++++++++++++++++++++++++++++++++++++++++ */}





    <View style={{marginTop:20, marginLeft:10}}>
      <Text style={[styles.headingText,{color:'#4F216C',fontWeight: "bold",paddingTop:5}]}>Category</Text>
    </View>
    <View style={styles.container_content}>
        <ScrollView
        showsVerticalScrollIndicator={false}
        >

            <View style={styles.container_home}>
                <View style={styles.home_section}>
                    <TouchableOpacity 
                      onPress={() =>
                        navigation.navigate("Screen1")
                        }
                        >
                        <View style={styles.inner}>
                            <Image
                                style={styles.home_image_cat}
                                source={require('../assests/electronics.jpg')}/>
                            <Text style={styles.text_p}>Electronics</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.home_section}>
                    <TouchableOpacity 
                     onPress={() =>
                      navigation.navigate("Screen2")
                      }
                      >
                        <View style={styles.inner}>
                            <Image
                                style={styles.home_image_cat}
                                source={require('../assests/phones.jpg')}/>
                            <Text style={styles.text_p}>Phones</Text>
                        </View>
                    </TouchableOpacity>
                </View>


                <View style={styles.home_section}>
                    <TouchableOpacity 
                     onPress={() =>
                        navigation.navigate("Screen3")
                        }
                      >
                        <View style={styles.inner}>
                            <Image
                                style={styles.home_image_cat}
                                source={require('../assests/art.jpg')}/>
                            <Text style={styles.text_p}>Art</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.home_section}>
                    <TouchableOpacity 
                    onPress={() =>
                        navigation.navigate("Screen4")
                        }
                      >
                        <View style={styles.inner}>
                            <Image
                                style={styles.home_image_cat}
                                source={require('../assests/carsss.png')}/>
                            <Text style={styles.text_p}>Cars</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.home_section}>
                    <TouchableOpacity 
                    onPress={() =>
                        navigation.navigate("Screen5")
                        }
                        >
                        <View style={styles.inner}>
                            <Image
                                style={styles.home_image_cat}
                                source={require('../assests/antic.jpg')}/>
                            <Text style={styles.text_p}>Antic</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.home_section}>
                    <TouchableOpacity 
                     onPress={() =>
                        navigation.navigate("Screen6")
                        }
                        >
                        <View style={styles.inner}>
                            <Image
                                style={styles.home_image_cat}
                                source={require('../assests/jewelry.jpg')}/>
                            <Text style={styles.text_p}>Jewelry</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.home_section}>
                    <TouchableOpacity
                     onPress={() =>
                        navigation.navigate("Screen7")
                        }>
                        <View style={styles.inner}>
                            <Image
                                style={styles.home_image_cat}
                                source={require('../assests/cookwear.jpg')}/>
                            <Text style={styles.text_p}>Cookwear</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.home_section}>
                    <TouchableOpacity
                     onPress={() =>
                        navigation.navigate("Screen8")
                        }>
                        <View style={styles.inner}>
                            <Image
                                style={styles.home_image_cat}
                                source={require('../assests/books.jpg')}/>
                            <Text style={styles.text_p}>Books</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.home_section}>
                    <TouchableOpacity 
                    //   onPress={() =>
                    //     navigation.navigate("FindSkillsthatPay", {paramKey:"FindSkillsthatPay"})
                    //  }
                     >
                        <View style={styles.inner}>
                            <Image
                                style={styles.home_image_cat}
                                source={require('../assests/others.png')}/>
                            <Text style={styles.text_p}>Others</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>

        </ScrollView>
    </View>


{/* 
      ++++++++++++++++++++++++++++++++++++++++++
       First Cat Section End
      ++++++++++++++++++++++++++++++++++++++++++ */}





      
{/* 
      ++++++++++++++++++++++++++++++++++++++++++
     Second Cat Section Start
      ++++++++++++++++++++++++++++++++++++++++++ */}




{/* <   View style={{ marginLeft:10}}>
      <Text style={[styles.headingText,{color:'#4F216C',fontWeight: "bold",paddingTop:5}]}>Quiz Materials</Text>
    </View>
    <View style={styles.container_content}>
        <ScrollView
        showsVerticalScrollIndicator={false}
        >

            <View style={styles.container_home}>
                <View style={styles.home_section}>
                    <TouchableOpacity 
                    //   onPress={() =>
                    //     navigation.navigate("Personality Quiz")
                    //     }
                        >
                        <View style={styles.inner}>
                            <Image
                                style={styles.home_image_cat}
                                source={{uri:'https://jdwebservices.com/img/careenengine1/home_image/personality.png'}}/>
                            <Text style={styles.text_p}>Personality & Career Quiz</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.home_section}>
                    <TouchableOpacity 
                    //  onPress={() =>
                    //   navigation.navigate("ListofQuantitativeQuiz")
                    //   }
                      >
                        <View style={styles.inner}>
                            <Image
                                style={styles.home_image_cat}
                                source={{uri:'https://jdwebservices.com/img/careenengine1/home_image/quiz_banner.png'}}/>
                            <Text style={styles.text_p}>Quantitative Tests for Govt. Exams</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

        </ScrollView>
    </View> */}


    </ScrollView>

    <View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.bottomButtons} onPress={() => navigation.navigate('Sell')}>
            <View style={{ justifyContent: 'center',alignItems: 'center',}}>
                <Icon1 name="ios-pricetag" size={30} color="black"  />
                <Text style={styles.footerText}>Sell</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomButtons} onPress={() => navigation.navigate('Buy')}>
            <View style={{ justifyContent: 'center',alignItems: 'center',}}>
                <Icon1 name="ios-pricetag-sharp" size={30} color="black" />
                <Text style={styles.footerText}>Bid</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomButtons} onPress={() => navigation.navigate('MyAuction')}>
            <View style={{ justifyContent: 'center',alignItems: 'center',}}>
                <Icon1 name="ios-pricetags-sharp" size={30} color="black" />
                <Text style={styles.footerText}>My Auction</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomButtons} onPress={() => navigation.navigate('Profile')}>
            <View style={{ justifyContent: 'center',alignItems: 'center',}}>
                <Icon1 name="person-circle-sharp" size={30} color="black" />
                <Text style={styles.footerText}>Profile</Text>
            </View>
          </TouchableOpacity>
        </View>
    </View>
  </ImageBackground>     
    </View>

  );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    logo:{
        justifyContent: 'center',
        alignItems: 'center',
        width:180,
        height:55,
        marginTop:15,
        marginBottom:10,
    },
    logocenter: {
        justifyContent: 'center', 
        alignItems: 'center',
     },
    image_section: {
        width: '100%',
        height:150,
    },
    container_home:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding:5,
        backgroundColor:'#fff',
        height:'auto',
    },
    home_section1: {
        width:150,
        height: 150,
        padding: 5,
    },
    home_section: {
        width: '50%',
        height: '50%',
        padding: 5,
    },
    scrollView1:{
        margin: 10,
    },
    inner: {
        flex:1, 
    },
    home_image: {
        width:'100%',
        height:150,
    },
//  home_image_cat: {
//   width:'100%',
//   height:100,
//   borderRadius:8,
// },
    home_text: {
        textAlign:'center',
        color:'#4F216C',
        fontWeight: "bold",
        paddingTop:5,
        marginBottom:25,
    },
    home_text1: {
        color:'#4F216C',
        fontWeight: "bold",
        paddingTop:5,
        paddingBottom:15,
        fontSize:18
    },
    home_text3: {
        color:'#222',
        paddingTop:5,
        marginRight:5,
        marginBottom:10,
    },
    headingText: 
    {
        fontSize: 18, 
        marginLeft:0, 
        marginTop:10
    },
    container: 
    { 
        flex: 1, 
        backgroundColor: 'white',
    },
    container_content:{
        margin:15
    },
    container_home:{
        width:'100%',
        flexWrap:'wrap',
        flexDirection:'row',
    },
    TextHead: 
    {
        fontSize:30,
        fontWeight:'bold',
        color: '#780294',
        paddingBottom:20,
        paddingTop:20,
    },
    link:{
        color:'#ff6e69'
    },
    text_p: 
    {
        fontSize:13,
        color: '#222',
        marginTop:10,
        marginBottom:10,
        fontWeight:'bold'
    },
    alignCenterText: {
        justifyContent:'center',
        alignItems:'center',
    },
    home_section1: {
        width:150,
        height: 40,
        margin: 5,
    },
    inner: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    home_text: {
        textAlign:'center',
        color:'#fff',
        paddingTop:10,
        paddingBottom:10,
        fontSize:12,
        fontWeight: "bold",
    },
    home_text_black: {
        color:'#222',
        paddingTop:10,
        paddingBottom:10,
        fontSize:16,
        fontWeight: "bold",
    },
    home_image_cat: {
        width:"100%",
        height:150,
        borderRadius:18,
    },
    coverletter: {
        width:"100%",
        height:170,
    },
    home_section: {
        width: '50%',
        height: 'auto',
        padding: 5,  
    },
    link:{
      color:"#0000FF"
    },
    footer: {
        position: 'absolute',
        flex:0.1,
        left: 0,
        right: 0,
        bottom: -10,
        backgroundColor:'white',
        flexDirection:'row',
        height:80,
        alignItems:'center',
        justifyContent: 'center',
      },
      bottomButtons: {
        alignItems:'center',
        justifyContent: 'center',
        flex:1,
      },
      footerText: {
        color:'black',
        fontWeight:'bold',
        alignItems:'center',
        fontSize:16,
      },
      
});
export default HomeScreen;