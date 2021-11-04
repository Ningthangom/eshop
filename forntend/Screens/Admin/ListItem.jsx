import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    Dimensions,
    Button,
    Modal
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import EasyButton from '../../Shared/StyledComponent/EasyButton';


var { width, height } = Dimensions.get('window');


const ListItem = (props) => {

    const [modalVisible, setModalVisible] = useState(false)


    return (
        <View style={styles.centerView}>
            <Modal
             animationType='fade'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.centerView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity
                        underlayColor='#E8E8E8'
                        onPress={() =>{
                            setModalVisible(false)
                        }}
                        style={{
                            alignSelf: 'flex-end',
                            position: 'absolute',
                            top: 5,
                            right: 10
                        }}
                    >
                        <Icon name='close' size={20} />

                        </TouchableOpacity>
                        <EasyButton
                         medium
                        secondary 
                        onPress={() => [
                            props.navigation.navigate("ProductFormPage"),
                            setModalVisible(false)
                        ]}
                        >
                            <Text style={styles.textStyle}>Edit</Text>
                        </EasyButton>
                        <EasyButton 
                        medium 
                        danger 
                            // Delete Method
                            onPress={() =>[props.delete(props._id, setModalVisible(false))]}
                        >
                            <Text style={styles.textStyle}>Delete</Text>
                        </EasyButton>

                    </View>

                    
                </View>
            </Modal>


            <TouchableOpacity
                // onpress
                onPress={() => {
                    props.navigation.navigate("Product Detail", { item: props })
                }}
                onLongPress={() => setModalVisible(true)}
                style={[styles.container, { backgroundColor: props.index % 2 == 0 ? "white" : "gainboro" }]}
            >

                <Image source={{
                    uri: props.image ? props.image :
                        'https://lh3.googleusercontent.com/proxy/PHMeEUxncFvxo71Hbw80j6G8IEv8CHaKUPMbfIAU_XfRTkc-S72ohLqMtiU0Ch-yZG9flgxaK1VXh0W4aIzZawc1Z2Yi'
                }}
                    resizeMode='contain'
                    style={styles.image}
                />
                <Text style={styles.item}>{props.brand}</Text>
                <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail" >{props.name}</Text>
                <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail" >{props.category.name}</Text>
                <Text style={styles.item}> ${props.price}</Text>

            </TouchableOpacity>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 5,
        width: width,

    },
    image: {
        borderRadius: 50,
        width: width / 6,
        height: 20,
        margin: 2
    },
    item: {
        flexWrap: "wrap",
        margin: 3,
        width: width / 6
    },
    centerView: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22

    },
    modalView: {
        margin :20,
        backgroundColor: "white",
        padding: 35,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0, 
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
    }
})

export default ListItem;
