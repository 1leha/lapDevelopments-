import { getAuth } from 'firebase/auth';
const auth = getAuth();

export default function getUser() {
  return auth.currentUser;
}
