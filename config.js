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
