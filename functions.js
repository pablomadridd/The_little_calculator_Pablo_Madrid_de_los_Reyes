// Variables globales
let currentInput = '';
let operator = '';
let firstNumber = null;
// Array para almacenar los errores para el log
let errorLog = [];


// Manejar entrada de teclado
document.addEventListener('keydown', (event) => {
    if (!isNaN(event.key) || event.key === '.' || event.key === ',') {
        appendToInput(event.key);
    } else if (event.key === '-' && (currentInput === '' || ['+', '-', 'x', '/'].includes(currentInput.slice(-1)))) {
        appendToInput(event.key);
    } else if (event.key === 'Enter') {
        eq();
    }
});

function appendToInput(value) {
    currentInput += value;
    updateInput();
}

function updateInput() {
    document.getElementById('input').value = currentInput;
}

function eq() {
    if (!validate(currentInput)) {
        clearCurrentInput();
        return; // Salir si la entrada es inválida
    }

    if (operator && firstNumber !== null) {
        let secondNumber = parseFloat(currentInput);
        let result = 0;

        if (operator === '/' && secondNumber === 0) {
            notifyError("Error: Division by zero.");
            logError("Division by zero");  // Agregamos el log de errores
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
        fillInfo(result, operator); // Actualizar información aquí
    }
}

// Botones de operaciones
document.getElementById('addition').addEventListener('click', () => setOperator('+'));
document.getElementById('subtraction').addEventListener('click', () => setOperator('-'));
document.getElementById('division').addEventListener('click', () => setOperator('/'));
document.getElementById('multiplication').addEventListener('click', () => setOperator('x'));
document.getElementById('equal').addEventListener('click', eq);
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
document.getElementById('average').addEventListener('click', () => handleCSVOperation('average'));

// Manejo de CSV y validación de errores
function handleCSVOperation(operation) {
    // Validar la entrada actual para CSV
    if (!validate(currentInput)) {
        clearCurrentInput();
        return; // Salir si la entrada es inválida
    }

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
            fillInfo(parseFloat(currentInput), operation); // Actualizar información aquí
            break;
        case 'sort':
            csvValues.sort((a, b) => a - b);
            currentInput = csvValues.join(', ');
            updateInformativeField("Operation: CSV values sorted.");
            fillInfo(currentInput.length, operation); // Puedes ajustar esto si quieres otro tipo de resultado
            break;
        case 'reverse':
            csvValues.reverse();
            currentInput = csvValues.join(', ');
            updateInformativeField("Operation: CSV values reversed.");
            fillInfo(currentInput.length, operation); // Puedes ajustar esto si quieres otro tipo de resultado
            break;
        case 'removelast':
            csvValues.pop();
            currentInput = csvValues.join(', ');
            updateInformativeField("Operation: Last CSV value removed.");
            fillInfo(currentInput.length, operation); // Puedes ajustar esto si quieres otro tipo de resultado
            break;
        case 'average':
            let average = csvValues.reduce((acc, val) => acc + val, 0) / csvValues.length;
            currentInput = average.toString();
            updateInput();
            updateInformativeField("Operation: Average of CSV values.");
            fillInfo(average, "Average CSV");
            break;
    }
    updateInput();
}

// Funciones adicionales
function setOperator(op) {
    firstNumber = parseFloat(currentInput);
    operator = op;
    currentInput = '';
    updateInput();
}

function fillInfo(result, operation) {
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

    // Personalizar mensaje basado en la operación
    if (operation) {
        message = `Operation: ${operation}. ` + message;
    }

    // Actualizar el campo informativo
    infoElement.textContent = message;
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
        fillInfo(result, "Square"); // Actualizar información aquí
    }
});

document.getElementById('sqrt').addEventListener('click', () => {
    if (currentInput) {
        if (parseFloat(currentInput) < 0) {
            notifyError("Error: Square root of a negative number is not real.");
            logError("Square root of negative number");  // Agregamos el log de errore
            return;
        }
        let result = Math.sqrt(parseFloat(currentInput));
        currentInput = result.toString();
        updateInput();
        updateInformativeField("Operation: Square root.");
        fillInfo(result, "Square root"); // Actualizar información aquí
    }
});

