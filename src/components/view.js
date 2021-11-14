import React, {useState,useEffect} from 'react';
import { Dimensions,Modal, Share,InteractionManager,View,Text,TextInput,StatusBar,Image,TouchableOpacity, ScrollView,ActivityIndicator, Alert} from 'react-native';
//import {Container, Header, Content, Body, Left, Icon, Right, Title, Button} from 'native-base';
import { WebView } from 'react-native-webview';
import Icons from 'react-native-vector-icons/AntDesign';
import Lightbox from 'react-native-lightbox';
import Styles from '../styles/Styles';
import Colors from '../styles/Colors';
import image3 from "../assests/world.jpg";
import {Header} from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import Axios from 'axios';
import RazorpayCheckout from 'react-native-razorpay';
//import config from '../config/main';

const webViewHeight = Dimensions.get('window').height - 56;

const ModelComponent=({route,navigation})=>{

    const {item,fornavigation,screen}=route.params;
    //console.log(route.params);

    const [bidprice, setbidprice] = useState(0);
    const [items, setitems] = useState({});
    const [loading, setloading] = useState(1);
    const cars = new Array();
    const forids = new Array();
    const [random, setrandom] = useState(0);
    const [is_bideen, setis_bideen] = useState(false);
    const [bids_no, setbids_no] = useState(0);
    const [compare,setcompare]=useState(false);
    const [Enddate, setEnddate] = useState(null);
    const [winneruserid, setwinner] = useState(0);
    const [dom, setdom] = useState({});
    const [dummy, setdummy] = useState("");
    const [newdummy, setnewdummy] = useState(false);
    const [dummyprice, setdummyprice] = useState("");
    let text;
    let max;
    const handleClose = () =>(
        onClose()
    )

    useEffect(() => {
        //setloading(0);
        //const {item} = route.params;
        console.log("random",item);
        const d = new Date();
        console.log(d);
        const c = new Date(item.date);
        console.log(c);
        console.log(c.getFullYear(),c.getMonth(),c.getDate(),item.endTimeHour,item.endTimeMinute,0, 0);
        const ho=item.endTimeHour;
        const mi=item.endTimeMinute;
        const h = new Date(c.getFullYear(),c.getMonth(),c.getDate()+1,ho,mi,0, 0);
        //text = h.toString();
        console.log('x < y', d < h);
        console.log(h);
        //console.log(text);
        const v = new Date(c.getFullYear(),c.getMonth(),c.getDate(),ho,mi,0, 0);
        text = v.toString();
        console.log("v",v);
        setEnddate(text);
        setcompare(d < h);
        if(item){
            try {
                Axios.post("http://192.168.1.104:5000/api/BidProduct/findbid", {
                    productid:item.id,
                  })
                    .then(function (response) {
                      console.log("viiiiiiiiiiiiiiek",response.data.status);
                      console.log("hellllllllllllllllo",response.data.message);
                      setloading(1);
                      if(response.data.status=="success"){
                        //setloading(1);
                        const numbers1=response.data.message
                        if(numbers1.length==0){
                             setis_bideen(false);
                        }else{
                            console.log("setis_bideen");
                            setis_bideen(true);
                            setbids_no(numbers1.length);
                            console.log(numbers1.length);
                        }
                        const numbers2 = numbers1.map(myFunction);
                        const numbers3 = numbers1.map(idmyFunction);
                        numbers1.map(myid)
                        console.log("my",newdummy);
                        console.log(forids);
                        console.log(Math.max(...cars))
                        console.log(cars);
                        max=Math.max(...cars);
                        console.log(cars.indexOf(Math.max(...cars)));
                        console.log(forids[cars.indexOf(Math.max(...cars))]);
                        setwinner(forids[cars.indexOf(Math.max(...cars))]);
                        setrandom(Math.max(...cars));
                        if(!(d < h)){
                            Axios.post('http://192.168.1.104:5000/api/BidProduct/findwinnerid', {
                                userid:forids[cars.indexOf(Math.max(...cars))]
                              })
                              .then(function (response) {
                                //console.log(response);
                                if(response.data.status=="success"){
                                    const dom=response.data.data[0];
                                    setdom(dom);
                                    console.log(dom.id,item.id,item.productname,max.toString(),h,dom.username);
                                    Axios.post('http://192.168.1.104:5000/api/BidProduct/Winnerdetalis', {
                                        userid:dom.id,
                                        productid:item.id,
                                        bidproductname:item.productname,
                                        soldamount:max.toString(),
                                        solddate:h,
                                        winnername:dom.username
                                      })
                                      .then(function (response) {
                                        console.log("Winner",response.data.status);
                                      })
                                      .catch(function (error) {
                                        console.log(error);
                                      });
                                }
                              })
                              .catch(function (error) {
                                console.log(error);
                              });
                        }
                        setloading(1);
                      }else{
    
                      }
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
              } catch (error) {
                console.log("Hello",error);
              }
        }else{

        }
        //const {item}=articleData;
        //setloading(1)
    }, []);

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
          Bidproduct()
        }).catch((error) => {
          // handle failure
          alert(`Error: ${error.code} | ${error.description}`);
        });
      }
    

    function myFunction(value, index, array) {
        var b = parseInt(value.bidamount);
        //var c = parseInt(value.userid);
        //console.log("array",b);
        // var a=0;
        // if(b>a){
        //     b=a;
        //     console.log("array",a);
        // }
        cars.push(b);
       // forids.push(c);

        //console.log(Math.max(b));
        return cars;
     }

     function myid(value, index, array){
         if(value.userid==item.userid){
            setnewdummy(true)
            setdummyprice(value.bidamount)
         }
     }

     function idmyFunction(value, index, array) {
       
        var c = parseInt(value.userid);
        //console.log("array",b);
        // var a=0;
        // if(b>a){
        //     b=a;
        //     console.log("array",a);
        // }
       
        forids.push(c);

        //console.log(Math.max(b));
        return forids;
     }
    const first=(item)=>{
        try {
            Axios.post("http://192.168.1.104:5000/api/BidProduct/findbid", {
                productid:item.id,
              })
                .then(function (response) {
                  console.log("viiiiiiiiiiiiiiek",response.data.message);
                  if(response.data.status=="success"){
                    setloading(0);
                  }else{

                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
          } catch (error) {
            console.log("Hello",error);
          }
    }

    const handleShare = () => {
        const {item} = articleData;
        // const message = `${title}\n\nRead More ${url}\n\nShared via sgpRNNewsApp`;
        // return Share.share(
        //     {title, message, url: message},
        //     {dialogTitle:`Share ${title}`}
        // );
    }

    const Bidproduct=()=>{
        setloading(0);
        //const {item} = articleData;
        console.log(item.userid,item.id,item.productname,bidprice,new Date().toLocaleString(),item.category);
        try {
            Axios.post("http://192.168.1.104:5000/api/BidProduct/bid", {
                userid:item.userid,
                productid:item.id,
                bidproductname:item.productname,
                bidamount:bidprice,
                biddate:new Date().toLocaleString(),
                isbidden:"true",
                bidcategory:item.category,
              })
                .then(function (response) {
                    if(response.data.status=="success"){
                        setbidprice(0);
                        Alert.alert("Your bid is counted");
                        navigation.replace(screen)
                        setloading(1);
                    }
                })
                .catch(function (error) {
                  console.log(error);
                  setloading(1);
                });
          } catch (error) {
            console.log("Hello",error);
            setloading(1);
          }
    }
    //const {item} = route.params;
      return(
         
    (!loading) ? 
        <View style={styles.spinner}>
            <ActivityIndicator size="large" color="#00ff00" />
        </View>
    :
    <ScrollView style={styles.container}>
            {/* <Header
                statusBarProps={{ barStyle: 'light-content' }}
                barStyle="light-content"
                placement="left"
                centerComponent={{ text: 'Home', style: { color: 'black',fontWeight:'bold',fontSize:20 } }}
                leftComponent={<TouchableOpacity onPress={()=>handleClose()}>
                                    <Icons name="closecircle" size={30} color="black" />
                                </TouchableOpacity>}
                rightComponent={<TouchableOpacity>
                                    <Icon name="share" size={30} color="black" />
                                </TouchableOpacity>}
                containerStyle={{
                    backgroundColor: 'white',
                    justifyContent: 'space-around',
                }}
            /> */}
                    
                    {/* <StatusBar backgroundColor={colors.accent} /> */}
                    
                    <View style={[styles.bodys]}>
                        {true ? (
                        <View>
                           <View style={{alignItems:"center",justifyContent:"center"}}>
                            <Text style={[styles.title,{fontSize:20}]}>
                                {item.productname}
                            </Text>
                            </View>
                            <View style={styles.padView}>
                            <Lightbox
                                underlayColor="white"
                                backgroundColor={colors.darkTransparent}
                               // navigator={this.props.navigator}
                            >
                                <View style={styles.center}>
                                <Image
                                    style={styles.image}
                                    source={{uri: `http://192.168.1.104:5000/public/data/uploads/fileDatahello${item.name}`,}}
                                />
                                </View>
                            </Lightbox>
                           
                            </View>
                            <View>
                            <Text>
                                <Text style={styles.label}>
                                {'\n'}
                                Initial price
                                </Text>{' '}
                                {item.baseamount}
                            </Text>
                            {is_bideen ? (
                                <Text style={styles.padTop}>
                                <Text style={styles.label}>Was bidden</Text> &nbsp;
                                {bids_no}
                                </Text>
                            ) : (
                                <Text style={styles.mute}>No any bid yet</Text>
                            )}
                            {is_bideen ? (
                                <Text style={styles.padTop}>
                                <Text style={styles.label}>Highest bid price</Text> &nbsp;
                                   {random}
                                </Text>
                            ) : (
                                <Text style={styles.mute}>Not yet bidden</Text>
                            )}
                            <Text style={styles.padTop}>
                                <Text style={styles.label}>
                                {false ? 'Ended on' : 'Will end on'}
                                </Text>{' '}
                                &nbsp;
                                <Text>{Enddate}/</Text>
                                &nbsp;&nbsp;&nbsp;
                            </Text>
                            <Text>{'\n' + item.description}</Text>
                            </View>
                            <View>

                            {/*Bid Form*/}
                            {compare ? (
                               <>
                                
                                {newdummy ? (
                                     <> 
                                     <View style={styles.center}>
                                        <Text style={styles.title}>You Have already bid for this Product</Text>
                                    </View>
                                    <View style={styles.center}>
                                        <Text>You Bidding is:{dummyprice} Rupees</Text>
                                    </View>
                                     </>
                                ):(
                                    <>
                                                    <View style={styles.center}>
                                            <Text style={styles.title}>Bid this product in Ruppes</Text>
                                        </View>
                                                <View>
                                            <View style={styles.formLabel}>
                                                <Text style={styles.labelText}>
                                                {}
                                                </Text>
                                            </View>
                                            <View style={{borderColor:"balck",borderWidth:5}}>
                                            {/* <TextInput
                                                style={styles.formInputText}
                                                keyboardType="numeric"
                                                placeholder={
                                                'Enter your price... Min(' +
                                                item.baseamount +
                                                ')'
                                                }
                                                underlineColorAndroid={colors.transparent}
                                                // onChangeText={price => {
                                                // this.setState({ price: price });
                                                // }}
                                                //value={this.state.price}
                                                autoCorrect={false}
                                                returnKeyType="go"
                                                ref="1"
                                            // onSubmitEditing={() => this.sendBid()}
                                            /> */}
                                                <TextInput
                                                    style={[styles.formInputText]}
                                                    placeholder={
                                                        'Enter your price'
                                                    }
                                                    keyboardType="numeric"
                                                    underlineColorAndroid={colors.transparent}
                                                    onChangeText={bidprice => {
                                                    setdummy((parseFloat(bidprice)*1).toString())
                                                    setbidprice(bidprice);
                                                    }}
                                                    value={bidprice}
                                                    autoCorrect={false}
                                                    returnKeyType="next"
                                                    //ref="2"
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.formRowButtons}>
                                            {true ? (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    forpayment()
                                                }}
                                                style={styles.buttonTouchForm}
                                                underlayColor={colors.accent}
                                            >
                                                <View style={styles.button}>
                                                <Text style={styles.buttonText}>
                                                    Bid this product
                                                </Text>
                                                </View>
                                            </TouchableOpacity>
                                            ) : null}
                                        </View>
                                    </>
                                )}
                                
                               </>
                            ) : (
                                <>
                                      <View style={styles.center}>
                                            <Text style={styles.title}>Bid End</Text>
                                            <Text style={styles.padTop}>
                                                <Text style={styles.label}>Winner Name:</Text> &nbsp;
                                                    {dom.username}
                                            </Text>
                                            <Text style={styles.padTop}>
                                                <Text style={styles.label}>Sold Amount:</Text> &nbsp;
                                                    {random}
                                            </Text>
                                            <Text style={styles.padTop}>
                                                <Text style={styles.label}>Email:</Text> &nbsp;
                                                    {dom.email}
                                            </Text>
                                      </View>
                                </>
                            )}
                           
                            {/* {this.state.responseMsg ? (
                                <View style={styles.statusText}>
                                <Text style={{ color: this.state.statusColor }}>
                                    {this.state.responseMsg}
                                </Text>
                                </View>
                            ) : null}
                            {this.state.successStatus ? (
                                <View style={styles.statusText}>
                                <Text style={styles.success}>
                                    {this.state.successStatus}
                                </Text>
                                </View>
                            ) : null} */}
                            
                            </View>
                        </View>
                        ) : (
                        // <View style={styles.loadBar}>
                        //     <Text style={styles.white}>
                        //     {this.state.networkResponse
                        //         ? this.state.networkResponse
                        //         : 'Loading...'}
                        //     </Text>
                        // </View>
                        null
                        )}
                    </View>
                    
                </ScrollView>

 
);
    
    // if (!loading)
    // {
    // //    return(
    // //       <View style={styles.spinner}>
    // //          <ActivityIndicator size="large" color="'#22B5BC" />
    // //       </View>
    // //    )
    // return(
    //         <Modal
    //         animationType="slide"
    //         transparent
    //         visible={showModal}
    //         onRequestClose={handleClose}
    //         >
    //             <ScrollView style={styles.container}>
    //             <Header
    //                 statusBarProps={{ barStyle: 'light-content' }}
    //                 barStyle="light-content"
    //                 placement="left"
    //                 centerComponent={{ text: 'Home', style: { color: 'black',fontWeight:'bold',fontSize:20 } }}
    //                 leftComponent={<TouchableOpacity>
    //                                     <Icons name="closecircle" size={30} color="black" />
    //                                 </TouchableOpacity>}
    //                 rightComponent={<TouchableOpacity>
    //                                     <Icon name="share" size={30} color="black" />
    //                                 </TouchableOpacity>}
    //                 containerStyle={{
    //                     backgroundColor: 'white',
    //                     justifyContent: 'space-around',
    //                 }}
    //             />
                        
    //                     {/* <StatusBar backgroundColor={colors.accent} /> */}
                        
    //                     <View style={[styles.bodys]}>
    //                         <ActivityIndicator size="large" color="'#22B5BC" />
    //                     </View>
                        
    //                 </ScrollView>
    //         </Modal>
    //     )

    // }else{
    // const {item} = route.params;
    //  if(item!=undefined)
    //  {
    //     return(
    //     <Modal
    //     animationType="slide"
    //     transparent
    //     visible={showModal}
    //     onRequestClose={handleClose}
    //     >
            
    //     </Modal>
    //     )
    //  }else{
    //      return null;
    //  }
    // }

}

const styles = Styles;
const colors = Colors;
export default ModelComponent;