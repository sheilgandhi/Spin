import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import AddChatScreen from './screens/AddChatScreen';
import ChatScreen from './screens/ChatScreen';
import AboutScreen from './screens/AboutScreen';
import CameraScreen from './screens/CameraScreen';

const Stack = createNativeStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: "#e3337d" },
  headerTitleStyle: { color: "white" },
  headerTintColor: "white",
}

/**
 * Holds all routes and Stack Navigation for the app
 * https://reactnavigation.org/docs/hello-react-navigation
 * @returns App
 */
export default function App() {
  return (
    // NavigationContainer stacks screens
    <NavigationContainer> 
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Home" screenOptions={globalScreenOptions}>
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Sign Up' component={SignUpScreen} />
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Add Chat' component={AddChatScreen} />
        <Stack.Screen name='Chat' component={ChatScreen} />
        <Stack.Screen name='About' component={AboutScreen} />
        <Stack.Screen name='Camera' component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});