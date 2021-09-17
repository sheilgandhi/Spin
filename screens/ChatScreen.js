import React, { useLayoutEffect, useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Keyboard, Platform, KeyboardAvoidingView, ScrollView, TextInput } from 'react-native'
import { AntDesign, Ionicons } from "@expo/vector-icons"
import { Avatar } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar'
import { auth, db, storage } from '../firebase'
import * as firebase from "firebase";
import * as ImagePicker from 'expo-image-picker';
import SenderBubble from '../components/SenderBubble'
import ReceiverBubble from '../components/ReceiverBubble'

const ChatScreen = ({ navigation, route }) => {
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])
    const scrollViewRef = useRef();
    const [image, setImage] = useState(null);

    const { cameraImage } = route.params;

    useEffect(() => setImage(cameraImage), [cameraImage])

    /**
     * On load of Image Picker asks for Permission to user images
     * https://docs.expo.dev/versions/latest/sdk/imagepicker/
     */
    useEffect(() => {
        (async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
        })();
    }, []);

  /**
   * Opens phones native image picker component
   * Sets Image to state
   * https://docs.expo.dev/versions/latest/sdk/imagepicker/
   */
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    //   console.log(image)
    }

  };

    /**
     * The masthead displays the image of most recent message sender, chat name 
     * and chrome to navigate to About page which consists of chat rules
     */
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
                            uri: messages[messages.length-1]?.data.photoURL, // uri of most recent user
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

    /**
     * (C)R(U)D - Performs create i.e., uploads new messages to chat
     * In terms of Update - The way the image is uploaded, it is uploaded after creation
     * and appended to newly created message
     * If no input or image then return
     */
    const sendMessage = () => {
        // If both image and input (message) are null leave method
        if(!image && input === ""){
            return;
        }

        // Add message with relevant information to the chats message collection
        db.collection('chats').doc(route.params.id).collection('messages').add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(), // Servers timestamp to deal with timezones
                message: input,
                displayName: auth.currentUser.displayName,
                email: auth.currentUser.email,
                photoURL: auth.currentUser.photoURL
        }).then(
            doc => {
                if(image){
                    (async () => { // Asynchronuous
                        const res = await fetch(image) // get image location
                        const blob = await res.blob() // coverts file path to blob

                    const uploadTask = storage.ref(`posts/${doc.id}`).put(blob); // uploads blob to firebase storage bucket
                    // console.log(uploadTask)
                    setImage(null)

                    /*
                     * In differing state do the following:
                     * In Progress State - do nothing i.e. null
                     * In Error State - print error to console
                     * In Complete State - Retrieved the uploaded image's url and append/merge it to the corresponding post
                     */
                    uploadTask.on('state_change', null, error => console.error(error), () => {
                        // when upload completes
                        storage.ref(`posts`).child(doc.id).getDownloadURL().then(url => {
                            db.collection('chats').doc(route.params.id).collection('messages').doc(doc.id).set({
                                postImage: url,
                            }, { merge: true })
                        })
                    })
                })()
                }
            }
        )

        // console.log("Upload done")
        setInput(""); // Clears input
        Keyboard.dismiss(); // Hides Keyboard

    }

    /**
     * Similar to a useEffect, re-renders on update of messages
     * Pulls messages from corresponding chat
     * Does first render on route change
     */
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

    /**
     * Renders all messages in a ScrollView
     * The Bottom Bar raises with KeyboardAvoidingView
     */
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBar style="light" />
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} enabled style={styles.container} keyboardVerticalOffset={175}>
                <>
                        <ScrollView 
                            contentContainerStyle={{ paddingTop: 15 }} 
                            // fadingEdgeLength={50} 
                            ref={scrollViewRef}
                            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: false })} 
                        >
                            {
                                messages.map(({ id, data }) => (
                                    // console.log(data),
                                    data.email === auth.currentUser.email ? (
                                    // sender
                                    <SenderBubble key={id} data={data} />
                                    ) : (
                                    // reciever 
                                    <ReceiverBubble key={id} data={data} />
                                    )
                                ))
                            }
                        </ScrollView>

                        <View style={styles.footer}>
                            <TouchableOpacity onPress={() => navigation.navigate("Camera", {id: route.params.id, chatName: route.params.chatName})} activeOpacity={0.5} style={{ marginRight: 15 }}>
                                <Ionicons name="camera" size={26} color="#e3337d" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={pickImage} activeOpacity={0.5} style={{ marginRight: 15 }}>
                                <Ionicons name="image" size={24} color="#e3337d" />
                            </TouchableOpacity>
                            {image &&
                                <Image source={{ uri: image }} style={{ width: 30, height: 30, marginRight: 15 }} />
                            }
                            <TextInput 
                                style={styles.input} 
                                value={input} 
                                onChangeText={(text) => setInput(text)} 
                                onSubmitEditing={sendMessage}
                                placeholder="Type a Message..." />
                            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
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
