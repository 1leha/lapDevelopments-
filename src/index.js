import { app, database } from './firebaseConfig';
import { ref, set, onValue, child, get } from 'firebase/database';
import renderMarkup from './js/renderMarkup';

import localeStorage from './js/localeStorage';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

const auth = getAuth();
const user = auth.currentUser;

const emptyData = {
  id: '',
  authData: { name: '', email: '', phone: '' },
  dbData: { name: '', email: '', phone: '', story: '' },
};

const refs = {
  // Login form elements
  loginForm: document.querySelector('.login-form'),
  dataForm: document.querySelector('.data__form'),
  signUpButton: document.querySelector('button[name="signUpButton"]'),
  signInButton: document.querySelector('[data-loginButtonState="signIn"]'),
  signOutButton: document.querySelector('[data-loginButtonState="signOut"]'),
  loginInputsBox: document.querySelector('[data-loginInputs]'),
  loginedUserBox: document.querySelector('[data-loginedUser]'),
  loginetAs: document.querySelector('[data-loginetAs]'),

  // Data list containers
  authList: document.querySelector('[data-list="authData"]'),
  firebaseList: document.querySelector('[data-list="firebaseData"]'),
  localeStorageList: document.querySelector('[data-list="localeStorageData"]'),

  // Firebase buttons

  saveToFirebaseBtn: document.querySelector('[data-firebase="saveToFirebase"]'),
  readFromFirebaseBtn: document.querySelector(
    '[data-firebase="readFromFirebase"]'
  ),
  clearLocaleStorageBtn: document.querySelector('[data-localeStorage="clear"]'),

  // Locale storage buttons
  copyToLocaleStorageBtn: document.querySelector(
    '[data-localeStorage="copyToLocaleStorage"]'
  ),
  clearLocaleStorageBtn: document.querySelector('[data-localeStorage="clear"]'),
};

refs.loginForm.addEventListener('submit', signInHandler);
refs.signOutButton.addEventListener('click', () => logOff());
refs.signUpButton.addEventListener('click', signUpHandler);

refs.saveToFirebaseBtn.addEventListener('click', writeToFireBase);
refs.readFromFirebaseBtn.addEventListener('click', readFromFireBase);

refs.copyToLocaleStorageBtn.addEventListener('click', async () =>
  localeStorage.save(await (await readFromFireBase(getUser())).authData)
);
refs.clearLocaleStorageBtn.addEventListener('click', async () =>
  localeStorage.remove(await getUser().uid)
);

// Event Listener for Firebase Auth
onAuthStateChanged(auth, init);

function getUser() {
  return auth.currentUser;
}

function getCurrentUserAuthData({ uid, displayName, email, phoneNumber }) {
  return { id: uid, name: displayName, email: email, phone: phoneNumber };
}

async function init(user) {
  if (!user) {
    console.log('User not authtorised');
    return;
  }

  renderMarkup.changedUserLoginInterface(refs);
  const authUserData = getCurrentUserAuthData(user);

  const userObj = await readFromFireBase(user);
  // console.log('userObj :>> ', userObj);

  localeStorage.save(userObj.dbData);

  renderMarkup.authData(refs.authList, userObj);
  renderMarkup.firebaseData(refs.firebaseList, userObj);

  const localeStorageData = localeStorage.read(userObj.id);
  renderMarkup.localStorageData(
    refs.localeStorageList,
    userObj.id,
    localeStorageData
  );

  const loginedAsText = userObj.dbData.name
    ? `${userObj.dbData.name} (${userObj.dbData.email})`
    : user.email;
  renderMarkup.loginedAs(refs.loginetAs, loginedAsText);

  renderMarkup.dataToForm(refs, userObj.dbData);

  return userObj;
}

async function getFBData(user) {
  const dbRef = ref(database);

  const snapshot = await get(child(dbRef, `users/${user.uid}`));
  const data = await snapshot.val();
  return data;
}

