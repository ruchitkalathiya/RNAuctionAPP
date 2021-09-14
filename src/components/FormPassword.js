import React,{useState} from "react";
import {
    View,
    StyleSheet,
    TextInput,
} from "react-native";
import {windowHeight,windowWidth} from "../utils/Dimension";
import Icon from "react-native-vector-icons/Entypo";
import Icon1 from "react-native-vector-icons/FontAwesome";

const FormPassword=({labelValue,placeholderText,iconType,...rest})=>{

    const [hidePass, setHidePass] = useState(true);
     return(
         <View style={styles.inputContainer}>
             <View style={styles.iconStyle}>
             <Icon1 name={iconType} size={25} color="black" />
             </View>
             <TextInput
                value={labelValue}
                style={styles.input}
                numberOfLines={1}
                placeholder={placeholderText}
                placeholderTextColor="#666"
                secureTextEntry={!hidePass ? false : true}
                {...rest}
             />
             <Icon name={hidePass ? 'eye-with-line' : 'eye'} size={20} color="black" onPress={() => setHidePass(!hidePass)} style={{marginRight:5}}/>
         </View>
     );
};

export default FormPassword;

const styles=StyleSheet.create({
    inputContainer:{
        marginTop:5,
        marginBottom:10,
        width:"100%",
        height:windowHeight/15,
        borderColor:"#ccc",
        borderRadius:25,
        borderWidth:1,
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"#fff",
    },
    iconStyle:{
        padding:10,
        height:"100%",
        justifyContent:"center",
        alignItems:"center",
        borderRightColor:"#ccc",
        borderRightWidth:0,
        width:50,
    },
    input:{
        padding:10,
        flex:1,
        fontSize:16,
        color:"#333",
        justifyContent:"center",
        alignItems:"center",
    },
    inputField:{
        padding:10,
        marginTop:5,
        marginBottom:10,
        width:windowWidth/1.5,
        height:windowHeight/15,
        fontSize:16,
        borderRadius:8,
        borderWidth:1,
    },
});