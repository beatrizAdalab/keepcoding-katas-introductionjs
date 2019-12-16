//FOOBARQUIX

'use strict';

const equivalences = [
    { number: 3, text: 'Foo' },
    { number: 5, text: 'Bar' },
    { number: 7, text: 'Quix' }
];

let result = '';

//we check if it is divisible
const division = x => {
    equivalences.map((item) => {
        x % item.number == 0 ? result += item.text : result += ''
    })
    return result;
};

//we check the digits
const checkDigits = x => {
    let numArray = x.toString().split('')
    numArray.map(letter => {
        equivalences.map(item => {
            item.number === parseFloat(letter) ? result += item.text : result += ''
        })
    })
    return result;
};

//we translate the whole number
const foorBarQuix = x => {
    division(x);
    checkDigits(x);
    return result ? result : x;
};


// we generate results loop from 1 to X
const sequenceFoorBarQuix = x => {
    if (x >= 1 && x <= 100) {
        let totalResult = [];

        for (let i = 1; i <= x; i++) {
            result = ''; //reset
            totalResult = [...totalResult, foorBarQuix(i)]
        };

        return totalResult;

    } else {
        return 'the number must be between 1 and 100';
    };
}

//unic result
console.log(foorBarQuix(4));

//Bucle result
console.log(sequenceFoorBarQuix(10));









