// Import the functions you need from the SDKs you need
import { getAuth } from '@firebase/auth';
import { getFirestore } from '@firebase/firestore';

import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAx2tR2Jk909X-Xes6wFRhdgEOlh55dmk8',
  authDomain: 'quanto-gastei-3ef39.firebaseapp.com',
  projectId: 'quanto-gastei-3ef39',
  storageBucket: 'quanto-gastei-3ef39.appspot.com',
  messagingSenderId: '644724495233',
  appId: '1:644724495233:web:de0a89a5f83ee411bb8e80',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
