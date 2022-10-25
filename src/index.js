import { app, database } from './firebaseConfig';
import { ref, set, onValue } from 'firebase/database';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

const refs = {
  loginForm: document.querySelector('.login-form'),
  dataForm: document.querySelector('.data__form'),
  signUpButton: document.querySelector('button[name="signUpButton"]'),
  activeUserList: document.querySelector('.active-user__fields'),

  saveToFirebaseBtn: document.querySelector('[data-firebase="saveToFirebase"]'),
  readFromFirebaseBtn: document.querySelector(
    '[data-firebase="readFromFirebase"]'
  ),
};
const auth = getAuth();
isUserLogenedIn(auth);

// console.log(refs.saveToFirebase);

refs.loginForm.addEventListener('submit', signInHandler);
refs.signUpButton.addEventListener('click', signUpHandler);
refs.saveToFirebaseBtn.addEventListener('click', writeToFireBase);
refs.readFromFirebaseBtn.addEventListener('click', readFromFireBase);

// Function for new user creation
function signUpHandler(e) {
  e.preventDefault();

  //   console.log('e.target :>> ', refs.loginForm.elements);

  const {
    elements: { userEmail, userPass },
  } = refs.loginForm;

  console.log('userName :>> ', userEmail.value);
  console.log('userPass :>> ', userPass.value);
  const username = userEmail.value;
  const password = userPass.value;

  createUserWithEmailAndPassword(auth, username, password)
    .then(userCredential => {
      const user = userCredential.user;
      console.log('user :>> ', user);
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

  //   console.log('userName :>> ', userEmail.value);
  //   console.log('userPass :>> ', userPass.value);
  const username = userEmail.value;
  const password = userPass.value;

  //   console.log('Sign In');
  signInWithEmailAndPassword(auth, username, password)
    .then(user => {
      readFromFireBase();
      //   console.log('user :>> ', user.user);
      //   console.log('database :>> ', database);
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('errorCode :>> ', errorCode);
      console.log('errorMessage :>> ', errorMessage);
    });
  e.currentTarget.reset();
}

function signOut() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log('Sign-out successful.');
    })
    .catch(error => {
      // An error happened.
      console.log('Sign-out error happened.');
    });
}

function writeToFireBase(e) {
  e.preventDefault();

  const user = auth.currentUser;
  console.log('user.uid :>> ', user.uid);

  if (!user) {
    console.log('User is not logined!');
    return;
  }

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

function readFromFireBase() {
  const user = auth.currentUser;
  console.log('user.uid :>> ', user.uid);

  if (!user) {
    console.log('User is not logined!');
    return;
  }

  const dataRef = ref(database, `users/` + user.uid);
  //   console.log('data in Firebase :>> ', dataRef);
  onValue(dataRef, snapshot => {
    const data = snapshot.val();
    const emptyData = { name: '', email: '', phone: '', story: '' };

    console.log('data :>> ', data ?? emptyData);
    renderActiveUserMarkup(user.uid, data ?? emptyData);
  });
}

function renderActiveUserMarkup(
  id,
  { name = '', email = '', phone = '', story = '' }
) {
  const markup = ` 
        <li class="active-user__item">
          User Id:
          <span class="active-user__value" data-firebaseValue="id">${id}</span>
        </li>

        <li class="active-user__item">
          User name:
          <span class="active-user__value" data-firebaseValue="Name">${name}</span>
        </li>

        <li class="active-user__item">
          E-mail:
          <span class="active-user__value" data-firebaseValue="email">${email}</span>
        </li>

        <li class="active-user__item">
          Phone:
          <span class="active-user__value" data-firebaseValue="phone">${phone}</span>
        </li>

        <li class="active-user__item">
          Story:
          <span class="active-user__value" data-firebaseValue="story">${story}</span>
        </li>
      
    `;

  refs.activeUserList.innerHTML = markup;
}

function isUserLogenedIn(auth) {
  onAuthStateChanged(auth, user => {
    if (user) {
      const uid = user.uid;
      console.log('uid :>> ', uid);
      readFromFireBase();
    } else {
      console.log('user is not logined in!');
      return;
    }
  });
}
