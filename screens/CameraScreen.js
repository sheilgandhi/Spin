import { Camera } from 'expo-camera';
import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { Entypo, Ionicons } from "@expo/vector-icons"


const CameraScreen = ({ navigation, route }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.front);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);

    const { id, chatName } = route.params;

    useEffect(() => {
        (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const takePicture = async () => {
        if(camera){
            const data = await camera.takePictureAsync(null)
            // console.log(data)
            setImage(data.uri)
        }
    }

    return (
        <View style={styles.container}>
          <Camera style={styles.camera} type={type} ratio={"16:9"} ref={ref => setCamera(ref)}>
            <View style={styles.buttonContainer}>
              <View style={styles.innerButtonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}>
                <Ionicons name="camera-reverse" size={36} color="#e3337d" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={takePicture}
              >
                <Entypo name="circle" size={96} color="#e3337d" />
              </TouchableOpacity>
                {
                    image ?
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => navigation.navigate('Chat', {cameraImage: image, id: id, chatName: chatName})}
                    >
                      <Ionicons name="send" size={36} color="#e3337d" />
                      <Image source={{ uri: image }} style={{ width: 60, height: 60 }} />
                    </TouchableOpacity>
                    : <View style={{ width: 136 }} />
                }
                </View>
            </View>
          </Camera>
        </View>
      );
}
    
export default CameraScreen

const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      camera: {
        flex: 1,
      },
      buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-evenly',
        // marginLeft: 36,
        // backgroundColor: 'white'
      },
      innerButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingBottom: 15,
      },
      button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
      },
      text: {
        fontSize: 18,
        color: 'white',
      },
    });
    
