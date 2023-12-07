const btnEl0 = document.querySelector(".dice-player-0");
const btnEl1 = document.querySelector(".dice-player-1");
let activePlayer;
let changeBgId;
let animateArrowId;
const playerZeroColor = ["rgb(0, 200, 255)", "rgb(2, 112, 167)"];
const playerOneColor = ["rgb(30, 162, 4)", "rgb(20, 108, 2)"];

const animateArrow = function (activePlayer) {
  let transitionImage = document.querySelector(`.arrow-player-${activePlayer}`);
  let translateXValue = 0;
  let move = true;
  function slideImage() {
    move
      ? activePlayer == 0
        ? (translateXValue -= 20)
        : (translateXValue += 20)
      : (translateXValue = 0);

    transitionImage.style.transform = "translateX(" + translateXValue + "px)";
    move = !move;
  }
  animateArrowId = setInterval(slideImage, 250);
};

const changeOpacity = function (activePlayer, colors) {
  let currentIndex = 0;
  function changeBackgorundColor() {
    let currentColor = colors[currentIndex];
    currentIndex = (currentIndex + 1) % colors.length;
    document.querySelector(
      `.upper-right-${activePlayer}`
    ).style.backgroundColor = currentColor;
  }
  changeBgId = setInterval(changeBackgorundColor, 250);
};

const randomDice = () => Math.floor(Math.random() * 6 + 1);

const removeArrowImage = (activePlayer) =>
  document
    .querySelector(`.arrow-player-${activePlayer}`)
    .classList.add("hidden");
const addArrowImage = (activePlayer) =>
  document
    .querySelector(`.arrow-player-${activePlayer}`)
    .classList.remove("hidden");
const removeDiceImage = (activePlayer) =>
  document
    .querySelector(`.dice-player-${activePlayer}`)
    .classList.add("hidden");
const addDiceImage = (activePlayer) =>
  document
    .querySelector(`.dice-player-${activePlayer}`)
    .classList.remove("hidden");

const resetArrowAndColor = function () {
  document.querySelector(`.arrow-player-0`).style.transform = "translateX(0)"; //resetting the positions of left arrow before switching
  document.querySelector(`.arrow-player-1`).style.transform = "translateX(0)"; //resetting the positions of right arrow before switching

  const prevPlayerColor =
    activePlayer === 0 ? playerZeroColor[0] : playerOneColor[0];
  document.querySelector(`.upper-right-${activePlayer}`).style.backgroundColor =
    prevPlayerColor;
};

const switchPlayer = function () {
  clearInterval(changeBgId);
  clearInterval(animateArrowId);

  resetArrowAndColor();

  activePlayer = activePlayer === 0 ? 1 : 0;
  animateArrow(activePlayer);

  activePlayer == 0
    ? changeOpacity(activePlayer, playerZeroColor)
    : changeOpacity(activePlayer, playerOneColor);
  addDiceImage(activePlayer);
  addArrowImage(activePlayer);
};

const handleClickImages = function (activePlayer) {
  const btn = activePlayer === 0 ? btnEl0 : btnEl1;

  removeArrowImage(activePlayer);
  const dice = randomDice();

  btn.classList.add("shake");
  setTimeout(() => {
    btn.classList.remove("shake");
    btn.src = `./Images/Dice-images/dice-${dice}.png`;
    dice < 6
      ? setTimeout(() => {
          switchPlayer();
          removeDiceImage(activePlayer);
        }, 1000)
      : addArrowImage(activePlayer);
  }, 1000);
};

btnEl0.addEventListener("click", () => handleClickImages(0));

btnEl1.addEventListener("click", () => handleClickImages(1));

function init() {
  activePlayer = 0;
  animateArrow(activePlayer);
  changeOpacity(activePlayer, playerZeroColor);
}

init();
