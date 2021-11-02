
import React, { useState, useEffect, useCallback   } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList, Dimensions, ScrollView } from 'react-native';
import ProductList from './ProductList.component'
import { Container, Header, Icon, Item, Input, Text } from 'native-base';
import {useFocusEffect} from '@react-navigation/native'
import SearchedProducts from './Search.component';
import Banner from '../../Shared/Banner';
import CategoryFilter from './categoryFilter.component'



// import axios from axios to do http requests
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';



var { height } = Dimensions.get('window');
// import data 
const data = require('../../assets/data/products.json');
const productCate = require('../../assets/data/categories.json')

const ProductContainer = (props) => {

    const [products, setProducts] = useState([]);
    const [productFilter, setProductFilter] = useState([]);
    const [focus, setFocus] = useState();
    const [loading, setLoading] = useState(true)


    // categories variables 
    const [categories, setCategories] = useState([]);
    const [active, setActive] = useState();
    const [initialState, setInitialState] = useState([]);
    const [productCategory, setProductCategory] = useState([]);


    useFocusEffect((
        useCallback(
            ()=> {
                setFocus(false);
       
                setActive(-1);
        
        
                // getting products
                axios
                    .get(`${baseURL}products`)
                    .then((res) => {
                        setProducts(res.data);
                        setProductFilter(res.data);
                        setProductCategory(res.data);
                        setInitialState(res.data);
                        setLoading(false);
                    })
                    .catch((err) => {
                        console.log(err)
                    })
        
                // categories call 
                axios
                .get(`${baseURL}categories`)
                .then((res)=> {
                    console.log(res.data)
                    setCategories(res.data);
                })
                .catch((err) => {
                    console.log(err)
                })
        
                return () => {
                    setProducts([]);
                    setProductFilter([]);
                    setFocus();
                    setCategories([]);
                    setActive();
                    setInitialState([]);
        
                }
            },
            []
        )
    )
    ) 

     
  



    // product related functions 
    const SearchProduct = (text) => {
        setProductFilter(
            products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
        );
    }

    const openList = () => {
        setFocus(true);

    }

    const onBlur = () => {
        setFocus(false)
    }

    // categories related functions  
    const changeCategory = (ctg) => {
        {
          ctg === "all"
            ? [setProductCategory(initialState), setActive(true)]
            : [
                setProductCategory(
                  products.filter((i) => i.category._id === ctg),
                  setActive(true)
                ),
              ];
        }
      };

    return (
        <>
        {loading == false ? (
             <Container style={{ backgroundColor: '', color: '' }}>
             <Header searchBar rounded>
                 <Item>
                     <Icon name="ios-search" />
                     <Input
                         placeholder="Search"
                         onFocus={openList}
                         onChangeText={(text) => SearchProduct(text)} />
 
 
                     {focus == true ? (
                         <Icon onPress={onBlur} name='ios-close' />
                     ) : null}
 
                 </Item>
             </Header>
 
             {focus == true ? (
                 <SearchedProducts
 
                     navigation={props.navigation}
                     productFilter={productFilter}
 
                 />
             ) : (
                 <ScrollView>
                     <View>
                         <Banner />
                     </View>
                     <View>
                         <CategoryFilter
                             categories={categories}
                             categoryFilter={changeCategory}
                             productCategory={productCategory}
                             active={active}
                             setActive={setActive}
                         />
                     </View>
                     {productCategory.length > 0 ? (
                         <View style={styles.listContainer}>
                             {productCategory.map((item) => {
                                 return (
                                     <ProductList
                                         navigation={props.navigation}
                                         key={item._id.$oid}
                                         item={item}
                                     />
                                 )
                             })}
                         </View>
                     ) : (
                         <View style={[styles.center, { height: "5%" }]}>
                             <Text> No Product Found</Text>
                         </View>
                     )
                     }
 
 
 
                 </ScrollView>
 
             )}
 
         </Container>
        ): (
            //loading indicator
            <Container style={[styles.center, {backgroundColor:'grey'}]}> 
                <ActivityIndicator size='large' color='red' />
                <Text>Products will magically appear soon</Text>
            </Container>
        )}
       
        </>
    )

}

const styles = StyleSheet.create({
    container: {
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
    },
    listContainer: {
      /*   height: height, */
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        backgroundColor: "green",
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',

    }
});



export default ProductContainer;