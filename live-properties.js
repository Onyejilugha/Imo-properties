const firebaseConfig = {
    apiKey: "AIzaSyBUH-w7tlIAQuhCgAfsQZm_XXTVIUzYsz8",
    authDomain: "imoproperties.firebaseapp.com",
    projectId: "imoproperties",
    storageBucket: "imoproperties.firebasestorage.app",
    messagingSenderId: "493250223554",
    appId: "1:493250223554:web:53ce9913ec708742e30a5b"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const propertyList = document.getElementById("property-list") || document.getElementById("featured-properties");

db.collection("properties").orderBy("postDate","desc").onSnapshot(snapshot=>{
    if(!propertyList) return;
    propertyList.innerHTML="";
    snapshot.forEach(doc=>{
        const p = doc.data();
        const postDate = new Date(p.postDate);
        const now = new Date();
        const diffDays = (now-postDate)/(1000*60*60*24);
        if(diffDays>30) return;
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML=`<img src="images/house1.jpg" alt="${p.title}"><h4>₦${Number(p.price).toLocaleString()}</h4><p>${p.title} – ${p.location}</p>`;
        propertyList.appendChild(card);
    });
    if(propertyList.innerHTML==="") propertyList.innerHTML="<p style='text-align:center;'>No active properties available.</p>";
});

