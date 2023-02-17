import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCF6AenNkODA8mXQhWyiwZhg_faskWeCKw",
  authDomain: "hellojii.firebaseapp.com",
  projectId: "hellojii",
  storageBucket: "hellojii.appspot.com",
  messagingSenderId: "476760235282",
  appId: "1:476760235282:web:8c39abc9b331037eae67cb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();