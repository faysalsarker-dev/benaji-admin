// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyND7bt2fsaV0dsU9WsDFoj6kyEqYzxJ4",
  authDomain: "benaji-501fc.firebaseapp.com",
  projectId: "benaji-501fc",
  storageBucket: "benaji-501fc.appspot.com",
  messagingSenderId: "969310647950",
  appId: "1:969310647950:web:13a24df8ac1fb4bb033bdf"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

export default app