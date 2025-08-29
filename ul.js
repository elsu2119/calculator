const state = {
}


if (state.waitingForSecondOperand) {
// If user presses equals immediately after an operator, use same operand twice
const res = calculate(state.firstOperand, state.firstOperand, state.operator);
state.displayValue = String(res);
state.firstOperand = res;
} else {
const res = calculate(state.firstOperand, current, state.operator);
state.displayValue = String(res);
state.lastOperand = current;
state.operatorBackup = state.operator;
state.firstOperand = res;
}


state.lastKeyWasEquals = true;
state.waitingForSecondOperand = false;
state.operator = null;
updateDisplay();



function del() {
if (state.waitingForSecondOperand || state.lastKeyWasEquals) return;
if (state.displayValue.length <= 1) {
state.displayValue = '0';
} else {
state.displayValue = state.displayValue.slice(0, -1);
}
updateDisplay();
}


// Click handling
keysEl.addEventListener('click', (e) => {
const btn = e.target.closest('button.key');
if (!btn) return;


const digit = btn.getAttribute('data-digit');
const op = btn.getAttribute('data-op');
const action = btn.getAttribute('data-action');


if (digit) return inputDigit(digit);
if (op) return handleOperator(op);


switch (action) {
case 'decimal': return inputDecimal();
case 'clear': return resetCalculator();
case 'delete': return del();
case 'equals': return equals();
case 'percent': return percent();
case 'sign': return toggleSign();
}
});


// Keyboard support
window.addEventListener('keydown', (e) => {
const { key } = e;
if (/^[0-9]$/.test(key)) { inputDigit(key); return; }
if (key === '.') { inputDecimal(); return; }
if (key === 'Enter' || key === '=') { e.preventDefault(); equals(); return; }
if (key === 'Backspace') { del(); return; }
if (key === 'Escape') { resetCalculator(); return; }
if (key === '%') { percent(); return; }


// Support both * / + -
if (["+","-","*","/"] .includes(key)) { handleOperator(key); return; }


// Numpad keys mapping for some browsers
if (key === 'Delete') { resetCalculator(); return; }
});


// Initialize
updateDisplay();