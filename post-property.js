// Firebase Config
alert("post-property.js loaded");
const firebaseConfig = {
    apiKey: "AIzaSyBUH-w7tlIAQuhCgAfsQZm_XXTVIUzYsz8",
    authDomain: "imoproperties.firebaseapp.com",
    projectId: "imoproperties",
    storageBucket: "imoproperties.firebasestorage.app",
    messagingSenderId: "493250223554",
    appId: "1:493250223554:web:53ce9913ec708742e30a5b"
  };
  
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  const auth = firebase.auth();
  const db = firebase.firestore();
  
  console.log("Post Property JS loaded");
  
  // Protect page – must be logged in
  auth.onAuthStateChanged(user => {
    if (!user) {
      alert("Please login first");
      window.location.href = "login.html";
    }
  });
  
  // Handle property submission
  document.getElementById("propertyForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const user = auth.currentUser;
  
    if (!user) {
      alert("You must be logged in");
      return;
    }
  
    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const location = document.getElementById("location").value;
    const type = document.getElementById("type").value;
    const status = document.getElementById("status").value;
    const description = document.getElementById("description").value;
  
    db.collection("properties").add({
      title,
      price,
      location,
      type,
      status,
      description,
      agentID: user.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      alert("Property posted successfully!");
      document.getElementById("propertyForm").reset();
    })
    .catch(error => {
      alert(error.message);
      console.error(error);
    });
  });
  