import React from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import {windowHeight,windowWidth} from "../utils/Dimension";
import Icon from "react-native-vector-icons/AntDesign";

const SocialButton=({buttonTitle,btnType,color,backgroundColor,...rest})=>{

    let bgColor=backgroundColor;
     return(
         <TouchableOpacity style={[styles.buttonContainer,{backgroundColor:bgColor}]} {...rest}>
             <View style={styles.iconWrapper}>
             <Icon name={btnType} size={22} color="black" style={styles.icon}/>
             </View>
             <View style={styles.btnTxtWrapper}>
                <Text style={[styles.buttonText,{color:color}]} >{buttonTitle}</Text>
             </View>
         </TouchableOpacity>
     );
};

export default SocialButton;

const styles = StyleSheet.create({
    buttonContainer: {
      marginTop: 10,
      width: '80%',
      height: windowHeight / 15,
      padding: 7,
      flexDirection: 'row',
      borderRadius: 25,
      marginHorizontal:10
    },
    iconWrapper: {
      width: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      fontWeight: 'bold',
    },
    btnTxtWrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
  });