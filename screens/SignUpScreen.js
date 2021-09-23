import { StatusBar } from 'expo-status-bar'
import React, { useState, useLayoutEffect } from 'react'
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import { Button, Input, Text, ThemeProvider } from "react-native-elements"
import { auth } from '../firebase'

/**
 * A screen where a user can register for Spin
 * @param {*} navigation 
 * @returns SignUpScreen
 */
const SignUpScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    /**
     * Navigates before paint
     * Adds visible next to back button for iOS
     */
    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back",

        })
    }, [navigation])

    /**
     * Encrypted connection to Firebase Authentication
     * Which then adds properties for the user profile
     */
    const signUp = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then(authUser => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL: imageUrl || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
            })
        })
        .catch((error) => alert(error.message));
    }

    /**
     * Theme used for React Native Elements Button
     */
    const theme = {
        colors: {
          primary: '#e3337d',
        }
      }

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style="light" />

            <Text h3 style={{ marginBottom: 50 }}>
                Sign Up for Spin
            </Text>

            <View style={styles.inputContainer}>
                <Input placeholder="Full Name" autofocus type='text' value={name} onChangeText={(text) => setName(text)}/>
                <Input placeholder="Email" type='email' value={email} onChangeText={(text) => setEmail(text)}/>
                <Input placeholder="Password" secureTextEntry type='password' value={password} onChangeText={(text) => setPassword(text)}/>
                <Input placeholder="Image URL (optional)" type='text' value={imageUrl} onChangeText={(text) => setImageUrl(text)} onSubmitEditing={signUp}/>
            </View>

            <ThemeProvider theme={theme} >
                <Button containerStyle={styles.button} raised onPress={signUp} title='Sign Up' />
            </ThemeProvider>

            <View style={{ height: 100}} /> 
            {/* Extra padding from keyboard */}
        </KeyboardAvoidingView>
    )
}

export default SignUpScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white"
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 280,
        marginTop: 10,
    },
})
