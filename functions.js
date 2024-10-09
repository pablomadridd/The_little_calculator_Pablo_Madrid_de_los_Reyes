// Variables globales
let currentInput = '';
let operator = '';
let firstNumber = null;

// Manejar entrada de teclado
document.addEventListener('keydown', (event) => {
    // Permitir números, punto decimal y coma
    if (!isNaN(event.key) || event.key === '.' || event.key === ',') {
        appendToInput(event.key);
    } 
    // Permitir el signo negativo solo si el campo de entrada está vacío o si el último carácter es una operación
    else if (event.key === '-' && (currentInput === '' || ['+', '-', 'x', '/'].includes(currentInput.slice(-1)))) {
        appendToInput(event.key);
    }
    // Manejar la tecla Enter
    else if (event.key === 'Enter') {
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

// Manejar operaciones
function calculate() {
    if (operator && firstNumber !== null) {
        let secondNumber = parseFloat(currentInput);
        let result = 0;

        if (operator === '/' && secondNumber === 0) {
            alert("Error: Division by zero not allowed.");
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

// Diferenciar entre CSV y decimales
function handleCSVInput() {
    if (currentInput.includes(',') && currentInput.split(',').length > 1) {
        return 'csv';
    } else {
        return 'decimal';
    }
}

// Operaciones CSV
document.getElementById('sum').addEventListener('click', () => handleCSVOperation('sum'));
document.getElementById('sort').addEventListener('click', () => handleCSVOperation('sort'));
document.getElementById('reverse').addEventListener('click', () => handleCSVOperation('reverse'));
document.getElementById('removelast').addEventListener('click', () => handleCSVOperation('removelast'));

// Función para manejar operaciones CSV
function handleCSVOperation(operation) {
    if (handleCSVInput() === 'csv') {
        let csvValues = currentInput.split(',').map(Number);

        if (csvValues.some(isNaN)) {
            alert("Error: All values must be valid numbers.");
            clearCurrentInput();
            return;
        }

        switch (operation) {
            case 'sum':
                currentInput = csvValues.reduce((acc, val) => acc + val, 0).toString();
                updateInput();
                break;
            case 'sort':
                csvValues.sort((a, b) => a - b);
                currentInput = csvValues.join(', ');
                updateInput();
                break;
            case 'reverse':
                csvValues.reverse();
                currentInput = csvValues.join(', ');
                updateInput();
                break;
            case 'removelast':
                csvValues.pop();
                currentInput = csvValues.join(', ');
                updateInput();
                break;
        }
    } else {
        alert("Error: Enter CSV values.");
    }
}

// Funciones adicionales
function setOperator(op) {
    firstNumber = parseFloat(currentInput); // Establece el primer número
    operator = op; // Establece el operador
    currentInput = ''; // Limpia la entrada actual para el siguiente número
    updateInput(); // Actualiza la pantalla de entrada
}

function fillInfo(result) {
    document.getElementById('info').textContent = `Result: ${result}`;
}

// Limpia la entrada actual
function clearCurrentInput() {
    currentInput = '';
    updateInput();
    document.getElementById('info').textContent = '';
}

// Limpia el input cuando se enfoca
function clearInput() {
    document.getElementById('input').value = '';
}

// Función para calcular el factorial
document.getElementById('factorial').addEventListener('click', () => {
    if (currentInput && !currentInput.includes(',')) {
        const number = parseInt(currentInput, 10);
        if (number >= 0) {
            let factorial = 1;
            for (let i = 2; i <= number; i++) {
                factorial *= i;
            }
            currentInput = factorial.toString();
            updateInput();
            fillInfo(factorial);
        } else {
            alert('Error: Factorial only applies to non-negative integers.');
        }
    } else {
        alert('Error: Factorial does not apply to CSV values.');
    }
});

// Función para calcular el módulo (resto)
document.getElementById('modulo').addEventListener('click', mod);

// Función para calcular el módulo (resto)
function mod() {
    let num = parseFloat(currentInput); // Obtener el número ingresado

    if (isNaN(num)) { // Validar que sea un número
        alert("Error: Please enter a valid number.");
        clearCurrentInput();
        return;
    }

    // Retornar -X si es negativo, o dejarlo igual si es positivo
    currentInput = num < 0 ? -num : num; 
    updateInput(); // Actualiza el input con el resultado
}

// Función para calcular el cuadrado de un número
document.getElementById('square').addEventListener('click', () => {
    if (currentInput && !currentInput.includes(',')) {
        let number = parseFloat(currentInput);
        let result = number * number;
        currentInput = result.toString();
        updateInput();
        fillInfo(result);
    } else {
        alert('Error: Square function does not apply to CSV values.');
    }
});

// Función para calcular la raíz cuadrada
document.getElementById('sqrt').addEventListener('click', () => {
    if (currentInput && !currentInput.includes(',')) {
        let number = parseFloat(currentInput);
        if (number >= 0) {
            let result = Math.sqrt(number);
            currentInput = result.toString();
            updateInput();
            fillInfo(result);
        } else {
            alert('Error: Square root of a negative number is not allowed.');
        }
    } else {
        alert('Error: Square root does not apply to CSV values.');
    }
});

document.getElementById('input').addEventListener('click', () => {
    currentInput = '';
    firstNumber = null;
    operator = '';
    updateInput();
    document.getElementById('info').textContent = '';
});
