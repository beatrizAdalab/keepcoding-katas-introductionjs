//ROMAN NUMERAL CONVERTER

'use strict';

let thousands = 0;
let hundreds = 0;
let tens = 0;
let units = 0;

//we extract the digits of the number
const digits = (numberArray) => {

    const number= numberArray.reverse();

    number[3] ? thousands = parseInt(number[3]) : thousands = 0;
    number[2] ? hundreds = parseInt(number[2]) : hundreds= 0;
    number[1] ? tens =  parseInt(number[1]) : tens = 0;
    number[0] ? units = parseInt(number[0]) : units = 0;
};

//translate digits to letters
const translate = (primary,secondary,tertiary,numb) => {
    let romanNum = '';
    switch (numb) {
        case 0: case 1: case 2: case 3:
            for (let i = 0; i < numb; i++) {
                romanNum += primary
            }
            return romanNum

        case 4:
            return romanNum += primary + secondary

        case 5:
            return romanNum += secondary

        case 6: case 7: case 8:
            romanNum = secondary;
            for (let i = 0; i < numb - 5; i++) {
                romanNum += primary
            }
            return romanNum

        case 9:
            return romanNum += primary + tertiary

        default:
            console.log('Oops, something is not right');
    }
};

const romanConverter= (numberArabic)=>{

    if (numberArabic >=1 && numberArabic <=3999){
       
        const numberArabicString = numberArabic.toString();
        const numberArabicArray = numberArabicString.split('');
        let  solution='';
    
        digits(numberArabicArray);

        solution +=  translate('M', '','', thousands);
        solution +=  translate('C', 'D','M', hundreds);
        solution +=  translate('X', 'L','C', tens);
        solution +=  translate('I', 'V','X', units);   

        return solution

    } else {
        return 'Sorry, the number must be between 1 and 3999'
    }
}

console.log(romanConverter(3999))