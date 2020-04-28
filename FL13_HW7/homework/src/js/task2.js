const MIN_NUMBER = 0;
const MAX_NUMBER_INITIAL = 5;
const MAX_NUMBER_INCREASE = 5;
const PRIZE_FACTOR_MULTIPLIER = 2;
const ATTEMPTS_TO_GUESS = 3;
const PRIZE = ['100', '50', '25'];

main();

function main() {
    if (!window.confirm('Do you want to play a game?')) {
        alert('You did not become a billionaire, but could.');
        return;
    }
    let totalPrize = 0;
    let prizeFactor = 1;
    let maxNumber = MAX_NUMBER_INITIAL;
    for(;;) {
        let prize = 0;
        const randomNumber = getRandomNumber(maxNumber);
        for (let i = 1; i <= ATTEMPTS_TO_GUESS; i++) {
            let message = `Choose a roulette pocket number from ${MIN_NUMBER} to ${maxNumber}
Attempts left: ${ATTEMPTS_TO_GUESS - i + 1}
Total prize: ${totalPrize}$
Possible prize on current attempt: ${PRIZE[i-1] * prizeFactor}$`
            let numberOfPocket = prompt(message);
            numberOfPocket = parseInt(numberOfPocket);
            if (numberOfPocket === randomNumber) {
                prize = PRIZE[i-1] * prizeFactor;
                break;
            }
        }
        if (prize > 0) {
            totalPrize += prize;
            if(!window.confirm(`Congratulation, you won!   Your prize is: ${prize}$. Do you want to continue?`)) {
                break;
            }
        } else {
            alert(`Thank you for your participation. Your prize is: ${totalPrize}$`);
            if (!window.confirm('Do you want to play again?')) {
                break;
            }
        }
        maxNumber += MAX_NUMBER_INCREASE;
        prizeFactor *= PRIZE_FACTOR_MULTIPLIER;
    }
    alert(`This time you won ${totalPrize}$. Hope to see you again. Bye!`);
}

function getRandomNumber(maxNumber) {
    return MIN_NUMBER + Math.floor(Math.random() * (maxNumber - MIN_NUMBER + 1));
}
