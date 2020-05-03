const letterCount = (strWhere, letterWhat) =>
    [...strWhere.toLowerCase()].filter(c => c === letterWhat.toLowerCase()).length;

console.log(letterCount("Maggy", "g") === 2);
console.log(letterCount("Barry", "b") === 1);
console.log(letterCount("", "z") === 0);