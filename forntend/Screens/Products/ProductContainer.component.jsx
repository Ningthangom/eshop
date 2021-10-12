
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, ActivityIndicator, FlatList  } from 'react-native';
import ProductList from './ProductList.component'



// import data 
const data = require('../../assets/data/products.json');

const ProductContainer =() => {
  
    const [products, setProducts] = useState([]);


    useEffect(() => {
        setProducts(data);

        return () => {
            setProducts([]);
        }
    }, []);
  
    return (
        <View>
            
           {/*  <Text> Product container </Text> */}
            <FlatList
                numColumns = {2}
                /* horizontal */
                data = {products}
                renderItem = {({item}) => 
                <ProductList 
                    key={item.id}
                    item = {item}

                />}
                keyExtractor= {item => item.name}

            />

        </View>
    )
}

export default ProductContainer;