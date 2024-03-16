// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics"; // If we want to use analytics
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

// To use Storage from firebase to store files/images
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBr3ByI1DkOPW22HIGedR4SvZx71jgnA_o",
  authDomain: "authentication-managemen-cd633.firebaseapp.com",
  projectId: "authentication-managemen-cd633",
  storageBucket: "authentication-managemen-cd633.appspot.com",
  messagingSenderId: "188923939621",
  appId: "1:188923939621:web:c5c12ec1c3c2224b4d28cc",
  measurementId: "G-3LC7CNNJ86"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth=getAuth(app);
export const googleProvider=new GoogleAuthProvider();
export const db=getFirestore(app);

export const storage=getStorage(app);