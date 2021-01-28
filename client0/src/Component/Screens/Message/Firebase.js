 import firebase from 'firebase'
  
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA5FxvPevBWR0DNjhpxwJSlg3Baw5MG8xI",
    authDomain: "alumni-portal-1127.firebaseapp.com",
    projectId: "alumni-portal-1127",
    storageBucket: "alumni-portal-1127.appspot.com",
    messagingSenderId: "211310643258",
    appId: "1:211310643258:web:47247d8c0ee78e4bef8d03",
    measurementId: "G-49BQETPW11"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth(); 
  const provider = new firebase.auth.GoogleAuthProvider();


  export { auth , provider };
  export default db;