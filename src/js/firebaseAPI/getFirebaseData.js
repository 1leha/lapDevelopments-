import { database } from '../config/firebaseConfig';
import { ref, child, get } from 'firebase/database';

import getUser from '../utils/getUser';

// Function reading Firebase
export default async function getFirebaseData() {
  const currentUser = await getUser();

  const dbRef = ref(database);

  const snapshot = await get(child(dbRef, `users/${currentUser.uid}`));
  const data = await snapshot.val();
  return data;
}
