const USERS = new Map([
    ['User', 'UserPass'],
    ['Admin', 'RootPass']
]);

const MIN_NUMBER_OF_LETTERS_IN_LOGIN = 4;
const DAY_TIME_FROM = 8;
const DAY_TIME_TO = 20;

main();

function main() {
    const userName = prompt('Enter your login:');
    if (!userName) {
        alert('Canceled');
        return;
    }
    if (userName.length < MIN_NUMBER_OF_LETTERS_IN_LOGIN) {
        alert(`I don't know any users having name length less than ${MIN_NUMBER_OF_LETTERS_IN_LOGIN} symbols`);
        return;
    }
    if (!USERS.has(userName)) {
        alert('I don’t know you');
        return;
    }
    if (!checkPassword(userName)) {
        alert('Wrong password');
        return;
    }
    const currentTimeHours = new Date().getHours();
    if (DAY_TIME_FROM <= currentTimeHours && currentTimeHours < DAY_TIME_TO) {
        alert(`Good day, dear ${userName}!`)
    } else {
        alert(`Good evening, dear ${userName}!`);
    }
}

function checkPassword(login) {
    const password = prompt('Enter your password:');
    return password === USERS.get(login);
}
