// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyCjw6yqsB3wFsj3B_w9KUgcb97QJ1Frf4M",
  authDomain: "fir-project-f8dd2.firebaseapp.com",
  projectId: "fir-project-f8dd2",
  storageBucket: "fir-project-f8dd2.appspot.com",
  messagingSenderId: "275595161691",
  appId: "1:275595161691:web:ad0cd64269ff088e6e8f7e",
  measurementId: "G-QCB257D2GF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);