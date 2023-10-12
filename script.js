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

    // Save and retrieve data in JSON format
    const jsonData = {
        name: "Alice",
        age: 30,
        location: "New York"
    };

    // Save data to local storage
    localStorage.setItem("userData", JSON.stringify(jsonData));

    // Retrieve and display data from local storage
    const storedData = JSON.parse(localStorage.getItem("userData"));
    const userDataDiv = document.getElementById("userData");

    if (storedData) {
        userDataDiv.innerHTML = `
            <p>Name: ${storedData.name}</p>
            <p>Age: ${storedData.age}</p>
            <p>Location: ${storedData.location}</p>
        `;
    }
});
