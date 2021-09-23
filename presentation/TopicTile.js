import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import { db } from '../firebase';

/**
 * A UI Component for rendering the List Items in the Home Screen
 * @param {string} id 
 * @param {string} chatName 
 * @param {void} enterChat 
 * @returns TopicTile
 */
const TopicTile = ({ id, chatName, enterChat }) => {
    const [messages, setMessages] = useState([]);

    /**
     * Pulls the messages for the Chat, required for the preview message
     */
    useEffect(() => {
        const unsubscribe = db
            .collection('chats')
            .doc(id)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => doc.data()))
            });

        return unsubscribe
    }, [])

    return (
        <ListItem key={id} onPress={() => enterChat(id, chatName)}>
            {/* If photoURL is undefined then use placeholder image */}
            <Avatar rounded source={{ uri: messages?.[0]?.photoURL || `https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png` }}/>

            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800" }}>{chatName}</ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail" style={{ marginLeft: -3.5}}> {/* Truncates Text to 1 line */}
                    {messages?.[0]?.displayName}{messages?.[0]?.message ? `:` : ``} {messages?.[0]?.message}             
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default TopicTile

const styles = StyleSheet.create({})