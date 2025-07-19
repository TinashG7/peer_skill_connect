/*
function mockLogin(role) {
  alert(`Mock: Logged in as ${role}. Redirecting...`);
  if (role === "student") window.location.href = "student_dashboard.html";
  else window.location.href = "alumni_dashboard.html";
}
*/
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { app, db } from "./app.js";

const auth = getAuth(app);

// User registration with additional data
export async function registerUser(email, password, userData) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await setDoc(doc(db, "users", userCredential.user.uid), {
      email: email,
      role: userData.role || "student",
      points: 0,
      badges: [],
      ...userData,
    });

    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// User login
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

// User logout
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

// Error message helper
export function getAuthErrorMessage(errorCode) {
  const messages = {
    "auth/invalid-email": "Invalid email format",
    "auth/user-disabled": "Account disabled",
    "auth/user-not-found": "Email not registered",
    "auth/wrong-password": "Incorrect password",
    "auth/too-many-requests": "Too many attempts. Try again later",
  };
  return messages[errorCode] || "Login failed. Please try again";
}