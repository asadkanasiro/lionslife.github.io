document.addEventListener("DOMContentLoaded", function() {
    // Your JavaScript code goes here
    function greet(name) {
        return "Hello, " + name + "!";
    }

    let userName = "John";
    let greeting = greet(userName);

    document.getElementById("output").innerHTML = greeting;
});
