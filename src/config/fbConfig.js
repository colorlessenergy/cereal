import firebase from 'firebase/app';
import 'firebase/auth';

var firebaseConfig = {
  apiKey: "AIzaSyAoem7_5bd3MZamUdS0YOOXLOXObrAhET4",
  authDomain: "cereal-auth.firebaseapp.com",
  databaseURL: "https://cereal-auth.firebaseio.com",
  projectId: "cereal-auth",
  storageBucket: "cereal-auth.appspot.com",
  messagingSenderId: "928285042872",
  appId: "1:928285042872:web:58f1a8a7e0d1135a882c4d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;