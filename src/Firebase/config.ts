import firebase from 'firebase/app';

import 'firebase/analytics';

import 'firebase/auth';
import 'firebase/firestore';

export const app = firebase.initializeApp({
  //paste Your Config
});
export const auth = app.auth();
