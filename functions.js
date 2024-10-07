// State variables
let currentInput = "";
let previousInput = "";
let operator = "";

// Get screen and info elements
const screen = document.getElementById("screen");
const infoField = document.getElementById("info");

// Update screen function
function updateScreen(value) {
    screen.value = value;
}

// Update info function
function updateInfo(message) {
    infoField.textContent = message;
}

// Clear screen and reset variables
function clearScreen() {
    currentInput = "";
    previousInput = "";
    operator = "";
    updateScreen("");
    updateInfo("Calculator cleared");
}

// Perform calculation based on operator
function calculate(prev, curr, op) {
    const x = parseFloat(prev);
    const y = parseFloat(curr);

    switch (op) {
        case "+":
            return (x + y).toString();
        case "-":
            return (x - y).toString();
        case "*":
            return (x * y).toString();
        case "/":
            return (x / y).toString();
        case "^":
            return Math.pow(x, y).toString();
        case "%":
            return (x % y).toString();
        default:
            return curr;
    }
}

// Factorial function
function factorial(n) {
    return n === 0 ? 1 : n * factorial(n - 1);
}

// Handle keyboard input
document.addEventListener("keydown", (e) => {
    const key = e.key;

    // Handle number input
    if (!isNaN(key)) {
        currentInput += key;
        updateScreen(currentInput);
    }

    // Handle operators
    if (["+", "-", "*", "/", "^", "%"].includes(key)) {
        previousInput = currentInput;
        operator = key;
        currentInput = "";
        updateInfo(`Operator selected: ${key}`);
    }

    // Handle square root
    if (key === "r") {
        currentInput = Math.sqrt(parseFloat(currentInput)).toString();
        updateScreen(currentInput);
        updateInfo(`Square root calculated: ${currentInput}`);
    }

    // Handle factorial
    if (key === "!") {
        currentInput = factorial(parseInt(currentInput)).toString();
        updateScreen(currentInput);
        updateInfo(`Factorial: ${currentInput}`);
    }

    // Handle clear (Escape key)
    if (key === "Escape") {
        clearScreen();
    }

    // Handle equal (Enter key)
    if (key === "Enter") {
        currentInput = calculate(previousInput, currentInput, operator);
        updateScreen(currentInput);
        updateInfo(`Result: ${currentInput}`);
    }

    // Handle backspace (delete last character)
    if (key === "Backspace") {
        currentInput = currentInput.slice(0, -1);
        updateScreen(currentInput);
    }
});

