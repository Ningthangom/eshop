import React, { useEffect, useState } from 'react';

import { Text, View, StyleSheet } from 'react-native';

import { Picker } from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome';

import TraficLight from "./StyledComponent/traficLight";

import EasyButton from "./StyledComponent/EasyButton";

import Toast from "react-native-toast-message";

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

import baseURL from '../assets/common/baseUrl';


const codes = [
    { name: 'pending', code: '3' },
    { name: 'shipped', code: '2' },
    { name: 'delivered', code: '1' }
]


const OrderCard = (props) => {

  /*   console.log("this is props in orderCard", props) */

    const [orderStatus, setOrderStatus] = useState();
    const [statusText, setStatusText] = useState();
    const [statusChange, setStatusChange] = useState();
    const [token, setToken] = useState();
    const [cardColor, setCardColor] = useState();


    useEffect(() => {

        if (props.editMode) {
            AsyncStorage.getItem('jwt')
                .then((response) => {
                    setToken(response)
                })
                .catch((err) => console.log(err))
        }



        if (props.status == "3") {
            setOrderStatus(<TraficLight unavailable></TraficLight>)
            setStatusText("Pending");
            setCardColor("#b51610")
        } else if (props.status == "2") {
            setOrderStatus(<TraficLight limited></TraficLight>)
            setStatusText("shipped");
            setCardColor("#edae2f")
        } else {
            setOrderStatus(<TraficLight available></TraficLight>)
            setStatusText("delivered");
            setCardColor("green")
        }


        return () => {
            // cleanup
            setOrderStatus();
            setStatusText();
            setCardColor();
        }
    }, [])


    const updateOrder = () => {

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        const order = {
            city: props.city,
            country: props.country,
            dateOrdered: props.dateOrdered,
            id: props.id,
            orderItems: props.orderItems,
            phone: props.phone,
            shippingAddress1: props.shippingAddress1,
            shippingAddress2: props.shippingAddress2,
            status: statusChange,
            totalPrice: props.totalPrice,
            user: props.user,
            zip: props.zip
        }

        axios
            .put(`${baseURL}orders/${props.id}`, order, config)
            .then((res) => {
                if (res.status == 200 || res.status == 201) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "order status updated successfully",
                        text2: "Please refresh the page to see the color change"
                    })
                }
            })
            .catch((err) => {
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "something went wrong",
                    text2: ""
                })
            })
    }


    return (
        <View style={[{ backgroundColor: cardColor }, styles.container]}>
            <View /* style={styles.container} */>
                <Text>Order Number: #{props.id}</Text>
            </View>
            <View style={{ marginTop: 10 }}>
                <Text>Status: {statusText} {orderStatus}</Text>
                <Text>Address: {props.shippingAddress1} {props.shippingAddress2}</Text>
                <Text>City: {props.city} </Text>
                <Text>Country: {props.country} </Text>
                <Text>ZipCode: {props.zip}</Text>
                <Text>Date Ordered: {props.dateOrdered.split("T")[0]} </Text>
                <View style={styles.priceContainer}>
                    <Text>Price: </Text>
                    <Text style={styles.price}>${props.totalPrice}</Text>
                </View>
                {props.editMode ? (
                    <View>

                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon color={"#007aff"} name="arrow-down" />}
                            style={{ width: undefined }}
                            selectedValue={statusChange}
                            placeholderIconColor={{ color: "#007aff" }}
                            onValueChange={(e) => setStatusChange(e)}

                        >

                            {codes.map((c) => {
                                /* console.log(c) */
                                return (
                                    <Picker.Item key={c.code} label={c.name} value={c.code} />
                                )
                            })}

                        </Picker>
                        <EasyButton
                            secondary
                            large
                            //onPress
                            onPress={() => updateOrder()}
                        >
                            <Text style={{ color: 'white' }}>Update</Text>
                        </EasyButton>
                    </View>)
                    : null}



            </View>
        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        padding: 10,
        margin: 10,
        borderRadius: 30,

    },
    title: {
        backgroundColor: '#6281F6',
        padding: 5
    },
    priceContainer: {
        marginTop: 10,
        alignItems: 'flex-end',
        flexDirection: 'row'
    },
    price: {
        color: "white",
        fontWeight: "bold"
    }
})

export default OrderCard;