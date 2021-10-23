import React, {useState} from 'react'
import {View, Dimensions, StyleSheet,Button} from 'react-native';
import {
    Container,
    Text,
    Left,
    Right,
    H1,
    TouchableOpacity
    
} from 'native-base';

import  {SwipeListView } from 'react-native-swipe-list-view';

import Icon from 'react-native-vector-icons/FontAwesome'
import CartItem from './CartItem';


// redux 
import {connect} from 'react-redux';
import * as actions from '../../redux/Actions/cartActions'


const {height, width} = Dimensions.get('window')

const Cart =(props) => {

    var totalPrice = 0;
    props.productInCart.forEach(cart => {
        return (totalPrice += cart.product.price)
    })

    console.log('productInCart from cart: ',props);

    return (
        <> 
        {props.productInCart.length  ? (
            <Container> 
                <H1 style={{ alignSelf: 'center' }}> Cart </H1>
                {props.productInCart.map(data => {
                    console.log(data);
                    return (
                       <CartItem item ={data}/>
                    )
                })}

       {/*   <SwipeListView 
                    data={props.productInCart}
                    renderItem = {(data) => (
                        
                        <CartItem item={data} />
                    )}
                    
                    renderHiddenItem = {(data) => (
                        <View> 
                            <TouchableOpacity>
                                <Icon name="trash" color="white" size={30} />
                            </TouchableOpacity>
                        </View>
                    )}
                    disableRightSwipe ={true}
                    previewOpenDelay={3000}
                    friction={1000}
                    tension={40}
                    leftOpenValue = {75}
                    stopLeftSwipe={75}
                    rightOpenValue={-75}

                /> */}

                <View style={styles.bottomContainer}>
                    <Left> 
                        <Text style={styles.price}> Total Price: ${totalPrice}</Text>
                    </Left>
                    <Right >
                        <Button title ="Clear"
                            onPress={() => props.clearCart()}
                        />
                    </Right>
                    <Right>
                        <Button title="Chekout" 
                        onPress={() => props.navigation.navigate('Checkout')} />
                    </Right>


                </View>
            
            </Container>
        ): 
        (
            <Container style={styles.emptyContainer}> 
                 <Text> Your Cart is Emty</Text>
                 <Text> Add products to your cart to get started!</Text>

            </Container>
           
        )
}


        </>
    )
}

const mapStateToProps = (state) => {
    const {cartItems} = state;
    return { 
        productInCart: cartItems
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearCart: () => dispatch(actions.clearCart())
    }
}


const styles = StyleSheet.create({
    emptyContainer: {
        height: height,
        alignItems: 'center',
        justifyContent: 'center'
    },
   
    bottomContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0, 
        backgroundColor: 'white',
        elevation: 20
    },
    price: {
        fontSize: 18,
        margin: 20,
        color: 'red'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart);