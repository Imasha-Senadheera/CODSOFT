let currentNumber = '';
let firstNumber = '';
let operationType = '';
const display = document.getElementById('display');

function appendNumber(number) {
    currentNumber += number;
    display.value = currentNumber;
}

function clearDisplay() {
    currentNumber = '';
    display.value = '';
}

function operation(op) {
    firstNumber = currentNumber;
    operationType = op;
    currentNumber = '';
}

function calculate() {
    let result;
    const secondNumber = parseFloat(currentNumber);

    switch (operationType) {
        case '+':
            result = parseFloat(firstNumber) + secondNumber;
            break;
        case '-':
            result = parseFloat(firstNumber) - secondNumber;
            break;
        case '*':
            result = parseFloat(firstNumber) * secondNumber;
            break;
        case '/':
            result = parseFloat(firstNumber) / secondNumber;
            break;
        default:
            return;
    }

    display.value = result;
    currentNumber = '';
    firstNumber = '';
    operationType = '';
}
