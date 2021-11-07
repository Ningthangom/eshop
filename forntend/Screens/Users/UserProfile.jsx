
import React, {useContext, useState,useEffect, useCallback} from 'react';
import {View, Text, StyleSheet,Dimensions, Button, ScrollView, ActivityIndicator} from 'react-native';

import {Container} from "native-base";
import {useFocusEffect} from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import baseURL from "../../assets/common/baseUrl";

import AuthGloble from "../../contextAPI/store/AuthGloble";
import {logoutUser} from "../../contextAPI/actions/Auth_action";
import EasyButton from '../../Shared/StyledComponent/EasyButton'

import OrderCard from '../../Shared/OrderCard'


const {height, width} = Dimensions.get('window')

const UserProfile =(props) => {

    const context = useContext(AuthGloble);
   /*  console.log(`this is context from AuthGloble`,context.stateUser.user); */
    const [userProfile, setUserProfile] = useState();
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState();


    console.log("this is orders from user profile", orders)

    useFocusEffect(
        useCallback(() => {
        if(
            context.stateUser.isAuthenticated === false || 
            context.stateUser.isAuthenticated === null
        ) {
            props.navigation.navigate("LoginPage")
        }

        AsyncStorage.getItem("jwt")
        // .sub here is the id of the current login user
        .then((res) => {
           /*  console.log(`response from Asyncstorage`, res) */
            axios
            .get(`${baseURL}users/${context.stateUser.user.userId}`, {
                headers: {Authorization: `Bearer ${res}`},

            })
            .then((user) => {
               /*  console.log("user detail in userProfile: ", user); */
                setUserProfile(user.data);
                setLoading(false);
            }
            
            ).catch((error) => console.log(error));
           
        })
        .catch((err) => {
            console.log(`error in getting user detail: ${err}`)
        })

        axios
        .get(`${baseURL}orders`)
        .then((x) => {
            const data = x.data;
            /* console.log("this is orders from user profile: ", x.data) */
            const userOrders = data.filter(
                (order) => order.user.id === context.stateUser.user.userId
            );
            setOrders(userOrders)
        })
        .catch((err) => console.log(err))

        return () => {
            setUserProfile();
            setOrders();
        }

    },[context.stateUser.isAuthenticated]))
    
    /* console.log("this is orders from user profile", orders) */

    return (
        <>
        {loading == false ? ( 
        <Container >
             <ScrollView contentContainerStyle={styles.subcontainer}>
                 <View style={styles.container}>
                 <Text style={{ fontSize: 30, }}>
                      {userProfile ? userProfile.name : "name could not be found"}
                      </Text>
                      <View style={{marginTop: 20}}>
                          <Text>Email: { userProfile ? userProfile.email : "user email could not be found" }</Text>
                          <Text>Phone: { userProfile ? userProfile.phone : "user Phone could not be found" }</Text>
                      </View>
                      <View style ={{ marginTop: 80}}>
                          <EasyButton 
                            medium
                            secondary
                          onPress={() => [
                              AsyncStorage.removeItem('jwt'), 
                              logoutUser(context.dispatch)
                          ]}>
                              <Text>Logout</Text>
                              </EasyButton>
                      </View>
                      </View>
                      <View style={styles.order}>
                          <Text style={{ fontSize:20, marginLeft: 20}}>My Orders</Text>
                          <View >
                              {orders ? (
                                  orders.map((x) => {
                                      return <OrderCard key={x.id} {...x}/>;   
                                  })
                              ): (
                                  <View style={styles.order}>
                                      <Text>You have no order</Text>
                                  </View>
                              )}
                          </View>

                      </View>
             </ScrollView>
         </Container>
        ) : (
             //loading indicator
             <Container style={[styles.center, {backgroundColor:'grey'}]}> 
             <ActivityIndicator size='large' color='red' />
             <Text>Your details will magically appear soon</Text>
         </Container>
        )}
     </>
    )
   
}


const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center',
        
        

    },
   /*  subcontainer:{
        alignItems: 'center',
        marginTop: 30
    },
    center: {
        height: height/2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    order: {
        marginTop: 20,
        alignItems: "center",
        marginBottom: 60,
        width: '80%',
    } */
})

export default UserProfile;