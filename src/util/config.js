import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8LlfOsmJiqWMM3Dl5RqHkYkPENp27QEU",
  authDomain: "carsale-6f379.firebaseapp.com",
  databaseURL: "https://carsale-6f379.firebaseio.com",
  projectId: "carsale-6f379",
  storageBucket: "carsale-6f379.appspot.com",
  messagingSenderId: "870357376576",
  appId: "1:870357376576:web:9ab24f5fac358ba51cc9a5",
  measurementId: "G-6R9M2HJF4M",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

//db Firebase
const db = firebase.firestore();

//storageBucket
const bucket = firebase.storage();

// Create a root reference
const storageRef = firebase.storage().ref();

export { app, db, bucket, storageRef };

//// "firebase": "^6.0.0",
// "firebase-admin": "^7.3.0",
// "firebase-functions": "^2.3.1",
