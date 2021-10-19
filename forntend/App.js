import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'


// redux 
import { Provider } from 'react-redux';
import store from './redux/store'

// Navigation
import Main from './Navigators/Main.navigator'


// screens 
import ProductContainer from './Screens/Products/ProductContainer.component'
import Header from './Shared/Header'


// to hide logs 

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer> 
        {/*   <Header/> */}
        <View style= {{height: 40}}/>
          <Main/>    
          <StatusBar style="auto" />

      </NavigationContainer>
    </Provider>
   
  );
}
