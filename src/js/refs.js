const refs = {
  // Login form elements
  loginForm: document.querySelector('.login-form'),
  signUpButton: document.querySelector('button[name="signUpButton"]'),
  signInButton: document.querySelector('[data-loginButtonState="signIn"]'),
  signOutButton: document.querySelector('[data-loginButtonState="signOut"]'),
  loginInputsBox: document.querySelector('[data-loginInputs]'),
  loginedUserBox: document.querySelector('[data-loginedUser]'),
  loginetAs: document.querySelector('[data-loginetAs]'),

  // Form used for Firebase filling
  dataForm: document.querySelector('.data__form'),

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

export default refs;
