// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// this was the basic firebase boilerplate provided in order to get firestore working

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAt9DHXvvp_avwBOumHxIAm-rgYGu07u0Y",
  authDomain: "ask-comets-2.firebaseapp.com",
  projectId: "ask-comets-2",
  storageBucket: "ask-comets-2.appspot.com",
  messagingSenderId: "259293695696",
  appId: "1:259293695696:web:7b736b63be4921003bd8d5",
  measurementId: "G-YM2WX7806V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();


