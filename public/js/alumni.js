// Mock data
const mockRequests = [
  { id: 1, student: "Maria G", request: "Help with React Hooks" },
  { id: 2, student: "Tom B", request: "Portfolio review" },
];

window.onload = function () {
  const requestsListEl = document.getElementById("requests-list");

  mockRequests.forEach((request) => {
    requestsListEl.innerHTML += `
      <div class="card mb-2">
        <div class="card-body">
          <h5>${request.student}</h5>
          <p>${request.request}</p>
          <button class="btn btn-sm btn-success">Accept</button>
          <button class="btn btn-sm btn-danger">Decline</button>
        </div>
      </div>
    `;
  });
};
