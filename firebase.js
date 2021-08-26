import * as firebase from "firebase";
// Optionally import the services that you want to use
import "firebase/auth";
//import "firebase/database";
import "firebase/firestore";
import { LogBox } from "react-native";
//import "firebase/functions";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDyKbTGAW9xkyv3gmygmBGd4WmSN-q6J84",
  authDomain: "spin-dd9be.firebaseapp.com",
  projectId: "spin-dd9be",
  storageBucket: "spin-dd9be.appspot.com",
  messagingSenderId: "974354802314",
  appId: "1:974354802314:web:0ae84f8502380fd7102f73"
};

let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

LogBox.ignoreLogs([`Setting a timer for a long period`]);

export { db, auth, storage }