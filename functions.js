// Variables globales
let currentInput = '';
let operator = '';
let firstNumber = null;

// Manejar entrada de teclado
document.addEventListener('keydown', (event) => {
    if (!isNaN(event.key) || event.key === '.' || event.key === ',') {
        appendToInput(event.key);
    } else if (event.key === 'Enter') {
        calculate();
    }
});

// Función para añadir números al input
function appendToInput(value) {
    currentInput += value;
    updateInput();
}

// Actualizar el input visual
function updateInput() {
    document.getElementById('input').value = currentInput;
}

// Función para calcular el resultado de la operación
function calculate() {
    if (operator && firstNumber !== null) {
        let secondNumber = parseFloat(currentInput);
        let result = 0;

        // Manejo de errores para división por cero
        if (operator === '/' && secondNumber === 0) {
            alert("Error: División por cero no permitida.");
            clearCurrentInput();
            return;
        }

        switch (operator) {
            case '+':
                result = firstNumber + secondNumber;
                break;
            case '-':
                result = firstNumber - secondNumber;
                break;
            case '/':
                result = firstNumber / secondNumber;
                break;
            case 'x':
                result = firstNumber * secondNumber;
                break;
        }

        currentInput = result.toString();
        updateInput();
        fillInfo(result);
    }
}

// Manejar los botones de operaciones
document.getElementById('addition').addEventListener('click', () => setOperator('+'));
document.getElementById('subtraction').addEventListener('click', () => setOperator('-'));
document.getElementById('division').addEventListener('click', () => setOperator('/'));
document.getElementById('multiplication').addEventListener('click', () => setOperator('x'));
document.getElementById('equal').addEventListener('click', calculate);

// Funciones de CSV
document.getElementById('sum').addEventListener('click', () => handleCSVOperation('sum'));
document.getElementById('sort').addEventListener('click', () => handleCSVOperation('sort'));
document.getElementById('reverse').addEventListener('click', () => handleCSVOperation('reverse'));
document.getElementById('removelast').addEventListener('click', () => handleCSVOperation('removelast'));

// Función para manejar operaciones CSV
function handleCSVOperation(operation) {
    // Obtener valores de la entrada
    let input = currentInput;
    if (input) {
        let csvValues = input.split(',').map(Number);
        
        // Validar valores CSV
        if (csvValues.some(isNaN)) {
            alert("Error: Todos los valores deben ser números válidos.");
            clearCurrentInput();
            return;
        }

        switch (operation) {
            case 'sum':
                let sum = csvValues.reduce((acc, val) => acc + val, 0);
                currentInput = sum.toString(); // Mostrar el resultado en el input
                updateInput();
                break;
            case 'sort':
                csvValues.sort((a, b) => a - b);
                currentInput = csvValues.join(', '); // Mostrar los valores ordenados en el input
                updateInput();
                break;
            case 'reverse':
                csvValues.reverse();
                currentInput = csvValues.join(', '); // Mostrar los valores revertidos en el input
                updateInput();
                break;
            case 'removelast':
                csvValues.pop();
                currentInput = csvValues.join(', '); // Mostrar los valores después de eliminar el último
                updateInput();
                break;
        }
    } else {
        alert("Error: Ingresa valores CSV primero.");
    }
}

// Funciones de operaciones adicionales
document.getElementById('factorial').addEventListener('click', () => {
    let num = parseInt(currentInput);
    if (isNaN(num) || num < 0) {
        alert("Error: Debe ingresar un número entero no negativo.");
        clearCurrentInput();
        return;
    }
    let fact = factorial(num);
    currentInput = fact.toString(); // Mostrar el resultado en el input
    updateInput();
});

document.getElementById('modulo').addEventListener('click', () => {
    let num = parseFloat(currentInput);
    let mod = num % 2; // Módulo 2
    currentInput = mod.toString(); // Mostrar el resultado en el input
    updateInput();
});

document.getElementById('square').addEventListener('click', () => {
    let num = parseFloat(currentInput);
    let square = num * num;
    currentInput = square.toString(); // Mostrar el resultado en el input
    updateInput();
});

document.getElementById('sqrt').addEventListener('click', () => {
    let num = parseFloat(currentInput);
    if (num < 0) {
        alert("Error: No se puede calcular la raíz cuadrada de un número negativo.");
        clearCurrentInput();
        return;
    }
    let sqrt = Math.sqrt(num);
    currentInput = sqrt.toString(); // Mostrar el resultado en el input
    updateInput();
});

// Funciones auxiliares
function setOperator(op) {
    firstNumber = parseFloat(currentInput);
    operator = op;
    currentInput = '';
    updateInput();
}

function factorial(num) {
    if (num === 0 || num === 1) return 1;
    return num * factorial(num - 1);
}

function fillInfo(result) {
    document.getElementById('info').innerText = `Resultado: ${result}`;
}

function clearCurrentInput() {
    currentInput = '';
    updateInput();
}

function clearInput() {
    document.getElementById('input').value = '';
}

// NUEVA FUNCIÓN: Limpiar la pantalla y el historial al hacer clic en el campo de entrada
document.getElementById('input').addEventListener('click', () => {
    currentInput = '';
    firstNumber = null;
    operator = '';
    updateInput();
    document.getElementById('info').innerText = '';  // Limpiar el historial
});
