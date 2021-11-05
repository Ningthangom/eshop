import React, { useState, useEffect, } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Platform,
} from 'react-native';

import {Item, Picker} from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormContainer from '../../Shared/Forms/FormContainer';
import Input from '../../Shared/Forms/Input'
import EasyButton from '../../Shared/StyledComponent/EasyButton';
import Error from '../../Shared/Error';
import Icon from 'react-native-vector-icons/FontAwesome'
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from "expo-image-picker"
import baseURL from '../../assets/common/baseUrl';
import axios from 'axios';
import mime from 'mime';



const ProductForm = (props) => {
   /*  console.log("this is props in productform",props.route.params); */

    const [pickerValue, setPickerValue] = useState();
    const [brand, setBrand] = useState();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [image, setImage] = useState();
    const [mainImage, setMainImage] = useState();
    const [category, setCategory] = useState();
    const [categories, setCategories] = useState([]);
    const [token, setToken] = useState();
    const [error, setError] = useState();
    const [countInStock, setCountInStock] = useState();
    const [rating, setRating] = useState(0);
    const [isFeatured, setIsFeatured] = useState(false);
    const [richDescription, setRichDescription] = useState('');
    const [numReviews, setNumReviews] = useState(0);
    const [item, setItem] = useState(null);


    useEffect(() => {
        if(!props.route.params){
            /* console.log("this is props in productform",props.route.params); */
            setItem(null);
        }else{
            setItem(props.route.params.item);
            setBrand(props.route.params.item.brand);
            setName(props.route.params.item.name);
            setPrice(props.route.params.item.price.toString());
            setDescription(props.route.params.item.description);
            setMainImage(props.route.params.item.image);
            setImage(props.route.params.item.image);
            setCategory(props.route.params.item.category._id);
            setCountInStock(props.route.params.item.countInStock.toString());
        }

        AsyncStorage.getItem('jwt')
        .then((res) => {
            setToken(res)
        })
        .catch((err) => console.log(err))

        // Categories
        axios.get(`${baseURL}categories`)
             .then((res) => setCategories(res.data))
             .catch((err) => console.log('error catching category in admin', err));

        // image picker
        (async () => {
            if(Platform.OS !== 'web'){
                const {
                    status,

                } = await ImagePicker.requestCameraPermissionsAsync();
                if(status !== "granted"){
                    alert("Sorry, we need camera roll permissions to make this work")
                }   
            }
            
        })();

        return () => {
            setCategories()
        }

    },[])

    const pickImage = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaType: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1
        })

        if(!result.cancelled) {
            setMainImage(result.uri);
            setImage(result.uri);
        }
    }
    
    const addProduct = () => {
        console.log("addProduct function is called");
        if(
            name == '' || 
            brand == '' || 
            description == '' || 
            price == '' ||  
            category == '' || 
            countInStock == ''

            
            ){
                setError("Please fill in the form correctly")
            }

            let formData = new FormData();

            const newImageUri = "file:///" + image.split("file:/").join("");

            formData.append("image", {
                uri: newImageUri,
                type: mime.getType(newImageUri),
                name: newImageUri.split("/").pop()
            });
            formData.append("name", name);
            formData.append("brand", brand);
            formData.append("price", price);
            formData.append("description", description);
            formData.append("category", category);
            formData.append("countInStock", countInStock);
            formData.append("richDescription", richDescription);
            formData.append("rating", rating);
            formData.append("numReviews", numReviews);
            formData.append("isFeatured", isFeatured);


            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            }

            if(item !== null){
                console.log("this is item id: ", item)
                axios.put(`${baseURL}products/${item.id}`, formData, config)
                .then((res) => {
                    console.log(res.data);
                    if(res.status == 200 || res.status == 201 ){
                        Toast.show({
                            topOffset: 60,
                            type: 'success',
                            text1: 'product successfuly updated',
                            text2: ''
                        });
                        setTimeout(() => {
                            props.navigation.navigate("AdminProductsPage");
                        }, 500 )
                    }
                })
                .catch((err) => {
                    console.log("error from updaing product",err.response);
                    Toast.show({
                        topOffset: 60,
                        type: 'error',
                        text1: 'Updating product failed',
                        text2: 'Please try again'
                    })
                })

            }else{
                axios.post(`${baseURL}products`, formData, config)
                .then((res) => {
                    if(res.status == 200 || res.status == 201 ){
                        Toast.show({
                            topOffset: 60,
                            type: 'success',
                            text1: 'new product added',
                            text2: ''
                        });
                        setTimeout(() => {
                            props.navigation.navigate("AdminProductsPage");
                        }, 500 )
                    }
                })
                .catch((err) => {
                   /*  console.log(err.response); */
                    Toast.show({
                        topOffset: 60,
                        type: 'error',
                        text1: 'something went wrong',
                        text2: 'Please try again'
                    })
                })
            }

          
    }

    return (
        <KeyboardAwareScrollView 
        viewIsInsideTabBar={true}
        extraHeight={50}
        enableOnAndroid={true}
        >
            <FormContainer title="Add Product">
                <View style={styles.imageContainer}>
                    <Image source={{ uri: mainImage }} style={styles.image}/>
                    <TouchableOpacity
                     style={styles.imagePicker}
                        onPress={pickImage}
                     >
                        <Icon style={{color: 'white', padding: 0}} name="camera" />
                    </TouchableOpacity>
                </View>
                <View style={styles.label}>
                    <Text style={{ textDecorationLine: 'underline' }}>Brand</Text>
                </View>
                <Input
                    placeholder="Brand"
                    name="brand"
                    id="brand"
                    value={brand}
                    onChangeText={(text) => setBrand(text)}
                />
                <View style={styles.label}>
                    <Text style={{ textDecorationLine: 'underline' }}>Name</Text>
                </View>
                <Input
                    placeholder="Name"
                    name="name"
                    id="name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <View style={styles.label}>
                    <Text style={{ textDecorationLine: 'underline' }}>Price</Text>
                </View>
                <Input
                    placeholder="Price"
                    name="price"
                    id="price"
                    value={price}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setPrice(text)}
                />
                <View style={styles.label}>
                    <Text style={{ textDecorationLine: 'underline' }}> Number of Stock</Text>
                </View>
                <Input
                    placeholder="Stock"
                    name="stock"
                    id="stock"
                    value={countInStock}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setCountInStock(text)}
                />
                <View style={styles.label}>
                    <Text style={{ textDecorationLine: 'underline' }}>description</Text>
                </View>
                <Input
                    placeholder="Description"
                    name="description"
                    id="description"
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                />
            
                 <Item picker
                  style={
                      {
                          backgroundColor: 'orange',
                           width: '80%', 
                           borderRadius: 30,
                           color: 'white',
                           height: 40,
                           justifyContent: 'center',
                           alignItems: 'center'
                           }
                           }> 
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon color={"#007aff"} name="arrow-down" />}
                        style={{ width:(Platform.OS === 'ios') ? undefined : 120, flex: 1}}
                        placeholder="Select your Category"
                        selectedValue={pickerValue}
                        placeholderStyle={{ color: "#007aff"}}
                        placeholderIconColor="#007aff"
                        onValueChange={(e) => [setPickerValue(e), setCategory(e)]}
                    >
                        {categories.map((c) => {
                            return <Picker.Item key={c._id} label={c.name} value={c._id} />
                        })}
                    </Picker>
         </Item>
         {error ? <Error message={error} />: null}
         <View style={styles.buttonContainer}> 
             <EasyButton 
                large 
                primary
                //onPress
                onPress={() =>addProduct()}         
             >
                 <Text style={styles.buttonText}>Confirm</Text>

             </EasyButton>
         </View>

            </FormContainer>
        </KeyboardAwareScrollView>

    )
}

const styles = StyleSheet.create({
    label: {
        width: " 80%",
        marginTop: 5,
    },
    picker: {
        padding: 20,
        marginTop: 10,
        marginLeft: 50,
        marginRight: 50,
        color: "white",
        backgroundColor: "white",
        height:50 
    },
    buttonContainer: {
        width: '80%',
        marginBottom: 80, 
        marginTop: 20,
        alignItems: 'center',

    },
    buttonText: {
        color: 'white'
    },
    imageContainer: {
        width: 200,
        height: 200,
        borderStyle: 'solid',
        borderWidth: 8,
        padding: 0, 
        justifyContent: 'center',
        borderRadius: 100,
        borderColor: 'orange',
        elevation: 10
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 100,

    },
    imagePicker: {
        position: 'absolute',
        right: 5,
        bottom: 10,
        backgroundColor: 'grey',
        padding: 0,
        height: 30,
        width: 30,
        borderRadius: 100,
        elevation: 20,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default ProductForm;