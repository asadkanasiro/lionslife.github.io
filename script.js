












    
 // Initialize a variable to keep track of the active radio button and category
let activeRadioButton = null;
let activeCategory = null;

// Function to handle radio button click
function handleRadioButtonClick(radioButton, category) {
    if (activeRadioButton === radioButton) {
        // Clicking the same radio button again resets it and the category
        deactivateRadioButton(radioButton);
        resetFilter(); // Reset the filter
    } else {
        if (activeRadioButton) {
            deactivateRadioButton(activeRadioButton);
        }
        activateRadioButton(radioButton, category);
    }
}

// Function to activate a radio button
function activateRadioButton(radioButton, category) {
    activeRadioButton = radioButton;
    activeCategory = category;
    radioButton.checked = true;
    radioButton.style.backgroundColor = '#fff'; // Set the background color for the active button
    // Perform your filter function here based on the active radio button
    performFilter(category); // You may replace this with your actual filter logic
}

// Function to deactivate a radio button
function deactivateRadioButton(radioButton) {
    activeRadioButton = null;
    activeCategory = null;
    radioButton.checked = false;
    radioButton.style.backgroundColor = ''; // Reset button color
}

// Attach click event listeners to all radio buttons
const radioButtons = document.querySelectorAll('input[type="radio"]');
radioButtons.forEach(radioButton => {
    radioButton.addEventListener('click', function () {
        const category = this.value;
        handleRadioButtonClick(this, category);
    });
});

// Function to reset the filter
function resetFilter() {
    // Implement your reset filter logic here
    // For example, you can clear any applied filters or reset the product display
}

// Function to perform filtering based on the selected category
function performFilter(category) {
    // Implement your filter logic here based on the selected category
    // This function should handle the filtering logic without loading products
    // You can use the activeCategory variable to access the currently selected category
}

 
 
 
 







/*
// Detect scroll event and add the "scroll-up" class to the logo
window.addEventListener("scroll", function() {
    var logo = document.querySelector(".logo");
    if (window.scrollY > 100) { // Adjust the scroll threshold as needed
        logo.classList.add("scroll-up");
    } else {
        logo.classList.remove("scroll-up");
    }
});
*/


// Detect scroll event and add/remove the "scroll-up" class to the logo
/*
var logo = document.querySelector(".logo");
var lastScrollY = 0;

window.addEventListener("scroll", function() {
    var currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
        // Scrolling down, so add the "scroll-up" class to hide the logo
        logo.classList.add("scroll-up");
    } else {
        // Scrolling up, so remove the "scroll-up" class to show the logo
        logo.classList.remove("scroll-up");
    }

    lastScrollY = currentScrollY;
});
*/




var headerContainer = document.querySelector('.header-container');
var sidebar = document.querySelector('.sidebar');
var cartIcon = document.querySelector('.cart-icon');
var logo = document.querySelector('.logo');
var globe = document.querySelector('.globe');
var filterbutton = document.querySelector('.toggle-button-3');

/*var togglebutton3 = document.querySelector('.toggle-button-3');
*/
var lastScrollY = 0;

window.addEventListener('scroll', function() {
    var currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
        // Scrolling down, so add classes to hide elements
        headerContainer.classList.add('hide-elements');
        sidebar.classList.add('hide-elements');
        cartIcon.classList.add('hide-elements');
        
logo.classList.add('hide-elements');

globe.classList.add('hide-elements');

filterbutton.classList.add('hide-elements');

/*togglebutton3.classList.add('hide-elements');*/
    } else {
        // Scrolling up, so remove classes to show elements
        headerContainer.classList.remove('hide-elements');
        sidebar.classList.remove('hide-elements');
        cartIcon.classList.remove('hide-elements');

logo.classList.remove('hide-elements');

globe.classList.remove('hide-elements');

filterbutton.classList.remove('hide-elements');

/*togglebutton3.classList.remove('hide-elements');*/
    }

    lastScrollY = currentScrollY;
});



