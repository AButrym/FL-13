const DIGITS_AFTER_COMA = 2;
const HUNDRED = 100;

function formatMoney(number) {
    if (typeof number === 'number') {
        return Number.isInteger(number) ? number : number.toFixed(DIGITS_AFTER_COMA);
    }
}

let checkNumber = prompt('Input the check number:', '1000.25$');
let tipPercentage = prompt('Input the tip percentage:', '10%');

checkNumber = parseFloat(checkNumber);
tipPercentage = parseInt(tipPercentage, 10);

if (isNaN(checkNumber) ||
    isNaN(tipPercentage) ||
    checkNumber < 0 ||
    tipPercentage < 0 ||
    tipPercentage > HUNDRED) {
    alert('Invalid input data');
} else {
    const tipAmount = checkNumber * tipPercentage / HUNDRED;
    const totalSum = checkNumber + tipAmount;
    const message = 'Check number: ' + formatMoney(checkNumber) + '\n' +
        'Tip: ' + tipPercentage + '%\n' +
        'Tip amount: ' + formatMoney(tipAmount) + '\n' +
        'Total sum to pay: ' + formatMoney(totalSum);
    alert(message);
}