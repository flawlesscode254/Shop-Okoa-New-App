import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDJIlLwdljpXu0PrjiVlQ1XeRlO8PddyQ",
  authDomain: "instant-pesa-edd2a.firebaseapp.com",
  databaseURL: "https://instant-pesa-edd2a-default-rtdb.firebaseio.com",
  projectId: "instant-pesa-edd2a",
  storageBucket: "instant-pesa-edd2a.appspot.com",
  messagingSenderId: "125042971205",
  appId: "1:125042971205:web:959146dc399dd76bef092c",
  measurementId: "G-8VCF8TGL1X",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = firebase.firestore();
const auth = firebase.auth();
const store = firebase.storage();

export default db;
export { auth, store };
