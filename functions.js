// Variables globales
let currentInput = '';
let operator = '';
let firstNumber = null;

// Manejar entrada de teclado
document.addEventListener('keydown', (event) => {
    if (!isNaN(event.key) || event.key === '.' || event.key === ',') {
        appendToInput(event.key);
    } else if (event.key === '-' && (currentInput === '' || ['+', '-', 'x', '/'].includes(currentInput.slice(-1)))) {
        appendToInput(event.key);
    } else if (event.key === 'Enter') {
        calculate();
    }
});

function appendToInput(value) {
    currentInput += value;
    updateInput();
}

function updateInput() {
    document.getElementById('input').value = currentInput;
}

function calculate() {
    if (operator && firstNumber !== null) {
        let secondNumber = parseFloat(currentInput);
        let result = 0;

        if (operator === '/' && secondNumber === 0) {
            notifyError("Error: Division by zero.");
            clearCurrentInput();
            return;
        }

        switch (operator) {
            case '+':
                result = firstNumber + secondNumber;
                updateInformativeField("Operation: Addition.");
                break;
            case '-':
                result = firstNumber - secondNumber;
                updateInformativeField("Operation: Subtraction.");
                break;
            case '/':
                result = firstNumber / secondNumber;
                updateInformativeField("Operation: Division.");
                break;
            case 'x':
                result = firstNumber * secondNumber;
                updateInformativeField("Operation: Multiplication.");
                break;
        }

        currentInput = result.toString();
        updateInput();
        fillInfo(result);

    }
}

// Botones de operaciones
document.getElementById('addition').addEventListener('click', () => setOperator('+'));
document.getElementById('subtraction').addEventListener('click', () => setOperator('-'));
document.getElementById('division').addEventListener('click', () => setOperator('/'));
document.getElementById('multiplication').addEventListener('click', () => setOperator('x'));
document.getElementById('equal').addEventListener('click', calculate);
document.getElementById('modulo').addEventListener('click', mod);

// Botón para cambiar signo
document.getElementById('sign').addEventListener('click', () => {
    if (currentInput) {
        currentInput = (-parseFloat(currentInput)).toString();
        updateInput();
    }
});

// Operaciones CSV
document.getElementById('sum').addEventListener('click', () => handleCSVOperation('sum'));
document.getElementById('sort').addEventListener('click', () => handleCSVOperation('sort'));
document.getElementById('reverse').addEventListener('click', () => handleCSVOperation('reverse'));
document.getElementById('removelast').addEventListener('click', () => handleCSVOperation('removelast'));

// Manejo de CSV y validación de errores
function handleCSVOperation(operation) {
    if (handleCSVInput() === 'csv') {
        let csvValues = currentInput.split(',').map(Number);

        if (csvValues.some(isNaN)) {
            notifyError("Error: Invalid CSV values.");
            clearCurrentInput();
            return;
        }

        switch (operation) {
            case 'sum':
                currentInput = csvValues.reduce((acc, val) => acc + val, 0).toString();
                updateInformativeField("Operation: Sum of CSV values.");
                break;
            case 'sort':
                csvValues.sort((a, b) => a - b);
                currentInput = csvValues.join(', ');
                updateInformativeField("Operation: CSV values sorted.");
                break;
            case 'reverse':
                csvValues.reverse();
                currentInput = csvValues.join(', ');
                updateInformativeField("Operation: CSV values reversed.");
                break;
            case 'removelast':
                csvValues.pop();
                currentInput = csvValues.join(', ');
                updateInformativeField("Operation: Last CSV value removed.");
                break;
        }
        updateInput();
    } else {
        notifyError("Error: Invalid input, CSV values expected.");
    }
}

// Funciones adicionales
function setOperator(op) {
    firstNumber = parseFloat(currentInput);
    operator = op;
    currentInput = '';
    updateInput();
}

function fillInfo(result) {
    document.getElementById('info').textContent = `Result: ${result}`;
}

function clearInput() {
    currentInput = '';
    updateInput();
    document.getElementById('info').textContent = '';
}

