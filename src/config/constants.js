import firebase from 'firebase'

const config = {
 apiKey: "AIzaSyC-JyFNdzYHALimK6IIExKRtPS1wUAdSoU",
    authDomain: "ratio-eefde.firebaseapp.com",
    databaseURL: "https://ratio-eefde.firebaseio.com",
    storageBucket: "ratio-eefde.appspot.com",
    messagingSenderId: "306275695478"
};

firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
export const dbRefObject = firebase.database().ref().child('users');
