// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyALK4vXQMaNUm65SdgRi7vIxQcNuhWo3vU",
  authDomain: "backup-2-fe2f2.firebaseapp.com",
  projectId: "backup-2-fe2f2",
  storageBucket: "backup-2-fe2f2.appspot.com",
  messagingSenderId: "277619291464",
  appId: "1:277619291464:web:cd14fe221db16c340cef7d",
  measurementId: "G-6G57R3H91Z"
};

  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

