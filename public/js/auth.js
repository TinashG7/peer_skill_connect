function mockLogin(role) {
  alert(`Mock: Logged in as ${role}. Redirecting...`);
  if (role === "student") window.location.href = "student_dashboard.html";
  else window.location.href = "alumni_dashboard.html";
}
