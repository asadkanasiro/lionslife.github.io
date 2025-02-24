// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp, doc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// Firebase configuration (assuming zindagi-334b7 for now)
const firebaseConfig = {
  apiKey: "AIzaSyC-sMxHYSiwld_U5GO7oGtHPw5CaVY_16s",
  authDomain: "zindagi-334b7.firebaseapp.com",
  databaseURL: "https://zindagi-334b7-default-rtdb.firebaseio.com",
  projectId: "zindagi-334b7",
  storageBucket: "zindagi-334b7.firebasestorage.app",
  messagingSenderId: "936307521870",
  appId: "1:936307521870:web:619c050d865cff2ac9861f",
  measurementId: "G-B4HP267SJF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log('Firebase initialized:', app);
const dbFirestore = getFirestore(app);
const dbRealtime = getDatabase(app);
console.log('Realtime Database initialized:', dbRealtime);
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
  const sidebarLinks = document.querySelectorAll('.sidebar-nav ul li a');
  sidebarLinks.forEach(link => link.classList.remove('active'));
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
      const activeSectionId = section.getAttribute('id');
      const activeLink = document.querySelector(`.sidebar-nav ul li a[href="#${activeSectionId}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
});

/* --- Initial Visibility Check --- */
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
      section.classList.add('visible');
    }
  });
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
      card.classList.add('visible');
    }
  });
});

/* --- Back-to-Top Button --- */
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* --- Smooth Scrolling for Anchor Links --- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
    logEvent(analytics, 'nav_click', { link: this.getAttribute('href') });
  });
});

/* --- Real-time Product Fetching from Realtime Database --- */
const productGrid = document.getElementById('productGrid');
function renderProducts(products) {
  productGrid.innerHTML = '';
  console.log('Rendering products:', products);
  if (products) {
    Object.entries(products).forEach(([id, data]) => {
      console.log('Processing product:', id, data); // Log each product
      const card = document.createElement('div');
      card.classList.add('product-card');
      card.dataset.name = data.name;
      card.dataset.desc = data.description;
      card.dataset.img = data.imageUrl;
      card.dataset.id = id;
      card.dataset.price = data.price;
      card.innerHTML = `
        <img src="${data.imageUrl}" alt="${data.name}" loading="lazy">
        <h3>${data.name}</h3>
        <p>${data.shortDesc || data.description}</p>
        <p>PKR ${data.price}</p>
        <button class="add-to-cart" aria-label="Add ${data.name} to cart">Add to Cart</button>
      `;
      productGrid.appendChild(card);
    });
  } else {
    productGrid.innerHTML = '<p>No products available.</p>';
    console.log('No products found in data.');
  }
}

function fetchProducts() {
  const productsRef = ref(dbRealtime, 'products');
  console.log('Listening to:', productsRef.toString()); // Log the exact path
  onValue(productsRef, (snapshot) => {
    const products = snapshot.val();
    console.log('Fetched products:', products);
    renderProducts(products);
  }, (error) => {
    console.error('Error fetching products:', error);
    productGrid.innerHTML = '<p>Error loading products: ' + error.message + '</p>';
  });
}

fetchProducts();

/* --- Product Filter Functionality --- */
const filterInput = document.getElementById('productFilter');
filterInput.addEventListener('input', () => {
  const filterValue = filterInput.value.toLowerCase();
  document.querySelectorAll('.product-card').forEach(card => {
    const name = card.dataset.name.toLowerCase();
    card.style.display = name.includes(filterValue) ? 'block' : 'none';
  });
});

/* --- Modal Functionality --- */
const productModal = document.getElementById('productModal');
const modalImg = document.getElementById('modalImg');
const modalName = document.getElementById('modalName');
const modalDesc = document.getElementById('modalDesc');
const closeBtns = document.querySelectorAll('.close-btn');

productGrid.addEventListener('click', (e) => {
  const card = e.target.closest('.product-card');
  if (!card) return;
  if (e.target.classList.contains('add-to-cart')) {
    addToCart(card.dataset);
  } else {
    modalImg.src = card.dataset.img;
    modalName.textContent = card.dataset.name;
    modalDesc.textContent = card.dataset.desc;
    showModal(productModal);
    document.getElementById('metaDesc').content = `${card.dataset.name} - ${card.dataset.desc} at Zindagi Perfumes`;
    logEvent(analytics, 'product_view', { product_name: card.dataset.name });
  }
});
closeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    hideModal(productModal);
    hideModal(document.getElementById('cartModal'));
    hideModal(document.getElementById('authModal'));
  });
});
window.addEventListener('click', (e) => {
  if (e.target === productModal || e.target === document.getElementById('cartModal') || e.target === document.getElementById('authModal')) {
    hideModal(productModal);
    hideModal(document.getElementById('cartModal'));
    hideModal(document.getElementById('authModal'));
  }
});

/* --- Cart Functionality --- */
const cartModal = document.getElementById('cartModal');
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
    await setDoc(doc(dbFirestore, 'carts', auth.currentUser.uid), { items: cart });
  }
  logEvent(analytics, 'add_to_cart', { product_name: product.name });
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
cartItemsUl.addEventListener('change', (e) => {
  if (e.target.type === 'number') {
    const id = e.target.dataset.id;
    const item = cart.find(i => i.id === id);
    item.quantity = parseInt(e.target.value);
    updateCartUI();
    if (auth.currentUser) setDoc(doc(dbFirestore, 'carts', auth.currentUser.uid), { items: cart });
  }
});
cartItemsUl.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove')) {
    const id = e.target.dataset.id;
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
    if (auth.currentUser) setDoc(doc(dbFirestore, 'carts', auth.currentUser.uid), { items: cart });
  }
});
document.querySelector('a[href="#cart"]').addEventListener('click', (e) => {
  e.preventDefault();
  showModal(cartModal);
});
document.querySelector('.checkout').addEventListener('click', async () => {
  if (!auth.currentUser) {
    alert('Please log in to checkout.');
    return;
  }
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const orderId = `ZINDAGI-${Date.now()}`;
  const checkoutData = {
    amount: totalAmount,
    orderId: orderId,
    customerEmail: auth.currentUser.email,
    items: cart,
    timestamp: serverTimestamp()
  };
  try {
    await setDoc(doc(dbFirestore, 'orders', orderId), checkoutData);
    alert('Order placed successfully! Please complete payment via JazzCash.');
    window.location.href = `https://sandbox.jazzcash.com.pk/Checkout?amount=${totalAmount}&orderId=${orderId}`;
    cart = [];
    updateCartUI();
    if (auth.currentUser) setDoc(doc(dbFirestore, 'carts', auth.currentUser.uid), { items: cart });
  } catch (error) {
    console.error('Checkout Error:', error);
    alert('Checkout failed. Please try again.');
  }
});

