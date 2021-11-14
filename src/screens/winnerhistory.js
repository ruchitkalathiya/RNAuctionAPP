import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView,View,TouchableHighlight,FlatList,ActivityIndicator,TouchableOpacity,BackHandler,Alert} from 'react-native';
import _ from "lodash";
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';  
import moment from 'moment';
import { Card } from 'react-native-elements';


const Winnerhistory=({route,navigation})=>{

  //const {name,email}=route.params;
  const {userid}=route.params;

    const [ columns, setColumns ] = useState([
        "examnames",
        "examscores",
        //"examdates",
      ])

      const [direction, setDirection ] = useState(null);
      const [selectedColumn, setSelectedColumn ] = useState(null);
      const [indexvar, setindexvar] = useState(0);
      const [listData, setListData] = useState([]);
      //const [userid, setuserid] = useState('');
      var columnsname=null;

      useEffect(() => {
        fetchQuestions();
        const backAction = () => {
          navigation.push("Profile");
          return true;
        };
    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    
        return () => backHandler.remove();
      }, []);

      const getData = async () => {
        try {
          var value1 = await AsyncStorage.getItem('userids')
          setuserid(value1);
          console.log(value1);
        } catch(e) {
          // error reading value
        }
    }

    const fetchQuestions = async () => {
        var fortable=null;
        var randomObject=null;
        var random=[];
        try {
            Axios.post('http://192.168.1.104:5000/api/BidProduct/WinnerdetalisProfile', {
            userid: userid
          })
          .then(function (response) {
            fortable=response.data.data;
            //const {examname,examscore,examdate}=fortable;
            //console.log("fortable",examname,examscore,examdate);
            fortable.map((column, index) =>{
              //console.log("fortable",column);
              const {bidproductname,soldamount,solddate}=column;
              randomObject={
                examnames:bidproductname,
                examscores:parseInt(soldamount),
                examdates:solddate
              }
              //console.log("fortable",typeof randomObject.examnames,typeof randomObject.examscores,typeof randomObject.examdates);
              random.push(randomObject);
            })
            //console.log("fortable",random);
            setListData(random);
            setindexvar(1);
          })
          .catch(function (error) {
            Alert.alert('something went wrong');
          });
        } catch (error) {
          Alert.alert('something went wrong');
        }
    }

    const sortTable = (column) => {
        const newDirection = direction === "desc" ? "asc" : "desc" 
        const sortedData = _.orderBy(listData, [column],[newDirection])
        setSelectedColumn(column)
        setDirection(newDirection)
        setListData(sortedData)
      }
    
      const tableHeader = () => (
        <View style={styles.tableHeader}>
          {
            columns.map((column, index) => {
              {
                if(index==0){
                  columnsname="Product-Name";
                }else if(index==1){
                  columnsname="Sold-Amount"
                }
                
                return (
                  <TouchableOpacity 
                    key={index}
                    style={styles.columnHeader} 
                    onPress={()=> sortTable(column)}>
                    <Text style={styles.columnHeaderTxt}>{columnsname + " "} 
                      { selectedColumn === column && <Icon
                          name={direction === "desc" ? "arrow-down-drop-circle" : "arrow-up-drop-circle"}  size={15}
                        />
                      }
                    </Text>
                  </TouchableOpacity>
                )
              }
            })
          }
        </View>
      )

    if (!indexvar)
    {
       return(
          <View style={styles.spinner}>
             <ActivityIndicator size="large" color="'#22B5BC" />
          </View>
       )
    }else{
      if(!(listData.length==0)){
        return (
          <SafeAreaView style={styles.container}>
            <View style={styles.containers}>
                          <FlatList 
                              data={listData}
                              style={{width:"98%"}}
                              keyExtractor={(item, index) => index+""}
                              ListHeaderComponent={tableHeader}
                              stickyHeaderIndices={[0]}
                              renderItem={({item, index})=> {
                              return (
                                  // <View style={{...styles.tableRow, backgroundColor: index % 2 == 1 ? "#c1e1ec" : "white"}}>
                                  // <Text style={{...styles.columnRowTxtename, fontWeight:"bold"}}>{item.examname}</Text>
                                  // <Text style={styles.columnRowTxtescore}>{item.examscore}</Text>
                                  // <Text style={styles.columnRowTxtedate}>{moment(item.examdate).format('MM/DD/YYYY h:mm a')}</Text>
                                  // </View>
                                  <View style={{marginBottom:10}}>
                                      <View style={[styles.buttoncontainer,{backgroundColor: index % 2 == 1 ? "#c1e1ec" : "white"}]}>
                                      <View style={{flex: 1, flexDirection: 'row'}}>
                                            <View style={{flex: 1,flexWrap:'wrap'}}>
                                              <Text style={{fontSize: 15}}>{item.examnames}{"\n"}<Text style={{fontSize:11}}>{moment(item.examdates).format('MM/DD/YYYY h:mm a')}</Text></Text>
                                            </View>
                                            <View>
                                              <Text style={{textAlign: 'right',lineHeight:30,fontSize: 22,fontWeight:'bold'}}>{item.examscores}</Text>
                                            </View>
                                      </View>
                                          {/* <View style={{flex: 1, flexDirection: 'row'}}>
                                            <View style={{flex: 1}}>
                                              <Text style={{fontWeight:'bold',fontSize: 14}}>Exam-Score:-{item.examscores}</Text>
                                            </View>
                                            <View style={{flex: 1}}>
                                              <Text style={{textAlign: 'right'}}>{moment(item.examdates).format('MM/DD/YYYY h:mm a')}</Text>
                                            </View>
                                        </View> */}
                                      </View>
                                  </View>
                              )
                              }}
                          />
                  </View>
          </SafeAreaView>
        );
      }else{
        return(
            <SafeAreaView style={styles.container}>
              <View style={styles.containers}>
                  <Text style={{fontWeight:'bold',fontSize: 18}}>Data Not Available</Text>
              </View>
          </SafeAreaView>
        );
      }
    }
}

export default Winnerhistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor:"white",
    paddingTop:10,
  },
  containers: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    spinner:{
        flex: 1,
         justifyContent: 'center',
         alignItems: 'center',
         backgroundColor: "white",
       },
       tableHeader: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "#2e64e5",
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        height: 50
      },
      tableRow: {
        flexDirection: "row",
        height: 50,
        alignItems:"center",
      },
      columnHeader: {
        width: "35%",
        justifyContent: "center",
        alignItems:"center"
      },
      columnHeaderTxt: {
        color: "white",
        fontWeight: "bold",
      },
      columnRowTxtename: {
        width:"55%",
        textAlign:"center",
        justifyContent: "space-evenly",
      },
      columnRowTxtescore: {
        width:"5%",
        //textAlign:"center",
        justifyContent: "space-evenly",
      },
      columnRowTxtedate: {
        width:"52%",
        //textAlign:"center",
        justifyContent: "space-evenly",
      },
      paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
      },
      buttoncontainer:{
        borderWidth: 5,
        borderRadius: 3,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        padding:15,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

// import React from "react";
// import {View,Text} from "react-native";

// const Winnerhistory=({route,navigation})=>{

//     const {userid}=route.params;
//     return(
//         <View>
//             <Text>vivek</Text>
//         </View>
//     )
// }

// export default Winnerhistory;