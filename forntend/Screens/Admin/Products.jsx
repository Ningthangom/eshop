import React, { useState, useCallback } from 'react';
import { 
    View,
    Text,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    Button,
    Dimensions } from 'react-native';
import {Header, Item, Input} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ListItem from './ListItem';
import ProductList from '../Products/ProductList.component';
import EasyButton from '../../Shared/StyledComponent/EasyButton'

const {width, height} = Dimensions.get('window');


// headers 
const ListHeader = () => {

    return (
        <View
            elevation={1}
            style={styles.listHeader} 
        >
            <View style={styles.headerItem}>

            </View>
            <View style={styles.headerItem}>
                <Text style={{fontWeight: 'bold'}}>Brand</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={{fontWeight: 'bold'}}>Name</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={{fontWeight: 'bold'}}>Category</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={{fontWeight: 'bold'}}>Price</Text>
            </View>
        </View>
    )
}

const Products = (props) => {

    const [productList, setProductList] = useState();
    const [productFilter, setProductFilter] = useState();
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState();

    useFocusEffect(
        useCallback(
            () => {
                // get token
                AsyncStorage.getItem("jwt")
                    .then((res) => {
                        setToken(res)
                    })
                    .catch((err) => console.log(`get token error from Admin Product ${err}`))
                
                axios
                .get(`${baseURL}products`)
                .then((res) => {
                    /* console.log("Do i have products here: ", res) */
                    setProductList(res.data);
                    setProductFilter(res.data);
                    setLoading(false);
                })
                .catch((err) => console.log(err))
                
                return () => {
                    setProductFilter();
                    setProductList();
                    setLoading(true);
                }
            },
            []
        )
    )

    const searchProduct = (text) => {
        if(text == '') {
            setProductFilter(productList);

        }
        setProductFilter(
            // this willl filter all the product based on text entered 
            // toLowerCase() function wil sure that it's not case sensitive
            
            productList.filter((i) => 
                i.name.toLowerCase().includes(text.toLowerCase())
            )
           
        )
    }

    const deleteProduct = (id) => {
        axios
        .delete(`${baseURL}products/${id}`, {
            headers: {Authorization:`Bearer ${token}`}, 

        })
        .then((res) => {
            const products = productFilter.filter((item) => 
                item.id !== id
                )
                setProductFilter(products)
        })
        .catch((err) => {
            console.log('error in deleting product', err)
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <EasyButton
                 secondary 
                 medium
                 onPress={() => props.navigation.navigate("OrdersPage")}
                 >
                     <Icon name= 'shopping-bag' size={18} color="white"/>
                    <Text style={styles.buttonText}>Orders</Text>
                </EasyButton>
                <EasyButton
                 secondary 
                 medium
                 onPress={() => props.navigation.navigate("ProductFormPage")}
                 >
                     <Icon name= 'plus' size={18} color="white"/>
                    <Text style={styles.buttonText}>Product</Text>
                </EasyButton>
                <EasyButton
                 secondary 
                 medium
                 onPress={() => props.navigation.navigate("CategoryPage")}
                 >
                     <Icon name= 'plus' size={18} color="white"/>
                    <Text style={styles.buttonText}>Category</Text>
                </EasyButton>
            </View>
           <View>
               <Header searchBar rounded>
                   <Item style= {{padding: 5}}>
                       <Icon name= "search" />
                       <Input
                        placeholder="Search"
                        //onchange
                        onChangeText={(text) => searchProduct(text)}
                        />
                   </Item>
               </Header>
           </View>
           {loading ? (
               <View style={styles.spinner     }>
                   <ActivityIndicator size='large' color='red' />
               </View>
           ): (
               <FlatList 
                data={productFilter}
                ListHeaderComponent={ListHeader}
                renderItem={({item, index}) => (
                    <ListItem
                        {...item}
                        navigation={props.navigation}
                        index={index}
                        delete={deleteProduct}

                    />
                )}
                keyExtractor={(item) => item.id}
               >

               </FlatList>
           )}
        </View>
    )
}


const styles = StyleSheet.create({
    listHeader: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: '#a9a9a9',

    },
    headerItem: {
        margin: 3,
        width: width /6
    },
    spinner: {
        height: height/2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        marginBottom: 160,
        backgroundColor: 'white',

    }, 
    buttonContainer: {
        margin: 20,
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row'
    },
    buttonText: {
        marginLeft: 6,
        color: 'white'
    }
})

export default Products;