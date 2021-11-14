import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView,View,TouchableOpacity,ActivityIndicator,Alert,BackHandler,Image,Linking} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import profileimage from "../assests/profile.png"

const Profile=({navigation})=>{

   const [indexvar, setindexvar] = useState(1);
   const [loading, setloading] = useState(false);
   const [userids, setUserids] = useState(0);
   const [name, setname] = useState('');
   const [email, setemail] = useState('');
   const [phonenumber, setphonenumber] = useState('');
   
   useEffect(() => {
    getData();
    const backAction = () => {
      navigation.push("Home");
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
   }, []);

   const handlePress = () => {
    //loggingOut();
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

  const getData = async () => {
    try {
      var value1 = await AsyncStorage.getItem('storage_Key_Login')
      var value2 = await AsyncStorage.getItem('userids')
      var value3 = await AsyncStorage.getItem('names')
      var value4 = await AsyncStorage.getItem('emails')
      var value5 = await AsyncStorage.getItem('phonenumber');
      setname(value3);
      setemail(value4);
      setphonenumber(value5);
      setUserids(value2);
      // console.log(value3);
      // console.log(value4);
    } catch(e) {
      Alert.alert('something went wrong');
    }
}

   
  if (!indexvar)
  {
     return(
        <View style={styles.spinner}>
           <ActivityIndicator size="large" color="'#22B5BC" />
        </View>
     )
  }else{
   return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
            <View style={{justifyContent: 'center',alignItems: 'center'}}>
                <Image
                    style={styles.logo}
                    source={profileimage}
                /> 
                <Text style={[styles.textStyleForlist,{fontWeight:'bold', fontSize:22,marginTop:20,marginBottom:8,}]}>{name}</Text>  
                <Text style={[styles.textStyleForlist,{fontWeight:'bold'}]}>Email : {email}</Text>   
                <Text style={[styles.textStyleForlist,{fontWeight:'bold'}]}>Phonenumber : {phonenumber}</Text>
            </View>

  
           <View style={{marginTop:60}}>
              <TouchableOpacity style={styles.buttoncontainer}>
                  <Text style={[styles.textStyleForlist,{fontWeight:'bold',color:'#0645AD',fontSize:18}]}>Visit Our Website</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttoncontainer} onPress={()=>navigation.navigate('Winnerhistory', {
                    userid:userids
              })}>
                  <Text style={[styles.textStyleForlist,{fontWeight:'bold',color:'#0645AD',fontSize:18}]}>Auction History</Text>
              </TouchableOpacity>
           </View>

           <View style={{marginTop:35,justifyContent: 'center',alignItems: 'center'}}>
                <Text style={[styles.textStyleForlist,{fontWeight:'bold',fontSize:20,marginTop:20,marginBottom:8,}]}>Follow us</Text>
           </View>

           <View style={{justifyContent: 'center',alignItems: 'center',flexDirection: 'row'}}>
                <Icon style={{marginRight:20}} name="instagram-square" size={30} color="black" />
                <Icon style={{marginRight:20}} name="facebook-square" size={30} color="black" />
                <Icon style={{marginRight:20}} name="twitter-square" size={30} color="black" />
                <Icon style={{marginRight:20}} name="linkedin" size={30} color="black" />
           </View>

  
        </ScrollView>
        <View style={styles.footer}>
           <TouchableOpacity style={styles.bottomButtons} 
           onPress={() => handlePress()}>
                 <Text style={styles.footerText}>Sign Out</Text>
             </TouchableOpacity>
             </View>
      </SafeAreaView>
   );
  }
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor:"white",
  },
  spinner:{
   flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white",
  },
  scrollView: {
    backgroundColor:"white",
  },
  footer: {
    position: 'absolute',
    flex:0.1,
    left: 0,
    right: 0,
    bottom: -10,
    backgroundColor:'white',
    height:90,
    alignItems:'center',
  },
  bottomButtons: {
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#2e64e5', 
    color:'#222', 
    padding:20,
    width:'100%',
    marginTop:6
 },
 footerText: {
    color:'#222',
    fontWeight:'bold',
    alignItems:'center',
    fontSize:18,
 },
 textStyleForlist:{
    color:'#222',
    opacity:1
 },
 buttoncontainer:{
    borderTopWidth: 1,
    borderRadius: 3,
    borderTopColor: '#ddd',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    padding:15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#E5E5E5'
},
logo:{
    width:130,
    height:130,
    marginTop:40
  },
});
