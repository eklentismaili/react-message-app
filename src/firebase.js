// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from '@firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyByRcfiVfx517ofYOCeZ-mXxDmjVXqFnV4',
  authDomain: 'react-message-app-4a9b8.firebaseapp.com',
  projectId: 'react-message-app-4a9b8',
  storageBucket: 'react-message-app-4a9b8.appspot.com',
  messagingSenderId: '333061052907',
  appId: '1:333061052907:web:a575f73fee4e53e6dd21ae',
  measurementId: 'G-FVQDQBDTTE',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, db, storage };
