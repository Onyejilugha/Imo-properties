const firebaseConfig = {
    apiKey: "AIzaSyBUH-w7tlIAQuhCgAfsQZm_XXTVIUzYsz8",
    authDomain: "imoproperties.firebaseapp.com",
    projectId: "imoproperties",
    storageBucket: "imoproperties.firebasestorage.app",
    messagingSenderId: "493250223554",
    appId: "1:493250223554:web:53ce9913ec708742e30a5b"
  };
  
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();
  
  document.getElementById("signup-form").addEventListener("submit", (e)=>{
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    auth.createUserWithEmailAndPassword(email,password)
      .then(cred=>{
        const signupDate = new Date();
        const planEndDate = new Date();
        planEndDate.setMonth(planEndDate.getMonth()+1);
  
        return db.collection("agents").doc(cred.user.uid).set({
          name, email,
          signupDate: signupDate.toISOString(),
          planEndDate: planEndDate.toISOString()
        });
      })
      .then(()=> alert("Signup successful! You can now post properties."))
      .catch(err=> alert(err.message));
  });