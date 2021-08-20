import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'

const TopicTile = ({ id, chatName, enterChat }) => {
    return (
        <ListItem>
            <Avatar rounded source={{ uri: `https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png` }}/>

            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800" }}>{chatName}</ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail"> {/* Truncates Text to 1 line */}
                    Youtube                
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default TopicTile

const styles = StyleSheet.create({})