//calculate.js
const display = document.getElementById('display');
let currentInput = '';

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        handleInput(value);
    });
});

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if ('0123456789+-*/.'.includes(key)) {
        handleInput(key);
    } else if (key === 'Enter') {
        handleInput('=');
    } else if (key === 'Backspace') {
        handleInput('C');
    }
});

function handleInput(value) {
    if (value === '=') {
        try {
            currentInput = eval(currentInput).toString();
        } catch {
            currentInput = 'Error';
        }
    } else if (value === 'C') {
        currentInput = '';
    } else {
        if (currentInput === 'Error') {
            currentInput = '';
        }
        currentInput += value;
    }
    display.innerText = currentInput || '0';
}

const openCalculatorBtn = document.getElementById('open-calculator-btn');
const closeCalculatorBtn = document.getElementById('close-calculator-btn');
const fullCalculator = document.getElementById('full-calculator');
const minimizedCalculator = document.getElementById('minimized-calculator');

openCalculatorBtn.addEventListener('click', () => {
    fullCalculator.classList.remove('hidden');
    minimizedCalculator.style.display = 'none';
});

closeCalculatorBtn.addEventListener('click', () => {
    fullCalculator.classList.add('hidden');
    minimizedCalculator.style.display = 'block';
});