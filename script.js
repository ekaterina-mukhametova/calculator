class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
        this.readyToReset = false;    
    }
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }
    appendNumber(number) {
        if ((number === '.') && (this.currentOperand.includes('.'))) {
            return;
        }
        this.currentOperand = this.currentOperand + number.toString();
    }
     chooseOperation(operation) {
        if (this.currentOperand === '' && operation !== '√' && operation !== '-') return;
         if (this.currentOperand === '' && operation === '-') {            
            this.currentOperand = '-';
            return;
        } 
         if (this.previousOperand !== '' || this.operation === '√') {
            this.compute();
        }
        this.previousOperand = this.currentOperand;
        this.operation = operation;
        this.currentOperand = '';
    }
    compute() {
        let computation;
        let prev = parseFloat(this.previousOperand);
        let current = parseFloat(this.currentOperand);
        if ((isNaN(prev) && this.operation !== '√') || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break
            case '-':
                computation = prev - current;                
                break
            case '*':
                computation = prev * current;
                break
            case '÷' :
                computation = prev / current;
                break
            case '√' :
                computation = (Math.sqrt(current));
                if (!(isNaN(prev))) {
                    computation *= prev;
                }
                 if (isNaN(computation)) {
                    computation = 'error'
                } 
                break
            case 'xy' :
                computation = (Math.pow(prev, current));
                break   
            default:
                return;
        }
        if (computation.toString().includes('.')) {
            computation = parseFloat(computation.toFixed(4));
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
        this.readyToReset = true;
    }
     updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
                `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = ''
        } 
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (calculator.readyToReset === true) {
            calculator.currentOperand = '';
            calculator.readyToReset = false;
        }
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})
operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})
equalsButton.addEventListener("click", button => {
    calculator.compute();
    calculator.updateDisplay();
})
allClearButton.addEventListener("click", button => {
    calculator.clear();
    calculator.updateDisplay();
})
deleteButton.addEventListener("click",  button => {
    calculator.delete();
    calculator.updateDisplay();
})
