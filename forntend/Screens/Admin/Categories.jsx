import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    Dimensions,
    TextInput,
    StyleSheet
} from 'react-native';

import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EasyButton from '../../Shared/StyledComponent/EasyButton';



var { width } = Dimensions.get('window');


// a simple component 
const Item = (props) => {

    return(
        <View style={styles.item}>
            <Text>{props.item.name}</Text>
            <EasyButton
             medium
              danger
              // onPress
              onPress = {() => props.delete(props.item._id)}
              > 
                <Text style={{color: 'white', fontWeight: 'bold'}}>Delete</Text>
            </EasyButton>
        </View>
    )

}

const Categories = () => {

    const [categories, setCategories] = useState([])
    const [categoryName, setCategoryName] = useState()
    const [token, setToken] = useState();


    useEffect(() => {

        AsyncStorage.getItem('jwt')
        .then((res) => {
            setToken(res)
        })
        .catch((err) => console.log(err))

        axios
        .get(`${baseURL}categories`)
        .then((res) => {
           /*  console.log('response from get cate', res) */
            setCategories(res.data)
        })
        .catch((err) => alert(
            "Error to load category"
        ))

        return () => {
            setCategories()
            setToken()
        }

    },[])


    const addCategory = () => {
        const category = {
            name: categoryName,
        };

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        axios.post(`${baseURL}categories`, category, config)
             .then((res) => {
                 setCategories([...categories, res.data])
             })
             .catch((err) => alert("something went wrong.Please try again"))

            // this will leave the input field emty again after adding 
             setCategoryName("");
    
    }

     const deleteCategory = (id)=> {
        console.log("delete func was called ")
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        axios.delete(`${baseURL}categories/${id}`, config)
             .then((res) => {
                 const newCategoryList = categories.filter((item) => item._id !==id );
                 setCategories(newCategoryList);
                 console.log("category is deleted")
             })
             .catch((err) => alert("something went wrong.Please try again"))
 
    } 


    return (
        <View style={{ position: 'relative', height: '100%' }}>
            <View style={{marginBottom: 60}}>
                <FlatList
                    data={categories}
                    renderItem={({ item, index }) => (
                    <Item item={item} index={index} delete={deleteCategory}/>)   
                    }
                    keyExtractor={(item) => item.id}

                />
            </View>
            <View style={styles.bottomBar}>
                <View>
                    <Text>Add Category</Text>
                </View>
                <View style={{ width: width / 2.5 }}>
                    <TextInput
                        value={categoryName}
                        style={styles.input}
                        onChangeText={(text) => setCategoryName(text)}
                    />
                </View>
                <View>
                    <EasyButton
                     medium
                    primary 
                    onPress={() => addCategory()}
                    >
                        <Text style={{color: 'white' , fontWeight: 'bold'}}>Submit</Text>
                    </EasyButton>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    bottomBar: {
        backgroundColor: 'white',
        width: width,
        height: 60,
        padding: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
         bottom: 0,
        left: 0
    },
    input: {
        height: 40,
        borderColor: 'orange',
        borderWidth: 1
    },
    item: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height:2,
        
        },
        shadowOpacity: 0.2,
        shadowRadius: 1, 
        elevation: 1, 
        padding: 5,
        margin: 5,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        borderRadius: 5
    }
})

export default Categories;