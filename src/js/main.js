import '../css/style.css'
import f from './functions'

const calculatorButtons = ['C', 'CE', '%', '+', '7', '8', '9', '-', '4', '5', '6', '*', '1', '2', '3', '/', '.', '0', '', '=']
const operationTypes = ['+', '-', '/', '*', '%']
const numberTypes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
const emptyString = '';
const space = ' ';
const dot = '.';
const minus = '-';
const equal = '=';
const zero = '0';
const clearEntry = 'CE';
const clear = 'C';
const numberDisplay = 'numberDisplay'
const operationDisplay = 'operationDisplay'
let firstNumber = emptyString;
let secondNumber = emptyString;
let operation = emptyString;
let memoryResult = emptyString;
let calculate = () => eval((firstNumber || memoryResult) + space + operation + space + (secondNumber));

f.innerHTML('app', `
<div id="calculatorBody">
  <div id="display">
    <div id="numberDisplay">0</div>
    <div id="operationDisplay"></div>
  </div>
  <div id="buttons">
    ${f.makeButtons(calculatorButtons)}
  </div>
</div>
`)

f.clickButton(clear, () => {
  firstNumber = emptyString;
  secondNumber = emptyString;
  operation = emptyString;
  memoryResult = emptyString;
  f.textContent(numberDisplay, zero);
  f.textContent(operationDisplay, emptyString);
})

f.clickButton(clearEntry, () => {
  secondNumber = emptyString;
  operation = emptyString;
  f.textContent(operationDisplay, emptyString);
  f.textContent(numberDisplay, firstNumber || memoryResult);
})

f.clickButton(dot, () => {
  const firstNumberIsMinus = firstNumber === minus;
  const secondNumberIsMinus = secondNumber === minus;
  if(!memoryResult && firstNumberIsMinus || !firstNumber) firstNumber += zero + dot;
  if(!memoryResult && !firstNumberIsMinus && !firstNumber.includes(dot)) firstNumber += dot;
  if(!secondNumber) f.textContent(numberDisplay, firstNumber || memoryResult);
  if(!secondNumber || secondNumberIsMinus && operation) secondNumber += zero + dot;
  if(secondNumber && !secondNumberIsMinus && !secondNumber.includes(dot)) secondNumber += dot;
  if(secondNumber) f.textContent(numberDisplay, secondNumber);
})

operationTypes.map((currentOperation) => {
  f.clickButton(currentOperation, () => {
    const itIsMinus = currentOperation === minus;
    const firstOrMemo = (firstNumber || memoryResult);
    if (firstOrMemo && operation && itIsMinus) {
      secondNumber = minus;
      f.textContent(numberDisplay, secondNumber);
    }
    if (firstOrMemo && !operation) {
      operation = currentOperation;
      f.textContent(operationDisplay, operation);
    }
    if (!firstOrMemo && itIsMinus) {
      firstNumber = minus;
      f.textContent(numberDisplay, firstNumber);
    }
  })
})

numberTypes.map((currentNumber) => {
  f.clickButton(currentNumber, () => {
    if (!operation) {
      firstNumber += currentNumber;
      f.textContent(numberDisplay, firstNumber);
    } else {
      secondNumber += currentNumber;
      f.textContent(numberDisplay, secondNumber);
    }
  })
})

f.clickButton(equal, () => {
  f.textContent(numberDisplay, calculate());
  f.textContent(operationDisplay, equal);
  memoryResult = calculate();
  firstNumber = emptyString;
  secondNumber = emptyString;
  operation = emptyString;
})

// document.addEventListener('click', () => f.consoleLogAll(firstNumber, secondNumber, operation, memoryResult)) //uncomment to debugg
