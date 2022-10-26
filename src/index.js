import { app, database } from './firebaseConfig';
import { ref, set, onValue } from 'firebase/database';
import {
  renderAuthDataMarkup,
  renderFirebaseDataMarkup,
  renderLocalStorageDataMarkup,
} from './js/markUps';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

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
};
const auth = getAuth(app);

// console.log(refs.saveToFirebase);

refs.loginForm.addEventListener('submit', signInHandler);
refs.signUpButton.addEventListener('click', signUpHandler);
refs.saveToFirebaseBtn.addEventListener('click', writeToFireBase);
refs.readFromFirebaseBtn.addEventListener('click', readFromFireBase);
refs.signOutButton.addEventListener('click', () => logOff());

// Event Listener for Firebase Auth
onAuthStateChanged(auth, init);

function init(user) {
  if (!user) {
    console.log('User not authtorised');
    return;
  }

  readFromFireBase();

  // Rendering Firebase data list
  changeUserLoginInterface();
}

function readFromFireBase() {
  const user = auth.currentUser;
  console.log('user.uid :>> ', user.uid);

  if (!user) {
    console.log('User is not logined!');
    return;
  }

  // Rendering Auth data list
  const authUserData = {
    id: user.uid,
    name: user.displayName,
    email: user.email,
    phone: user.phoneNumber,
  };
  changeEmailState(authUserData.email);
  const dataRef = ref(database, `users/` + user.uid);
  console.log('data in Firebase :>> ', dataRef);
  onValue(dataRef, snapshot => {
    const firebaseData = snapshot.val();

    if (!firebaseData) {
      // renderAuthDataMarkup(refs.authList, authUserData);
      // refs.loginetAs.innerHTML = authUserData.email;
      set(ref(database, `users/` + user.uid), { email: authUserData.email })
        .then(() => {
          console.log('database is successfuly written.');
        })
        .catch(error => {
          console.log('Write error :>> ', error);
        });

      console.log('User database is empty!');
      return;
    }

    const emptyData = { name: '', email: '', phone: '', story: '' };
    console.log('firebaseData :>> ', firebaseData);
    authUserData.name = firebaseData.name;
    authUserData.phone = firebaseData.phone;

    renderAuthDataMarkup(refs.authList, authUserData);

    const data = firebaseData ?? emptyData;
    renderFirebaseDataMarkup(refs.firebaseList, user.uid, data);

    const loginedAs = authUserData.name
      ? `${authUserData.name} (${authUserData.email})`
      : authUserData.email;
    refs.loginetAs.innerHTML = loginedAs;
  });
}

function changeUserLoginInterface() {
  refs.loginInputsBox.classList.toggle('hidden');
  refs.loginedUserBox.classList.toggle('hidden');
  refs.signUpButton.classList.toggle('hidden');
  refs.signInButton.classList.toggle('hidden');
  refs.signOutButton.classList.toggle('hidden');
}

function changeEmailState(email) {
  refs.dataForm.email.value = email;
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
      readFromFireBase();
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
      readFromFireBase();
      // changeUserLoginInterface();
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('errorCode :>> ', errorCode);
      console.log('errorMessage :>> ', errorMessage);
    });
  e.currentTarget.reset();
  console.log(refs.signInButton);
}

function logOff() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log('Sign-out successful.');
      renderAuthDataMarkup(refs.authList, {});
      renderFirebaseDataMarkup(refs.firebaseList, '', {});
      renderLocalStorageDataMarkup(refs.localeStorageList, '', {});
      changeUserLoginInterface();
      changeEmailState('');
    })
    .catch(error => {
      // An error happened.
      console.log('Sign-out error happened.');
    });
}

function writeToFireBase(e) {
  e.preventDefault();
  const user = auth.currentUser;

  const dbData = readDataFormValues(refs.dataForm);
  console.log('dbData :>> ', dbData);

  set(ref(database, `users/` + user.uid), dbData)
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
