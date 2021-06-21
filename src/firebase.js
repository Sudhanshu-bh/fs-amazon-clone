import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDfOL_MkdYr-oJNqBozTYBVqFHLzZ_W9vM",
  authDomain: "fs--clone.firebaseapp.com",
  projectId: "fs--clone",
  storageBucket: "fs--clone.appspot.com",
  messagingSenderId: "223609104288",
  appId: "1:223609104288:web:9d878ad56b67cc6bcce6c5"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()

export { db, auth }