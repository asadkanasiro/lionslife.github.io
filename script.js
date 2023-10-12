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
});












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






















// Rest of your code...



// Function to toggle the filter state and update the button color
function toggleFilter() {
    const filterOptions = document.querySelectorAll('.filter-options label');
    const filterToggleButton = document.getElementById('filter-toggle-button');

    // Toggle the filter state
    isFilterActive = !isFilterActive;

    // Toggle the background color of the filter button based on the filter state
    if (isFilterActive) {
        filterToggleButton.classList.add('active-filter');
    } else {
        filterToggleButton.classList.remove('active-filter');
    }

    // Loop through filter option buttons and add/remove the "active-filter" class
    filterOptions.forEach(option => {
        if (isFilterActive) {
            option.classList.add('active-filter');
        } else {
            option.classList.remove('active-filter');
        }
    });

    // Toggle the visibility of the filter options
    const filterOptionsContainer = document.querySelector('.filter-options');
    filterOptionsContainer.classList.toggle('hidden');
}


// Add a click event listener to the filter button
const filterToggleButton = document.getElementById('filter-toggle-button');
filterToggleButton.addEventListener('click', toggleFilter);

































// JavaScript to handle the shopping cart, category filtering, and search functionality

// Initialize an empty cart and total
let cart = [];
let total = 0;

// Function to add a product to the cart
function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: productPrice });
    total += productPrice;

    // Update the cart display
    updateCartDisplay();
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
        listItem.textContent = `${item.name} - ${item.price.toFixed(2)} MAD`;
        cartItems.appendChild(listItem);
    });

    // Update the cart total
    cartTotal.textContent = total.toFixed(2) + ' MAD';
}

// Function to load products based on category
function loadProducts(category) {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';

    // Remove the "selected" class from all category links
    const categoryLinks = document.querySelectorAll('.category-filter ul li a');
    categoryLinks.forEach(link => {
        link.classList.remove('selected');
    });

    if (category === 'all') {
        // Load all products
        loadAllProducts();
    } else if (category === 'kids') {
        // Kids Products
        const kidsProduct1 = `
            <div class="product-card" data-category="kids">
                <img src="images/kids-product1.jpg" alt="Kids Product 1" width="300" height="300">
                <h3>Kids Product 1</h3>
                <p class="price">40.00 MAD</p>
                <button onclick="addToCart('Kids Product 1', 40.00)">Add to Cart</button>
            </div>
        `;

        const kidsProduct2 = `
            <div class="product-card" data-category="kids">
                <img src="images/kids-product2.jpg" alt="Kids Product 2" width="300" height="300">
                <h3>Kids Product 2</h3>
                <p class="price">35.00 MAD</p>
                <button onclick="addToCart('Kids Product 2', 35.00)">Add to Cart</button>
            </div>
        `;

        const kidsProduct3 = `
            <div class="product-card" data-category="kids">
                <img src="images/kids-product3.jpg" alt="Kids Product 3" width="300" height="300">
                <h3>Kids Product 3</h3>
                <p class="price">45.00 MAD</p>
                <button onclick="addToCart('Kids Product 3', 45.00)">Add to Cart</button>
            </div>
        `;

        // Add Kids Products to the product grid
        productGrid.innerHTML = kidsProduct1 + kidsProduct2 + kidsProduct3;
    } else if (category === 'men') {
        // Men Products
        const menProduct1 = `
            <div class="product-card" data-category="men">
                <img src="images/men-product1.jpg" alt="Men Product 1" width="300" height="300">
                <h3>Men Product 1</h3>
                <p class="price">70.00 MAD</p>
                <button onclick="addToCart('Men Product 1', 70.00)">Add to Cart</button>
            </div>
        `;

        const menProduct2 = `
            <div class="product-card" data-category="men">
                <img src="images/men-product2.jpg" alt="Men Product 2" width="300" height="300">
                <h3>Men Product 2</h3>
                <p class="price">65.00 MAD</p>
                <button onclick="addToCart('Men Product 2', 65.00)">Add to Cart</button>
            </div>
        `;

        const menProduct3 = `
            <div class="product-card" data-category="men">
                <img src="images/men-product3.jpg" alt="Men Product 3" width="300" height="300">
                <h3>Men Product 3</h3>
                <p class="price">75.00 MAD</p>
                <button onclick="addToCart('Men Product 3', 75.00)">Add to Cart</button>
            </div>
        `;

        // Add Men Products to the product grid
        productGrid.innerHTML = menProduct1 + menProduct2 + menProduct3;
    } else if (category === 'women') {
        // Women Products
        const womenProduct1 = `
            <div class="product-card" data-category="women">
                <img src="images/women-product1.jpg" alt="Women Product 1" width="300" height="300">
                <h3>Women Product 1</h3>
                <p class="price">60.00 MAD</p>
                <button onclick="addToCart('Women Product 1', 60.00)">Add to Cart</button>
            </div>
        `;

        const womenProduct2 = `
            <div class="product-card" data-category="women">
                <img src="images/women-product2.jpg" alt="Women Product 2" width="300" height="300">
                <h3>Women Product 2</h3>
                <p class="price">55.00 MAD</p>
                <button onclick="addToCart('Women Product 2', 55.00)">Add to Cart</button>
            </div>
        `;

        const womenProduct3 = `
            <div class="product-card" data-category="women">
                <img src="images/women-product3.jpg" alt="Women Product 3" width="300" height="300">
                <h3>Women Product 3</h3>
                <p class="price">65.00 MAD</p>
                <button onclick="addToCart('Women Product 3', 65.00)">Add to Cart</button>
            </div>
        `;

        // Add Women Products to the product grid
        productGrid.innerHTML = womenProduct1 + womenProduct2 + womenProduct3;
    }

    // Add the "selected" class to the clicked category link
    const selectedCategoryLink = document.querySelector(`.category-filter ul li a[data-category="${category}"]`);
    if (selectedCategoryLink) {
        selectedCategoryLink.classList.add('selected');
    }
}

