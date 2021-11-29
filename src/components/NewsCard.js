import React,{useState} from 'react'
import { View, StyleSheet,Image, Dimensions,TouchableOpacity} from 'react-native';
import {Button,Text} from "native-base";
import image3 from "../assests/world.jpg";
import Published from "./published";
import moment from 'moment';


const { width, height } = Dimensions.get('window')

const NewsCard = ({item,onPress,screen,uid,navigation}) => {
    const opimage=image3;

    //const {url, title} = item

    const handlePress = () => (
       // navigation.replace("Login")
        navigation.navigate(onPress, {
            item:item,
            fornavigation:onPress,
            screen:screen,
            uid:uid
          })
    )

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.cardView}>
                <Image style={styles.image} source={{uri: `http://192.168.1.104:5000/public/data/uploads/fileDatahello${item.name}`,}}/>
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

export default NewsCard;

const styles = StyleSheet.create({
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

})



