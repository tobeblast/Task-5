"use strict";

let firstPlayer = document.querySelector(".player--0");
let secondPlayer = document.querySelector(".player--1");
let firstPlayerScore = document.querySelector("#score--0");
let secondPlayerScore = document.querySelector("#score--1");
let firstPlayerCurrentScore = document.querySelector("#current--0");
let secondPlayerCurrentScore = document.querySelector("#current--1");

let newGameBtn = document.querySelector(".btn--new");
let rollBtn = document.querySelector(".btn--roll");
let holdBtn = document.querySelector(".btn--hold");

const btnArr = document.querySelectorAll(".btn");

let dice = document.querySelector(".dice");

let scoresArr, activePlayer, palying, currentScore;

const resetGame = function () {
  scoresArr = [0, 0];
  activePlayer = 0;
  palying = true;
  currentScore = 0;

  firstPlayer.classList.add("player--active");
  secondPlayer.classList.remove("player--active");
  firstPlayer.classList.remove("player--winner");
  secondPlayer.classList.remove("player--winner");
  firstPlayerScore.textContent = 0;
  secondPlayerScore.textContent = 0;
  firstPlayerCurrentScore.textContent = 0;
  secondPlayerCurrentScore.textContent = 0;
};
resetGame();

let switchPlayer = function () {
  firstPlayer.classList.toggle("player--active");
  secondPlayer.classList.toggle("player--active");
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = (activePlayer === 0 / 1) | 0;
};

//roll dice
document.querySelector(".dice").style.display = "none";

rollBtn.addEventListener("click", function () {
  if (palying) {
    const diceResult = Math.floor(Math.random() * 6) + 1;
    //display dice
    document.querySelector(".dice").style.display = "block";

    dice.src = `./image/dice-${diceResult}.png`;

    if (diceResult !== 1) {
      currentScore += diceResult;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

//Hold score
holdBtn.addEventListener("click", function () {
  if (palying) {
    scoresArr[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scoresArr[activePlayer];
    if (scoresArr[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      palying = false;
    } else {
      switchPlayer();
    }
  }
});

//New game
newGameBtn.addEventListener("click", resetGame);
