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

        // Validar división por cero
        if (operator === '/' && secondNumber === 0) {
            notifyError("Error: Division by zero not allowed.");
            clearCurrentInput();
            return;
        }

        switch (operator) {
            case '+':
                result = firstNumber + secondNumber;
                updateInformativeField(`Operation: Addition.`);
                break;
            case '-':
                result = firstNumber - secondNumber;
                updateInformativeField(`Operation: Subtraction.`);
                break;
            case '/':
                result = firstNumber / secondNumber;
                updateInformativeField(`Operation: Division.`);
                break;
            case 'x':
                result = firstNumber * secondNumber;
                updateInformativeField(`Operation: Multiplication.`);
                break;
        }

        // Verificar el rango del resultado y actualizar el mensaje
        if (result < 100) {
            updateInformativeField(`Operation result: ${result} (less than 100).`);
        } else if (result >= 100 && result <= 200) {
            updateInformativeField(`Operation result: ${result} (between 100 and 200).`);
        } else {
            updateInformativeField(`Operation result: ${result} (greater than 200).`);
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
            notifyError("Error: All values must be valid numbers.");
            clearCurrentInput();
            return;
        }

        switch (operation) {
            case 'sum':
                currentInput = csvValues.reduce((acc, val) => acc + val, 0).toString();
                updateInformativeField("Operation: Sum of CSV values processed.");
                break;
            case 'sort':
                csvValues.sort((a, b) => a - b);
                currentInput = csvValues.join(', ');
                updateInformativeField("Operation: Sorted CSV values.");
                break;
            case 'reverse':
                currentInput = csvValues.reverse().join(', ');
                updateInformativeField("Operation: Reversed CSV values.");
                break;
            case 'removelast':
                csvValues.pop();
                currentInput = csvValues.join(', ');
                updateInformativeField("Operation: Removed last CSV value.");
                break;
        }

        updateInput();
    } else {
        notifyError("Error: Please enter valid CSV values.");
    }
}

// Función para calcular el módulo
function mod() {
    if (currentInput) {
        const number = parseFloat(currentInput);
        const result = number < 0 ? -number : number;
        currentInput = result.toString();
        updateInput();
        fillInfo(result);
        updateInformativeField(`Operation: Módulo calculated.`);
    }
}

// Función para elevar a potencia
document.getElementById('power').addEventListener('click', () => {
    document.getElementById('powerPopup').style.display = 'block'; // Mostrar el popup
});

// Función para cerrar el popup
document.getElementById('closePopup').addEventListener('click', () => {
    document.getElementById('powerPopup').style.display = 'none'; // Ocultar el popup
});

// Calcular potencia al hacer clic en "Go!"
document.getElementById('calculatePower').addEventListener('click', () => {
    const exponent = document.getElementById('exponentInput').value;
    const exponentNumber = parseFloat(exponent);

    if (!isNaN(exponentNumber)) {
        if (currentInput) {
            const base = parseFloat(currentInput);
            const result = Math.pow(base, exponentNumber);
            currentInput = result.toString();
            updateInput();
            fillInfo(result);
            updateInformativeField(`Operation: Raised to power ${exponentNumber}.`);
        } else {
            notifyError("Error: Enter a number to raise to a power.");
        }
    } else {
        notifyError("Error: Invalid exponent entered.");
    }

    // Cerrar el popup después del cálculo
    document.getElementById('powerPopup').style.display = 'none';
});

// Función para notificar errores
function notifyError(message) {
    updateInformativeField(message);
}

// Actualiza el campo informativo
function updateInformativeField(message) {
    document.getElementById('info').textContent = message;
}

// Función para limpiar la entrada actual
function clearCurrentInput() {
    currentInput = '';
    updateInput();
}
