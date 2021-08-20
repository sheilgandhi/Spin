import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Platform, KeyboardAvoidingView, ScrollView, TextInput } from 'react-native'
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons"
import { Avatar } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar'

const ChatScreen = ({ navigation, route }) => {
    const [input, setInput] = useState('')

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerTitleAlign: "left",
            headerBackTitleVisible: false,
            headerTitle: () => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Avatar rounded source={{ uri: `https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png`}} />
                    <Text h1 style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>{route.params.chatName}</Text>
                </View>
            ),
            headerRight: () => (
                <View style={{ flexDirection: 'row', justifyContent: "flex-end", width: 80, marginRight: 20 }}>
                    <TouchableOpacity>
                        <AntDesign name="infocirlceo" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [])

    const sendMessage = () => {}

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBar style="light" />
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container} keyboardVerticalOffset={90}>
                <>
                    <ScrollView>

                    </ScrollView>
                    <View style={styles.footer}>
                        <TextInput vale={input} onChangeText={(text) => setInput(text)} placeholder="Type a Message..." />
                        <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>

                        </TouchableOpacity>
                    </View>
                </>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {

    },
    footer: {},
})
