// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDhmJJfqmq8GpJvXtChGVsvPWdvjldszIc",
//   authDomain: "cms-ticket-sale-applicat-e5170.firebaseapp.com",
//   projectId: "cms-ticket-sale-applicat-e5170",
//   storageBucket: "cms-ticket-sale-applicat-e5170.appspot.com",
//   messagingSenderId: "508262077423",
//   appId: "1:508262077423:web:4290071624484dd35b9c1a",
//   measurementId: "G-XWK6JPX1QL"
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyC7EVXDh08ZXeae3Qnalr_M1MCbdwLT1ec",
//   authDomain: "cms-data-backup.firebaseapp.com",
//   projectId: "cms-data-backup",
//   storageBucket: "cms-data-backup.appspot.com",
//   messagingSenderId: "691615999225",
//   appId: "1:691615999225:web:aa8e6a38bc5bddd7712e28",
//   measurementId: "G-B8MDW834LR"
// };  

// const firebaseConfig = {
//   apiKey: "AIzaSyB4QI7gr4HdIVWI0LgXrZ7lhGJUm6wdaFM",
//   authDomain: "cms-data-backup-c922b.firebaseapp.com",
//   projectId: "cms-data-backup-c922b",
//   storageBucket: "cms-data-backup-c922b.appspot.com",
//   messagingSenderId: "129332623170",
//   appId: "1:129332623170:web:4fac8f6288029cc32e3adb",
//   measurementId: "G-LWZWFGJJLE"
// };

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

