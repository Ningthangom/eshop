import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, ScrollView, Button } from "react-native";
import { Text, Left, Right, ListItem, Thumbnail, Body } from "native-base";
import { connect } from "react-redux";
import * as actions from "../../../redux/Actions/cartActions";

import Toast from "react-native-toast-message";
import axios from "axios";
import baseURL from "../../../assets/common/baseUrl";
import ItemsInConfirm from "./ItemsInConfirm";

var { width, height } = Dimensions.get("window");

const NewConfirmPage = (props) => {
    const finalOrder = props.route.params;
     console.log("this is finalOrder from confirm", finalOrder);

    // Add this
    const [productUpdate, setProductUpdate] = useState();
    useEffect(() => {
        if (finalOrder) {
            /* setProductUpdate(finalOrder.order.order.orderItems); */
            getProducts(finalOrder)
        }
        return () => {
            setProductUpdate();
        };
    }, [props]);

    // Add this
    const getProducts = (x) => {
        const order = x.order.order;
        var products = [];
        if (order) {
            order.orderItems.forEach((cart) => {
                console.log("this is products from confirm", cart)
                axios
                    .get(`${baseURL}products/${cart.product}`)
                    .then(data => {

                        products.push(data.data);
                        /*  console.log("products in confirm", products); */
                        setProductUpdate(products);
                        /*  console.log("productupadate in confirm", productUpdate.length);  */

                    })
                    .catch((e) => {
                        console.log(e);
                    });

                /*  products.push(cart);
                 setProductUpdate(products);
                 console.log("products in confirm", products);
                 console.log("productupadate in confirm", productUpdate); */
            });
        }

    };

    const confirmOrder = () => {
        const order = finalOrder.order.order;
        axios
            .post(`${baseURL}orders`, order)
            .then((res) => {

                if (res.status == 200 || res.status == 201) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Order Completed",
                        text2: "",
                    });
                    setTimeout(() => {
                        props.clearCart();
                        props.navigation.navigate("Cart");
                    }, 500);
                }
            })
            .catch((error) => {
                console.log(error.response)
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "Something went wrong",
                    text2: "Please try again",
                });
            });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={{backgroundColor: "orange", height: 200}}>
                <Text>Confirm Order</Text>
                {productUpdate ? (
                     <>
                     {productUpdate.map((x) => {
                         console.log("productUpdate inside rendering", productUpdate.length);
                         return(
                            <ItemsInConfirm item={x} />
                         )
                            
                            {/* <ListItem style={styles.listItem} key={x.name} avatar>
                            <Left>
                              <Thumbnail source={{ uri: x.image }} />
                            </Left>
                            <Body style={styles.body}>
                              <Left>
                                <Text>{x.name}</Text>
                              </Left>
                              <Right>
                                <Text>$ {x.price}</Text>
                              </Right>
                            </Body>
                          </ListItem> */}

                        
                         
                     })}
                     </>
                ): null}

            </View>
        </ScrollView>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearCart: () => dispatch(actions.clearCart()),
    };
};

const styles = StyleSheet.create({
    container: {
        height: height,
        padding: 8,
        alignContent: "center",
        backgroundColor: "white",
    },
    titleContainer: {
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
        backgroundColor: "orange"
    },
    title: {
        alignSelf: "center",
        margin: 8,
        fontSize: 16,
        fontWeight: "bold",
    },
    listItem: {
        alignItems: "center",
        backgroundColor: "white",
        justifyContent: "center",
        width: width / 1.2,
    },
    body: {
        margin: 10,
        alignItems: "center",
        flexDirection: "row",
    },
});

export default connect(null, mapDispatchToProps)(NewConfirmPage);