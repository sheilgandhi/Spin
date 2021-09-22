import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Avatar } from 'react-native-elements'

const SenderBubble = ({ data }) => {
    return (
        <View style={styles.sender}>
            <Avatar rounded size={30} position="absolute" bottom={-15} right={-5} source={{
                uri: data.photoURL
            }}/>
            { data.postImage &&
                <Image source={{ uri: data.postImage }} style={{ width: 300, height: 150, marginRight: 15 }} />
            }
            <Text style={styles.senderText}>
                    {data.message}
            </Text>
        </View>
    )
}

export default SenderBubble

const styles = StyleSheet.create({
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
})
