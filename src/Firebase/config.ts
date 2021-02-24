import firebase from 'firebase/app';

import 'firebase/analytics';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';

export const app = firebase.initializeApp({
  apiKey: 'AIzaSyC5GfeiacB-Np63e4S81InqUi979CLRDp4',
  authDomain: 'budget-control-c490b.firebaseapp.com',
  databaseURL: 'https://budget-control-c490b-default-rtdb.firebaseio.com',
  projectId: 'budget-control-c490b',
  storageBucket: 'budget-control-c490b.appspot.com',
  messagingSenderId: '178665620461',
  appId: '1:178665620461:web:8d734632ba4b3c547e5de4',
  measurementId: 'G-JJ284RPGL3',
});
export const auth = app.auth();
export default firebase;
