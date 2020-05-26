function assign(target, ...sources) {
    if (target === null || target === undefined) {
        throw new TypeError('Cannot convert undefined or null to object');
    }
    let result = Object(target);
    for (let source of sources) {
        if (source !== null && source !== undefined) {
            for (let key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    result[key] = source[key];
                }
            }
        }
    }
    return result;
}