// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";
import { getStorage, ref as storageRef, getDownloadURL, uploadBytes } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-storage.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYQXMf4rMIYP-S0Sd6eDZFWepJFutjRRs",
  authDomain: "lion-s-life-544b5.firebaseapp.com",
  databaseURL: "https://lion-s-life-544b5-default-rtdb.firebaseio.com",
  projectId: "lion-s-life-544b5",
  storageBucket: "lion-s-life-544b5.appspot.com",
  messagingSenderId: "1000750911480",
  appId: "1:1000750911480:web:2158332431408f420cd00d",
  measurementId: "G-1T50PD9JP3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);
const auth = getAuth(app);

// Fetch products from Realtime Database and display on website
const productGrid = document.getElementById("productGrid");

function fetchProducts() {
  onValue(ref(db, "products"), (snapshot) => {
    productGrid.innerHTML = "";
    const products = snapshot.val();

    if (products) {
      Object.keys(products).forEach((id) => {
        const data = products[id];
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.innerHTML = `
          <img src="${data.imageUrl}" alt="${data.name}">
          <h3>${data.name}</h3>
          <p>${data.description}</p>
          <p>PKR ${data.price}</p>
          <button class="add-to-cart" data-id="${id}">Add to Cart</button>
        `;
        productGrid.appendChild(card);
      });
    } else {
      productGrid.innerHTML = "<p>No products available.</p>";
    }
  });
}

fetchProducts();

// Product search functionality
const filterInput = document.getElementById("productFilter");
filterInput.addEventListener("input", () => {
  const filterValue = filterInput.value.toLowerCase();
  document.querySelectorAll(".product-card").forEach((card) => {
    const name = card.querySelector("h3").textContent.toLowerCase();
    card.style.display = name.includes(filterValue) ? "block" : "none";
  });
});

// Shopping cart functionality
const cartItemsUl = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
let cart = [];

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart")) {
    const productId = e.target.getAttribute("data-id");
    addToCart(productId);
  }
});

function addToCart(productId) {
  onValue(ref(db, `products/${productId}`), (snapshot) => {
    const product = snapshot.val();
    if (!product) return;

    const existingItem = cart.find((item) => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ id: productId, ...product, quantity: 1 });
    }

    updateCartUI();
  });
}

function updateCartUI() {
  cartItemsUl.innerHTML = "";
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${item.imageUrl}" alt="${item.name}">
      <span>${item.name} - PKR ${item.price * item.quantity}</span>
      <input type="number" value="${item.quantity}" min="1" data-id="${item.id}">
      <span class="remove" data-id="${item.id}">×</span>
    `;
    cartItemsUl.appendChild(li);
  });
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Authentication: Login & Signup
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");

loginBtn.addEventListener("click", () => {
  const email = prompt("Enter your email:");
  const password = prompt("Enter your password:");
  if (email && password) {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => alert("Logged in successfully!"))
      .catch((error) => alert("Login failed: " + error.message));
  }
});

signupBtn.addEventListener("click", () => {
  const email = prompt("Enter your email:");
  const password = prompt("Enter a password:");
  if (email && password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => alert("Account created successfully!"))
      .catch((error) => alert("Signup failed: " + error.message));
  }
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    loginBtn.style.display = "none";
    signupBtn.textContent = "Logout";
    signupBtn.addEventListener("click", () => {
      signOut(auth).then(() => {
        alert("Logged out successfully!");
        location.reload();
      });
    });
  }
});

// Back to Top Button
document.getElementById("backToTop").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
