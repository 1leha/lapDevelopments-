// Function for User logout
import { signOut, getAuth } from 'firebase/auth';
import getUser from '../utils/getUser';
import refs from '../refs';
import renderMarkup from '../renderMarkup';
import localeStorage from '../localeStorage';
import emptyData from '../utils/emptyData';

const auth = getAuth();

export default async function logOff() {
  const user = await getUser();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log('Sign-out successful.');
      renderMarkup.authData(refs.authList, emptyData);
      renderMarkup.firebaseData(refs.firebaseList, emptyData);
      renderMarkup.localStorageData(refs.localeStorageList, '', emptyData);
      renderMarkup.dataToForm(refs, emptyData);
      localeStorage.remove(user.uid);
      renderMarkup.loginedUserInterface(refs, getUser());
    })
    .catch(error => {
      // An error happened.
      console.log('Sign-out error happened:', error);
    });
}
