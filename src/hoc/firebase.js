import { initializeApp } from "firebase/app";
import { getDatabase } from "@firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1WkN8yRxmCv22PMLcI0zq63q3Hp4ayJA",
  authDomain: "cliques-52135.firebaseapp.com",
  databaseURL: "https://cliques-52135.firebaseio.com",
  projectId: "cliques-52135",
  storageBucket: "cliques-52135.appspot.com",
  messagingSenderId: "784168835827",
  appId: "1:784168835827:web:33cf3c15c2a12950a0f586",
  measurementId: "G-HD7HB1XRBC",
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