//const sound = document.getElementById('sound');

//logo.addEventListener('mouseenter', () => {
//    sound.play();
//});








































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

    if (sidebar.style.left === "-100%") {
        sidebar.style.left = "0";
        sidebarToggleBtn.innerHTML = "&#10006;"; // Display a cross symbol
    } else {
        sidebar.style.left = "-100%";
        sidebarToggleBtn.innerHTML = "&#9776;"; // Display three lines symbol
    }
}









// Function to filter products by price (High to Low)
function filterByPriceHighToLow() {
    const productGrid = document.getElementById('product-grid');
    const productCards = Array.from(productGrid.querySelectorAll('.product-card'));

    productCards.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('.price').textContent.replace(' MAD', ''));
        const priceB = parseFloat(b.querySelector('.price').textContent.replace(' MAD', ''));
        return priceB - priceA;
    });

    productGrid.innerHTML = '';
    productCards.forEach(card => {
        productGrid.appendChild(card);
    });
}

// Function to filter products by price (Low to High)
function filterByPriceLowToHigh() {
    const productGrid = document.getElementById('product-grid');
    const productCards = Array.from(productGrid.querySelectorAll('.product-card'));

    productCards.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('.price').textContent.replace(' MAD', ''));
        const priceB = parseFloat(b.querySelector('.price').textContent.replace(' MAD', ''));
        return priceA - priceB;
    });

    productGrid.innerHTML = '';
    productCards.forEach(card => {
        productGrid.appendChild(card);
    });
}

// Function to filter products by best sellers (example: by sales count)
function filterByBestSellers() {
    // Implement your best sellers filtering logic here
    // You may need to add data to your product cards to track sales count
}

// Function to filter products by newest items
function filterByNewest() {
    // Implement your newest items filtering logic here
    // You may need to add data to your product cards to track the date they were added
}

// Function to filter products by featured items
function filterByFeatured() {
    // Implement your featured items filtering logic here
    // You may need to add data to your product cards to mark them as featured
}








/*


// Function to toggle the filter state and update the button color
function toggleFilter() {
    const filterToggleButton = document.getElementById('filter-toggle-button');

    // Toggle the filter state
    isFilterActive = !isFilterActive;

    // Update the button color based on filter state
    if (isFilterActive) {
        filterToggleButton.classList.add('active-filter');
    } else {
        filterToggleButton.classList.remove('active-filter');
    }

    // Toggle the visibility of the filter options
    const filterOptions = document.querySelector('.filter-options');
    filterOptions.classList.toggle('hidden');
}


// Function to handle category clicks
function handleCategoryClick(category) {
    // Clear the filter button color and state
    const filterToggleButton = document.getElementById('filter-toggle-button');
    filterToggleButton.classList.remove('active-filter');
    isFilterActive = false;

    // Call the loadProducts function with the selected category
    loadProducts(category);
}

// Attach category click event listeners
const categoryLinks = document.querySelectorAll('.category-filter ul li a');
categoryLinks.forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default link behavior
        const selectedCategory = link.getAttribute('data-category');
        handleCategoryClick(selectedCategory);
    });
});*/












// Function to toggle the filter state and update the button color
function toggleFilter() {
    const filterOptions = document.querySelectorAll('.filter-options label');
    const filterToggleButton = document.getElementById('filter-toggle-button');

    // Check if the filter is currently active
    const isFilterActive = filterToggleButton.classList.contains('active');

    // Toggle the filter state
    if (isFilterActive) {
        // Deactivate the filter
        filterToggleButton.classList.remove('active');
        // Reset the button color to its default
        filterToggleButton.style.backgroundColor = ''; // or whatever your default color is
    } else {
        // Activate the filter
        filterToggleButton.classList.add('active');
        // Change the button color when filter is active
        filterToggleButton.style.backgroundColor = ''; // Replace with your desired color
    }
}























































