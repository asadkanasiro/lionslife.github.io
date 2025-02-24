// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getDatabase, ref, push, onValue, set } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-storage.js";

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
const auth = getAuth(app);
const storage = getStorage(app);

// --- Utility Functions for Modals ---
function showModal(modal) {
  modal.style.display = 'flex';
  modal.classList.add('visible');
  modal.setAttribute('tabindex', '-1');
  modal.focus();
}

function hideModal(modal) {
  modal.style.display = 'none';
  modal.classList.remove('visible');
}

/* --- Fetch & Display Products from Firebase Realtime Database --- */
const productGrid = document.getElementById('productGrid');

function fetchProducts() {
  onValue(ref(db, "products"), (snapshot) => {
    productGrid.innerHTML = "";
    const products = snapshot.val();

    if (products) {
      Object.keys(products).forEach((id) => {
        const data = products[id];
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.dataset.id = id;
        card.dataset.name = data.name;
        card.dataset.desc = data.description;
        card.dataset.img = data.imageUrl;
        card.dataset.price = data.price;

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

/* --- Product Search Filter --- */
const filterInput = document.getElementById('productFilter');
filterInput.addEventListener('input', () => {
  const filterValue = filterInput.value.toLowerCase();
  document.querySelectorAll('.product-card').forEach(card => {
    const name = card.dataset.name.toLowerCase();
    card.style.display = name.includes(filterValue) ? 'block' : 'none';
  });
});

/* --- Cart Functionality --- */
const cartItemsUl = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
let cart = [];

function updateCartUI() {
  cartItemsUl.innerHTML = '';
  cart.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <span>${item.name} - PKR ${item.price * item.quantity}</span>
      <input type="number" value="${item.quantity}" min="1" data-id="${item.id}">
      <span class="remove" data-id="${item.id}">×</span>
    `;
    cartItemsUl.appendChild(li);
  });

  cartCount.textContent = cart.reduce((sum, item) => sum + parseInt(item.quantity), 0);
}

/* --- Add to Cart --- */
productGrid.addEventListener('click', (e) => {
  const card = e.target.closest('.product-card');
  if (!card) return;

  if (e.target.classList.contains('add-to-cart')) {
    const product = {
      id: card.dataset.id,
      name: card.dataset.name,
      desc: card.dataset.desc,
      img: card.dataset.img,
      price: parseFloat(card.dataset.price),
      quantity: 1
    };

    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push(product);
    }

    updateCartUI();
  }
});

/* --- User Authentication --- */
const authModal = document.getElementById('authModal');
const authTitle = document.getElementById('authTitle');
const authSubmit = document.getElementById('authSubmit');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');

loginBtn.addEventListener('click', () => {
  authTitle.textContent = 'Login';
  authSubmit.textContent = 'Login';
  showModal(authModal);
});

signupBtn.addEventListener('click', () => {
  authTitle.textContent = 'Sign Up';
  authSubmit.textContent = 'Sign Up';
  showModal(authModal);
});

authSubmit.addEventListener('click', async () => {
  const email = document.getElementById('authEmail').value;
  const password = document.getElementById('authPassword').value;

  try {
    if (authTitle.textContent === 'Login') {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Logged in successfully!');
    } else {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Account created successfully!');
    }
    hideModal(authModal);
  } catch (error) {
    alert('Error: ' + error.message);
  }
});

/* --- Newsletter Subscription --- */
const newsletterForm = document.getElementById('newsletterForm');
newsletterForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = newsletterForm.email.value;

  try {
    await push(ref(db, 'subscribers'), { email, timestamp: Date.now() });
    alert('Thank you for subscribing!');
    newsletterForm.reset();
  } catch (error) {
    alert('Subscription failed: ' + error.message);
  }
});

/* --- Contact Form Submission --- */
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = contactForm.name.value;
  const email = contactForm.email.value;
  const message = contactForm.message.value;

  try {
    await push(ref(db, 'contacts'), { name, email, message, timestamp: Date.now() });
    alert(`Thank you, ${name}! Your message has been sent.`);
    contactForm.reset();
  } catch (error) {
    alert('Failed to send message: ' + error.message);
  }
});

/* --- Back-to-Top Button --- */
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
