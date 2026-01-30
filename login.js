const firebaseConfig = {
    apiKey: "AIzaSyBUH-w7tlIAQuhCgAfsQZm_XXTVIUzYsz8",
    authDomain: "imoproperties.firebaseapp.com",
    projectId: "imoproperties",
    storageBucket: "imoproperties.firebasestorage.app",
    messagingSenderId: "493250223554",
    appId: "1:493250223554:web:53ce9913ec708742e30a5b"
  };
  
const auth = firebase.auth();
document.getElementById("login-form").addEventListener("submit", e=>{
e.preventDefault();
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

auth.signInWithEmailAndPassword(email,password)
.then(user=>{
  alert("Login successful!");
  window.location.href = "post-property.html";
})
.catch(err=> alert(err.message));
});