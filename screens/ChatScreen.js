import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native'
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons"
import { Avatar } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar'

const ChatScreen = ({ navigation, route }) => {

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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBar style="light" />
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container} keyboardVerticalOffset={90}>

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        
    }
})
