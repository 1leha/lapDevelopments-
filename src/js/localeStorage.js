import { getAuth } from 'firebase/auth';

const auth = getAuth();

function save(data) {
  const key = auth.currentUser.uid;
  try {
    const obj = JSON.stringify(data);
    localStorage.setItem(key, obj);
  } catch (error) {
    console.log('Error during save JSON :>> ', error);
  }
}

function read(key) {
  // const key = auth.currentUser.uid;

  try {
    const obj = localStorage.getItem(key);
    return obj === null ? undefined : JSON.parse(obj);
  } catch (error) {
    console.log('Error JSON parse  :>> ', error);
  }
}

function remove(key) {
  // const key = auth.currentUser.uid;
  // console.log('key :>> ', key);

  localStorage.removeItem(key);
}

export default {
  save,
  read,
  remove,
};
