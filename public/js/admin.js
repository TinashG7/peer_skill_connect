import {
  getDatabase,
  ref,
  set,
  get,
  remove,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { app } from "/app.js"; // Your existing Firebase app instance

const db = getDatabase(app);
const auth = getAuth(app);

// Load and display emails
async function loadEmails() {
  const snapshot = await get(ref(db, "authorized_emails"));
  const emailList = document.getElementById("email-list");
  emailList.innerHTML = "";

  if (snapshot.exists()) {
    Object.entries(snapshot.val()).forEach(([emailKey]) => {
      const li = document.createElement("li");
      li.textContent = emailKey.replace(/,/g, ".");
      li.innerHTML += ` <button data-email="${emailKey}">Remove</button>`;
      emailList.appendChild(li);
    });
  }
}

// Add new authorized email
document.getElementById("add-email").addEventListener("click", async () => {
  const email = document.getElementById("new-email").value;
  if (!email.includes("@strath.edu")) {
    alert("Only @strath.edu emails allowed!");
    return;
  }

  const emailKey = email.replace(/\./g, ",");
  await set(ref(db, `authorized_emails/${emailKey}`), true);
  loadEmails();
});

// Remove email
document.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON" && e.target.dataset.email) {
    remove(ref(db, `authorized_emails/${e.target.dataset.email}`));
    loadEmails();
  }
});

// Verify admin status
auth.onAuthStateChanged((user) => {
  if (!user || !user.email) {
    window.location.href = "/";
  } else {
    const isAdmin =
      user.email.replace(/\./g, ",") in
      {
        "admin1@strath,edu": true,
        "admin2@strath,edu": true,
      };
    if (!isAdmin) window.location.href = "/";
    else loadEmails();
  }
});
