import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Error = (props) => {
    console.log("this is props from Error", props);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.message}</Text>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        width:'100%',
        alignItems: 'center'
    },
    text: {
        color: 'red'

    }
})


export default Error;