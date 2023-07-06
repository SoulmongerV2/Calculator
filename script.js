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
                button.addEventListener('click', () => printNumber(button.textContent));
        }
});

document.body.addEventListener('keydown', (e) => {
    switch(e.key){
        case "Delete":
            clearAll();
            animateButton("#ac");
            break;
        case "Backspace":
            deleteLastInput();
            animateButton("#backspace");
            break;
        case "/":
            setOperator("/");
            animateButton("#divide");
            break;
        case "*":
            setOperator("×");
            animateButton("#multiply");
            break;
        case "-":
            setOperator("-");
            animateButton("#substract");
            break;
        case "+":
            setOperator("+");
            animateButton("#add");
            break;
        case "Enter":
            printResult();
            animateButton("#equals");
            break;
        case ".":
            printDot();
            animateButton("#dot");
            break;
        case "1":
            printNumber(1);
            animateButton("#n1");
            break;
        case "2":
            printNumber(2);
            animateButton("#n2");
            break;
        case "3":
            printNumber(3);
            animateButton("#n3");
            break;
        case "4":
            printNumber(4);
            animateButton("#n4");
            break;
        case "5":
            printNumber(5);
            animateButton("#n5");
            break;
        case "6":
            printNumber(6);
            animateButton("#n6");
            break;
        case "7":
            printNumber(7);
            animateButton("#n7");
            break;
        case "8":
            printNumber(8);
            animateButton("#n8");
            break;
        case "9":
            printNumber(9);
            animateButton("#n9");
            break;
        case "0":
            printNumber(0);
            animateButton("#n0");
    }
})

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

function animateButton(id){
    const btn = document.querySelector(id);
    btn.addEventListener('transitionend', (e) => {
        e.target.classList.remove('button-animation');
    });
    btn.classList.add('button-animation');   
}