function readFromFireBase(user) {
  // console.log('readFromFireBase(user) :>> ', user);

  const userData = {
    id: user.uid,
    authData: {
      name: user.displayName,
      email: user.email,
      phone: user.phoneNumber,
    },
  };

  // Readin data from Firebase
  const dbData = getFBData(user).then(data => {
    // If db is empty (new user) - writing auth object in it.
    if (!data) {
      console.log('data is empty :>> ', data);
      writeDataToFirebase(userData.id, userData.authData);
    }

    userData.dbData = data;
    return userData;
  });

  return dbData;
}

function writeDataToFirebase(userId, dataObj) {
  set(ref(database, `users/${userId}`), dataObj)
    .then(() => {
      console.log('database is successfuly written.');
    })
    .catch(error => {
      console.log('Write error :>> ', error);
    });
}

// Function for new user creation
function signUpHandler(e) {
  e.preventDefault();

  const {
    elements: { userEmail, userPass },
  } = refs.loginForm;

  const username = userEmail.value;
  const password = userPass.value;

  createUserWithEmailAndPassword(auth, username, password)
    .then(userCredential => {
      const user = userCredential.user;
      console.log('NEW user :>> ', user);
      // readFromFireBase(getCurrentUserAuthData(user));
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('errorCode :>> ', errorCode);
      console.log('errorMessage :>> ', errorMessage);
    });
  refs.loginForm.reset();
}

// Function for User login
function signInHandler(e) {
  e.preventDefault();

  const {
    elements: { userEmail, userPass },
  } = e.currentTarget;

  const login = userEmail.value;
  const password = userPass.value;

  signInWithEmailAndPassword(auth, login, password)
    .then(user => {
      // readFromFireBase(getCurrentUserAuthData(user));
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('errorCode :>> ', errorCode);
      console.log('errorMessage :>> ', errorMessage);
    });
  e.currentTarget.reset();
}

async function logOff() {
  const userID = await getUser().uid;
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log('Sign-out successful.');
      renderMarkup.authData(refs.authList, emptyData);
      renderMarkup.firebaseData(refs.firebaseList, emptyData);
      renderMarkup.localStorageData(refs.localeStorageList, '', emptyData);
      renderMarkup.changedUserLoginInterface(refs);
      renderMarkup.dataToForm(refs, emptyData);
      localeStorage.remove(userID);
    })
    .catch(error => {
      // An error happened.
      console.log('Sign-out error happened.');
      console.log(error);
    });
}

function writeToFireBase(e) {
  e.preventDefault();
  const user = auth.currentUser;

  const dataFormValues = readDataFormValues(refs.dataForm);
  // console.log('dbData :>> ', dbData);

  set(ref(database, `users/` + user.uid), dataFormValues)
    .then(() => {
      console.log('database is successfuly written.');
    })
    .catch(error => {
      console.log('Write error :>> ', error);
    });

  refs.dataForm.reset();
}

function readDataFormValues(ref) {
  const { userName, email, phone, userStory } = ref.elements;
  return {
    name: userName.value,
    email: email.value,
    phone: phone.value,
    story: userStory.value,
  };
}

// function OLDreadFromFireBase(user) {
//   console.log('readFromFireBase(user) :>> ', user);

//   const dataRef = ref(database, `users/` + user.id);
//   onValue(dataRef, snapshot => {
//     const firebaseData = snapshot.val();

//     if (!firebaseData) {
//       set(ref(database, `users/` + user.id), { email: user.email })
//         .then(() => {
//           console.log('database is successfuly written.');
//         })
//         .catch(error => {
//           console.log('Write error :>> ', error);
//         });

//       console.log('User database is empty!');
//     }

//     console.log('firebaseData :>> ', firebaseData);

//     user.name = firebaseData.name;
//     user.phone = firebaseData.phone;

//     renderAuthDataMarkup(refs.authList, user);

//     const data = firebaseData ?? emptyData;
//     renderFirebaseDataMarkup(refs.firebaseList, user.id, data);

//     const loginedAs = user.name ? `${user.name} (${user.email})` : user.email;

//     const obj = {
//       id: 0,
//       isNewUser: false,
//       name: 1,
//       email: 2,
//       phone: 3,
//     };

//     return obj;
//   });
// }
