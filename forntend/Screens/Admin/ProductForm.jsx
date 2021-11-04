import React, {useState, useEffect, } from 'react';
import {
    View,
     Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Platform, } from 'react-native';

import {Form, Item, Picker} from 'native-base';
import FormContainer from '../../Shared/Forms/FormContainer';
import Input from '../../Shared/Forms/Input'
import EasyButton from '../../Shared/StyledComponent/EasyButton';
import Error from '../../Shared/Error';
import Icon from 'react-native-vector-icons/FontAwesome'
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseURL from '../../assets/common/baseUrl';
import axios from 'axios';



const ProductForm = () => {
    
    const [pickerValue, setPieckerValue] = useState();
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
    const [countInStock, setCountInStock] =  useState();
    const [rating, setRating] = useState();
    const [isFeatured, setIsFeatured] = useState(false);
    const [richDescription, setRichDescription] = useState();
    const [numReviews, setNumReviews] = useState(0);
    const [item, setItem] = useState(null);

    return (
        <FormContainer>
            <View>
                <Image source={{uri: mainImage}}/>
                <TouchableOpacity>
                    <Text>Image</Text>
                </TouchableOpacity>
            </View>
            <View> 
                <Text>Brand</Text>
            </View>
            <Input 
                placeholder="Brand"
                name="brand"
                id="brand"
                value={brand}
                onChangeText={(text) =>setBrand(text)}
            />
           
        </FormContainer>
    )
}

export default ProductForm;