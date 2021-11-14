import React from 'react';
import {
  View,
  Text,
  LogBox 
} from 'react-native';

LogBox.ignoreAllLogs();

import Providers from "./src/navigation/index";

const App=()=>{
      return(
       <Providers/>
      //<View><Text>vivek</Text></View>
      );
}

export default App;
