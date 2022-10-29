// Function initialising start

import getUser from './utils/getUser';
import createUserDataObj from './utils/createUserDataObj';
import localeStorage from './localeStorage';
import renderMarkup from './renderMarkup';
import refs from './refs';

export default async function init() {
  const currentUser = getUser();
  if (!currentUser) {
    console.log('User not authtorised');
    return;
  }

  const userObj = await createUserDataObj();

  localeStorage.save(userObj.dbData);

  renderMarkup.loginedUserInterface(refs, currentUser);
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
    : currentUser.email;
  renderMarkup.loginedAs(refs.loginetAs, loginedAsText);

  renderMarkup.dataToForm(refs, userObj.dbData);

  return userObj;
}
