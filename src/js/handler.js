import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import localeStorage from './localeStorage';
import getUser from './utils/getUser';
import renderMarkup from './renderMarkup';
import refs from './refs';
import emptyData from './utils/emptyData';
import readDataFormValues from './utils/readDataFormValues';
import writeDataToFirebase from './firebaseAPI/writeDataToFirebase';
import init from './init';
import logOff from './firebaseAPI/logOff';
import createUserDataObj from './utils/createUserDataObj';

const auth = getAuth();

// Function for User login
function signIn(e) {
  e.preventDefault();

  const {
    elements: { userEmail, userPass },
  } = e.currentTarget;

  const login = userEmail.value;
  const password = userPass.value;

  signInWithEmailAndPassword(auth, login, password)
    .then(user => {})
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('errorCode :>> ', errorCode);
      console.log('errorMessage :>> ', errorMessage);
    });

  e.currentTarget.reset();
}

// Function for new user creation
function signUp(e) {
  e.preventDefault();
  console.log(e);

  const {
    elements: { userEmail, userPass },
  } = refs.loginForm;

  const username = userEmail.value;
  const password = userPass.value;

  createUserWithEmailAndPassword(auth, username, password)
    .then(userCredential => {
      const user = userCredential.user;
      console.log('NEW user :>> ', user);
      // createUserDataObj(getCurrentUserAuthData(user));
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('errorCode :>> ', errorCode);
      console.log('errorMessage :>> ', errorMessage);
    });
  refs.loginForm.reset();
}

// Function for User logout
function signOut() {
  logOff();
}

// Handler for saving data to Firebase
function saveToFireBase(e) {
  e.preventDefault();
  const currentUser = getUser();

  const dataFormValues = readDataFormValues(refs.dataForm);
  writeDataToFirebase(dataFormValues);

  init();
}

async function copyToLocaleStorage() {
  const currentUser = await getUser();
  const currentUserData = await createUserDataObj(currentUser);
  console.log('currentUserData :>> ', currentUserData.dbData);
  localeStorage.save(currentUserData.dbData);
  renderMarkup.localStorageData(
    refs.localeStorageList,
    currentUserData.id,
    currentUserData.dbData
  );
}

async function clearLocaleStorage() {
  const currentUser = await getUser();

  localeStorage.remove(currentUser.uid);
  renderMarkup.localStorageData(refs.localeStorageList, '', emptyData);
}

export default {
  clearLocaleStorage,
  copyToLocaleStorage,
  signUp,
  signIn,
  signOut,
  saveToFireBase,
};
