import React from 'react';
import {StyleSheet, Image, SafeAreaView } from 'react-native'

const Header  = () => {
    return (
        <SafeAreaView>
            <Image 

            style = {styles.header, {height: 50}}
            source = {require("../assets/logo/logo_2.jpg")}
            resizeMode= 'contain'

            
            />

        </SafeAreaView>


    )
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
       /*  flexDirection: "row", */
        alignContent: "center",
        justifyContent: "center",
        padding: 20,
        marginTop: 90,// toDo: Delete
      

    }
})


export default Header;