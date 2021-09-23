import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Avatar } from 'react-native-elements'

/**
 * A UI Component for the Receiver in ChatScreen
 * Message Document gets passed in its props
 * @param {*} data 
 * @returns ReceiverBubble
 */
const ReceiverBubble = ({ data }) => {
    return (
        <View style={styles.reciever}>
            <Avatar rounded size={30} position="absolute" bottom={-15} left={-5} source={{
                uri: data.photoURL
            }}/>
            <Text style={styles.recieverName}>
                {data.displayName}
            </Text>
            { data.postImage && // If there is an image
                <Image source={{ uri: data.postImage }} style={{ width: 300, height: 150, marginRight: 15 }} />
            }
            <Text style={styles.recieverText}>
                {data.message}
            </Text>
        </View>
    )
}

export default ReceiverBubble

const styles = StyleSheet.create({
    reciever: {
        padding: 15,
        backgroundColor: "#e3337d",
        alignSelf: "flex-start",
        borderRadius: 20,
        marginLeft: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",

    },
    recieverText: {
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
    },
    recieverName: {
        position: "absolute",
        left: 30,
        bottom: -15,
        paddingRight: 10,
        fontSize: 10,
        color: "black",
    },
})
