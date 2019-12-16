//POKER

'use strict';

const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

const suits = ['S', 'H', 'C', 'D'];

let deckCards = [];
let selectedCards = [];

let playerOneCards = [];
let playerTwoCards = [];

//we generate deck of cards
const getDeckCards = () => {
    let cards = []; //reset

    suits.map(suit => {
        let card = {};

        for (let i = 0; i < 13; i++) {
            let numb = values[i];
            card[numb] = suit;
            cards.push(card);
            card = {}; //reset
        }
    });

    return deckCards = cards;
};

//we choose 10 random cards
const selectRandomCards = () => {
    let allCards = getDeckCards();
    let tenCards = [];

    for (let i = 0; i < 10; i++) {
        let random = Math.floor(Math.random() * (allCards.length));
        let select = allCards[random];
        allCards.splice(random, 1);
        tenCards.push(select)
    };

    return selectedCards = tenCards;
};

//we distribute two hands of cards (5 cards to each player)
const handOutPlayers = (array) => {
    playerOneCards = array.splice(0, array.length / 2);
    playerTwoCards = array.splice(0, array.length);
};

//--------------------------------we distribute cards between two players--------------------------------------------------------
const dealCards = () => {
    getDeckCards();
    selectRandomCards();
    handOutPlayers(selectedCards);
}

dealCards();
console.log('hands Poker player One ', playerOneCards);
console.log('hands Poker player Two ', playerTwoCards);

//---------------------------------we get real values and keys of the cards (scores) -----------------------------------------------------------

const realValuesPlayers = array => {
    let numbers = [];
    let arrayNumber = [];
    let realValues = [];

    array.map(num => { 
        numbers.push(Object.keys(num)); 
    });

    numbers.map(item => {
        arrayNumber.push(item[0]); 
    });

    arrayNumber.map(letter => { 
        realValues.push(values.indexOf(letter));
    });

    return realValues;
}

const realKeysPlayers = array => { 
    let numbers = [];
    let arraySuits = [];

    array.map(num => {
        numbers.push(Object.values(num));
    });

    numbers.map(item => {
        arraySuits.push(item[0]);
    });

    return arraySuits;
}

const valuesPlayerOne = realValuesPlayers(playerOneCards);
const valuesPlayerTwo = realValuesPlayers(playerTwoCards);

const suitsPlayerOne = realKeysPlayers(playerOneCards);
const suitsPlayerTwo = realKeysPlayers(playerTwoCards);


//--------------------------- Cases -----------------------------------------------

//we get object with repeated elements
let getRepeatedElements = array => {
    let repeatedElements = array.reduce((contItem, item) => {
        contItem[item] = (contItem[item] || 0) + 1;
        return contItem
    }, {});

    return repeatedElements;
}

//HIGHT CARD, highest pair, three and poker.
const findHighest = (array, rep) => {
    const repeated = getRepeatedElements(array);
    const arrayRepeatedV = Object.values(repeated);
    const arrayRepeatedK = Object.keys(repeated);

    const valueRepeatedHight = (arrayRepeatedV, arrayRepeatedK)=>{
        let valuesRepeated =[];

        arrayRepeatedV.map((item, index) => {
            item === rep? valuesRepeated.push(arrayRepeatedK[index]):valuesRepeated.push('')
        });
        
        let max = Math.max(...valuesRepeated);
        return max;
    }

    return valueRepeatedHight(arrayRepeatedV, arrayRepeatedK);    
};

//general function for: POKER, THREE, FLUSH, TWOPAIR, PAIR
const general = (array, rep, len) => {
    const repeated = getRepeatedElements(array); 
    const arrayRepeated = Object.values(repeated); 
    const arraySolution = arrayRepeated.filter(item => item === rep);

    return arraySolution.length === len ? true : false;
}

// FULL
const full = array => {
    return general(array, 3,1) && general(array,2,1) ? true : false;
}

// STRAIGHT
const straight = array => {
    const arraySort = array.sort((a,b)=>a -b);
    const result = arraySort.filter((num, index) =>
        arraySort[index + 1] === num + 1 || !arraySort[index + 1]
    );

    return result.length === 5 ? true : false;
};

// STRAIGHT FLUSH
const straightFlush = (arrayNum, arrayColors) => {
    return straight(arrayNum) && general(arrayColors, 5, 1) ? true : false;
};


//-----------------------------we compare results---------------------------


