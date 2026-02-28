//Declaring global variables
let number1 = "";
let number2 = "";
let operator = null;

const displayText = document.querySelector(".displayText")
const buttonHolder = document.querySelector(".buttonHolder");

//Creating 4 helper operator functions
function add(num1, num2) {
	return num1 + num2;
}
function subtract(num1, num2) {
	return num1 - num2;
}
function multiply(num1, num2) {
	return num1 * num2;
}
function divide(num1, num2) {
	return num1 / num2;
}

//creating operate function to take input and call operators based on input
function operate(op, n1, n2) {
	if (op === "+") return add(n1, n2);
	if (op === "-") return subtract(n1, n2);
	if (op === "*") return multiply(n1, n2);
	if (op === "/") return divide(n1, n2);

	return "Invalid operator";
}

//add event listener to the button holder variable, and defining conditional chain of if else statements to handle calculation logic
buttonHolder.addEventListener("click", (e) => {
	const button = e.target.closest("button");
	if (!button) return;

	const value = button.textContent;

	// CLEAR
	if (value === "clear") {
		displayText.textContent = "";
		number1 = "";
		number2 = "";
		operator = null;
		return;
	}

	// NUMBER assignment logic
	if (!isNaN(value)) {
		displayText.textContent += value;

		if (!operator) {
			number1 += value;
		} else {
			number2 += value;
		}
		return;
	}

	// OPERATOR assignment logic
if (["+", "-", "x", "/"].includes(value)) {
	if (!number1) return;

	if (operator && number2) {
		const result = operate(operator, Number(number1), Number(number2));
		number1 = result.toString();
		number2 = "";
		displayText.textContent = number1;
	}

	operator = value === "x" ? "*" : value;
	displayText.textContent += value;
	return;
}

	// EQUALS
	if (value === "=") {
		if (!number1 || !number2 || !operator) return;

		const result = operate(operator, Number(number1), Number(number2));

		displayText.textContent = result;

		// prepare for next calculation
		number1 = result.toString();
		number2 = "";
		operator = null;
	}
});