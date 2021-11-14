import React, {useState,useEffect } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Text,
  View,
  StatusBar,
  TextInput,
  DatePickerAndroid,
  TimePickerAndroid,
  TouchableWithoutFeedback,
  //NetInfo,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
  Alert
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Styles from '../styles/Styles';
import Colors from '../styles/Colors';
import Axios from 'axios';
//import ImagePicker from 'react-native-image-picker';
import Lightbox from 'react-native-lightbox';
import RazorpayCheckout from 'react-native-razorpay';
import pick from './picker';
import {
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import { color } from 'react-native-elements/dist/helpers';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import Snackbar from 'react-native-snackbar';


const AuctionSell=({navigation})=>{

    const [productName, setproductName] = useState('');
    const [price, setprice] = useState('');
    const [description, setdescription] = useState('');
    const [auctionEndDate, setauctionEndDate] = useState(null);
    const [endDateText, setendDateText] = useState('Select auction end date ...');
    const [endTimeHour, setendTimeHour] = useState(null);
    const [auctionEndTime, setauctionEndTime] = useState(null);
    const [endTimeMinute, setendTimeMinute] = useState(null);
    const [endTimeText, setendTimeText] = useState('Select auction end time ...');
    const [pictureSource, setpictureSource] = useState(null);
    const [picture, setpicture] = useState(null);
    const [traffic, settraffic] = useState(0);
    const [statusColor, setstatusColor] = useState('green');
    const [successStatus, setsuccessStatus] = useState('');
    const [isConnected, setisConnected] = useState(null);
    const [responseMsg, setresponseMsg] = useState('');
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [resourcePath, setresourcePath] = useState({});
    const [filePath, setFilePath] = useState("https://www.google.com/url?sa=i&url=https%3A%2F%2Fzapier.com%2Fblog%2Fbest-url-shorteners%2F&psig=AOvVaw37ZP_eMq24SeJi6tosYzJo&ust=1634551648479000&source=images&cd=vfe&ved=0CAgQjRxqFwoTCMC6-8WZ0fMCFQAAAAAdAAAAABAD");
    const [random, setrandom] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [useridpro,setuseridpro]=useState(null);
    const [endd, setendd] = useState(null);
    const [endt, setendt] = useState(null);
    const [cate, setcate]= useState(null);
    const [loading, setloading] = useState(1);
    const [dummy, setdummy] = useState("");

    const SERVER_URL = 'http://192.168.1.104:5000';
    //endDate: new Date(),
    const countries = ["Egypt", "Canada", "Australia", "Ireland"]
    const data = [
      {label: 'Electronics', value: '1'},
      {label: 'Phones', value: '2'},
      {label: 'Art', value: '3'},
      {label: 'Cars', value: '4'},
      {label: 'Antic', value: '5'},
      {label: 'Jewelry', value: '6'},
      {label: 'Cookwear', value: '7'},
      {label: 'Books', value: '8'},
  ];

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      var value1 = await AsyncStorage.getItem('storage_Key_Login')
      var value2 = await AsyncStorage.getItem('userids')
      var value3 = await AsyncStorage.getItem('names')
      var value4 = await AsyncStorage.getItem('emails')
      var value5 = await AsyncStorage.getItem('phonenumber');
      setuseridpro(value2);
      console.log(value2);
      // console.log(value3);
      // console.log(value4);
    } catch(e) {
      Alert.alert('something went wrong');
    }
  }

  const forpayment=()=>{
    console.log(dummy);
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_GHw1rT7R9HPOWU',
      amount:dummy,
      name: 'Auction Company',
      prefill: {
        email: 'void@razorpay.com',
        contact: '9191919191',
        name: 'Razorpay Software'
      },
      theme: {color: '#F37254'}
    }
      RazorpayCheckout.open(options).then((data) => {
      // handle success
      //alert(`Success: ${data.razorpay_payment_id}`);
      validate()
    }).catch((error) => {
      // handle failure
      alert(`Error: ${error.code} | ${error.description}`);
    });
  }

  const [dropdown, setDropdown] = useState(null);
        const [selected, setSelected] = useState([]);

        const _renderItem = item => {
            return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
            </View>
            );
        };
        

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || new Date();
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        console.log("datesssssssssssss",selectedDate);
        var month_ = currentDate.getMonth() + 1;
        var unixDate = currentDate.getFullYear() + '-' + month_ + '-' + currentDate.getDate();
        var day_ = currentDate.getDate() + 1;
        var unixDate_ = currentDate.getFullYear() + '-' + month_ + '-' + day_;
        var datetext=currentDate.toDateString();
        console.log(unixDate,unixDate_,datetext);
        setendDateText(datetext);
        setendd(selectedDate);
        console.log("timessssssssssssssssss",currentDate.getHours());
      };

      const onChangeTime = (event, selectedDate) => {
        const currentDate = selectedDate || new Date();
        setShow(Platform.OS === 'ios');
        var hour=currentDate.getHours();
        var minutes=currentDate.getMinutes();
        setendTimeText(formatTime(hour,minutes));
        console.log(formatTime(hour,minutes));
      };
    
      const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
    
      const showDatepicker = () => {
        showMode('date');
      };
    
      const showTimepicker = () => {
        showMode('time');
      };

      const formatTime=(hour, minute)=>{
        setendTimeHour(hour);
        setendTimeMinute((minute < 10 ? '0' + minute : minute));
        return hour + ':' + (minute < 10 ? '0' + minute : minute);
      }

      const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.CAMERA,
              {
                title: 'Camera Permission',
                message: 'App needs camera permission',
              },
            );
            // If CAMERA Permission is granted
            return granted === PermissionsAndroid.RESULTS.GRANTED;
          } catch (err) {
            console.warn(err);
            return false;
          }
        } else return true;
      };

      const requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: 'External Storage Write Permission',
                message: 'App needs write permission',
              },
            );
            // If WRITE_EXTERNAL_STORAGE Permission is granted
            return granted === PermissionsAndroid.RESULTS.GRANTED;
          } catch (err) {
            console.warn(err);
            alert('Write permission err', err);
          }
          return false;
        } else return true;
      };

      const captureImage = async (type) => {
        let options = {
          mediaType: type,
          maxWidth: 300,
          maxHeight: 550,
          quality: 1,
          videoQuality: 'low',
          durationLimit: 30, //Video max duration in seconds
          saveToPhotos: true,
        };
        let isCameraPermitted = await requestCameraPermission();
        let isStoragePermitted = await requestExternalWritePermission();
        if (isCameraPermitted && isStoragePermitted) {
          launchCamera(options, (response) => {
            console.log('Response = ', response);
    
            if (response.didCancel) {
              alert('User cancelled camera picker');
              return;
            } else if (response.errorCode == 'camera_unavailable') {
              alert('Camera not available on device');
              return;
            } else if (response.errorCode == 'permission') {
              alert('Permission not satisfied');
              return;
            } else if (response.errorCode == 'others') {
              alert(response.errorMessage);
              return;
            }
            console.log('base64 -> ', response.base64);
            console.log('uri -> ', response.uri);
            console.log('width -> ', response.width);
            console.log('height -> ', response.height);
            console.log('fileSize -> ', response.fileSize);
            console.log('type -> ', response.type);
            console.log('fileName -> ', response.fileName);
            setFilePath(response);
          });
        }
      };
      
      const chooseFile = (type) => {
        console.log("newasdd",type);
        let options = {
          title: 'Select Image',
          storageOptions: {
            skipBackup: true,
            path: 'images'
          },
          // mediaType: type,
          // maxWidth: 300,
          // maxHeight: 550,
          // quality: 1,
        };
        launchImageLibrary(options, (response) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            alert('User cancelled camera picker');
            return;
          } else if (response.errorCode == 'camera_unavailable') {
            alert('Camera not available on device');
            return;
          } else if (response.errorCode == 'permission') {
            alert('Permission not satisfied');
            return;
          } else if (response.errorCode == 'others') {
            alert(response.errorMessage);
            return;
          }
          setPhoto(response);

          console.log('User selected a file form camera or gallery', response); 
          // const data = new FormData();
          // data.append("vivek", 'test')
          // data.append('fileData', {
          //   uri : response.assets[0].uri,
          //   type: response.assets[0].type,
          //   name: response.assets[0].fileName
          // });

          // console.log('Data', JSON.stringify(data));
          // const config = {
          //   method: 'POST',
          //   headers: {
          //   'Accept': 'application/json',
          //   'Content-Type': 'multipart/form-data',
          //   },
          //   body: data,
          // };
          // fetch("http://192.168.1.104:5000/api/file/upload", config)
          // .then((checkStatusAndGetJSONResponse)=>{       
          //   console.log(checkStatusAndGetJSONResponse);
          // }).catch((err)=>{console.log(err)});
          // if(data){
          //   Axios.post("http://192.168.1.104:5000/api/file/upload",data
          //   // {
          //   //   body: data,
          //   // }
          //   )
          //   .then(function (response) {
          //     console.log("viiiiiiiiiiiiiiek",response);
          //   })
          //   .catch(function (error) {
          //     console.log(error);
          //   });
          // }
          // console.log('User selected a file form camera or gallery', response); 
          // const data = new FormData();
          // data.append('name', 'avatar');
          // data.append('fileData', {
          //   type: response.type,
          //   name: response.fileName,
          //   uri : response.uri,
          // });
          // const config = {
          //   method: 'POST',
          //   headers: {
          //   'Accept': 'application/json',
          //   'Content-Type': 'multipart/form-data',
          //   },
          //   body: data,
          // };
          // fetch("http://192.168.1.104:5000/" + "upload", config)
          // .then((checkStatusAndGetJSONResponse)=>{       
          //   console.log(checkStatusAndGetJSONResponse);
          // }).catch((err)=>{console.log(err)});
          // const data = new FormData();
          // Axios.post("http://192.168.1.104:5000/api/file/upload", {
          //   type: response.type,
          //   name: response.fileName,
          //   data : null,
          // })
          // .then(function (response) {
          //   console.log(response);
          // })
          // .catch(function (error) {
          //   console.log(error);
          // });

          // data.append('response', {
          //   name: response.fileName,
          //   type: response.type,
          //   uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
          // });

          // Object.keys(body).forEach((key) => {
          //   data.append(key, body[key]);
          // });


          // fetch(`${SERVER_URL}/api/upload`, {
          //   method: 'POST',
          //   body: createFormData(photo, { userId: '123' }),
          // })
          //   .then((response) => response.json())
          //   .then((response) => {
          //     console.log('response', response);
          //   })
          //   .catch((error) => {
          //     console.log('error', error);
          //   });


          // console.log('User selected a file form camera or gallery', response); 
          // const data = new FormData();
          // data.append('name', 'avatar');
          // data.append('fileData', {
          //   uri : response.uri,
          //   type: response.type,
          //   name: response.fileName
          // });

          // Axios.post('/user', {
          //   firstName: 'Fred',
          //   lastName: 'Flintstone'
          // })
          // .then(function (response) {
          //   console.log(response);
          // })
          // .catch(function (error) {
          //   console.log(error);
          // });
        
          // const config = {
          //   method: 'POST',
          //   headers: {
          //   'Accept': 'application/json',
          //   'Content-Type': 'multipart/form-data',
          //   },
          //   body: data,
          // };
          // fetch("http://localhost:3000/" + "api/auth/upload", config)
          // .then((checkStatusAndGetJSONResponse)=>{       
          //   console.log(checkStatusAndGetJSONResponse);
          // }).catch((err)=>{console.log(err)});

          // Axios.post('http://192.168.1.104:5000/api/auth/upload', {
          //   body: data,
          // })
          // .then(function (response) {
          //   console.log(response);
          // })
          // .catch(function (error) {
          //   console.log(error);
          // });
        
          //handleUploadPhoto(response)
          // console.log('base64 -> ', response.base64);
          // console.log('uri -> ', response.uri);
          // console.log('width -> ', response.width);
          // console.log('height -> ', response.height);
          // console.log('fileSize -> ', response.fileSize);
          // console.log('type -> ', response.type);
          // console.log('fileName -> ', response.fileName);
           setFilePath(response.assets[0].uri);
          // console.log(response.assets[0].uri);
          setrandom(true);
        });
      };
    
      const handleUploadPhoto = (photo) => {
        // fetch(`${SERVER_URL}/api/upload`, {
        //   method: 'POST',
        //   body: createFormData(response, { userId: '123' }),
        // })
        //   .then((response) => response.json())
        //   .then((response) => {
        //     console.log('response', response);
        //   })
        //   .catch((error) => {
        //     console.log('error', error);
        //   });
        console.log("reeeeeeeeeeeees",photo);

          Axios.post("http://192.168.1.104:5000/api/upload", {
            body: createFormData(photo, { userId: '123' }),
          })
          .then(function (photo) {
            console.log(photo);
          })
          .catch(function (error) {
            console.log("vivek",error);
          });
        
      };


      const createFormData = (photo, body = {}) => {
        const data = new FormData();

        data.append('photo', {
          name: photo.fileName,
          type: photo.type,
          uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
        });

        Object.keys(body).forEach((key) => {
          data.append(key, body[key]);
        });
        console.log("daaaaaaaaaaaaaaaaaaaaaaaa",data);

        return data;
      };



    const validate=()=> {
      setloading(0);
      // if (
      //   productName == '' ||
      //   auctionEndTime == null ||
      //   auctionEndDate == null ||
      //   //picture == null ||
      //   price == '' ||
      //   description == ''
      // ) {
      //   setresponseMsg('Please fill all the required (*)');
      //   setstatusColor('red');
      //   return false;
      // } else if (
      //   /[^a-zA-Z0-9 ]/.test(productName) ||
      //    productName.length < 5
      // ) {
      //   setresponseMsg('Please enter valid product name');
      //   setstatusColor('red');
      //   return false;
      // } else if (
      //   /[^a-zA-Z0-9 ]/.test(description) ||
      //    description.length < 5
      // ) {
      //   setresponseMsg('Please enter valid product description');
      //   setstatusColor('red');
      //   return false;
      // } else if (
      //   /[^0-9]/.test(price) ||
      //   parseInt(price) < 500
      // ) {
      //   setresponseMsg('Please enter valid product description');
      //   setstatusColor('red');
      //   return false;
      // } else {
      //   setresponseMsg('Please enter valid product description');
      //   setstatusColor('red');
      //   settraffic(1);
      //   return true;
      // }
      // console.log("ready");
      console.log(useridpro,productName,price,endd,endTimeText,endTimeHour,endTimeMinute,cate,description);
      console.log(endd);
      const data = new FormData();
          data.append("userid", useridpro)
          data.append("productname", productName)
          data.append("baseamount", price)
          data.append("date", endd.toLocaleString())
          data.append("time", endTimeText)
          data.append("endTimeHour", endTimeHour)
          data.append("endTimeMinute", endTimeMinute)
          data.append("publisheddate", new Date().toLocaleString())
          data.append("category", cate)
          data.append("description", description)
          data.append('fileData', {
            uri : photo.assets[0].uri,
            type: photo.assets[0].type,
            name: photo.assets[0].fileName
      });

      console.log('Data', JSON.stringify(data));

      if(data){
        Axios.post("http://192.168.1.104:5000/api/file/upload",data
        // {
        //   body: data,
        // }
        )
        .then(function (response) {
          console.log("viiiiiiiiiiiiiiek",response);
          Snackbar.show({
            text: 'Product Successfully Add!',
            backgroundColor:"green",
            duration: Snackbar.LENGTH_SHORT,
            action: {
              textColor: 'black',
            },
          });
          navigation.replace("Home");
          setloading(1);
        })
        .catch(function (error) {
          console.log(error);
        });
      }

      // try {
      //   Axios.post("http://192.168.1.104:5000/api/auth/addproduct", {
      //     userid:useridpro,
      //     productname:productName,
      //     baseamount:price ,
      //     date:endd,
      //     time:endTimeText,
      //     endTimeHour:endTimeHour,
      //     endTimeMinute:endTimeMinute,
      //     publisheddate:new Date().toLocaleString(),
      //     category:cate,
      //     description:description,
      //     imageid:1,
      //     imagename:"vivek",
      //     })
      //       .then(function (response) {
      //         console.log("viiiiiiiiiiiiiiek",response);
      //         if(response.data.status=="success"){
      //           Alert.alert('Product Successfully Add');
      //             navigation.replace("Home");
      //             setloading(1);
      //         }else{
      //           Alert.alert('Something went wrong');
      //           setloading(1);
      //         }
      //       })
      //       .catch(function (error) {
      //         Alert.alert('Something went wrong');
      //         setloading(1);
      //       });
      // } catch (error) {
      //   Alert.alert('Something went wrong');
      //   setloading(1);
      // }
      //setloading(1);
    }

    let img = filePath == null ? null : (
      <Lightbox
        underlayColor="white"
        backgroundColor={colors.darkTransparent}
        //navigator={navigator}
      >
        <View style={styles.center}>
          <Image source={{uri: filePath}} style={styles.image} />
        </View>
      </Lightbox>
    );

    return(

      (!loading) ?
        <View style={{alignItems:"center",justifyContent:"center",flex:1}}>
            <ActivityIndicator size="large" color="'#22B5BC" />
        </View>
        :
        <ScrollView style={styles.container}>
          <StatusBar backgroundColor={colors.accent} />
          {/* {!isConnected ? (
            <View style={styles.loadBar}>
              <Text style={styles.white}>Please check your Internet! </Text>
            </View>
          ) : null} */}
          <View style={styles.body}>
            <View style={styles.form}>
              <View style={[styles.formRow]}>
                <View style={styles.formLabel}>
                  <Text style={styles.labelText}>
                    <Icon name="md-person" size={20} />
                  </Text>
                </View>
                <View style={styles.formInputControl}>
                  <TextInput
                    style={styles.formInputText}
                    placeholder="Product name..."
                    underlineColorAndroid={colors.transparent}
                    onChangeText={product => {
                        setproductName(product);
                    }}
                    value={productName}
                    autoCorrect={false}
                    returnKeyType="next"
                    //ref="1"
                    // onSubmitEditing={() => {
                    //   this.focusNextField('2');
                    // }}
                  />
                </View>
              </View>
              <View style={[styles.formRow]}>
                <View style={styles.formLabel}>
                  <Text style={styles.labelText}>
                    <Icon name="ios-pricetag" size={20} />
                  </Text>
                </View>
                <View style={styles.formInputControl}>
                  <TextInput
                    style={styles.formInputText}
                    placeholder="Minimal price..."
                    keyboardType="numeric"
                    underlineColorAndroid={colors.transparent}
                    onChangeText={price => {
                      setdummy((parseFloat(price)*2).toString())
                      setprice(price);
                    }}
                    value={price}
                    autoCorrect={false}
                    returnKeyType="next"
                    //ref="2"
                  />
                </View>
              </View>
              <View style={[styles.formRow]}>
                <View style={styles.formLabel}>
                  <Text style={styles.labelText}>
                    <Icon name="md-calendar" size={20} />
                  </Text>
                </View>
                <View style={styles.formInputControl}>
                  <TouchableWithoutFeedback
                    onPress={showDatepicker}
                    // onPress={this.showDatePicker.bind(this, 'end', {
                    //   date: this.state.endDate,
                    //   minDate: Date.now() + 172800000,
                    //   maxDate: Date.now() + 62208000000
                    // })}
                  >
                    <View>
                      <Text style={{ paddingTop: 15, paddingBottom: 15 }}>
                        {endDateText}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
              <View style={[styles.formRow]}>
                <View style={styles.formLabel}>
                  <Text style={styles.labelText}>
                    <Icon1 name="clock" size={20} />
                  </Text>
                </View>
                <View style={styles.formInputControl}>
                  <TouchableWithoutFeedback
                    onPress={showTimepicker}
                    // onPress={this.showTimePickers.bind(this, 'endTime', {
                    //   hour: this.state.endTimeHour,
                    //   minute: this.state.endTimeMinute,
                    //   is24Hour: true
                    // })}
                  >
                    <View>
                      <Text style={{ paddingTop: 15, paddingBottom: 15 }}>
                        {endTimeText}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
                {show && mode == 'date' && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    minimumDate={Date.now() + 172800000}
                    maximumDate={Date.now() + 62208000000}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    />
                )}
                {show && mode == 'time' && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChangeTime}
                    />
                )}
              </View>
              <TouchableHighlight
                style={[styles.formButton]}
                onPress={() => chooseFile('photo')}
                underlayColor={colors.transparent}
              >
                <View>
                  <View style={styles.photoSelect}>
                    <Icon style={styles.labelText} name="md-image" size={20} />
                    <Text style={styles.photoSelectText}>
                      Add a photo of your product
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
              {random ? <View style={styles.imgHolder}>{img}</View> : null}
              <View style={[styles.formRow]}>
                <View style={styles.formLabel}>
                  <Text style={styles.labelText}>
                    <Icon2 name="category" size={20} />
                  </Text>
                </View>
                <View style={styles.formInputControl}>
               
                <Dropdown
                    style={styles.dropdown}
                    containerStyle={styles.shadow}
                    data={data}
                    search
                    searchPlaceholder="Search"
                    labelField="label"
                    valueField="value"
                    label="Dropdown"
                    placeholder="Select item"
                    value={dropdown}
                    onChange={item => {
                    setDropdown(item.value);
                        console.log('selected', item.label);
                        setcate(item.label);
                    }}
                    // renderLeftIcon={() => (
                    //   <Icon style={styles.icon} name='arrow-redo-sharp' />
                    //     // <Image style={styles.icon} source={require('./assets/account.png')} />
                    // )}
                    renderItem={item => _renderItem(item)}
                    textError="Error"
                />

                </View>
              </View>
              <View style={[styles.formRow]}>
                <View style={styles.formLabelDescription}>
                  <Text style={styles.labelText}>
                    <Icon name="md-information-circle" size={20} />
                  </Text>
                </View>
                <View style={styles.formInputControl}>
                  <TextInput
                    style={styles.formInputTextArea}
                    multiline={true}
                    placeholder="Description..."
                    underlineColorAndroid={colors.transparent}
                    onChangeText={description => {
                      setdescription(description);
                    }}
                    value={description}
                    autoCorrect={false}
                    returnKeyType="go"
                    // onSubmitEditing={() => {
                    //   this.sendData();
                    // }}
                    numberOfLines={8}
                  />
                </View>
              </View>
              {responseMsg ? (
                <View style={styles.statusText}>
                  <Text style={{ color: statusColor }}>
                    {responseMsg}
                  </Text>
                </View>
              ) : null}
              {successStatus ? (
                <View style={styles.statusText}>
                  <Text style={styles.success}>{successStatus}</Text>
                </View>
              ) : null}
             <View style={styles.formRowButtons}>
                {traffic == 0 ? (
                  <TouchableHighlight
                    style={styles.buttonTouch}
                    onPress={() => {
                      forpayment();
                    }}
                    underlayColor={colors.accent}
                  >
                    <View style={styles.button}>
                      <Text style={styles.buttonText}>PAYMENT</Text>
                    </View>
                  </TouchableHighlight>
                ) : null}
              </View>
              {/* <View style={styles.formRowButtons}>
                {traffic == 0 ? (
                  <TouchableHighlight
                    style={styles.buttonTouch}
                    onPress={() => {
                      validate();
                    }}
                    underlayColor={colors.accent}
                  >
                    <View style={styles.button}>
                      <Text style={styles.buttonText}>Sell product</Text>
                    </View>
                  </TouchableHighlight>
                ) : null}
              </View> */}
            </View>
          </View>
        </ScrollView>
    );
}

const styles = Styles;
const colors = Colors;


export default AuctionSell;