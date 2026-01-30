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
const db = firebase.firestore();
const propertyList = document.getElementById("property-list");

// Fetch live properties
db.collection("properties")
  .orderBy("postDate", "desc")
  .onSnapshot(snapshot => {
      propertyList.innerHTML = ""; // clear existing
      snapshot.forEach(doc => {
          const property = doc.data();
          const postDate = new Date(property.postDate);
          const now = new Date();
          const diffDays = (now - postDate)/(1000*60*60*24);
          if(diffDays > 30) return; // skip expired

          const card = document.createElement("div");
          card.classList.add("card");
          card.innerHTML = `
              <img src="images/house1.jpg" alt="${property.title}">
              <h4>₦${Number(property.price).toLocaleString()}</h4>
              <p>${property.title} – ${property.location}</p>
              <a href="property.html">View Details</a>
          `;
          propertyList.appendChild(card);
      });

      if(propertyList.innerHTML === ""){
          propertyList.innerHTML = "<p style='text-align:center;'>No active properties available.</p>";
      }
  });

