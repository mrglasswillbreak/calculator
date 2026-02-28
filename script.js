// Declaring global state variables
let number1 = "";
let number2 = "";
let operator = null;

const displayText = document.querySelector(".displayText");
const buttonHolder = document.querySelector(".buttonHolder");

// Operator helper functions
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
	if (b === 0) return "Error"; // avoid infinity
	return a / b;
}

// Operate function
function operate(op, n1, n2) {
	switch(op) {
		case "+": return add(n1, n2);
		case "-": return subtract(n1, n2);
		case "*": return multiply(n1, n2);
		case "/": return divide(n1, n2);
		default: return "Invalid operator";
	}
}

// Decimal helped function
function formatResult(num) {
	return Number(num.toFixed(10)).toString(); // removes extra floating point
}

// Event delegation listener & button press handler logic
buttonHolder.addEventListener("click", (e) => {
	const button = e.target.closest("button");
	if (!button) return;

	const value = button.textContent;

	// CLEAR btn logic
	if (value === "clear") {
		displayText.textContent = "";
		number1 = "";
		number2 = "";
		operator = null;
		return;
	}

	// BACKSPACE btn logic
	if (value === "⌫") {
		if (number2) {
			number2 = number2.slice(0, -1);
		} else if (operator) {
			operator = null;
		} else {
			number1 = number1.slice(0, -1);
		}
		displayText.textContent = number1 + (operator || "") + number2;
		return;
	}

	// DECIMAL button logic
	if (value === ".") {
		if (!operator && !number1.includes(".")) {
			number1 += ".";
			displayText.textContent += ".";
		} else if (operator && !number2.includes(".")) {
			number2 += ".";
			displayText.textContent += ".";
		}
		return;
	}

	// NUMBER button logic
	if (!isNaN(value)) {
		if (!operator) {
			number1 += value;
		} else {
			number2 += value;
		}
		displayText.textContent += value;
		return;
	}

	// OPERATOR btn logic
	if (["+", "-", "x", "/"].includes(value)) {
		if (!number1) return;

		// Chained calculations logic
		if (operator && number2) {
			const result = formatResult(operate(operator, Number(number1), Number(number2)));
			number1 = result;
			number2 = "";
			displayText.textContent = result;
		}

		operator = value === "x" ? "*" : value;
		displayText.textContent += value;
		return;
	}

	// EQUALS btn logic
	if (value === "=") {
		if (!number1 || !number2 || !operator) return;

		const result = formatResult(operate(operator, Number(number1), Number(number2)));

		displayText.textContent = result;

		// Initialize next calculation
		number1 = result;
		number2 = "";
		operator = null;
	}
});