// Initialize cart from localStorage if available 
let cart = JSON.parse(localStorage.getItem('cart')) || []; 
let total = parseFloat(localStorage.getItem('total')) || 0;





// Function to add a product to the cart
function addToCart(productName, productPrice, productImage) {
    cart.push({ name: productName, price: productPrice, image: productImage });
    total += productPrice;

    // Update the cart count and display
    updateCartCount(cart.length);

    // Store the updated cart and total in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('total', total.toString());
}

// Function to remove an item from the cart
function removeFromCart(index) {
    const removedItem = cart.splice(index, 1)[0];
    total -= removedItem.price;

    // Update the cart count and display
    updateCartCount(cart.length);

    // Store the updated cart and total in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('total', total.toString());

    displayCart();
}

// Initialize the cart count based on the items in localStorage
const savedCart = JSON.parse(localStorage.getItem('cart'));
updateCartCount(savedCart ? savedCart.length : 0);

// Function to update the cart count in the cart icon
function updateCartCount(count) {
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = count.toString();
}


// Function to update the cart display
function updateCartDisplay() {
    
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // Clear the cart display
    cartItems.innerHTML = '';

    // Add items to the cart display
    cart.forEach(item => {
        const listItem = document.createElement('li');
        const itemImage = document.createElement('img'); // Create an image element
        itemImage.src = item.image; // Set the image source from the item data
        itemImage.alt = item.name; // Set alt text for the image
        listItem.appendChild(itemImage); // Append the image to the list item
        listItem.innerHTML += `${item.name} - ${item.price.toFixed(2)} MAD`;
        cartItems.appendChild(listItem);
    });

    // Update the cart total
    cartTotal.textContent = total.toFixed(2) + ' MAD';
    
    
    
    // ... (your existing code)

    // Update the cart count
    updateCartCount(cart.length);
}






















































































  /*const products = [];

        function generateOtherProductCard(product) {
            return `
                <div class="other-product-card">
                    <img src="${product.image}" alt="${product.name}" width="150" height="150">
                    <h3>${product.name}</h3>
                    <p class="price">${product.price.toFixed(2)} MAD</p>
                </div>
            `;
        }

        function updateOtherProductContainer() {
            const otherProductContainer = document.getElementById('other-product-container');
            otherProductContainer.innerHTML = ''; // Clear existing content

            products.forEach(product => {
                const otherProductCard = generateOtherProductCard(product);
                otherProductContainer.innerHTML += otherProductCard;
            });
        }

        function loadproducts() {
            const savedproducts = localStorage.getItem('savedproducts');

            if (savedproducts) {
                products.length = 0; // Clear existing products
                const parsedproducts = JSON.parse(savedproducts);
                products.push(...parsedproducts);
                updateOtherProductContainer();
                console.log('Other products loaded.');
            } else {
                console.log('No saved other products found.');
            }
        }

        // Initial display of other products
        loadproducts();

*/


/*

// productPage.js

function generateProductCard(product) {
    return `
        <div class="product-card" data-category="${product.category}">
            <img src="${product.image}" alt="${product.name}" width="300" height="300">
            <h3>${product.name}</h3>
            <p class="price">${product.price.toFixed(2)} MAD</p>
            <button onclick="addToCart('${product.name}', ${product.price}, '${product.image}')">Add to Cart</button>
        </div>
    `;
}

function addToCart(name, price, image) {
    // Implement your add to cart logic here...
    console.log(`Added ${name} to the cart!`);
}

function createProductContainer() {
    const productContainer = document.createElement('div');
    productContainer.id = 'product-container';
    document.body.appendChild(productContainer);
    return productContainer;
}

function updateProductContainer() {
    const productContainer = document.getElementById('product-container') || createProductContainer();
    productContainer.innerHTML = ''; // Clear existing content

    const products = loadProductsFromLocalStorage();

    products.forEach(product => {
        const productCard = generateProductCard(product);
        productContainer.innerHTML += productCard;
    });
}

function loadProductsFromLocalStorage() {
    const savedProducts = localStorage.getItem('savedProducts');

    if (savedProducts) {
        return JSON.parse(savedProducts);
    } else {
        return [
            {
                category: 'kids',
                name: 'Default Kids Product',
                image: 'default-image.jpg',
                price: 20.00,
            },
            // Add default products or adjust as needed
        ];
    }
}

// Call the updateProductContainer function to display products on the page
updateProductContainer();


*/




