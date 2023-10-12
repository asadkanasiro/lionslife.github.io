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

        // Add other kids products here...

        // Add Kids Products to the product grid
        productGrid.innerHTML = kidsProduct1;
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

        // Add other men products here...

        // Add Men Products to the product grid
        productGrid.innerHTML = menProduct1;
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

        // Add other women products here...

        // Add Women Products to the product grid
        productGrid.innerHTML = womenProduct1;
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

// Attach search functionality to the search button
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', performSearch);

// Initialize the search input element with an event listener for the "Enter" key
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});

// Highlight the selected category link when clicked
const categoryLinks = document.querySelectorAll('.category-filter ul li a');
categoryLinks.forEach(link => {
    link.addEventListener('click', function () {
        // Remove the "selected" class from all category links
        categoryLinks.forEach(link => {
            link.classList.remove('selected');
        });

        // Add the "selected" class to the clicked category link
        link.classList.add('selected');
    });
});

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

// Function to attach event listeners to filter buttons
function attachFilterEventListeners() {
    const priceHighToLowButton = document.querySelector('.filter-options button:nth-child(1)');
    const priceLowToHighButton = document.querySelector('.filter-options button:nth-child(2)');
    const bestSellersButton = document.querySelector('.filter-options button:nth-child(3)');
    const newestButton = document.querySelector('.filter-options button:nth-child(4)');
    const featuredButton = document.querySelector('.filter-options button:nth-child(5)');

    priceHighToLowButton.addEventListener('click', filterByPriceHighToLow);
    priceLowToHighButton.addEventListener('click', filterByPriceLowToHigh);
    bestSellersButton.addEventListener('click', filterByBestSellers);
    newestButton.addEventListener('click', filterByNewest);
    featuredButton.addEventListener('click', filterByFeatured);
}

// Call this function to attach event listeners when the page loads
attachFilterEventListeners();
