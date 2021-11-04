import React from 'react';
import { StyleSheet, Image, SafeAreaView, Text, View } from 'react-native'

const Header = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View >
                <Image
                    style={styles.header}
                    source={require("../assets/logo/logo_2.jpg")}
                    resizeMode='contain'
                /></View>
        </SafeAreaView>


    )
}

const styles = StyleSheet.create({
    header: {
        width: 66,
        height: 66,
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
        marginTop: 10

    },
    container: {
        flex: 0.1,
        alignItems: "center",
        height: 10,
        backgroundColor:'orange'

    }
})


export default Header;