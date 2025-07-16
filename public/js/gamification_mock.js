const mockUsers = [
  { id: "mock_user_1", name: "Alice", points: 200, badges: ["helper"] },
  { id: "mock_user_2", name: "Bob", points: 180, badges: [] },
];

function renderLeaderboard() {
  const leaderboardEl = document.getElementById("leaderboard");
  leaderboardEl.innerHTML = mockUsers
    .sort((a, b) => b.points - a.points)
    .map(
      (user) => `
      <li class="leaderboard-item">
        ${user.name} - ${user.points} pts
        ${user.badges.map((b) => `<span class="badge">${b}</span>`).join("")}
      </li>
    `
    )
    .join("");
}

// Call this on page load
renderLeaderboard();
