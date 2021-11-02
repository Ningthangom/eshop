
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import FormContainer from '../../Shared/Forms/FormContainer'
import Input from '../../Shared/Forms/Input'
import Error from '../../Shared/Error'

// context api 
import AuthGloble from "../../contextAPI/store/AuthGloble";
import {loginUser} from "../../contextAPI/actions/Auth_action"


const Login = (props) => {

    const context = useContext(AuthGloble)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState("");
    const [disable, setDisable] = useState(false);



    useEffect(() => {
        if(context.stateUser.isAuthenticated === true) { 
            props.navigation.navigate("UserProfilePage")
        } 
    }, [context.stateUser.isAuthenticated])


    const HandleSubmit = () => {
       /*  console.log("handleSubmit is called"); */
        const user = {
            email,
            password
        }
        if(email === "" || password === "") {
            /* console.log("checked password and email"); */
            setErr('Please fill in your credentials');
        }else{
           
            loginUser(user, context.dispatch);
            /* console.log("login success"); */
        }
    }


    return (
        <FormContainer title={"Login"}>
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
            <View style={styles.buttonGroup}>
                {err ? <Error message={err} /> : null }
                <Button
                 title="Login"
                 disabled={disable}
                 onPress = {() =>{ HandleSubmit()}}/>
            </View>
            <View style={{ marginTop: 40}, styles.buttonGroup}>
            
               
               <Text style = {styles.middleText}> 
               Don't have an account yet? 
               </Text>
               <Button title = "Register" onPress = {() => props.navigation.navigate("RegisterPage")}/>
            </View>
        </FormContainer>
    )
}


const styles = StyleSheet.create({
    buttonGroup: {
        width: '80%',
        alignItems: 'center',
    }, 
    middleText: {
         marginTop: 20,
         alignSelf: 'center'
    }

})


export default Login;