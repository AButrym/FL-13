const positiveSum = arr => arr.filter(x => x > 0).reduce((total, x) => total + x, 0);

console.log(positiveSum([2, 4, 6, 8]) === 20);
console.log(positiveSum([0, -3, 5, 7]) === 12);