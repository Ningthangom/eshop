import React, {useState, useEffect} from 'react';
import {Image, View, StyleSheet, Text, ScrollView, Button} from 'react-native';

import {Left, Right, Container, H1} from 'native-base';
import Toast from 'react-native-toast-message'


// REDUX 
import {connect} from 'react-redux';
import * as actions from '../../redux/Actions/cartActions'
import EasyButton from '../../Shared/StyledComponent/EasyButton'
import TraficLight from '../../Shared/StyledComponent/traficLight'

const SingleProduct = (props) => {
    const [item, setItem ] = useState(props.route.params.item);
    const [availability, setAvailability] = useState('');
    const [availabilityText, setAvailabilityText] = useState('')


    useEffect(() => {
            if(props.route.params.item.countInStock == 0) {
                setAvailability(<TraficLight unavailable></TraficLight>)
                setAvailabilityText('Unavailable')
            }else if(props.route.params.item.countInStock <= 5) {
                setAvailability(<TraficLight limited></TraficLight>)
                setAvailabilityText('Limited Stock')
            }else{
                setAvailability(<TraficLight available></TraficLight>)
                setAvailabilityText('available')
            }
            return () => {
                setAvailability(null);
                setAvailabilityText('');
            }
    },[])

    return (
      <Container style={styles.container}> 
        <ScrollView style={{marginBottom: 80, padding: 5}} >
            <View>
                <Image 
                source={{ uri: item.image ? item.image 
                    : 'https://www.cdc.gov/foodsafety/images/comms/features/GettyImages-1247930626-500px.jpg'
                 }}
                 resizeMode="contain"
                 style={styles.image}
            />
            <View style={styles.contentContainer}>
                <H1 style={styles.contentHeader}> {item.name}</H1>
                <Text style= {styles.contentText}> brand: {item.brand}</Text>
                 <View style={styles.availabilityContainer}>
                     <View style={styles.availability}>
                         <Text style={{marginRight: 10}}>
                             Availibility: {availabilityText}  {availability}          
                         </Text> 
                                        
                     </View>
                     <Text>{item.description}</Text>     
                 </View>
            </View>
            </View>
        </ScrollView>
        <View style={styles.bottonContainer}> 
            <Left>
                 <Text style={styles.price}>${item.price}</Text>
            </Left>
            <Right>
                <EasyButton
                medium
                 primary
                 style={{marginLeft: 50}}
                    onPress={() =>
                       { props.addItemToCard(item),
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: `${item.name} added to Cart`,
                            text2: "Go to your cart to complete order"
                        })
                    
                    }
                    }
                >
                    <Text style={{ color: 'white' }}> Add </Text>
                    </EasyButton>
            </Right>

        </View>
      </Container>



    )
}


const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: '100%',
    },
    imageContainer: {
        backgroundColor: 'white', 
        padding: 5,
        margin: 0
    },
    image: {
        width: '100%',
        height: 250
    },
    contentContainer: {
        marginTop: 20,
        justifyContent: "center",
        alignItems: 'center',

    },
    contentHeader: {
        fontWeight: 'bold', 
        marginBottom: 20,
        fontSize:25
        
    },
    contentText: {
        fontSize: 18,
        fontWeight: 'bold', 
        marginBottom:20
    },
    bottonContainer: {
        flexDirection: 'row', 
        position: 'absolute',
        left: 0,
        bottom: 0,
        backgroundColor: 'white'
    },
    price: {
        fontSize: 24,
        margin: 20,
        color:'red'
    },
    availabilityContainer: {
        marginBottom:20,
        alignItems: 'center',

    }, 
    availability:{
        flexDirection: 'row',
        marginBottom:10
    }
})


const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCard: (product) => {
            dispatch(actions.addToCart({quantity: 1, product}))
        }
    }
}
export default connect(null, mapDispatchToProps)(SingleProduct);