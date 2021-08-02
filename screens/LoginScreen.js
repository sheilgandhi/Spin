import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'
import { Button, Input, Image, ThemeProvider } from "react-native-elements"

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const signIn = () => {}

    const theme = {
        colors: {
          primary: '#e3337d',
        }
      }

    return (
        // Keyboard avoiding for when keyboard needs to open up
        <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
            <StatusBar style="light" />
            <Image 
                style={{ width: 280, height: 280 }}
                source={require('../assets/icon.png')} 
            />
            <View style={styles.inputContainer}>
                <Input 
                    placeholder="Email" 
                    autoFocus 
                    type="email"
                    value={email}
                    onChangeText={text => setEmail(text)} 
                />
                <Input 
                    placeholder="Password" 
                    secureTextEntry
                    type="password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    onSubmitEditing={signIn}
                />
            </View>

            <ThemeProvider theme={theme} >
                <Button containerStyle={styles.button} onPress={signIn} title='Sign In' type='solid' />
                <Button containerStyle={styles.button} onPress={() => navigation.navigate('Sign Up')} title='Sign Up' type='outline' />
            </ThemeProvider>
            <View style={{ height: 100}} /> 
            {/* Extra padding from keyboard */}
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

// Stylesheets instead of css
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white"
    },
    inputContainer: {
        marginTop: 15,
        width: 300,
    },
    button: {
        width: 280,
        marginTop: 10,
    }
})