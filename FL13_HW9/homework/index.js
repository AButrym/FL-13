function convert(...args) {
    // convert numbers to strings and vice versa
    return args.map(i => i === +i ? '' + i : +i);
}

function executeforEach(arr, func) {
    // arr.forEach(func); // equivalent
    for (let el of arr) {
        func(el);
    }
}

function mapArray(arr, func) {
    // return arr.map(i => +i).map(func); // equivalent
    const result = [];
    executeforEach(arr, i => result.push(func(+i)));
    return result;
}

function filterArray(arr, predicate) {
    // return arr.filter(predicate); // equivalent
    const result = [];
    executeforEach(arr, i => {
        if (predicate(i)) {
            result.push(i)
        }
    });
    return result;
}

function containsValue(arr, value) {
    let result = false;
    executeforEach(arr, i => {
        if (i === value) {
            result = true;
        }
    })
    return result;
}

function flipOver(str) {
    // [...str].reverse().join('') // equivalent
    let result = '';
    for (let i = str.length - 1; i >= 0; --i) {
        result += str[i];
    }
    return result;
}

function makeListFromRange(leftRightBoundary) {
    const left = Math.min(...leftRightBoundary);
    const right = Math.max(...leftRightBoundary);
    const result = [];
    for (let i = left; i <= right; i++) {
        result.push(i);
    }
    return result;
}

function getArrayOfKeys(arrayOfObjects, key) {
    const result = [];
    executeforEach(arrayOfObjects, obj => {
        result.push(obj[key]);
    })
    return result;
}

function substitute(arr) {
    const lowBoundary = 10;
    const highBoundary = 20;
    return mapArray(arr, i => lowBoundary < i && i < highBoundary ? '*' : i);
}

function getPastDay(date, daysAgo) {
    const dateCopy = new Date(date);
    dateCopy.setDate(dateCopy.getDate() - daysAgo); // accounts for month change
    return dateCopy.getDate();
}

function formatDate(date) {
    const MAX_ONE_DIGIT = 9;
    const leadingZero = number => (number <= MAX_ONE_DIGIT ? '0' : '') + number;
    const month = leadingZero(date.getMonth() + 1);
    const dayOfMonth = leadingZero(date.getDate());
    const hours = leadingZero(date.getHours());
    const minutes = leadingZero(date.getMinutes());
    return `${date.getFullYear()}/${month}/${dayOfMonth} ${hours}:${minutes}`;
}