/*

const products = [
    {
        category: 'kids',
        name: 'Kids Product 1',
        image: 'images/kids-product1.jpg',
        price: 40.00,
    },
    {
        category: 'kids',
        name: 'Kids Product 2',
        image: 'images/kids-product2.jpg',
        price: 35.00,
    },
    {
        category: 'kids',
        name: 'Kids Product 3',
        image: 'images/kids-product3.jpg',
        price: 45.00,
    },
    {
        category: 'men',
        name: 'Men Product 1',
        image: 'images/men-product1.jpg',
        price: 70.00,
    },
    {
        category: 'men',
        name: 'Men Product 2',
        image: 'images/men-product2.jpg',
        price: 65.00,
    },
    {
        category: 'men',
        name: 'Men Product 3',
        image: 'images/men-product3.jpg',
        price: 75.00,
    },
    {
        category: 'women',
        name: 'Women Product 1',
        image: 'images/women-product1.jpg',
        price: 60.00,
    },
    {
        category: 'women',
        name: 'Women Product 2',
        image: 'images/women-product2.jpg',
        price: 55.00,
    },
    {
        category: 'women',
        name: 'Women Product 3',
        image: 'images/women-product3.jpg',
        price: 65.00,
    },
];

function generateProductCard(product) {
    return `
        <div class="product-card" data-category="${product.category}">
            <img src="${product.image}" alt="${product.name}" width="300" height="300">
            <h3>${product.name}</h3>
            <p class="price">${product.price.toFixed(2)} MAD</p>
            <button onclick="addToCart('${product.name}', ${product.price}, '${product.image}')">Add to Cart</button>
        </div>
    `;
}



*/

































/*
// Load products from the provided JSON file URL or use default if not successful
function loadProductsFromURL(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error loading products from URL:', error);
            // If loading from URL fails, provide default products or adjust as needed
            return [
                {
                    category: 'default',
                    name: 'Default Product',
                    image: 'default-image.jpg',
                    price: 10.00,
                },
                // Add default products or adjust as needed
            ];
        });
}

// Usage example:
const url = 'https://github.com/asadkanasiro/lionslife.github.io/blob/main/products.json';
loadProductsFromURL(url)
    .then(products => {
        // Use the loaded products here
        console.log(products);
        // Further logic to update the UI or perform operations with the products
    });



*/
/*
// Load products from localStorage or use default if not present
let products = loadProductsFromLocalStorage();

function loadProductsFromURL(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error loading products from URL:', error);
            // If loading from URL fails, provide default products or adjust as needed
            return [
                {
                    category: 'default',
                    name: 'Default Product',
                    image: 'default-image.jpg',
                    price: 10.00,
                },
                // Add default products or adjust as needed
            ];
        });
}

// Usage example:
const githubURL = 'https://raw.githubusercontent.com/asadkanasiro/lionslife.github.io/main/products.json';
loadProductsFromURL(githubURL)
    .then(products => {
        // Use the loaded products here
        console.log(products);
        // Further logic to update the UI or perform operations with the products
    });
    
*/










