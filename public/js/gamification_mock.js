const mockUsers = [
  { id: "mock_user_1", name: "You", points: 0, badges: [] },
  { id: "mock_user_2", name: "Alice", points: 90, badges: ["helper"] },
  { id: "mock_user_3", name: "Bob", points: 220, badges: [] },
];

function renderLeaderboard() {
  const leaderboardEl = document.getElementById("leaderboard");
  leaderboardEl.innerHTML = mockUsers
    .sort((a, b) => b.points - a.points)
    .map(
      (user) => `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <span class="fw-bold">${user.name}</span>
          <!-- ${user.badges
            .map((b) => `<span class="badge bg-warning ms-2">${b}</span>`)
            .join("")} -->
        </div>
        <span class="badge bg-primary rounded-pill">${user.points} pts</span>
      </li>
    `
    )
    .join("");
}

// Call this on page load
renderLeaderboard();

document.getElementById("complete-task-btn").addEventListener("click", () => {
  // Mock function - later replace with Firebase
  mockAwardPoints(10); 
});

function mockAwardPoints(points) {
  const currentUser = mockUsers.find(u => u.id === "mock_user_1");
  currentUser.points += points;
  updateCurrentPointsDisplay();
  renderLeaderboard();
  animatePointsPopup(points); // UI feedback
}

// UI feedback animation
function animatePointsPopup(points) {
  const popup = document.createElement("div");
  popup.textContent = `+${points} points!`;
  popup.className = "position-fixed top-0 start-50 translate-middle-x mt-3 p-2 bg-success text-white rounded animate-pop";
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 2000);
}

// Update points display
function updateCurrentPointsDisplay() {
  const currentUser = mockUsers.find(u => u.id === "mock_user_1");
  document.getElementById("current-points").textContent = currentUser.points;
}

// Initialize current points display
updateCurrentPointsDisplay();