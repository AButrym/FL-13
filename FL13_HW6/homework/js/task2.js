const TWO = 2;

const str = prompt('Input the string:');

if (!str || str.trim().length === 0) {
    alert('Invalid value');
} else {
    const start = Math.floor((str.length - 1) / TWO);
    const end = Math.ceil((str.length + 1) / TWO);
    const middle = str.substring(start, end);
    alert(middle);
}
