import React,{useState,useEffect} from 'react';
import {FlatList, StyleSheet,TouchableOpacity,Image,View,ActivityIndicator,Text,Dimensions,Alert} from 'react-native';
//import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button,View,Spinner} from 'native-base';
import {articles_url,_api_key,country_code} from "../../api/apiurl_key";
import Axios from 'axios';
import NewsCard from "../../components/NewsCard";
import Model from "../../components/view";
import image3 from "../../assests/world.jpg";
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window')
const URL=`${articles_url}top-headlines?country=${country_code}&category=general&apiKey=${_api_key}`;

const Screen8=({navigation})=>{

  const [details, setDetails] = useState(null);
  const [setModalVisible, setSetModalVisible] = useState(false);
  const [modalArticleData, setModalArticleData] = useState({});
  const [id, setid] = useState(1);

  const handleItemDataOnPress = (articleData) => {
    setSetModalVisible(true);
    setModalArticleData(articleData);
  }

  const handleModalClose = () => {
    setSetModalVisible(false);
    setModalArticleData({});
  }

  const fetchDetails = async (value2) => {
    console.log("iddddddddd",id);
    Axios.post("http://192.168.1.104:5000/api/file/all", {
        category:"Books",
        userid:value2
      })
    .then(function (response) {
      if(response.data.status=="success"){
        const {data} = response.data;
        const details = data;
        setDetails(details)
        console.log(details);
      }else{

      }
    })
    .catch(function (error) {
      console.log(error);
    });
  //   try {
     
  //      const {data} = await Axios.get(URL);
  //      const details = data;

  //      setDetails(details)
  //      console.log(details);

  //   } catch (error) {
  //     console.log(error)
  //   }
   }
   
  useEffect(()=>{
    getData();
  }, [])
   
  const getData = async () => {
    try {
      var value1 = await AsyncStorage.getItem('storage_Key_Login')
      var value2 = await AsyncStorage.getItem('userids')
      var value3 = await AsyncStorage.getItem('names')
      var value4 = await AsyncStorage.getItem('emails')
      var value5 = await AsyncStorage.getItem('phonenumber');
      setid(value2);
      console.log("value2222222",value2);
      fetchDetails(value2);
      // setemail(value4);
      // setphonenumber(value5)
      // console.log(value3);
      // console.log(value4);
    } catch(e) {
      Alert.alert('something went wrong');
  }
}

  const renderItemComponent = (item) =>{
      return(
        <TouchableOpacity>
    <View style={styles.cardView}>
        <Image style={styles.image} source={image3}/>
        <Text style={styles.title}>Product Name:-{item.productname}</Text>
        <Text style={styles.author}>Base Amount:-{item.baseamount}</Text>
        {/* <Image style={styles.image} source = {{uri: item.urlToImage}}/> */}
        <Text note numberOfLines={3} style={styles.description}>Description:-{item.description}</Text>
        <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1,flexWrap:'wrap'}}>
                <Text style={{fontSize: 15,marginLeft:width * 0.020}}>End Date:-{moment(item.date).format('D MMM YYYY')}{"\n"}</Text>
            </View>
            <View>
                <Text style={{textAlign: 'right',fontSize: 15,marginRight:15}}>End Time:-{item.endTimeHour}:{item.endTimeMinute}</Text>
            </View>
        </View>
        <Text style={styles.author}>Published Date:-{item.publisheddate}</Text>
        {/* <Text style={styles.author}>{item.publishedAt} </Text> */}
        {/* <Button transparent onPress={handlePress}>
        <Text style={[styles.author,{color:"#383CC1"}]}>view more...</Text>
        </Button> */}
    </View>
</TouchableOpacity>
      )
  }
 

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log('Five Seconds!');
  //   }, 5000);
  //   fetchDetails()
  //   return ()=> clearInterval(interval);
  // }, []);

  if (!details) {
    return (
      <View style={{alignItems:"center",justifyContent:"center",flex:1}}>
            <ActivityIndicator size="large" color="'#22B5BC" />
      </View>
    )
  }else
  {
    if(details.length==0){
      return(
        <View style={{alignItems:"center",justifyContent:"center",flex:1}}>
            <Text style={{fontSize:30,fontWeight:"bold"}}>No Data</Text>
        </View>
        )
    }else{
      return (
        <View style={styles.container}>
              <FlatList data={details}
                  keyExtractor={(item, index) => 'key' + index}
                  renderItem={({item}) => {
                      return <NewsCard item = {item} onPress={"ModelComponent"} screen={"Screen8"} navigation={navigation}/>
                      // console.log("item",item);
                      // renderItemComponent(item)
                  }}
                  refreshing={details}
                  //onRefresh={this.handleRefresh}
              />
              {/* <Model
                  showModal={setModalVisible}
                  articleData={modalArticleData}
                  onClose={handleModalClose}
              /> */}
        </View>
      );
    }
  }
   
}
export default Screen8;

const styles=StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#E8E8E8"
    },
    cardView: {
      backgroundColor: 'white',
      margin: width * 0.03,
      borderRadius: width * 0.05,
      shadowColor: '#000',
      shadowOffset: { width:0.5, height: 0.5 },
      shadowOpacity: 0.5,
      shadowRadius: 3
  },
  title: {
      marginHorizontal: width * 0.02,
      marginVertical: width * 0.03,
      color: 'black',
      fontSize: 18,
      fontWeight: 'bold'

  },
  description: {
      marginVertical: width * 0.03,
      marginHorizontal: width * 0.02,
      color: 'gray',
      fontSize: 15
  },
  image: {
      height: height / 3.5,
      width:width-25,
      marginLeft: 0,
      marginRight: 0,
      marginTop:0,
      marginBottom: height * 0.02,
      borderTopLeftRadius: width * 0.05,
      borderTopRightRadius:width * 0.05
  },
  author: {
      marginBottom: width * 0.0,
      marginHorizontal: width * 0.02,
      fontSize: 15,
      color: 'gray'
  }
});