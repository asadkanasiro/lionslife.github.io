document.addEventListener("DOMContentLoaded", function() {
    // Your JavaScript code goes here
    function greet(name) {
        return "Hello, " + name + "!";
    }

    let userName = "John";
    let greeting = greet(userName);

    document.getElementById("output").innerHTML = greeting;

    // Toggle sidebar
    const toggleButton = document.getElementById("toggleButton");
    const sidebar = document.getElementById("sidebar");

    toggleButton.addEventListener("click", function() {
        sidebar.classList.toggle("show-sidebar");
        toggleButton.classList.toggle("active");
    });

    // Load images dynamically
    const imageContainer = document.getElementById("imageContainer");
    
    const imageSources = [
        "kids-product1.jpg",
        "kids-product1.jpg",
        "image3.jpg"
    ];

    for (let src of imageSources) {
        const img = document.createElement("img");
        img.src = src;
        img.alt = "Image";
        imageContainer.appendChild(img);
    }
});
