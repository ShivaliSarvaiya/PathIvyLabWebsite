// ================= PROFILE =================
function getCurrentUser() {
  return localStorage.getItem("username");
}

function getUserKey() {
  const user = getCurrentUser();
  return user ? `fashionItems_${user}` : null;
}

// ================= DROPDOWN =================
function toggleProfileMenu() {
  document.getElementById("profileDropdown").classList.toggle("show");
}

document.addEventListener("click", (e) => {
  const menu = document.querySelector(".profile-menu");
  const dropdown = document.getElementById("profileDropdown");

  if (!menu || !dropdown) return;

  if (!menu.contains(e.target)) {
    dropdown.classList.remove("show");
  }
});

// ================= USER =================
function saveUser() {
  const input = document.getElementById("usernameInput");
  const name = input.value.trim();

  if (!name) return;

  localStorage.setItem("username", name);
  document.getElementById("currentUser").textContent = name;

  input.value = "";
  document.getElementById("profileDropdown").classList.remove("show");

  loadTheme();
  loadBooks();
}

function loadUser() {
  const name = localStorage.getItem("username");

  if (name) {
    document.getElementById("currentUser").textContent = name;
  }
}

function logout() {
  localStorage.removeItem("username");
  location.reload();
}

// ================= THEME (GLOBAL FIXED) =================
function setTheme(mode) {
  if (mode === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }

  localStorage.setItem("theme", mode);
}

function loadTheme() {
  const theme = localStorage.getItem("theme");

  document.body.classList.remove("dark");

  if (theme === "dark") {
    document.body.classList.add("dark");
  }
}

// ================= WISHLIST =================
function getItems() {
  const key = getUserKey();
  if (!key) return [];

  return JSON.parse(localStorage.getItem(key)) || [];
}

function saveItems(items) {
  const key = getUserKey();
  if (!key) return;

  localStorage.setItem(key, JSON.stringify(items));
}

// ================= ADD ITEM =================
function addBook() {
  const user = getCurrentUser();
  if (!user) return;

  const title = document.getElementById("title").value.trim();
  const store = document.getElementById("genre").value.trim();
  const image = document.getElementById("image").value.trim();
  const list = document.getElementById("list").value;

  if (!title) return;

  const item = {
    id: Date.now(),
    title,
    store,
    image,
    list
  };

  const items = getItems();
  items.push(item);
  saveItems(items);

  document.getElementById("title").value = "";
  document.getElementById("genre").value = "";
  document.getElementById("image").value = "";

  loadBooks();
}

// ================= LOAD ITEMS =================
function loadBooks() {
  const container = document.getElementById("books");
  if (!container) return;

  const user = getCurrentUser();

  if (!user) {
    container.innerHTML = "<p>Please create a profile to use your wishlist.</p>";
    return;
  }

  const items = getItems();
  container.innerHTML = "";

  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${item.image || "https://via.placeholder.com/150"}" />
      <h3>${item.title}</h3>
      <p>${item.store || "Unknown store"}</p>
      <small>${item.list}</small>
      <button onclick="deleteItem(${item.id})">Remove</button>
    `;

    container.appendChild(card);
  });
}

// ================= DELETE =================
function deleteItem(id) {
  let items = getItems();
  items = items.filter(item => item.id !== id);

  saveItems(items);
  loadBooks();
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
  loadUser();
  loadTheme();
  loadBooks();
});