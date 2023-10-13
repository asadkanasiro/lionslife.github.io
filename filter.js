






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