/*
const products = loadProductsFromLocalStorage();

function generateProductCard(product) {
    return `
        <div class="product-card" data-category="${product.category}">
            <img src="${product.image}" alt="${product.name}" width="300" height="300">
            <h3>${product.name}</h3>
            <p class="price">${product.price.toFixed(2)} MAD</p>
            <button class="add-to-cart-btn" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">Add to Cart</button>
        </div>
    `;
}

function renderProducts(productGrid, products) {
    productGrid.innerHTML = products.map(generateProductCard).join('');
}

function loadProductsFromLocalStorage() {
    const savedProducts = localStorage.getItem('savedProducts');

    return savedProducts ? JSON.parse(savedProducts) : getDefaultProducts();
}

function getDefaultProducts() {
    return [
        {
            category: 'default',
            name: 'Default Product',
            image: 'default-image.jpg',
            price: 10.00,
        },
        // Add default products or adjust as needed
    ];
}

function loadProducts(category = 'all') {
    const productGrid = document.getElementById('product-grid');
    const filteredProducts = (category === 'all') ? products : products.filter(product => product.category === category);
    renderProducts(productGrid, filteredProducts);

    updateCategoryLinks(category);
}

function updateCategoryLinks(category) {
    const categoryLinks = document.querySelectorAll('.category-filter ul li a');
    categoryLinks.forEach(link => link.classList.remove('selected'));

    const selectedCategoryLink = document.querySelector(`.category-filter ul li a[data-category="${category}"]`);
    if (selectedCategoryLink) {
        selectedCategoryLink.classList.add('selected');
    }
}

document.querySelector('.category-filter ul').addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
        const category = event.target.getAttribute('data-category');
        loadProducts(category);
    }
});

function performSearch() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();

    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = productName.includes(searchInput) ? 'block' : 'none';
    });
}

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', performSearch);

searchInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});*/









const username = 'asadkanasiro';
const repo = 'lionslife.github.io';
const path = 'products.json';
const token = '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';

let products; // Declare a variable to store the products

async function retrieveDataAndDisplay() {
    try {
        const response = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/${path}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();
        const decodedContent = atob(data.content);
        products = JSON.parse(decodedContent); // Assign the parsed data to the variable
        console.log('Retrieved data:', products);
        loadProducts('all'); // Load products initially
    } catch (error) {
        console.error('Error retrieving data:', error);
        showErrorMessage('Error retrieving data. Please try again.');
    }
}

function showErrorMessage(message) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
    });
}

function loadProducts(category) {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';

    const filteredProducts = category === 'all' ? products : products.filter(product => product.category === category);

    filteredProducts.forEach(product => {
        productGrid.innerHTML += generateProductCard(product);
    });

    updateCategoryLinks(category);
}

function updateCategoryLinks(category) {
    const categoryLinks = document.querySelectorAll('.category-filter ul li a');
    categoryLinks.forEach(link => link.classList.remove('selected'));
    const selectedCategoryLink = document.querySelector(`.category-filter ul li a[data-category="${category}"]`);
    if (selectedCategoryLink) {
        selectedCategoryLink.classList.add('selected');
    }
}

function generateProductCard(product) {
    return `
        <div class="product-card" data-category="${product.category}">
            <img src="${product.image}" alt="${product.name}" width="300" height="300">
            <h3>${product.name}</h3>
            <p class="price">${product.price.toFixed(2)} MAD</p>
            <button onclick="addToCart('${product.name}', ${product.price}, '${product.image}')">Add to Cart</button>
        </div>
    `;
}

// Load all products initially
retrieveDataAndDisplay();

document.querySelector('.category-filter ul').addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
        const category = event.target.getAttribute('data-category');
        loadProducts(category);
    }
});

function performSearch() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();

    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = productName.includes(searchInput) ? 'block' : 'none';
    });
}

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', performSearch);

searchInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});

// Rest of your code...












document.addEventListener('click', function (event) {
    if (event.target.classList.contains('add-to-cart-btn')) {
        const name = event.target.getAttribute('data-name');
        const price = parseFloat(event.target.getAttribute('data-price'));
        const image = event.target.getAttribute('data-image');
        addToCart(name, price, image);
    }
});
















