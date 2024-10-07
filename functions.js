// Variables globales
let firstNumber = null;
let operator = null;

const inputField = document.getElementById('input');
const infoField = document.getElementById('info');

// Función para actualizar el campo informativo
const fill_info = (result) => {
    if (result < 100) {
        infoField.innerText = "Info: El resultado es menor que 100";
    } else if (result >= 100 && result <= 200) {
        infoField.innerText = "Info: El resultado está entre 100 y 200";
    } else {
        infoField.innerText = "Info: El resultado es mayor que 200";
    }
};

// Función para agregar número desde el teclado
const addNumber = (number) => {
    inputField.value += number;
};

// Evento para detectar pulsaciones de teclas
document.addEventListener('keydown', (event) => {
    if (!isNaN(event.key) || event.key === '.') {
        addNumber(event.key);
    } else if (event.key === 'Enter') {
        document.getElementById('equal').click();
    } else if (event.key === 'Escape') {
        inputField.value = ''; // Limpiar el campo al pulsar Escape
    }
});

// Cuadrado
document.getElementById('square').onclick = () => {
    const number = parseFloat(inputField.value);
    const result = number ** 2;
    fill_info(result);
    inputField.value = result;
};

// Módulo
document.getElementById('modulo').onclick = () => {
    const number = parseFloat(inputField.value);
    const result = number < 0 ? -number : number;
    fill_info(result);
    inputField.value = result;
};

// Factorial
document.getElementById('factorial').onclick = () => {
    const number = parseInt(inputField.value);
    let result = 1;
    if (number < 0) {
        alert("El factorial no está definido para números negativos.");
        return;
    }
    for (let i = 1; i <= number; i++) {
        result *= i;
    }
    fill_info(result);
    inputField.value = result;
};

// Suma
document.getElementById('addition').onclick = () => {
    firstNumber = parseFloat(inputField.value);
    operator = 'addition';
    inputField.value = ''; // Limpiar el campo para el segundo número
};

// Multiplicación
document.getElementById('multiplication').onclick = () => {
    firstNumber = parseFloat(inputField.value);
    operator = 'multiplication';
    inputField.value = ''; // Limpiar el campo para el segundo número
};

// División
document.getElementById('division').onclick = () => {
    firstNumber = parseFloat(inputField.value);
    operator = 'division';
    inputField.value = ''; // Limpiar el campo para el segundo número
};

// Igual
document.getElementById('equal').onclick = () => {
    const secondNumber = parseFloat(inputField.value);
    let result;
    if (operator === 'addition') {
        result = firstNumber + secondNumber;
    } else if (operator === 'multiplication') {
        result = firstNumber * secondNumber;
    } else if (operator === 'division') {
        if (secondNumber === 0) {
            alert("Error: No se puede dividir entre cero.");
            return;
        }
        result = firstNumber / secondNumber;
    }
    fill_info(result);
    inputField.value = result;
};

// Borrar el contenido al hacer clic en el contenedor
inputField.onclick = () => {
    inputField.value = '';
};
