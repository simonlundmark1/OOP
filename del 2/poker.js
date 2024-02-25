//Del 1

class Card {
  constructor(color, name, value) {
      this.color = color;
      this.name = name;
      this.value = value;
  }
}

class Kortlek {
  constructor() {
    this.kortlek = this.skapaKortlek();
    this.blandaKortlek();
  }

  
  skapaKortlek() {
    const colors = ['Hjärter', 'Spader', 'Ruter', 'Klöver'];
    const namnOchValue = [
      { name: '2', value: 2 }, { name: '3', value: 3 }, { name: '4', value: 4 },
      { name: '5', value: 5 }, { name: '6', value: 6 }, { name: '7', value: 7 },
      { name: '8', value: 8 }, { name: '9', value: 9 }, { name: '10', value: 10 },
      { name: 'Knekt', value: 11 }, { name: 'Dam', value: 12 }, { name: 'Kung', value: 13 },
      { name: 'Ess', value: 14 }
    ];


  let kortlek = [];

  colors.forEach(color => {
    namnOchValue.forEach(card => { 
      kortlek.push(new Card(color, card.name, card.value));
    });
  });

  return kortlek;
}

blandaKortlek() {
  for (let i = this.kortlek.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [this.kortlek[i], this.kortlek[j]] = [this.kortlek[j], this.kortlek[i]]; // Swap
  }
}
}


const nyKortlek = new Kortlek();
/* console.log("Blandad kortlek:", nyKortlek);
 */

//-----------------------------------------------/*  */----------------------------------------------------


//Del 2

class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
  }

  addCard(card) {
    this.hand.push(card);
  }

  HandValue() {
    return this.hand.reduce((acc, card) => acc + card.value, 0);
  }
}

function giveCards(deck, players, cardsPerPlayer) {
  for (let i = 0; i < cardsPerPlayer; i++) {
    players.forEach(player => {
      if (deck.kortlek.length > 0) {
        const card = deck.kortlek.shift(); // Använd deck.kortlek istället för bara deck
        player.addCard(card);
      }
    });
  }
}

let slim = new Player("Slim");
let luke = new Player("Luke");

giveCards(nyKortlek, [slim, luke], 5);

/* console.log("Kortlek:", nyKortlek);
console.log("Slims hand:", slim.hand, "Totalt värde:", slim.HandValue())
console.log("Lukes hand:", luke.hand, "Totalt värde:", luke.HandValue()); */


//----------------------------------------------------------------

// Del 3

class Hog {
  constructor() {
    this.cards = [];
  }

  addCard(card) {
    this.cards.push(card);
  }

  removeCard() {
    return this.cards.shift();
  }
}

let hog = new Hog();

function playerRemoveCards(player, cardsNumber) {
  for (let i = 0; i < cardsNumber; i++) {
    if (player.hand.length > 0) {
      const discardedCard = player.hand.shift(); 
      hog.addCard(discardedCard);
    }
  }
}

playerRemoveCards(slim, 2);
playerRemoveCards(luke, 2);

giveCards(nyKortlek, [slim, luke], 2);
/* 
 console.log("Kort kvar i lek:", nyKortlek.kortlek.length);
console.log("Slims hand (5 kort):", slim.hand, "Värde:", slim.HandValue());
console.log("Lukes hand (5 kort):", luke.hand, "Värde:", luke.HandValue());
console.log("Högen:", hog); */


//----------------------------------------------------------------

// Del 4

function move1(players) {
  players.forEach(player => {
    while (player.hand.length > 0) {
      hog.addCard(player.hand.shift()); // Använd addCard metoden
    }
  });
}

function move2(kortlek, hog) {
  while (hog.cards.length > 0) {
    kortlek.kortlek.push(hog.removeCard()); // Använd removeCard metoden och kortlek.kortlek för att lägga till kort
  }
}

move1([slim, luke]);//Flytta allt från hand till högen

move2(nyKortlek, hog);//Flytta allt från högen till leken

nyKortlek.blandaKortlek(nyKortlek);

console.log("Slims hand:", slim.hand.length, "Lukes hand:", luke.hand.length, "Hög:", hog.cards.length, "Kort i kortleken:",  nyKortlek.kortlek.length, "Blandad kortlek:", nyKortlek.kortlek);