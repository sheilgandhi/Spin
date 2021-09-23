import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input, ThemeProvider } from 'react-native-elements'
import Icon from "react-native-vector-icons/FontAwesome"
import { db } from '../firebase'

/**
 * A Screen to add a new Chat to the app
 * @param {*} navigation 
 * @returns AddChatScreen
 */
const AddChatScreen = ({ navigation }) => {
    const [input, setInput] = useState("");

    /**
     * Asynchronuously performs (C)RUD - Creates new Chat
     * Then navigates back to Home Screen
     * https://youtu.be/MJzmZ9qmdaE
     */
    const createChat = async () => {
        await db
        .collection('chats')
        .add({
            chatName: input,
        })
        .then(() => {
            navigation.goBack();
        })
        .catch((error) => alert(error));
    };

    /**
     * Masthead Name of Screen
     */
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a New Group",
            headerBackTitle: "Chats"

        })
    }, [navigation]);

    /**
     * Provides appropriate styling props to React Native Elements Button
     * https://stackoverflow.com/questions/42126452/how-can-i-specify-a-default-color-for-a-react-native-elements-button
     */
    const theme = {
        colors: {
          primary: '#e3337d',
        }
    }
     
    /**
     * Renders an input which fires off appropriate functions
     * Button is disabled without text input
     */
    return (
        <View style={styles.container}>
            <Input 
                placeholder="Enter a chat name" 
                value={input} 
                onChangeText={(text) => setInput(text)} 
                onSubmitEditing={createChat}
                leftIcon={
                    <Icon name="commenting-o" type="fontawesome" size={24} color="black" />
                }
            />
            <ThemeProvider theme={theme}>
                <Button disabled={input === "" ? true : false} onPress={createChat} title="Create Chat" type="solid" />
            </ThemeProvider>
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 30,
        height: "100%"

    }
})
