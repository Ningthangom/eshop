
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, Left, Right, ListItem, Thumbnail, Body, View } from "native-base";
import { FlatList } from "react-native-gesture-handler";

const ItemsInConfirm = (props) => {
   
  console.log('this is props', props.item);
  const data = props.item;
  /* console.log('this is data', data); */
  return (
    
    <ListItem style={styles.listItem} key={data.id} avatar>
      <Left>
        <Thumbnail
          source={{
            uri: data.image
              ? data.image
              : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
          }}
        />
      </Left>
      <Body style={styles.body}>
        <Left>
          <Text>{data.name}</Text>
        {/*   <Text style={{color: 'red'}}>REDO REMOVING SINGLE ITEM FROM CART</Text> */}
        </Left>
        <Right>
          <Text>$ {data.price}</Text>
         
        </Right>
      </Body>
    </ListItem>
  
  );
};

const styles = StyleSheet.create({
    listItem: {
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
        width: "80%"
    },
    body: {
        margin: 10,
        alignItems: 'center',
        flexDirection: 'row'
    }
})

export default ItemsInConfirm;