
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Toast from 'react-native-toast-message';

import FormContainer from '../../Shared/Forms/FormContainer'
import Input from '../../Shared/Forms/Input';
import Error from '../../Shared/Error';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';


// button 
import EasyButton from '../../Shared/StyledComponent/EasyButton'

const Register = (props) => {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("")
    const [disable, setDisable] = useState(false);


    const register = () => {
        if(
            email === '' || 
            name === '' ||  
            phone === '' || 
            password === '' 
            ){
                setErr(" restart the app and Please fill all required fields ")
        }

        let user = {
            name: name,
            email: email,
            password: password,
            phone: phone,
            isAdmin: false
        }

        axios
        .post(`${baseURL}users/register`,user)
        .then((res) => {
            if(res.status == 200) {
                Toast.show({
                    topOffset: 60, 
                    type: "success", 
                    text1: "Registration succeeded",
                    text2: "Please Login into your account"
                })
                setTimeout(() => {
                    props.navigation.navigate('LoginPage')
                }, 500)
            }
        })
        .catch((err) => {
            Toast.show({
                topOffset: 60, 
                type: "error",
                text1: "something went wrong",
                text2: "Please try again"
            })
            console.log("this is error from register: ", err)
        })
    }

    return (
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={50}
            enableOnAndroid={true}

        >
            <FormContainer title={"Register"}>
                <Input
                    placeholder={'Enter your name'}
                    name={'name'}
                    id={'name'}
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Input
                    placeholder={'Enter your phone No'}
                    name={'phone'}
                    id={'phone'}
                    value={phone}
                    keyboardType={'numeric'}
                    onChangeText={(text) => setPhone(text)}
                />
                <Input
                    placeholder={'Enter your Email'}
                    name={'email'}
                    id={'email'}
                    value={email}
                    onChangeText={(text) => setEmail(text.toLowerCase())}
                />
                <Input
                    placeholder={'Enter your password'}
                    name={'password'}
                    id={'password'}
                    value={password}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />
               {/*  <View style={styles.buttonGroup}>
                   
                    <Button title="Login" onPress={() => HandleSubmit()} />
                </View> */}
                <View style={{ marginTop: 40 }, styles.buttonGroup}>
                {err ? <Error message={err} style={{marginBottom: 10}} /> : null}
                    <EasyButton
                     medium primary
                     style={{marginTop: 30}}
                     disabled={disable}
                    onPress={() => {register(),
                                setDisable(true)
                    }
                        
                      } >
                          <Text>Register</Text>
                    </EasyButton>
                </View>
                <View style={{marginTop: 5}}>
                    <EasyButton large secondary
                     onPress={() => props.navigation.navigate("LoginPage")}
                      >
                          <Text style={{ color: 'white' }}>Back to Login</Text>
                    </EasyButton> 
                </View>
            </FormContainer>
        </KeyboardAwareScrollView>

    )
}

const styles = StyleSheet.create({
    buttonGroup: {
        width: '80%',
        margin: 10,
        alignItems: 'center'
    }
})


export default Register;