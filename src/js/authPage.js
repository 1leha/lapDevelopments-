import { getAuth, onAuthStateChanged } from 'firebase/auth';

import refs from './refs';
import createUserDataObj from './utils/createUserDataObj';
import init from './init';
import handler from './handler';

const auth = getAuth();

refs.loginForm.addEventListener('submit', handler.signIn);
refs.signOutButton.addEventListener('click', handler.signOut);
refs.signUpButton.addEventListener('click', handler.signUp);

refs.saveToFirebaseBtn.addEventListener('click', handler.saveToFireBase);
refs.readFromFirebaseBtn.addEventListener('click', createUserDataObj);

refs.copyToLocaleStorageBtn.addEventListener(
  'click',
  handler.copyToLocaleStorage
);
refs.clearLocaleStorageBtn.addEventListener(
  'click',
  handler.clearLocaleStorage
);

// Event Listener for Firebase Auth
onAuthStateChanged(auth, init);
