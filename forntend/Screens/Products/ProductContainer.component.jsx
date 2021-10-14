
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator, FlatList  } from 'react-native';
import ProductList from './ProductList.component'
import { Container, Header, Icon, Item, Input, Text} from 'native-base';
import SearchedProducts from './Search.component';




// import data 
const data = require('../../assets/data/products.json');

const ProductContainer =() => {
  
    const [products, setProducts] = useState([]);
    const [productFilter, setProductFilter] = useState([]);
    const [focus, setFocus] = useState();


    useEffect(() => {
        setProducts(data);
        setProductFilter(data);
        setFocus(false);

        return () => {
            setProducts([]);
            setProductFilter([]);
            setFocus();
        }
    }, []);

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
  
    return (
        <Container>
            <Header searchBar rounded> 
            <Item> 
                <Icon name = "ios-search"/>
                <Input
                 placeholder = "Search"
                 onFocus={openList}
                 onChangeText = {(text) => SearchProduct(text)}/>
                 

                 {focus == true ? (
                     <Icon onPress={onBlur} name = 'ios-close'/>
                 ): null }
               
            </Item>
            </Header>

            { focus == true ? (
                    <View>
                    <SearchedProducts 

                        productFilter= {productFilter}

                    />

                </View>
            ) : (
                <View>
            
                <FlatList
                    numColumns = {2}
                    
                    data = {products}
                    renderItem = {({item}) => 
                    <ProductList 
                        key={item.id}
                        item = {item}

                    />}
                    keyExtractor= {item => item.name}

                />

            </View>

            )}           
                
        </Container> 
    )
}

export default ProductContainer;