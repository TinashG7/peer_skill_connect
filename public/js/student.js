// Mock data
const mockAlumni = [
  { id: 1, name: "Alex Chen", skill: "Web Development", points: 120 },
  { id: 2, name: "Priya K", skill: "UX Design", points: 95 },
];

/*
const mockLeaderboard = [
  { name: "John Kimani", points: 200 },
  { name: "Jane Nganga", points: 180 },
];
*/

// Load data on page load
window.onload = function () {
  // Load leaderboard
  /*
  const leaderboardEl = document.getElementById("leaderboard");
  mockLeaderboard.forEach((user) => {
    leaderboardEl.innerHTML += `
      <li class="list-group-item d-flex justify-content-between">
        <span>${user.name}</span>
        <span class="badge bg-primary">${user.points}</span>
      </li>
    `;
  });
  */

  // Load alumni
  const alumniListEl = document.getElementById("alumni-list");
  mockAlumni.forEach((alumni) => {
    alumniListEl.innerHTML += `
      <div class="card mb-2">
        <div class="card-body">
          <h5>${alumni.name}</h5>
          <p>Expertise: ${alumni.skill}</p>
          <small>Mentor Points: ${alumni.points}</small>
        </div>
      </div>
    `;
  });

  // Mock button actions
  document
    .getElementById("request-service-btn")
    .addEventListener("click", () => {
      alert("Mock: Microservice request posted to the community!");
    });

  document
    .getElementById("request-mentor-btn")
    .addEventListener("click", () => {
      alert("Mock: Mentorship request sent to selected alumni!");
    });
};
