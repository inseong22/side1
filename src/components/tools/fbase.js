import firebase from "firebase/compat/app"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import "firebase/compat/firestore";
import "firebase/compat/storage";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDH_xQF-kBsVMEDwLNDJubGrzOp0Qnr_iU",
  authDomain: "kiwi-d5dd3.firebaseapp.com",
  projectId: "kiwi-d5dd3",
  storageBucket: "kiwi-d5dd3.appspot.com",
  messagingSenderId: "335393250887",
  appId: "1:335393250887:web:231c18d1aa6d4356891b62",
  measurementId: "G-7FJX546NWQ"
};

// Initialize Firebase
// export const app = firebase.initializeApp(firebaseConfig);
// export const firebaseInstance = firebase;
// const analytics = getAnalytics(app);
// export const dbService = app.firestore();
// export const stService = app.storage();

export const app = firebase.initializeApp(firebaseConfig);
export const firebaseInstance = firebase;
export const dbService = firebase.firestore();
export const stService = app.storage();