// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from   "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqKiJ_tOxzB42ec-M1MfLmBrGlujPxUqc",
  authDomain: "trip-guruji-7ecb1.firebaseapp.com",
  projectId: "trip-guruji-7ecb1",
  storageBucket: "trip-guruji-7ecb1.firebasestorage.app",
  messagingSenderId: "627561669397",
  appId: "1:627561669397:web:d08fda38d38913bc82bf1c",
  measurementId: "G-X6ZPW8TYX4"
};
// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)


