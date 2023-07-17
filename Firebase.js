import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsv-S4mam7s0BcRq2KYAIxOocF6ipR43E",
  authDomain: "shop-project-91adc.firebaseapp.com",
  databaseURL: "https://shop-project-91adc-default-rtdb.firebaseio.com",
  projectId: "shop-project-91adc",
  storageBucket: "shop-project-91adc.appspot.com",
  messagingSenderId: "272621424538",
  appId: "1:272621424538:web:19329300ab2911567eb423"
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
