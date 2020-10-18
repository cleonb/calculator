const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

// Calculate first and second value depending on operator
const calculate = {
    '/' : (firstNumber, secondNumber) => firstNumber / secondNumber,
    '*' : (firstNumber, secondNumber) => firstNumber * secondNumber,
    '+' : (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-' : (firstNumber, secondNumber) => firstNumber - secondNumber,
    '=' : () => secondNumber,
};

 let firstValue = 0;
 let operatorValue = '';
 let awaitingNextValue = false;



function sendNumberValue(number) {
// Replace current display value true if first value is entered
if(awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
} else{
// If current display value is 0, replace, if not add number
const displayValue  = calculatorDisplay.textContent;
calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
}

function addDecimal(){
    // If operator pressed, dont add decimal
    if(awaitingNextValue) return;
    //If no decimal, add one
    if (!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent =`${calculatorDisplay.textContent}.`;
    }
}


 
function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    // Prevent multiple operators
    if(operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }
    //Assign first vlue if no value
    if(!firstValue) {
        firstValue = currentValue;
    } else {
        console.log(firstValue, operatorValue,  currentValue);
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
        console.log(calculation);

    }
    // ready for next value, store operator
    awaitingNextValue = true;
    operatorValue = operator;   
}

// Add Event Listners for number, operators and decimal buttons
inputBtns.forEach((inputBtn)=>{
    if (inputBtn.classList.length === 0){
        inputBtn.addEventListener('click',() => sendNumberValue(inputBtn.value));
    } else if(inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click',() => useOperator(inputBtn.value));
    } else if(inputBtn.classList.contains('decimal')){
        inputBtn.addEventListener('click', addDecimal);
    }
});


//Reset all values and display
function resetAll(){
    calculatorDisplay.textContent = '0';
     firstValue = 0;
     operatorValue = '';
     awaitingNextValue = false;
}

// Add Event Listners for number, operators and decimal buttons
inputBtns.forEach((inputBtn)=>{
    if (inputBtn.classList.length === 0){
        inputBtn.addEventListener('click',() => sendNumberValue(inputBtn.value));
    } else if(inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click',() => useOperator(inputBtn.value));
    } else if(inputBtn.classList.contains('decimal')){
        inputBtn.addEventListener('click', addDecimal);
    }
});

// Event Listner for clear button
clearBtn.addEventListener('click', resetAll);

