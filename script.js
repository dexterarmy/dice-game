'use strict';
// select elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0EL = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

//initial condiitons
score0El.textContent = 0; //JS will automatically convert them to strings to display them on page
score1El.textContent = 0;
diceEl.classList.add('hidden');
// we want variable in our code and not only update the DOM
let currentScore = 0; // we want to presist the score thatswhy let and outside the handler function
let activePlayer = 0;
let playingState = true; //state variable that hosts the state of the game
const scores = [0, 0]; // now we know why we made player 0 and player 1
//no parameters needed because we just want to copy the code and nothing changes in the code
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // switch player , reassign in the activePlayer variable
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  // will check which element contains the player--active class
  // and will ensure only one of the elements have the class
  player0EL.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playingState) {
    //generate random dice roll everytime we click the roll button
    const dice = Math.trunc(Math.random() * 6) + 1;

    //display dice
    diceEl.classList.remove('hidden');

    // manipulating src attribute of image element from javascript with src property
    diceEl.src = `dice-${dice}.png`;

    // check for rolled 1
    if (dice !== 1) {
      currentScore += dice;

      // dynamically selecting element, built the id name
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playingState) {
    // hold the score for active player
    scores[activePlayer] += currentScore;
    //thats why we had player 0 and 1 instead of player 1 and player 2
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playingState = false; // ends the game, state variable tells the condition of a system
      //finish the game
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      //we cannot have player--active and player--winner class at the same time ?
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  player0EL.classList.add('player--active');
  player1El.classList.remove('player--active'); // if not there then it will not remove
  player0EL.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden'); // if there then it will not add
  //setting internal state variables back to initial state
  scores[0] = 0;
  scores[1] = 0;
  activePlayer = 0;
  currentScore = 0;
  playingState = true;
  // here we could also make a func and passed that func value as an argument to addEventListener function
});
