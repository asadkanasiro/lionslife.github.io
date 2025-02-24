// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// Updated Firebase configuration
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
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

// Log page view
logEvent(analytics, 'page_view', { page_title: 'Zindagi Perfumes Home' });

/* --- Utility Functions for Modal Handling --- */
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

/* --- Preloader --- */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 1500);
});

/* --- Hamburger Menu --- */
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');
hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
});

/* --- Scroll Effects: Visibility, Parallax, Back-to-Top, Sidebar Active Icons --- */
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
      section.classList.add('visible');
    }
  });
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
      card.classList.add('visible');
    }
  });
  if (window.innerWidth > 768) {
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
      const scrollPos = window.scrollY;
      heroVideo.style.transform = `translateY(${scrollPos * 0.3}px) scale(1.1)`;
    }
  }
  const backToTop = document.getElementById('backToTop');
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

/* --- Back-to-Top Button --- */
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* --- Smooth Scrolling for Anchor Links --- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
    logEvent(analytics, 'nav_click', { link: this.getAttribute('href') });
  });
});

/* --- Real-time Product Fetching from Firestore --- */
const productGrid = document.getElementById('productGrid');
function renderProducts(products) {
  productGrid.innerHTML = '';
  products.forEach(data => {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.dataset.name = data.name;
    card.dataset.desc = data.description;
    card.dataset.img = data.imageUrl;
    card.dataset.id = data.id;
    card.dataset.price = data.price;
    card.innerHTML = `
      <img src="${data.imageUrl}" alt="${data.name}" loading="lazy">
      <h3>${data.name}</h3>
      <p>${data.shortDesc}</p>
      <p>PKR ${data.price}</p>
      <button class="add-to-cart" aria-label="Add ${data.name} to cart">Add to Cart</button>
    `;
    productGrid.appendChild(card);
  });
}
onSnapshot(collection(db, 'products'), (snapshot) => {
  const products = [];
  snapshot.forEach(doc => {
    products.push({ id: doc.id, ...doc.data() });
  });
  renderProducts(products);
}, (error) => {
  console.error('Error fetching products:', error);
  productGrid.innerHTML = '<p>Error loading products. Please try again later.</p>';
});

/* --- Product Filter Functionality --- */
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
async function addToCart(product) {
  const existingItem = cart.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartUI();
  if (auth.currentUser) {
    await setDoc(doc(db, 'carts', auth.currentUser.uid), { items: cart });
  }
}
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

/* --- Authentication --- */
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const authModal = document.getElementById('authModal');
const authTitle = document.getElementById('authTitle');
const authSubmit = document.getElementById('authSubmit');

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