// Function to load all products
function loadAllProducts() {
    // Load products from all categories
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';

    // Products from all categories
    const allProducts = `
        <div class="product-card" data-category="kids">
            <img src="images/kids-product1.jpg" alt="Kids Product 1" width="300" height="300">
            <h3>Kids Product 1</h3>
            <p class="price">40.00 MAD</p>
            <button onclick="addToCart('Kids Product 1', 40.00)">Add to Cart</button>
        </div>

        <div class="product-card" data-category="kids">
            <img src="images/kids-product2.jpg" alt="Kids Product 2" width="300" height="300">
            <h3>Kids Product 2</h3>
            <p class="price">35.00 MAD</p>
            <button onclick="addToCart('Kids Product 2', 35.00)">Add to Cart</button>
        </div>

        <div class="product-card" data-category="kids">
            <img src="images/kids-product3.jpg" alt="Kids Product 3" width="300" height="300">
            <h3>Kids Product 3</h3>
            <p class="price">45.00 MAD</p>
            <button onclick="addToCart('Kids Product 3', 45.00)">Add to Cart</button>
        </div>

        <div class="product-card" data-category="men">
            <img src="images/men-product1.jpg" alt="Men Product 1" width="300" height="300">
            <h3>Men Product 1</h3>
            <p class="price">70.00 MAD</p>
            <button onclick="addToCart('Men Product 1', 70.00)">Add to Cart</button>
        </div>

        <div class="product-card" data-category="men">
            <img src="images/men-product2.jpg" alt="Men Product 2" width="300" height="300">
            <h3>Men Product 2</h3>
            <p class="price">65.00 MAD</p>
            <button onclick="addToCart('Men Product 2', 65.00)">Add to Cart</button>
        </div>

        <div class="product-card" data-category="men">
            <img src="images/men-product3.jpg" alt="Men Product 3" width="300" height="300">
            <h3>Men Product 3</h3>
            <p class="price">75.00 MAD</p>
            <button onclick="addToCart('Men Product 3', 75.00)">Add to Cart</button>
        </div>

        <div class="product-card" data-category="women">
            <img src="images/women-product1.jpg" alt="Women Product 1" width="300" height="300">
            <h3>Women Product 1</h3>
            <p class="price">60.00 MAD</p>
            <button onclick="addToCart('Women Product 1', 60.00)">Add to Cart</button>
        </div>

        <div class="product-card" data-category="women">
            <img src="images/women-product2.jpg" alt="Women Product 2" width="300" height="300">
            <h3>Women Product 2</h3>
            <p class="price">55.00 MAD</p>
            <button onclick="addToCart('Women Product 2', 55.00)">Add to Cart</button>
        </div>

        <div class="product-card" data-category="women">
            <img src="images/women-product3.jpg" alt="Women Product 3" width="300" height="300">
            <h3>Women Product 3</h3>
            <p class="price">65.00 MAD</p>
            <button onclick="addToCart('Women Product 3', 65.00)">Add to Cart</button>
        </div>
    `;

    // Add all products to the product grid
    productGrid.innerHTML = allProducts;
}

// Load all products initially
loadProducts('all');

// Function to perform a search
function performSearch() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();

    // Filter product cards based on search input
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = productName.includes(searchInput) ? 'block' : 'none';
    });
}

// Attach search functionality to the search input field
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', performSearch);

// Initialize the search input element with an event listener for the "Enter" key
searchInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});


