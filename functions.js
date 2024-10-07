let currentOperator = '';
let firstNumber = null;

function setOperator(operator) {
    currentOperator = operator;
    firstNumber = parseFloat(document.getElementById("inputField").value);
    document.getElementById("inputField").value = '';  // Limpia el campo para el segundo número
}

function eq() {
    const secondNumber = parseFloat(document.getElementById("inputField").value);
    let result;
    if (currentOperator === '+') {
        result = firstNumber + secondNumber;
    } else if (currentOperator === '*') {
        result = firstNumber * secondNumber;
    }
    document.getElementById("inputField").value = result;
    fill_info(result);
}

function square() {
    const number = parseFloat(document.getElementById("inputField").value);
    const result = number * number;
    document.getElementById("inputField").value = result;
    fill_info(result);
}

function mod() {
    const number = parseFloat(document.getElementById("inputField").value);
    const result = number < 0 ? -number : number;
    document.getElementById("inputField").value = result;
}

function fact() {
    let number = parseInt(document.getElementById("inputField").value);
    let result = 1;
    for (let i = 1; i <= number; i++) {
        result *= i;
    }
    document.getElementById("inputField").value = result;
}

function fill_info(result) {
    const infoField = document.getElementById("info");
    if (result < 100) {
        infoField.textContent = "Info: The result is less than 100";
    } else if (result >= 100 && result <= 200) {
        infoField.textContent = "Info: The result is between 100 and 200";
    } else {
        infoField.textContent = "Info: The result is greater than 200";
    }
}

function sum() {
    const values = document.getElementById("inputField").value.split(',').map(Number);
    const total = values.reduce((acc, val) => acc + val, 0);
    document.getElementById("inputField").value = total;
}

function sort() {
    const values = document.getElementById("inputField").value.split(',').map(Number);
    values.sort((a, b) => a - b);
    document.getElementById("inputField").value = values.join(',');
}

function reverse() {
    const values = document.getElementById("inputField").value.split(',').map(Number);
    values.reverse();
    document.getElementById("inputField").value = values.join(',');
}

function removeLast() {
    const values = document.getElementById("inputField").value.split(',').map(Number);
    values.pop();
    document.getElementById("inputField").value = values.join(',');
}
