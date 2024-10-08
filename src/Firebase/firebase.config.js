// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9XZOh372yawxBhEmki62uWhXtdU2jM1Q",
  authDomain: "fir-project-2-30df2.firebaseapp.com",
  projectId: "fir-project-2-30df2",
  storageBucket: "fir-project-2-30df2.appspot.com",
  messagingSenderId: "613047833207",
  appId: "1:613047833207:web:c3a4d69c81bae357676c72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;