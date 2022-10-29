import getFirebaseData from '../firebaseAPI/getFirebaseData';
import getUser from '../utils/getUser';
import writeDataToFirebase from '../firebaseAPI/writeDataToFirebase';

// Function returning obj of userData
export default async function createUserDataObj() {
  const currentUser = await getUser();

  const userData = {
    id: currentUser.uid,
    authData: {
      name: currentUser.displayName,
      email: currentUser.email,
      phone: currentUser.phoneNumber,
    },
  };

  // Readin data from Firebase
  const dbData = await getFirebaseData(currentUser).then(data => {
    // If db is empty (new user) - writing auth object in it.
    if (!data) {
      console.log('data is empty :>> ', data);
      writeDataToFirebase(userData.authData);
      return (userData.dbData = userData.authData);
    }
    return data;
  });
  userData.dbData = dbData;
  return userData;
}
