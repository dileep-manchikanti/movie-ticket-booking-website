import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyCNYZwWJ5I9mmpnpx_3AOx9bckaI-ZUXSM",
  authDomain: "movie-ticket-booking-9d06b.firebaseapp.com",
  databaseURL: "https://movie-ticket-booking-9d06b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "movie-ticket-booking-9d06b",
  storageBucket: "movie-ticket-booking-9d06b.appspot.com",
  messagingSenderId: "1082123526625",
  appId: "1:1082123526625:web:352131b086bb663e7c32a0"
};

export const app=initializeApp(firebaseConfig);