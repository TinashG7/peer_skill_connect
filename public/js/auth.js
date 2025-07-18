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
