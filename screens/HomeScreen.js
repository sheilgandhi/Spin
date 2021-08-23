import React, { useLayoutEffect, useState, useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements'
import { auth, db } from '../firebase'
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons"
import TopicTile from '../components/TopicTile'

const HomeScreen = ({ navigation }) => {
    const [chats, setChats] = useState([])

    const signOut = () => {
        auth.signOut().then(() => { navigation.replace("Login") })
    }

    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot((snapshot) =>
            setChats(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }))
            )
        );

        return unsubscribe;
    }, [])

    //navigates before paint
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Spin",
            headerStyle: { backgroundColor: "#e3337d" },
            headerTitleStyle: { color: "white" },
            headerTintColor: "white",
            headerLeft: () => (
                <View style={{ marginRight: 20 }}>
                    <TouchableOpacity onPress={signOut} activeOpacity={0.5}>
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }}/>
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{ marginRight: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate("About")} activeOpacity={0.5}>
                        <AntDesign name="infocirlceo" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            ),
        })
    }, [navigation])

    const enterChat = (id, chatName) => {
        navigation.navigate('Chat', {
            id,
            chatName,
        })
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
            {chats.map(({ id, data: { chatName }}) => (
                    <TopicTile key={id} id={id} chatName={chatName} enterChat={enterChat}/>
                ))}
            </ScrollView>
            <View style={styles.addChat}>
                <TouchableOpacity onPress={() => navigation.navigate("Add Chat")} activeOpacity={0.5}>
                    <SimpleLineIcons name="pencil" size={30} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height: "100%"
    },
    addChat: {
        position: "absolute",
        bottom: 30,
        right: 30,
        backgroundColor: "#e3337d",
        padding: 15,
        borderRadius: 40,
    }
})