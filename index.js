import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";

// import {
//   getDatabase,
//   set,
//   push,
//   ref,
//   onValue,
// } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import {
  getAuth,
  // createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAcY9AbmunOKdOUjrTdxKnAnZ4IbWwG08I",
  authDomain: "cambrigde-9ded6.firebaseapp.com",
  databaseURL: "https://cambrigde-9ded6-default-rtdb.firebaseio.com",
  projectId: "cambrigde-9ded6",
  storageBucket: "cambrigde-9ded6.appspot.com",
  messagingSenderId: "643714636903",
  appId: "1:643714636903:web:496dfe41f59ffeddc0c8c2",
};

const app = initializeApp(firebaseConfig);



let login = document.getElementById("loginBtn");

login.addEventListener('click', (e) => {
    e.preventDefault()
  // alert('hello')

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password).then(() => {
        let user = auth.currentUser;
        console.log(user)
           window.location.href = "main.html";
    }).catch((error) => {
         var error_code = error.code;
         var error_message = error.message;

         console.log(error_message);
         alert(error_code);
    })
})