import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'

/**
 * A Screen for providing the user with rules and an app description
 * @param {*} navigation 
 * @returns AboutScreen
 */
const AboutScreen = ({ navigation }) => {

    /**
     * In a ScrollView Text is provided with an app description and rules of service
     */
    return (
        <View>
            <ScrollView contentContainerStyle={{ padding: 15 }}>
                <Text style={styles.header}>Welcome to Spin</Text>
                <Text style={styles.paragraph}>
                Spin is a public messaging platform. On Spin, users can expect to find groups 
                based on any topic of their interest and “spin a yarn”. The message exchanging 
                platform allows users to create topics of interest for other users to find and 
                join them in a conversation. 
                </Text>
                {/* https://stackoverflow.com/questions/40117640/react-native-how-to-combine-external-and-inline-styles */}
                <Text style={[styles.header, { marginTop: 10 }]}>Rules</Text>
                <Text style={styles.paragraph}>
                    Users must be respectful of each other to all members in the community.  {'\n\n'}
                    <Text style={styles.title}>1. Content on the Services</Text> {'\n'}Please do not use any language that is harmful or disrespectful to others. Any images or online content 
                    uploaded by every user must be appropriate for anyone to see. This involves any form nudity or coarse language. Failure to do so 
                    will result in a users account being terminated. Spin is for everyone and stands against prejudice. {'\n\n'}
                    <Text style={styles.title}>2. Who May Use the Services</Text> {'\n'}You may use the Services only if you agree to form a binding 
                    contract with Spin and are not a person barred from receiving services under the laws of 
                    the applicable jurisdiction. In any case, you must be at least 13 years old. {'\n\n'}
                    <Text style={styles.title}>3. Privacy</Text>{'\n'}We handle your information through Google's Firebase. Firebase provide excellent services
                    upon which we rely. Any sensitive information will not be seen by any of our team, even if we tried. Google have their own 
                    security features on the software, on which we built Spin. All concerns about security follow the
                    Mobile AppSec Verification Standard.  {'\n\n'}
                </Text>
            </ScrollView>
        </View>
    )
}

export default AboutScreen

const styles = StyleSheet.create({
    header: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    paragraph: {
        paddingTop: 10,
        fontSize: 16,
    },
    title: {
        color: '#e3337d',
        fontWeight: 'bold',
        fontSize: 18,
    }
})
