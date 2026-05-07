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
  const dropdown = document.getElementById("profileDropdown");
  if (dropdown) dropdown.classList.toggle("show");
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
  if (!input) return;

  const name = input.value.trim();
  if (!name) return;

  localStorage.setItem("username", name);

  const currentUser = document.getElementById("currentUser");
  if (currentUser) currentUser.textContent = name;

  input.value = "";

  const dropdown = document.getElementById("profileDropdown");
  if (dropdown) dropdown.classList.remove("show");

  loadTheme();

  if (document.getElementById("books")) {
    loadBooks();
  }
}

function loadUser() {
  const name = localStorage.getItem("username");
  const currentUser = document.getElementById("currentUser");

  if (name && currentUser) {
    currentUser.textContent = name;
  }
}

function logout() {
  localStorage.removeItem("username");
  location.reload();
}

// ================= THEME =================
function setTheme(mode) {
  localStorage.setItem("theme", mode);

  if (mode === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
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

  const title = document.getElementById("title");
  const store = document.getElementById("genre");
  const image = document.getElementById("image");
  const list = document.getElementById("list");

  if (!title || !store || !image || !list) return;

  const item = {
    id: Date.now(),
    title: title.value.trim(),
    store: store.value.trim(),
    image: image.value.trim(),
    list: list.value
  };

  if (!item.title) return;

  const items = getItems();
  items.push(item);
  saveItems(items);

  title.value = "";
  store.value = "";
  image.value = "";

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

  if (document.getElementById("books")) {
    loadBooks();
  }
});