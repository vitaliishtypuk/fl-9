function reverseNumber(r) {
    const reversed = r
    .toString()
    .split('')
    .reverse()
    .join('')
    return parseInt(reversed) * Math.sign(r);
}

//console.log(reverseNumber(123));
//console.log(reverseNumber(-456));
//console.log(reverseNumber(1000));