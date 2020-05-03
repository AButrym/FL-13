const storeNames = (...args) => args;

console.log(Object.prototype.toString().call(
    storeNames('Nick Fury', 'Iron Man', 'Doctor Strange')) === '[object Array]');