

export const signsRef = ["+", "*", "-"];

export const evaluate = (firstNum, secondNum, sign) => {
    switch (sign) {
        case "+":
            return firstNum + secondNum;
        case "*":
            return firstNum * secondNum;
        case "/":
            return firstNum / secondNum;
        case "-":
            return firstNum - secondNum;
    }
};