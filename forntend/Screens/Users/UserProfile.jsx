
import React, {useContext, useState,useEffect, useCallback} from 'react';
import {View, Text, StyleSheet,Dimensions, Button, ScrollView, ActivityIndicator} from 'react-native';

import {Container} from "native-base";
import {useFocusEffect} from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import baseURL from "../../assets/common/baseUrl";

import AuthGloble from "../../contextAPI/store/AuthGloble";
import {logoutUser} from "../../contextAPI/actions/Auth_action";


const {height, width} = Dimensions.get('window')

const UserProfile =(props) => {

    const context = useContext(AuthGloble);
   /*  console.log(`this is context from AuthGloble`,context); */
    const [userProfile, setUserProfile] = useState();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
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

        return () => {
            setUserProfile();
        }

    },[context.stateUser.isAuthenticated])

    return (
        <>
        {loading == false ? ( 
             <Container style={styles.container}>
             <ScrollView contentContainerStyle={styles.subcontainer}>
                 <Text style={{ fontSize: 30, }}>
                      {userProfile ? userProfile.name : "name could not be found"}
                      </Text>
                      <View style={{marginTop: 20}}>
                          <Text>Email: { userProfile ? userProfile.email : "user email could not be found" }</Text>
                          <Text>Phone: { userProfile ? userProfile.phone : "user Phone could not be found" }</Text>
                      </View>
                      <View style ={{ marginTop: 80}}>
                          <Button 
                          title = {"Log out"} 
                          onPress={() => [
                              AsyncStorage.removeItem('jwt'), 
                              logoutUser(context.dispatch)
                          ]}/>
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
    subcontainer:{
        alignItems: 'center',
        marginTop: 30
    },
    center: {
        height: height/2,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default UserProfile;