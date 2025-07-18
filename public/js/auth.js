/*
function mockLogin(role) {
  alert(`Mock: Logged in as ${role}. Redirecting...`);
  if (role === "student") window.location.href = "student_dashboard.html";
  else window.location.href = "alumni_dashboard.html";
}
*/

import { auth } from "./js/app.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// User registration function
export async function registerUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// User login function
export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// User logout function
export async function logoutUser() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Auth state observer
export function monitorAuthState(callback) {
  return onAuthStateChanged(auth, callback);
}

// Store additional/new user data in Firestore
import {
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "./app.js";

export async function registerUser(email, password, userData) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Store additional user data in Firestore
    await setDoc(doc(db, "users", userCredential.user.uid), {
      email: email,
      role: userData.role, // 'student' or 'alumni'
      points: 0,
      badges: [],
      ...userData,
    });

    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
