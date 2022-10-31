// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth" 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBu_RArEzO-fMfFBqHodY8eKGIDYf2lmuE",
  authDomain: "chatapptrial-edbc9.firebaseapp.com",
  projectId: "chatapptrial-edbc9",
  storageBucket: "chatapptrial-edbc9.appspot.com",
  messagingSenderId: "677518731370",
  appId: "1:677518731370:web:b00a7bb951066337f48213"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export {auth}