// Who has highest card, pair, three or poker? 
const hightCardComparison=(array1,array2, rep)=>{

    const valueOne = findHighest(array1,rep);
    const valueTwo = findHighest(array2,rep);
    const reason = () =>{ return rep === 1? 'card': rep ===2? 'pair': rep === 3? 'trhee': rep === 4? 'poker':''}

    return valueOne > valueTwo ? `Result: Player 1 wins by the highest ${reason()}`:
           valueOne < valueTwo ? `Result: Player 2 wins by the highest ${reason()}`:
           valueOne === valueTwo ? 'Result: tie': false
}


//Who has poker, three, flush, twoPair or pair?
const generalComparison = (arrayOne, arrayTwo, rep, len, playDown, move) => {
    return general(arrayOne, rep, len) === true && general(arrayTwo, rep, len) === false ? `result: the player 1 wins by ${move}` :
           general(arrayOne, rep, len) === false && general(arrayTwo, rep, len) === true ? `result: the player 2 wins by ${move}`:
           general(arrayOne, rep, len) === true && general(arrayTwo, rep, len) === true ? 
           move === 'flush'? playDown(valuesPlayerOne, valuesPlayerTwo,1): playDown(arrayOne, arrayTwo,rep) : false
};

//Who has full?
const fullComparison = (arrayOne, arrayTwo) =>{
    return full(arrayOne) === true && full(arrayTwo)  === false ? `result: the player 1 wins by full` :
    full(arrayOne) === false && full(arrayTwo)  === true ? `result: the player 2 wins by full` :
    full(arrayOne) === true && full(arrayTwo)  === true ? hightCardComparison(arrayOne, arrayTwo,3) : false
};

//Who has straight?
const straightComparison = (arrayOne, arrayTwo, rep) =>{
     return straight(arrayOne) === true && straight(arrayTwo)  === false ? `result: the player 1 wins by straight` :
     straight(arrayOne) === false && straight(arrayTwo)  === true ? `result: the player 2 wins by straight` :
     straight(arrayOne) === true && straight(arrayTwo)  === true ? hightCardComparison(arrayOne, arrayTwo,1): false
};

//Who has straight flush?
const straightFlushComparison = (arrayOne, arrayTwo, suitsOne, suitsTwo) =>{
    return straightFlush(arrayOne, suitsOne) === true && straightFlush(arrayTwo, suitsTwo) === false?`result: the player 1 wins by straight flush`: 
           straightFlush(arrayOne, suitsOne) === false && straightFlush(arrayTwo, suitsTwo) === true?`result: the player 2 wins by straight flush`: 
           straightFlush(arrayOne, suitsOne) === true && straightFlush(arrayTwo, suitsTwo) === true? hightCardComparison(arrayOne, arrayTwo,1): false 
};


//------------------------------SOLUTION--------------------------

const solution = (valuesOne, valuesTwo, suitsOne, suitsTwo) => {

  
  return straightFlushComparison(valuesOne, valuesTwo, suitsOne, suitsTwo)? straightFlushComparison(valuesOne, valuesTwo, suitsOne, suitsTwo): //straight full           
         generalComparison(valuesOne, valuesTwo, 4,1, hightCardComparison,'poker')? generalComparison(valuesOne, valuesTwo, 4,1, hightCardComparison,'poker'): //poker
         fullComparison(valuesOne, valuesTwo,suitsOne, suitsTwo)? fullComparison(valuesOne, valuesTwo,suitsOne, suitsTwo): //full 
         generalComparison(suitsOne, suitsTwo, 5,1, hightCardComparison,'flush')? generalComparison(suitsOne, suitsTwo, 5,1, hightCardComparison,'flush'):// flush
         straightComparison(valuesOne, valuesTwo,1)? straightComparison(valuesOne, valuesTwo,1): //straight
         generalComparison(valuesOne, valuesTwo, 3,1, hightCardComparison, 'three')? generalComparison(valuesOne, valuesTwo, 3,1, hightCardComparison, 'three')://three
         generalComparison(valuesOne, valuesTwo, 2,2, hightCardComparison,'two pairs')? generalComparison(valuesOne, valuesTwo, 2,2, hightCardComparison,'two pairs')://two pairs
         generalComparison(valuesOne, valuesTwo, 2,1, hightCardComparison, 'pair')? generalComparison(valuesOne, valuesTwo, 2,1, hightCardComparison, 'pair')://pair
         hightCardComparison(valuesOne, valuesTwo, 1,)?  hightCardComparison(valuesOne, valuesTwo, 1,)://hight card
  false

}

//MANUAL- console.log(solution([7,10, 2,13, 11], [2, 3, 1, 11, 7], ['S','S','p','S','S'],['S','p','S','S','S']))
console.log(solution(valuesPlayerOne, valuesPlayerTwo, suitsPlayerOne, suitsPlayerTwo))

