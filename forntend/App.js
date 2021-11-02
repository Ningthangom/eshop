import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import Toast from 'react-native-toast-message'


// redux 
import { Provider } from 'react-redux';
import store from './redux/store'

// Navigation
import Main from './Navigators/Main.navigator'


// screens 
import ProductContainer from './Screens/Products/ProductContainer.component'
import Header from './Shared/Header'


// context api 
import Auth from "./contextAPI/store/Auth.store"


// to hide logs 

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
  <Auth> 
      <Provider store={store}>
        <NavigationContainer>
          {/*   <Header/> */}
          <View style={{ height: 40, backgroundColor: 'grey' }} />
          <Main />
          <Toast ref={(ref) => Toast.setRef(ref)} />
          <StatusBar style="auto" />
        </NavigationContainer>
      </Provider>
    </Auth>


  );
}
