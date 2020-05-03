const isBigger = (a, b) => +a > +b;
const getDifference = (a, b) => isBigger(a, b) ? a - b : b - a;

console.log(getDifference(5, 3) === 2)
console.log(getDifference(5, 8) === 3)