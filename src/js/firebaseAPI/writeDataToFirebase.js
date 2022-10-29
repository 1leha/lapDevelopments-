import { ref, set } from 'firebase/database';
import { database } from '../config/firebaseConfig';

import getUser from '../utils/getUser';

// Function writing data from DataForm to Firebase
export default async function writeDataToFirebase(dataObj) {
  const currentUser = await getUser();

  console.log('dataObj :>> ', dataObj);

  set(ref(database, `users/${currentUser.uid}`), dataObj)
    .then(() => {
      console.log('database is successfuly written.');
    })
    .catch(error => {
      console.log('Write error :>> ', error);
    });
}
