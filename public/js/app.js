// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5nqsf7izdWRmEjQlWhxfqgfurVpXZHrE",
  authDomain: "peer-skill-connect-c4701.firebaseapp.com",
  projectId: "peer-skill-connect-c4701",
  storageBucket: "peer-skill-connect-c4701.firebasestorage.app",
  messagingSenderId: "392706159751",
  appId: "1:392706159751:web:724ad728bba4bbe62bb422",
  measurementId: "G-BL9Q36HHWC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app);
