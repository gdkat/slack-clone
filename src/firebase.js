import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBWSM_htHjQoBgPuhP-4HXiC96MmcQxnT4",
  authDomain: "slack-clone-3887f.firebaseapp.com",
  projectId: "slack-clone-3887f",
  storageBucket: "slack-clone-3887f.appspot.com",
  messagingSenderId: "937293366348",
  appId: "1:937293366348:web:3077d2b97ce66f2d08a0e9",
  measurementId: "G-HX4JH34VYP",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };
