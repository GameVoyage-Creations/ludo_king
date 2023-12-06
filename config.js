// selecting elements
const btnEl0 = document.querySelector(".dice-player-0");
const btnEl1 = document.querySelector(".dice-player-1");
let activePlayer;
function init() {
  activePlayer = 0;

  document
    .querySelector(`.dice-player-${activePlayer}`)
    .classList.remove("hidden");
}
init();
// creating functiion that generate rondom number
const rondomDice = function () {
  return Math.floor(Math.random() * 6 + 1);
};

// creating switchPlayer function
function switchPlayer() {
  clearInterval(changeBgId);
  clearInterval(animateArrowId);
  document
    .querySelector(`.dice-player-${activePlayer}`)
    .classList.add("hidden");
  activePlayer = activePlayer === 0 ? 1 : 0;
  animateArrow(activePlayer);

  if (activePlayer === 1) changeOpacity(activePlayer, ["#2f9e44", "#59b169"]);
  else changeOpacity(activePlayer, ["#00c8ff", "#4dd9ff"]);
  document
    .querySelector(`.dice-player-${activePlayer}`)
    .classList.remove("hidden");
}
// creating buttons for both buttons

btnEl0.addEventListener("click", function () {
  // generating random dice
  const dice = rondomDice();
  // cheaking if the dice less that 6
  if (dice < 6) switchPlayer();
  else {
    // displying the dice
    btnEl0.src = `./Images/Dice-images/dice-${dice}.png`;
  }
});
btnEl1.addEventListener("click", function () {
  // generating random dice
  const dice = rondomDice();
  console.log(dice);
  // cheaking if the dice less that 6
  if (dice < 6) switchPlayer();
  else {
    // displying the dice
    btnEl1.src = `./Images/Dice-images/dice-${dice}.png`;
  }
});
