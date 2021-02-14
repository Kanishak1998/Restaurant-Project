import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCYVq5Y60TUNmsoRaa7VnmaYYElzE7vG0s",
    authDomain: "divine-mens-fashion.firebaseapp.com",
    projectId: "divine-mens-fashion",
    storageBucket: "divine-mens-fashion.appspot.com",
    messagingSenderId: "916244311291",
    appId: "1:916244311291:web:0ae69c5dc5b0ea56ef545e",
    measurementId: "G-C6Z2W3PJY5"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();

  const auth = firebase.auth();

  export {db,auth};