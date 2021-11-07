import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { Item, Picker } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import FormContainer from '../../../Shared/Forms/FormContainer';
import Input from '../../../Shared/Forms/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import { connect } from 'react-redux';
import AuthGloble from '../../../contextAPI/store/AuthGloble';


const countries = require('../../../assets/data/country.json')


const CheckOut = (props) => {
   /*  console.log("Props in CheckOut",props) */
    const items = props;
    const context = useContext(AuthGloble);

    const [orderItems, setOrderItems] = useState();
    const [address, setAddress] = useState();
    const [address2, setAddress2] = useState();
    const [city, setCity] = useState();
    const [country, setCountry] = useState();
    const [zip, setZip] = useState();
    const [phone, setPhone] = useState();
    const [ user, setUser ] = useState();

    useEffect(() => {
        setOrderItems(items.cartItems);

        if(context.stateUser.isAuthenticated) {
           /*  console.log("this is user Id from authGloble: ",context.stateUser.user.userId ) */
            setUser(context.stateUser.user.userId)
        } else {
            props.navigation.navigate("Cart");
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Please Login to Checkout",
                text2: ""
            });
        }

        return () => {
            setOrderItems();
        }
    }, [])

    const CheckOut = () => {
        let order = {
            city,
            country,
            dateOrdered: Date.now(),
            orderItems,
            phone,
            shippingAddress1: address,
            shippingAddress2: address2,
            status: "3",
            user,
            zip
        }
        // order will be passed to payment component
        props.navigation.navigate("Payment", {order: order})
    }

    return (
        <KeyboardAwareScrollView

            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}


        >
            <FormContainer title={"Shipping Addrress"}>
                <Input

                    placeholder={"Phone"}
                    name={"phone"}
                    value={phone}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setPhone(text)}
                />
                <Input

                    placeholder={"Shipping Address 1"}
                    name={"ShippingAddress1"}
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                />
                <Input

                    placeholder={"Shipping Address 2"}
                    name={"ShippingAddress2"}
                    value={address2}
                    onChangeText={(text) => setAddress2(text)}
                />
                <Input

                    placeholder={"City"}
                    name={"city"}
                    value={city}
                    onChangeText={(text) => setCity(text)}

                />
                <Input

                    placeholder={"ZipCode"}
                    name={"zip"}
                    value={zip}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setZip(text)}

                />
             
                <Item picker >
                    <Picker
                        mode='dropdown'
                        iosIcon={<Icon name="arrow-down" color={"#007aff"}/>}
                        style={{width: undefined}}
                        selectedValue = {country}
                        placeholder="Select your Country"
                        placeholderStyle = {{color: "#007aff"}}
                        placeholderIconColor =  "#007aff"
                        onValueChange = {(e) => setCountry(e)}


                    >
                        {countries.map((c)=> {
                            return <Picker.Item
                             key={c.code}
                             label={c.name}
                             value={c.name}
                             />
                        })}

                    </Picker>
                </Item>
                <View style= {{width: '80%', alignItems: "center"}}>
                        <Button title="Confirm"
                            onPress={()=> CheckOut()}
                        />
                </View>

            </FormContainer>

        </KeyboardAwareScrollView>
    )
}


const mapStateToProps = (state) => {
    const {cartItems} = state;

    return {
        cartItems: cartItems,
    }
}


export default connect (mapStateToProps)(CheckOut);