// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAXW-gZW3aba4ezmBnY6z_q03QkbhqPMsU",
    authDomain: "redux-cart-510f1.firebaseapp.com",
    projectId: "redux-cart-510f1",
    storageBucket: "redux-cart-510f1.appspot.com",
    messagingSenderId: "204032088859",
    appId: "1:204032088859:web:a24a54b17ef8bbff8c51be"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app)
const auth = getAuth(app)
export {fireDB, auth}