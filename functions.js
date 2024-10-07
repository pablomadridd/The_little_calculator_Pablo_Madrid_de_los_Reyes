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

        switch (operation) {
            case 'sum':
                let sum = csvValues.reduce((acc, val) => acc + val, 0);
                alert(`Suma: ${sum}`);
                break;
            case 'sort':
                csvValues.sort((a, b) => a - b);
                alert(`Valores ordenados: ${csvValues.join(', ')}`);
                break;
            case 'reverse':
                csvValues.reverse();
                alert(`Valores revertidos: ${csvValues.join(', ')}`);
                break;
            case 'removelast':
                csvValues.pop();
                alert(`Valores después de eliminar el último: ${csvValues.join(', ')}`);
                break;
        }
        currentInput = csvValues.join(', ');
        updateInput();
    }
}

// Función para establecer operador
function setOperator(op) {
    operator = op;
    firstNumber = parseFloat(currentInput);
    currentInput = '';
    updateInput();
}

// Función para calcular factorial
document.getElementById('factorial').addEventListener('click', () => {
    let num = parseInt(currentInput);
    if (num < 0) {
        alert("No se puede calcular el factorial de un número negativo.");
        return;
    }
    let factorial = 1;
    for (let i = 1; i <= num; i++) {
        factorial *= i;
    }
    currentInput = factorial.toString();
    updateInput();
    fillInfo(factorial);
});

// Función para calcular módulo
document.getElementById('modulo').addEventListener('click', () => {
    let numbers = currentInput.split(',');
    if (numbers.length !== 2) {
        alert("Por favor, ingresa dos números separados por coma para calcular el módulo.");
        return;
    }
    let num1 = parseFloat(numbers[0]);
    let num2 = parseFloat(numbers[1]);
    let result = num1 % num2;
    currentInput = result.toString();
    updateInput();
    fillInfo(result);
});

// Función para elevar al cuadrado
document.getElementById('square').addEventListener('click', () => {
    let num = parseFloat(currentInput);
    let result = num * num;
    currentInput = result.toString();
    updateInput();
    fillInfo(result);
});

// Función para calcular raíz cuadrada
document.getElementById('sqrt').addEventListener('click', () => {
    let num = parseFloat(currentInput);
    let result = Math.sqrt(num);
    currentInput = result.toString();
    updateInput();
    fillInfo(result);
});

// Función para mostrar resultados en info
function fillInfo(result) {
    document.getElementById('info').textContent = `Resultado: ${result}`;
}

// Limpiar entrada al enfocar
function clearInput() {
    currentInput = '';
    updateInput();
    document.getElementById('info').textContent = '';
}
