// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrVIVoc27K88YQTrM41AX1_cbD8p4U9AI",
  authDomain: "modred-cryptxplorer.firebaseapp.com",
  projectId: "modred-cryptxplorer",
  storageBucket: "modred-cryptxplorer.appspot.com",
  messagingSenderId: "157377033835",
  appId: "1:157377033835:web:c4c5f153bb56ffd3b3232e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };
