const mockUsers = [
  { id: "mock_user_1", name: "You", points: 0, badges: [] },
  { id: "mock_user_2", name: "Alice", points: 90, badges: ["helper"] },
  { id: "mock_user_3", name: "Bob", points: 220, badges: [] },
];

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initial render
  renderLeaderboard();
  updateCurrentPointsDisplay();
  
  // Setup event listeners
  document.getElementById("complete-task-btn").addEventListener("click", () => {
    mockAwardPoints(10); 
  });
});

function renderLeaderboard() {
  const leaderboardEl = document.getElementById("leaderboard");
  leaderboardEl.innerHTML = mockUsers
    .sort((a, b) => b.points - a.points)
    .map(user => `
      <li class="list-group-item d-flex justify-content-between align-items-center ${user.id === "mock_user_1" ? "active-user" : ""}">
        <div>
          <span class="${user.id === "mock_user_1" ? "fw-bold text-primary" : ""}">${user.name}</span>
        </div>
        <span class="badge bg-primary rounded-pill">${user.points} pts</span>
      </li>
    `).join("");
}

function mockAwardPoints(points) {
  const currentUser = mockUsers.find(u => u.id === "mock_user_1");
  if (!currentUser) return;
  
  // Update points
  currentUser.points += points;
  
  // Check for badge unlock (example: award badge at 100 points)
  if (currentUser.points >= 100 && !currentUser.badges.includes("centurion")) {
    currentUser.badges.push("centurion");
    showBadgeUnlock("centurion");
  }
  
  // Update UI
  updateCurrentPointsDisplay();
  renderLeaderboard();
  animatePointsPopup(points);
}

function updateCurrentPointsDisplay() {
  const currentUser = mockUsers.find(u => u.id === "mock_user_1");
  if (currentUser) {
    document.getElementById("current-points").textContent = currentUser.points;
  }
}

function animatePointsPopup(points) {
  const popup = document.createElement("div");
  popup.textContent = `+${points} points!`;
  popup.className = "position-fixed top-0 start-50 translate-middle-x mt-3 p-2 bg-success text-white rounded animate-pop";
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 2000);
}

function showBadgeUnlock(badgeName) {
  const badgePopup = document.createElement("div");
  badgePopup.innerHTML = `
    <div class="position-fixed top-50 start-50 translate-middle p-3 bg-warning text-dark rounded shadow-lg text-center">
      <i class="fas fa-trophy fa-2x mb-2"></i>
      <h5>New Badge Unlocked!</h5>
      <p class="badge bg-white text-dark">${badgeName}</p>
    </div>
  `;
  document.body.appendChild(badgePopup);
  setTimeout(() => badgePopup.remove(), 3000);
}