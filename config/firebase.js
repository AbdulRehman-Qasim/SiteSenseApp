// config/firebase.js

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: 'AIzaSyBOplHuZzJ74SzxvdAXsL0gVtzgLuqUdvg',
  authDomain: 'smartbot-8e5f1.firebaseapp.com',
  projectId: 'smartbot-8e5f1',
  storageBucket: 'smartbot-8e5f1.appspot.com',
  messagingSenderId: '326377548427',
  appId: '1:326377548427:web:9d56288831df438b86828e',
  measurementId: 'G-2FYEF6K08X',
};

// ✅ Initialize Firebase only once
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// ✅ Initialize auth only once and safely
let auth;
try {
  auth = getAuth(app);
} catch (err) {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

// ✅ Initialize Firestore & Storage
const db = getFirestore(app);
const storage = getStorage(app);

// ✅ Export initialized instances
export { auth, db, app, storage };
