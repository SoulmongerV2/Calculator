const topLine = document.querySelector('.top-line');
const bottomLine = document.querySelector('.bottom-line');
let firstOperand;
let secondOperand;
let operator;

const buttons = document.querySelectorAll('.calc-button');

buttons.forEach(button => {
        switch(button.id){
            case "sign": 
                button.addEventListener('click', changeSign);
                break;
            case "ac":
                button.addEventListener('click', clearAll);
                break;
            case "backspace":
                button.addEventListener('click', deleteLastInput);
                break;
            case "divide":
                button.addEventListener('click', () => setOperator("/"));
                break;
            case "multiply":
                button.addEventListener('click', () => setOperator("×"));
                break;
            case "substract":
                button.addEventListener('click', () => setOperator("-"));
                break;
            case "add":
                button.addEventListener('click', () => setOperator("+"));
                break;
            case "equals": 
                button.addEventListener('click', printResult);
                break;
            case "dot":
                button.addEventListener('click', printDot)
                break;
            default:
                button.addEventListener('click', () => printNumber(button.id));
        }
});

function changeSign(){
    if(bottomLine.textContent > 0){
        bottomLine.textContent = "-" + bottomLine.textContent;
    }else{
        bottomLine.textContent = bottomLine.textContent.replace("-","");
    }
}

function clearAll(){
    bottomLine.textContent = "";
    topLine.textContent = "";

}

function deleteLastInput(){
    bottomLine.textContent = bottomLine.textContent.substring(0, bottomLine.textContent.length-1);
    if(isNaN(bottomLine.textContent) === true){
        bottomLine.textContent = "";
    }
}

function setOperator(op){
    if(topLine.textContent === ""){
        if(bottomLine.textContent === ""){
            return;
        }
        operator = op;
        firstOperand = bottomLine.textContent;
        updateTopLine(firstOperand + op);
        bottomLine.textContent = "";
        return;
    }
    
    if(bottomLine.textContent === ""){
        operator = op;
        updateTopLine(firstOperand + op);
        return;
    }

    secondOperand = bottomLine.textContent;
    updateTopLine(operate());
    operator = op;
    updateTopLine(firstOperand + op);
    bottomLine.textContent = "";
}

function printDot(){
    if(bottomLine.textContent.includes(".")){
        return;
    }
    if(bottomLine.textContent.length > 11){
        return;
    }
    bottomLine.textContent += ".";
}

function printNumber(number){
    if(number === "0"){
        if(bottomLine.textContent === "0"){
            return;
        }
    }
    if(bottomLine.textContent.length > 11){
        return;
    }
    bottomLine.textContent += number;
}

function printResult(){
    if(bottomLine.textContent === ""){
        return;
    }
    if(!operator){
        firstOperand = bottomLine.textContent;
        updateTopLine(firstOperand);
        bottomLine.textContent = "";
        return;
    }
    secondOperand = bottomLine.textContent;
    updateTopLine(operate());
    bottomLine.textContent = "";
}

function operate(){
    let result;
    switch(operator){
        case "/":
            result = firstOperand / secondOperand;
            break;
        case "×":
            result = firstOperand * secondOperand;
            break;
        case "+":
            result = Number(firstOperand) + Number(secondOperand);
            break;
        case "-":
            result = firstOperand - secondOperand;
            break;
        default:
            result = firstOperand;
    }
    operator = null;
    firstOperand = result;

    console.log(result);

    return result;
}

function updateTopLine(str){
    if(str.toString().length < 12){
        topLine.textContent = str;
        return;
    }
    topLine.textContent = Number.parseFloat(str).toExponential(6) + (operator === null ? "" :  operator);
    
}