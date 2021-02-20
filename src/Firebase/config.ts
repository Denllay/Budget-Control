import firebase from 'firebase/app';

import 'firebase/analytics';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';

export const app = firebase.initializeApp({
  apiKey: 'AIzaSyCwqdPlvxakwMBzMXG-bJdxC8pUxFxBld4',
  authDomain: 'my-project-1553609834580.firebaseapp.com',
  projectId: 'my-project-1553609834580',
  storageBucket: 'my-project-1553609834580.appspot.com',
  messagingSenderId: '11248815595',
  appId: '1:11248815595:web:5844a607b6f15efbecddae',
});
export const auth = app.auth();
export default firebase;
