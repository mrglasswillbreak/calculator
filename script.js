// ================= STATE =================
let number1 = "";
let number2 = "";
let operator = null;

const displayText = document.querySelector(".displayText");
const buttonHolder = document.querySelector(".buttonHolder");

// ================= OPERATORS =================
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
	if (b === 0) return "Error";
	return a / b;
}

function operate(op, n1, n2) {
	switch (op) {
		case "+": return add(n1, n2);
		case "-": return subtract(n1, n2);
		case "*": return multiply(n1, n2);
		case "/": return divide(n1, n2);
		default: return "Invalid";
	}
}

function toggleSign(num) {
	if (!num || num === "0") return num;
	if (num.startsWith("-")) return num.slice(1);
	return `-${num}`;
}

function toPercent(num) {
	if (!num) return num;
	return formatResult(Number(num) / 100);
}

// Prevent floating-point issues
function formatResult(num) {
	if (typeof num !== "number") return num;
	return Number(num.toFixed(10)).toString();
}

// ================= INPUT HANDLER =================
function handleInput(value) {

	// CLEAR
	if (value === "clear") {
		displayText.textContent = "";
		number1 = "";
		number2 = "";
		operator = null;
		return;
	}

	// BACKSPACE
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

	// SIGN TOGGLE
	if (value === "±") {
		if (number2) {
			number2 = toggleSign(number2);
		} else {
			number1 = toggleSign(number1);
		}
		displayText.textContent = (number1 + (operator || "") + number2) || "0";
		return;
	}

	// PERCENT
	if (value === "%") {
		if (number2) {
			number2 = toPercent(number2);
		} else {
			number1 = toPercent(number1);
		}
		displayText.textContent = (number1 + (operator || "") + number2) || "0";
		return;
	}

	// DECIMAL
	if (value === ".") {
		if (!operator && !number1.includes(".")) {
			number1 += ".";
		} else if (operator && !number2.includes(".")) {
			number2 += ".";
		}
		displayText.textContent = number1 + (operator || "") + number2;
		return;
	}

	// NUMBER
	if (!isNaN(value)) {
		if (!operator) {
			number1 += value;
		} else {
			number2 += value;
		}
		displayText.textContent += value;
		return;
	}

	// OPERATOR
	if (["+", "-", "*", "/"].includes(value)) {
		if (!number1) return;

		// chained calculation
		if (operator && number2) {
			const result = formatResult(
				operate(operator, Number(number1), Number(number2))
			);
			number1 = result;
			number2 = "";
		}

		operator = value;
		displayText.textContent = number1 + operator;
		return;
	}

	// EQUALS
	if (value === "=") {
		if (!number1 || !number2 || !operator) return;

		const result = formatResult(
			operate(operator, Number(number1), Number(number2))
		);

		displayText.textContent = result;

		number1 = result;
		number2 = "";
		operator = null;
	}
}

// ================= BUTTON SUPPORT =================
buttonHolder.addEventListener("click", (e) => {
	const button = e.target.closest("button");
	if (!button) return;

	const value = button.dataset.value || button.textContent;
	handleInput(value);
});

// ================= KEYBOARD SUPPORT =================
document.addEventListener("keydown", (e) => {

	// Numbers
	if (!isNaN(e.key)) handleInput(e.key);

	// Operators
	if (["+", "-", "*", "/"].includes(e.key)) {
		handleInput(e.key);
	}

	// Decimal
	if (e.key === ".") handleInput(".");

	// Enter = equals
	if (e.key === "Enter") handleInput("=");

	// Backspace
	if (e.key === "Backspace") handleInput("⌫");

	// Escape = clear
	if (e.key === "Escape") handleInput("clear");
});