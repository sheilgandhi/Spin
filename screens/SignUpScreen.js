import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import { Button, Input, Text, ThemeProvider } from "react-native-elements"

const SignUpScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const signUp = () => {}

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