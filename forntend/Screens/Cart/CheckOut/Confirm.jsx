import React from 'react';
import {View, StyleSheet, Dimensions, ScrollView,Button} from 'react-native';
import {

    Text,
    Left,
    Right,
    ListItem,
    Thumbnail,
    Body,
    

} from 'native-base';



import {connect} from 'react-redux';
import * as actions from '../../../redux/Actions/cartActions'


var {width,height} = Dimensions.get('window')


const Confirm = (props) => {

    const confirm = props.route.params;

    const confirmOrder = () => {
            setTimeout(() => {
                props.clearCart();
                props.navigation.navigate("CartPage")
            }, 500)
    }

    return (
        <ScrollView contentContainerStyle = {styles.container}>
           <View style={styles.titleContainer}> 
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                    Confirm Order
                </Text>
                {props.route.params ?
                 <View style={{ borderWidth: 1, borderColor: 'orange' }}>
                     <Text style={styles.shipping}> Shipping to: </Text>
                     <View style={{padding: 8}}>
                         <Text>Address: {confirm.order.order.shippingAddress1}</Text>
                         <Text>Address2: {confirm.order.order.shippingAddress2}</Text>
                         <Text>City: {confirm.order.order.city}</Text>
                         <Text>Zipcode: {confirm.order.order.zip}</Text>
                         <Text>Country: {confirm.order.order.country}</Text>
                     </View>
                     <Text style={styles.title}> Items: </Text>
                     {confirm.order.order.orderItems.map((orderItem) => {
                         return(
                             <ListItem

                             style={styles.listItem}
                             key={orderItem.product.name}
                             avatar
                             
                             > 
                             <Left>
                                <Thumbnail source={{uri: orderItem.product.image}}/>

                            </Left>

                            <Body style={styles.body}> 
                                <Left>
                                    <Text>{orderItem.product.name}</Text>
                                </Left>
                                <Right>
                                    <Text>$ {orderItem.product.price}</Text>
                                </Right>
                            </Body>

                             </ListItem>
                         )
                     })}

                 </View> 
                 : null}
                 <View style = {{alignItems: 'center', margin: 20 }}>
                     <Button title={'Place Order'} onPress={confirmOrder}/>
                 </View>
           </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        height:height,
        padding: 8,
        alignContent: 'center',
        backgroundColor:'white'
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8
    },
    shipping: {
        alignSelf: 'center',
        margin: 8,
        fontSize: 16,
        fontWeight: 'bold'
    },
    title: {
        alignSelf: 'center',
        margin: 8,
        fontSize: 16,
        fontWeight: 'bold'
    },
    listItem: {
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
        width: width /1.2
    },
    body: {
        margin: 10,
        alignItems: 'center',
        flexDirection: 'row'
    }
})

const mapDispatchToProps = (dispatch) => {
    return{
        clearCart: () => dispatch(actions.clearCart())
    }
}


export default connect(null, mapDispatchToProps)(Confirm);