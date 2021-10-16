
import React from 'react';

import { View, StyleSheet, Dimensions } from 'react-native';

import {Content, Left, Body, ListItem, Thumbnail, Text } from 'native-base';



var { width } = Dimensions.get('window');

const SearchedProducts = (props) => {

    const { productFilter } = props;


    return (
        <Content style={{width: width}}>
            {productFilter.length > 0 ? (
                productFilter.map((item) => (
                    <ListItem 
                       
                        key={item._id.$oid}
                        avatar
                    >
                    <Left> 
                        <Thumbnail source={{uri: item.image ? item.image : 
                        'https://lh3.googleusercontent.com/proxy/PHMeEUxncFvxo71Hbw80j6G8IEv8CHaKUPMbfIAU_XfRTkc-S72ohLqMtiU0Ch-yZG9flgxaK1VXh0W4aIzZawc1Z2Yi'
                        }}
                        
                        />
                        
                     </Left>
                     <Body>
                         <Text > {item.name}</Text>
                         <Text note style={{color: ''}}>{item.description}</Text>
                     </Body>
                     </ListItem>
                ))
            ): 
            <View style= {styles.center}>
                <Text style={{ alignSelf: 'center'}}>
                    No Product match the selected critia
                </Text>
            </View>
        
        
        }

        </Content>
    )
}


const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default SearchedProducts;