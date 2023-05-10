// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyABg_RK1XA7G67BN6YMG56PXfDKMUfaovs',
  authDomain: 'react-chatapp-54bed.firebaseapp.com',
  projectId: 'react-chatapp-54bed',
  storageBucket: 'react-chatapp-54bed.appspot.com',
  messagingSenderId: '917826650329',
  appId: '1:917826650329:web:d09421fd801469012cbec8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
