const users = [
  { id: "68001", password: "001", name: "นาย ก", score: 88 },
  { id: "68002", password: "002", name: "นาย ข", score: 87 },
  { id: "68003", password: "003", name: "นาย ค", score: 86 },
  { id: "68004", password: "004", name: "นาย ง", score: 85 }
];
const positions = Array.from({ length: 20 }, (_, i) => ({ name: "A" + (i + 1), taken_by: null }));
let currentUser = null;
document.getElementById("loginBtn").addEventListener("click", () => {
  const id = document.getElementById("userId").value;
  const pw = document.getElementById("password").value;
  const user = users.find(u => u.id === id && u.password === pw);
  const errorEl = document.getElementById("loginError");
  if (!user) { errorEl.textContent = "รหัสนักศึกษาหรือ Password ไม่ถูกต้อง"; return; }
  currentUser = user;
  errorEl.textContent = "";
  document.getElementById("login-card").classList.add("hidden");
  document.getElementById("simulator").classList.remove("hidden");
  document.getElementById("currentUser").textContent = `สวัสดี ${user.name} (ID: ${user.id})`;
  renderPositions();
  renderResults();
});
function renderPositions() {
  const container = document.getElementById("positions");
  container.innerHTML = "";
  positions.forEach(pos => {
    const btn = document.createElement("button");
    btn.textContent = pos.name;
    btn.className = "position-btn";
    if (pos.taken_by) btn.classList.add("taken");
    btn.disabled = !!pos.taken_by;
    btn.addEventListener("click", () => selectPosition(pos.name));
    container.appendChild(btn);
  });
}
function selectPosition(name) {
  const pos = positions.find(p => p.name === name);
  if (!pos || pos.taken_by) return;
  pos.taken_by = currentUser.id;
  renderPositions();
  renderResults();
  renderPositionsTable();
}
function renderResults() {
  const ul = document.getElementById("results");
  ul.innerHTML = "";
  positions.filter(p => p.taken_by).forEach(p => {
    const user = users.find(u => u.id === p.taken_by);
    const li = document.createElement("li");
    li.textContent = `${user.name} ได้ตำแหน่ง ${p.name}`;
    ul.appendChild(li);
  });
  renderPositionsTable();
}
function renderPositionsTable() {
  const container = document.getElementById("positionsTable");
  container.innerHTML = "";
  positions.forEach(pos => {
    const div = document.createElement("div");
    div.textContent = pos.taken_by ? users.find(u => u.id === pos.taken_by).name : pos.name;
    div.className = "position-card";
    if (pos.taken_by) div.classList.add("taken");
    container.appendChild(div);
  });
}
