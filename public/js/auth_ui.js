import { loginUser, getAuthErrorMessage } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const errorElement = document.getElementById("authError");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        errorElement.classList.add("d-none");
        const result = await loginUser(email, password);

        if (result.success) {
          window.location.href = "student_dashboard.html";
        } else {
          throw new Error(result.error);
        }
      } catch (error) {
        errorElement.textContent = getAuthErrorMessage(error.code);
        errorElement.classList.remove("d-none");
        console.error("Login error:", error);
      }
    });
  }
});
