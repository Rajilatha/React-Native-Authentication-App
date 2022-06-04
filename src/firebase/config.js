
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyBU0GqHUKPqgQFfzxgCmyRJsQ-htiO85P4",
  databaseURL: "https://chatapp-ab16a-default-rtdb.firebaseio.com/",
  projectId: "chatapp-ab16a",
  appId: "1:921541809397:android:aa18e656d58362310161bc",
  // authDomain:"",
  // storageBucket:"chatapp-ab16a.appspot.com",
  // messagingSenderId:"",
};

firebase.initializeApp(firebaseConfig);
// firebase.firestore();
firebase.firestore();

export default firebase;