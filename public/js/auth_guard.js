import { auth } from "./app.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

export function initAuthGuard() {
  onAuthStateChanged(auth, (user) => {
    const protectedRoutes = ["student_dashboard.html", "alumni_dashboard.html"];
    const currentPage = window.location.pathname.split("/").pop();

    if (protectedRoutes.includes(currentPage)) {
      if (!user) {
        // Redirect to login if not authenticated
        window.location.href = "auth.html";
      } else {
        // You can add role-based checks here
        console.log("User is authenticated:", user.email);
      }
    }
  });
}
