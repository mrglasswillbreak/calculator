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


buttonHolder.addEventListener("click", (e) => {
	const button = e.target.closest("button");
	if (!button) return;

	const value = button.textContent;
	displayText.textContent += value;

	if (!isNaN(value)) {
		if (!operator) {
			number1 += value;
			
			
		} else {
			number2 += value;
		}
	}

	else if (["+", "-", "x", "/"].includes(value)) {
		operator = value === "x" ? "*" : value;
	}

	else if (value === "=") {
		const result = operate(operator, Number(number1), Number(number2));
		display.textContent += result;
	}

	else if (value === "clear") {
		displayText.textContent = "";
		number1 = "";
		number2 = "";
		operator = null;
	}
});