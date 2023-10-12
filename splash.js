// Check if this is the 'index.html' page
const isIndexPage = window.location.pathname.includes('index.html');

// Function to check if the user's name is stored in local storage
function isUserNameStored() {
    if (isIndexPage) {
        return false; // Disable this function on 'index.html'
    }
    return !!localStorage.getItem('userName');
}

// Function to get the user's name from local storage
function getUserName() {
    if (isIndexPage) {
        return ''; // Disable this function on 'index.html'
    }
    return localStorage.getItem('userName') || '';
}

// Function to save the user's name in local storage
function saveUserName(userName) {
    if (!isIndexPage) {
        localStorage.setItem('userName', userName);
    }
}

// Function to handle the form submission on the splash page
function handleFormSubmission(event) {
    if (isIndexPage) {
        return; // Disable this function on 'index.html'
    }
    event.preventDefault();

    const userNameInput = document.getElementById('name');
    const userName = userNameInput.value.trim();

    if (userName) {
        saveUserName(userName);
        redirectToProfile();
    } else {
        alert('Please enter your name.');
    }
}

// Function to redirect to the profile page if the user is logged in
function redirectToProfile() {
    if (isIndexPage) {
        return; // Disable this function on 'index.html'
    }
    if (isUserNameStored() && !window.location.pathname.includes('profile.html')) {
        window.location.href = 'profile.html';
    }
}

// Function to display the user's name on the profile page
function displayUserName() {
    if (isIndexPage) {
        return; // Disable this function on 'index.html'
    }
    const userInfo = document.getElementById('user-info');
    const userName = getUserName();

    userInfo.textContent = userName ? `Welcome, ${userName}!` : 'Welcome to Your Profile';
}

// Function to open index.html if the user's name is saved
function openIndexIfNameSaved() {
    if (isUserNameStored() && !isIndexPage) {
        window.location.href = 'index.html';
    }
}

// Check if this is the profile page and display the user's name
if (!isIndexPage && window.location.pathname.includes('profile.html')) {
    displayUserName();
    openIndexIfNameSaved();
}

// Check if this is the splash page
const nameForm = document.getElementById('name-form');
if (!isIndexPage && nameForm) {
    if (isUserNameStored()) {
        // If the user's name is already stored, hide the form and display the profile directly
        nameForm.style.display = 'none';
        redirectToProfile();
    } else {
        nameForm.addEventListener('submit', handleFormSubmission);
    }
}
