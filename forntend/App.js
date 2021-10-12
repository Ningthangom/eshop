import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


// screens 
import ProductContainer from './Screens/Products/ProductContainer.component'
import Header from './Shared/Header'

export default function App() {
  return (
    <View style={styles.container}>
      <Header/>
      <ProductContainer/>
      <Text>Let's start the show</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
 
  },
});
