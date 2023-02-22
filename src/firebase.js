import firebase from 'firebase/compat/app';
import { getDatabase } from "firebase/database";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/database";
import {getStorage} from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyBfyqD0E_TFZN-iciptOig2iSw3XuS7GyY",
  authDomain: "make-fri.firebaseapp.com",
  projectId: "make-fri",
  storageBucket: "make-fri.appspot.com",
  messagingSenderId: "847788952698",
  appId: "1:847788952698:web:e1cce8d6a40fd9dd2c7fc3"
};


const fireDb=firebase.initializeApp(firebaseConfig);
export const storage=getStorage(fireDb);
export default fireDb.database().ref();