document.getElementById('factorial').addEventListener('click', () => {
    if (!currentInput.includes(',')) {
        let number = parseInt(currentInput);
        if (number < 0) {
            notifyError("Error: Factorial of a negative number is not possible.");
            logError("Factorial of negative number");  // Agregamos el log de errores
        } else if (number > 170) {
            notifyError("Error: Number too large for factorial.");
            logError("Factorial too large");  // Agregamos el log de errores
        } else {
            currentInput = fact(number).toString();
            updateInput();
            updateInformativeField("Operation: Factorial.");
            fillInfo(parseInt(currentInput), "Factorial"); // Actualizar información aquí
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
        fillInfo(parseFloat(currentInput), "Module"); // Actualizar información aquí
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

document.getElementById('power').addEventListener('click', () => {
    if (currentInput) {
        let exponent = prompt("Enter the exponent:");
        if (exponent !== null && !isNaN(exponent)) {
            let result = Math.pow(parseFloat(currentInput), parseFloat(exponent));
            currentInput = result.toString();
            updateInput();
            updateInformativeField("Operation: Power.");
            fillInfo(result, "Power"); // Actualizar información aquí
        } else {
            notifyError("Error: Invalid exponent.");
        }
    } else {
        notifyError("Error: No number entered.");
    }
});

document.getElementById('removeSpecific').addEventListener('click', () => {
    if (currentInput.includes(',')) {
        let valueToRemove = prompt("Enter the number to remove:");
        if (valueToRemove !== null) {
            let values = currentInput.split(',').map(Number);
            let indexToRemove = values.indexOf(parseFloat(valueToRemove));
            if (indexToRemove !== -1) {
                values.splice(indexToRemove, 1);
                currentInput = values.join(',');
                updateInput();
                updateInformativeField(`Operation: Removed specific value ${valueToRemove} from CSV.`);
                fillInfo(currentInput.length, "Remove specific"); // Actualizar información aquí
            } else {
                notifyError("Error: Value not found in CSV.");
            }
        }
    } else {
        notifyError("Error: No CSV input to remove from.");
    }
});



let isDarkTheme = false;

document.getElementById('toggleTheme').addEventListener('click', () => {
    document.body.classList.toggle('dark-theme', isDarkTheme);
    isDarkTheme = !isDarkTheme;
});


function validate(input) {
    // Verificar si la entrada está vacía
    if (!input) {
        const errorMessage = "Error: Input cannot be empty.";
        notifyError(errorMessage);
        logError(errorMessage);
        return false;
    }

    // Comprobar si es un número (entero o decimal)
    const numberRegex = /^-?\d+(\.\d+)?$/;
    if (numberRegex.test(input)) {
        return true; // Es un número válido
    }

    // Comprobar si es una lista CSV válida
    const csvValues = input.split(',').map(val => val.trim());
    if (csvValues.every(val => numberRegex.test(val))) {
        return true; // Es un CSV válido
    }

    // Si no es un número ni un CSV válido
    const errorMessage = "Error: Invalid input. Please enter a valid number or CSV values.";
    notifyError(errorMessage);
    logError(errorMessage);
    return false;
}


// Función para notificar el error en el campo de información y mostrar un alert
function notifyError(errorMessage) {
    alert(errorMessage);
    document.getElementById('info').textContent = errorMessage;
    logError(errorMessage);  // Agregamos el log de errores aquí
}

// Función para registrar los errores
function logError(error) {
    const timestamp = new Date().toISOString();
    errorLog.push({ error, timestamp });
}

// Función para generar el archivo CSV de los errores
function downloadErrorLog() {
    if (errorLog.length === 0) {
        alert("No errors logged.");
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8,Error,Timestamp\n";
    errorLog.forEach(log => {
        csvContent += `${log.error},${log.timestamp}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'error_log.csv');
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link);
}

// Agregar evento para el botón de descarga del log
document.getElementById('downloadLog').addEventListener('click', downloadErrorLog);


const toggleButton = document.getElementById('toggle-instructions');
const instructionsPanel = document.getElementById('instructions-panel');

toggleButton.addEventListener('click', function() {
    if (instructionsPanel.classList.contains('instructions-collapsed')) {
        instructionsPanel.classList.remove('instructions-collapsed');
        instructionsPanel.classList.add('instructions-expanded');
        toggleButton.textContent = 'Hide Instructions';
    } else {
        instructionsPanel.classList.remove('instructions-expanded');
        instructionsPanel.classList.add('instructions-collapsed');
        toggleButton.textContent = 'Show Instructions';
    }
});