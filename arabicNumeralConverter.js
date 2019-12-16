//ARABIC NUMERAL CONVERTER

'use strict';

const equivalences = {
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000
}

const numberCanRepeat = ['C', 'X', 'I', 'M'];
const numberNotRepeat = ['V', 'L', 'D'];

let totalQuantity = 0;
let contRepeat = 1;


// the letter CAN be repeated?-------------------------------------------------------------------
let repeat = (letter, index, numberRomanArray) => {
        
    // If the previous or next letter is equal returns the value of its equivalence
    if (numberRomanArray[index] === numberRomanArray[index - 1] && numberRomanArray[index] === numberRomanArray[index + 1]) {
        contRepeat += 1;
        return equivalences[letter]

    } else if (numberRomanArray[index] !== numberRomanArray[index - 1] && numberRomanArray[index] === numberRomanArray[index + 1]) {
        contRepeat = 1;
        return equivalences[letter]
    }
    else if (numberRomanArray[index] === numberRomanArray[index - 1] && numberRomanArray[index] !== numberRomanArray[index + 1]) {
        contRepeat = 0;
        return equivalences[letter]
    }

    else {// If the previous or next letter is NOT equal returns the value of its equivalence in negative
        contRepeat = 0;
        let ArrayEquivalences = Object.keys(equivalences);
        let indexEquivalence = ArrayEquivalences.indexOf(letter);

        if (numberRomanArray[index + 1] === ArrayEquivalences[indexEquivalence + 1] || numberRomanArray[index + 1] === ArrayEquivalences[indexEquivalence + 2]) {
            return - equivalences[letter]
        } else {
            return equivalences[letter]
        }
    }
}

// letter CANNOT be repeated?-------------------------------------------------------------------
const noRepeat = (letter) => {
    const newAmount = equivalences[letter];
    return newAmount
}

// solution--------------------------------------------------------------------------------------

let arabicConverter = (numberRoman) => {
    
    const numberRomanArray = numberRoman.split('');

    let amount = 0;
    let invalid = [];
    let error = false;
    const arrayEquivanlencesKeys = Object.keys(equivalences);

    numberRomanArray.map((letter, index) => {

        const indexEquivalence= arrayEquivanlencesKeys.indexOf(numberRomanArray[index]);
        const indexequievalenceNex = arrayEquivanlencesKeys.indexOf(numberRomanArray[index+1]);
    
        //letters that can be repeated
        if (numberCanRepeat.includes(letter)) {
            contRepeat < 3? amount += repeat(letter, index,numberRomanArray): error = `roman number no valid, Can't repeat letters more than three times`;
        }

        // letters that CANNOT be repeated
        else if (
            numberNotRepeat.includes(letter)) {
            // we validate that they are not repeated. Previous or next are the same?
            if (numberRomanArray[index] === numberRomanArray[index + 1] || numberRomanArray[index] === numberRomanArray[index - 1]) {
                error = `roman number no valid, letter ${letter} is duplicated`}

            //cannot be placed to the left of another major.
            else if (indexequievalenceNex > indexEquivalence) {
                error = `letter ${letter} cannot be placed to the left of another major.`
            
          // if the letter is not repeated we add its value
            } else { 
                amount += noRepeat(letter)
            }

           // to warn which characters are incorrect           
        } else {
            invalid.push(letter); 
            invalid.length === 1 ? error = `character ${invalid[0]} is invalid` : error = `characters ${invalid.join()} are invalid`
        }
    })

    return error ? error : totalQuantity = amount
}


console.log(arabicConverter('MMMCMXCIX'))



