
// Get current hour
const now = new Date();
const hour = now.getHours();
let greeting;

// Set greeting message based on time of day
if (hour < 12) {
    greeting = "Good morning!";
} else if (hour < 18) {
    greeting = "Good afternoon!";
} else {
    greeting = "Good evening!";
}

// Create a paragraph element for the greeting
const greetMsg = document.createElement("p");
greetMsg.textContent = greeting;
greetMsg.style.textAlign = "center";
greetMsg.style.fontWeight = "bold";

// Insert greeting at the top of the body
document.body.insertBefore(greetMsg, document.body.firstChild);