/* --- Authentication --- */
const authModal = document.getElementById('authModal');
const authTitle = document.getElementById('authTitle');
const authSubmit = document.getElementById('authSubmit');
let loginBtn = document.getElementById('loginBtn');
let signupBtn = document.getElementById('signupBtn');
const authButtons = document.querySelector('header nav ul');
const profileSection = document.getElementById('profile');
const profileCartItems = document.getElementById('profileCartItems');
let isLoginMode = true;

loginBtn.addEventListener('click', () => {
  isLoginMode = true;
  authTitle.textContent = 'Login';
  authSubmit.textContent = 'Login';
  showModal(authModal);
});
signupBtn.addEventListener('click', () => {
  isLoginMode = false;
  authTitle.textContent = 'Sign Up';
  authSubmit.textContent = 'Sign Up';
  showModal(authModal);
});
authSubmit.addEventListener('click', async () => {
  const email = document.getElementById('authEmail').value;
  const password = document.getElementById('authPassword').value;
  try {
    if (isLoginMode) {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Logged in successfully!');
    } else {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Account created successfully!');
    }
    hideModal(authModal);
    logEvent(analytics, isLoginMode ? 'login' : 'sign_up', { method: 'email' });
  } catch (error) {
    console.error('Auth Error:', error);
    let message = '';
    switch (error.code) {
      case 'auth/invalid-email':
        message = 'Invalid email format. Please check and try again.';
        break;
      case 'auth/weak-password':
        message = 'Password must be at least 6 characters long.';
        break;
      case 'auth/wrong-password':
        message = 'Incorrect password. Please try again.';
        break;
      case 'auth/user-not-found':
        message = 'No account found with this email. Please sign up.';
        break;
      default:
        message = `Error: ${error.message}`;
    }
    alert(message);
  }
});
onAuthStateChanged(auth, (user) => {
  if (user) {
    authButtons.innerHTML = `
      <li><a href="#home">Home</a></li>
      <li><a href="#profile">Profile</a></li>
      <li><a href="#cart">Cart (<span id="cartCount">0</span>)</a></li>
      <li><a href="#contact">Contact</a></li>
      <li><button id="logoutBtn">Logout (${user.email})</button></li>
    `;
    profileSection.style.display = 'block';
    document.getElementById('logoutBtn').addEventListener('click', () => {
      signOut(auth).then(() => {
        alert('Logged out successfully!');
        authButtons.innerHTML = `
          <li><a href="#home">Home</a></li>
          <li><a href="#profile">Profile</a></li>
          <li><a href="#cart">Cart (<span id="cartCount">0</span>)</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><button id="loginBtn">Login</button></li>
          <li><button id="signupBtn">Sign Up</button></li>
        `;
        loginBtn = document.getElementById('loginBtn');
        signupBtn = document.getElementById('signupBtn');
        loginBtn.addEventListener('click', () => {
          isLoginMode = true;
          authTitle.textContent = 'Login';
          authSubmit.textContent = 'Login';
          showModal(authModal);
        });
        signupBtn.addEventListener('click', () => {
          isLoginMode = false;
          authTitle.textContent = 'Sign Up';
          authSubmit.textContent = 'Sign Up';
          showModal(authModal);
        });
        profileSection.style.display = 'none';
        cart = [];
        updateCartUI();
      });
    });
    onSnapshot(doc(dbFirestore, 'carts', user.uid), (docSnap) => {
      if (docSnap.exists()) {
        cart = docSnap.data().items || [];
        updateCartUI();
        profileCartItems.innerHTML = cart.map(item => `
          <li>${item.name} - Quantity: ${item.quantity} - PKR ${item.price * item.quantity}</li>
        `).join('');
      } else {
        profileCartItems.innerHTML = '<p>Your cart is empty.</p>';
      }
    });
  }
});

/* --- Contact Form Submission --- */
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(contactForm);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
    timestamp: serverTimestamp()
  };
  try {
    await addDoc(collection(dbFirestore, 'contacts'), data);
    alert(`Thank you, ${data.name}! Your message has been sent. Keep Moving!`);
    logEvent(analytics, 'contact_form_submit', { user_email: data.email });
    contactForm.reset();
  } catch (error) {
    console.error('Error:', error);
    alert('Oops! Something went wrong. Please try again.');
  }
});

/* --- Newsletter Form Submission --- */
const newsletterForm = document.getElementById('newsletterForm');
newsletterForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(newsletterForm);
  const data = {
    email: formData.get('email'),
    timestamp: serverTimestamp()
  };
  try {
    await addDoc(collection(dbFirestore, 'subscribers'), data);
    alert('Thank you for subscribing! Keep Moving!');
    logEvent(analytics, 'newsletter_subscribe', { subscriber_email: data.email });
    newsletterForm.reset();
  } catch (error) {
    console.error('Error:', error);
    alert('Subscription failed. Please try again.');
  }
});