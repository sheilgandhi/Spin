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
            title: "Signal",
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
                <View style={{ flexDirection: 'row', justifyContent: "space-between", width: 80, marginRight: 20 }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name="camerao" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Add Chat")} activeOpacity={0.5}>
                        <SimpleLineIcons name="pencil" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            ),
        })
    }, [navigation])



    return (
        <SafeAreaView>
            <ScrollView>
            {chats.map(({ id, data: { chatName }}) => (
                    <TopicTile key={id} id={id} chatName={chatName} />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})