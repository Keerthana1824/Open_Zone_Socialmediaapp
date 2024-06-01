// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAv5EHJmphfGE_D-MCOj2GRt-GTOvz2wMQ",
  authDomain: "social-media-app-515ee.firebaseapp.com",
  projectId: "social-media-app-515ee",
  storageBucket: "social-media-app-515ee.appspot.com",
  messagingSenderId: "821239803712",
  appId: "1:821239803712:web:f7bc13e1e778b61e4b54a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db =getFirestore(app)