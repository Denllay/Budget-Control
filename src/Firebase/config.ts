import firebase from 'firebase/app';

import 'firebase/analytics';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';

export const app = firebase.initializeApp({
  // your config
});
export const auth = app.auth();
export default firebase;
