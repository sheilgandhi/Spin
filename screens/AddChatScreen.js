import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input, ThemeProvider } from 'react-native-elements'
import Icon from "react-native-vector-icons/FontAwesome"
import { db } from '../firebase'

const AddChatScreen = ({ navigation }) => {
    const [input, setInput] = useState("");

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

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a New Group",
            headerBackTitle: "Chats"

        })
    }, [navigation]);

    const theme = {
        colors: {
          primary: '#e3337d',
        }
    }
      
    return (
        <View style={styles.container}>
            <Input 
                placeholder="Enter a chat name" 
                value={input} 
                onChangeText={(text) => setInput(text)} 
                onSubmitEditing={createChat}
                leftIcon={
                    <Icon name="wechat" type="antdesign" size={24} color="black" />
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