function clearCurrentInput() {
    currentInput = '';
    updateInput();
}

document.getElementById('clear').addEventListener('click', clearInput);

// Operaciones unarias
document.getElementById('square').addEventListener('click', () => {
    if (currentInput) {
        let result = Math.pow(parseFloat(currentInput), 2);
        currentInput = result.toString();
        updateInput();
        updateInformativeField("Operation: Square.");
        fillInfo(result);
        
    }
});

document.getElementById('sqrt').addEventListener('click', () => {
    if (currentInput) {
        if (parseFloat(currentInput) < 0) {
            notifyError("Error: Square root of a negative number is not real.");
            return;
        }
        let result = Math.sqrt(parseFloat(currentInput));
        currentInput = result.toString();
        updateInput();
        updateInformativeField("Operation: Square root.");
        fillInfo(result);


    }
});

document.getElementById('factorial').addEventListener('click', () => {
    if (!currentInput.includes(',')) {
        let number = parseInt(currentInput);
        if (number < 0) {
            notifyError("Error: Factorial of a negative number is not possible.");
        } else if (number > 170) {
            notifyError("Error: Number too large for factorial.");
        } else {
            currentInput = fact(number).toString();
            updateInput();
            updateInformativeField("Operation: Factorial.");
        }
    } else {
        notifyError("Error: Invalid input for factorial.");
    }
});

function fact(n) {
    if (n === 0 || n === 1) return 1;
    return n * fact(n - 1);
}

function mod() {
    if (currentInput) {
        currentInput = Math.abs(parseFloat(currentInput)).toString();
        updateInput();
        updateInformativeField("Operation: Module.");
    }
}

// Manejo de errores
function notifyError(errorMessage) {
    alert(errorMessage);
    document.getElementById('info').textContent = errorMessage;
}

function updateInformativeField(message) {
    document.getElementById('info').textContent = message;
}

function handleCSVInput() {
    if (currentInput.includes(',')) return 'csv';
    return 'number';
}


function fillInfo(result) {
    let infoElement = document.getElementById('info');
    let message = `Result: ${result}. `;

    // Verificar si el resultado es menor que 100, entre 100-200, o mayor a 200
    if (result < 100) {
        message += "The result is less than 100.";
    } else if (result >= 100 && result <= 200) {
        message += "The result is between 100 and 200.";
    } else if (result > 200) {
        message += "The result is greater than 200.";
    }

    // Actualizar el campo informativo
    infoElement.textContent = message;
}

document.getElementById('power').addEventListener('click', () => {
    if (currentInput) {
        let exponent = prompt("Enter the exponent:");
        if (exponent !== null && !isNaN(exponent)) {
            let result = Math.pow(parseFloat(currentInput), parseFloat(exponent));
            currentInput = result.toString();
            updateInput();
            updateInformativeField("Operation: Power.");
            fillInfo(result);
        } else {
            notifyError("Error: Invalid exponent.");
        }
    } else {
        notifyError("Error: No number entered.");
    }
});

document.getElementById('removeSpecific').addEventListener('click', () => {
    if (currentInput.includes(',')) {
        let valueToRemove = prompt("Enter the number to remove from the CSV:");
        if (valueToRemove !== null) {
            let csvValues = currentInput.split(',').map(Number);
            valueToRemove = parseFloat(valueToRemove);
            const index = csvValues.indexOf(valueToRemove);
            if (index !== -1) {
                csvValues.splice(index, 1); // Eliminar el valor específico
                currentInput = csvValues.join(', ');
                updateInput();
                updateInformativeField(`Operation: Removed ${valueToRemove} from CSV values.`);
            } else {
                notifyError("Error: Value not found in CSV.");
            }
        }
    } else {
        notifyError("Error: No CSV values to process.");
    }
});


let isDarkTheme = false;

document.getElementById('toggleTheme').addEventListener('click', () => {
    document.body.classList.toggle('dark-theme', isDarkTheme);
    isDarkTheme = !isDarkTheme;
});


