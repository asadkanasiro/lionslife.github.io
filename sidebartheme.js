// Function to set the theme based on user selection and save it
function setTheme(theme) {
    const body = document.body;

    if (theme === 'dark') {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
    }
}

// Function to toggle the sidebar open/closed
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('closed');
}

// Check if user has a theme preference stored and apply it
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    setTheme('dark');
} else {
    setTheme('light');
}

// Add event listener to the sidebar toggle button
const sidebarToggleBtn = document.getElementById('sidebar-toggle');
sidebarToggleBtn.addEventListener('click', toggleSidebar);




// Modify your existing JavaScript and add these changes

// Function to toggle the sidebar open/closed
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggleBtn = document.getElementById('sidebar-toggle');

    if (sidebar.style.left === "-250px") {
        sidebar.style.left = "0";
        sidebarToggleBtn.innerHTML = "&#10006;"; // Display a cross symbol
    } else {
        sidebar.style.left = "-250px";
        sidebarToggleBtn.innerHTML = "&#9776;"; // Display three lines symbol
    }
}

