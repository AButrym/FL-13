const isBigger = (a, b) => +a > +b;

function countPoints(matches) {
    let result = 0;
    for (let match of matches) {
        const [we, they] = match.split(':');
        result += 3 * isBigger(we, they) + 1 * (+we === +they);
    }
    return result;
}

console.log(countPoints(['3:1', '1:0', '0:0', '1:2', '4:0', '2:3', '1:1', '0:1', '2:1', '1:0']) === 17);
console.log(countPoints(['1:1', '1:2', '2:0', '4:2', '0:1', '2:3', '1:1', '0:1', '1:1', '3:0']) === 12);