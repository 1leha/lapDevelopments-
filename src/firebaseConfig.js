// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyC0qqH9An_6i-PMEOWGnGwljzyL31Cd-1s',
  authDomain: 'testdb-0001-34955.firebaseapp.com',
  projectId: 'testdb-0001-34955',
  storageBucket: 'testdb-0001-34955.appspot.com',
  messagingSenderId: '225625173555',
  appId: '1:225625173555:web:4a647727c8b56d8dadbd46',
  databaseURL: 'https://testdb-0001-34955-default-rtdb.firebaseio.com/',
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
