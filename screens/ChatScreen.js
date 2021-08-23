import React, { useLayoutEffect, useState, useRef } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableWithoutFeedback, TouchableOpacity, Keyboard, Platform, KeyboardAvoidingView, ScrollView, TextInput } from 'react-native'
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons"
import { Avatar } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar'
import { auth, db } from '../firebase'
import * as firebase from "firebase";

const ChatScreen = ({ navigation, route }) => {
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])
    const scrollViewRef = useRef();

    console.log(messages)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerTitleAlign: "left",
            headerBackTitleVisible: false,
            headerTitle: () => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Avatar 
                        rounded 
                        source={{ 
                            uri: messages[messages.length-1]?.data.photoURL,
                        }} />
                    <Text h1 style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>{route.params.chatName}</Text>
                </View>
            ),
            headerRight: () => (
                <View style={{ flexDirection: 'row', justifyContent: "flex-end", width: 80, marginRight: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate("About")} activeOpacity={0.5}>
                        <AntDesign name="infocirlceo" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation, messages])

    const sendMessage = () => {
        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(), // Servers timestamp to deal with timezones
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        });

        setInput(""); // Clears input
        Keyboard.dismiss(); // Hides Keyboard

    }

    useLayoutEffect(() => {
        const unsubscribe = db
            .collection('chats')
            .doc(route.params.id)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot(snapshot => setMessages(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }))))

        return unsubscribe;
    }, [route])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBar style="light" />
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} enabled style={styles.container} keyboardVerticalOffset={175}>
                <>
                        <ScrollView 
                            contentContainerStyle={{ paddingTop: 15 }} 
                            fadingEdgeLength={50} 
                            ref={scrollViewRef}
                            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: false })} 
                        >
                            {
                                messages.map(({ id, data }) => (
                                    data.email === auth.currentUser.email ? (
                                    // sender
                                    <View key={id} style={styles.sender}>
                                        <Avatar rounded size={30} position="absolute" bottom={-15} right={-5} source={{
                                            uri: data.photoURL
                                        }}/>
                                        <Text style={styles.senderText}>
                                            {data.message}
                                        </Text>
                                    </View>
                                    ) : (
                                    // reciever 
                                    <View  key={id} style={styles.reciever}>
                                        <Avatar rounded size={30} position="absolute" bottom={-15} left={-5} source={{
                                            uri: data.photoURL
                                        }}/>
                                        <Text style={styles.recieverText}>
                                            {data.message}
                                        </Text>
                                        <Text style={styles.recieverName}>
                                            {data.displayName}
                                        </Text>
                                    </View>
                                    )
                                ))
                            }
                        </ScrollView>

                        <View style={styles.footer}>
                            <TouchableOpacity onPress={() => {}} activeOpacity={0.5} style={{ marginRight: 15 }}>
                                <Ionicons name="camera" size={26} color="#e3337d" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {}} activeOpacity={0.5} style={{ marginRight: 15 }}>
                                <Ionicons name="image" size={24} color="#e3337d" />
                            </TouchableOpacity>
                            <TextInput 
                                style={styles.input} 
                                value={input} 
                                onChangeText={(text) => setInput(text)} 
                                onSubmitEditing={input === "" ? () => {} : sendMessage}
                                placeholder="Type a Message..." />
                            <TouchableOpacity onPress={input === "" ? () => {} : sendMessage} activeOpacity={0.5}>
                                <Ionicons name="send" size={24} color="#e3337d" />
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
        flex: 1,

    },
    scroll: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    sender: {
        padding: 15,
        backgroundColor: '#ececec',
        alignSelf: 'flex-end',
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",
    },
    senderText: {
        color: "black",
        fontWeight: "500",
        marginRight: 10,
    },
    reciever: {
        padding: 15,
        backgroundColor: "#e3337d",
        alignSelf: "flex-start",
        borderRadius: 20,
        margin: 15,
        maxWidth: "80%",
        position: "relative",

    },
    recieverText: {
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15,
    },
    recieverName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: "white"
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: "100%",
        padding: 15
    },
    input: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        // borderColor: "transparent",
        backgroundColor: "#ececec",
        // borderWidth: 1,
        padding: 10,
        borderRadius: 30,
    },
})
