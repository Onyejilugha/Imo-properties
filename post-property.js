// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBUH-w7tlIAQuhCgAfsQZm_XXTVIUzYsz8",
    authDomain: "imoproperties.firebaseapp.com",
    projectId: "imoproperties",
    storageBucket: "imoproperties.firebasestorage.app",
    messagingSenderId: "493250223554",
    appId: "1:493250223554:web:53ce9913ec708742e30a5b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Check if user is logged in and plan is active
auth.onAuthStateChanged(user => {
    if (user) {
        db.collection("agents").doc(user.uid).get().then(doc => {
            const planEnd = new Date(doc.data().planEndDate);
            const now = new Date();
            if (now > planEnd) {
                alert("Your 1-month posting plan expired. Contact admin.");
                auth.signOut();
                window.location.href = "login.html";
            }
        });
    } else {
        // Not logged in
        window.location.href = "login.html";
    }
});

// Post property form
document.getElementById("post-property-form").addEventListener("submit", e => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const location = document.getElementById("location").value;
    const price = document.getElementById("price").value;
    const type = document.getElementById("type").value;
    const description = document.getElementById("description").value;

    const user = auth.currentUser;

    db.collection("properties").add({
        title,
        location,
        price,
        type,
        description,
        agentID: user.uid,
        postDate: new Date().toISOString()
    })
    .then(() => {
        alert("Property posted successfully!");
        document.getElementById("post-property-form").reset();
    })
    .catch(err => alert(err.message));
});
