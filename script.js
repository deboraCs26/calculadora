let currentInput = '';
let memory = 0;
let currentOperation = '';
let expression = '';
let lastPercentageResult = null;
let valuesDisplay = document.getElementById('values');
let expressionDisplay = document.getElementById('display');
let historyDisplay = document.getElementById('history');

function appendToExpression(value) {
  if (value === '+' || value === '-' || value === '*' || value === '/' || value === 'mod') {
    expression += ' ' + value + ' ';
  } else {
    expression += value;
  }
  updateExpression();
  logValue(value);
}

function logValue(value) {
  valuesDisplay.innerHTML += value;
}

function appendToExpression(value) {
  expression += value.trim() + ' ';
  updateExpression();
  logValue(value);
}

function logHistory(leftOperand, operation, rightOperand, result) {
  const historyItem = document.createElement('div');
  let displayOperation = operation;

  switch (operation) {
    case '+':
      displayOperation = '+';
      break;
    case '-':
      displayOperation = '-';
      break;
    case '*':
      displayOperation = '*';
      break;
    case '/':
      displayOperation = '/';
      break;
    case 'mod':
      displayOperation = 'módulo';
      break;
    case '%':
      displayOperation = '%';
      break;
    case '√':
      displayOperation = 'raiz quadrada';
      break;
    case 'x²':
      displayOperation = 'x²';
      rightOperand = '';
      break;
    default:
      break;
  }

  let expression;
  if (rightOperand !== '') {
    expression = `${leftOperand} ${displayOperation} ${rightOperand}`;
  } else {
    expression = `${displayOperation} ${leftOperand}`;
  }

  historyItem.innerText = `${expression} = ${result}`;
  historyDisplay.appendChild(historyItem);
}


function appendValue(value) {
  currentInput += value;
  updateDisplay();
  appendToExpression(value);
}

function appendDecimal() {
  if (!currentInput.includes('.')) {
    currentInput += '.';
    updateDisplay();
    appendToExpression('.');
  }
}

function setOperation(operation) {
  if (currentInput !== '') {
    currentOperation = operation;
    memory = parseFloat(currentInput);
    currentInput = '';
    appendToExpression(operation);
  }
}

function calculate() {
  const currentValue = parseFloat(currentInput);
  if (!isNaN(currentValue) && !isNaN(memory)) {
    let result;
    switch (currentOperation) {
      case '+':
        result = (memory + currentValue);
        break;
      case '-':
        result = (memory - currentValue);
        break;
      case '*':
        result = (memory * currentValue);
        break;
      case '/':
        result = (memory / currentValue);
        break;
      case 'mod':
        result = (memory % currentValue);
        break;
      case '%':
        result = (memory * (currentValue / 100));
        break;
      case '√':
        result = Math.sqrt(currentValue);
        break;
      case 'x²':
        result = (currentValue * currentValue);
        break;
      case '!':
        displayOperation = 'fatorial';
        rightOperand = '';
        break;  // Adicione esta linha
      default:
        break;
    }
    currentInput = result.toString();
    updateDisplay();
    logHistory(memory, currentOperation, currentValue, result);
    clearDisplay();
  }
}

function calculateSquare() {
  const currentValue = parseFloat(currentInput);
  if (!isNaN(currentValue)) {
    const result = currentValue * currentValue;
    currentInput = result.toString();
    updateDisplay();
    logHistory(currentValue, 'x²', '', result);
    clearOperations();
  }
}

function calculatePercentage() {
  const currentValue = parseFloat(currentInput);
  if (!isNaN(currentValue)) {
    if (lastPercentageResult !== null) {
      const result = (currentValue / 100) * lastPercentageResult;
      currentInput = result.toString();
      lastPercentageResult = null;
      updateDisplay();
      logHistory(currentValue, '%', lastPercentageResult, result);
    } else {
      const result = currentValue / 100;
      lastPercentageResult = result;
      currentInput = result.toString();
      updateDisplay();
      logHistory(currentValue, '%', '', result);
    }
    clearOperations();
  }
}

function calculateSquareRoot() {
  const currentValue = parseFloat(currentInput);
  if (!isNaN(currentValue)) {
    const result = Math.sqrt(currentValue);
    currentInput = result.toString();
    updateDisplay();
    logHistory('√', currentValue, '', result);
    clearOperations();
  }
}

function calculateFactorial() {
  const currentValue = parseInt(currentInput);
  console.log(`currentValue: ${currentValue}`);
  if (!isNaN(currentValue)) {
    const result = factorial(currentValue);
    console.log(`result: ${result}`);
    currentInput = result.toString();
    updateDisplay();
    logHistory('!', currentValue, '', result);
    clearOperations();
  }
}

function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

function updateDisplay() {
  expressionDisplay.value = currentInput;
}

function updateExpression() {
  expressionDisplay.value = expression;
}

function clearDisplay() {
  currentInput = '';
  expression = '';
  valuesDisplay.textContent = '';
  updateDisplay();
  updateExpression();
}

function clearHistory() {
  historyDisplay.innerHTML = '<div id="history-title">Histórico:</div>';
}

function clearOperations() {
  currentInput = '';
  expression = '';
  updateExpression();
}
