// selecting elements
const btnEl0 = document.querySelector(".dice-player-0");
const btnEl1 = document.querySelector(".dice-player-1");
let activePlayer;
let changeBgId;
let animateArrowId;
const playerZeroColor = ["#00c8ff", "#4dd9ff"];
const playerOneColor = ["#2f9e44", "#59b169"];

function init() {
  activePlayer = 0;

  document
    .querySelector(`.dice-player-${activePlayer}`)
    .classList.remove("hidden");
  document
    .querySelector(`.arrow-player-${activePlayer}`)
    .classList.remove("hidden");
  animateArrow(activePlayer);
  changeOpacity(activePlayer, playerZeroColor);
}

const animateArrow = function (activePlayer) {
  let transitionImage = document.querySelector(`.arrow-player-${activePlayer}`);
  let translateXValue = 0;
  let moveToLeft = true;
  function slideImage() {
    if (moveToLeft) {
      // Move the image to the left by 50 pixels
      translateXValue -= 8;
    } else {
      // Move the image back to the original position
      translateXValue = 0;
    }

    // Apply the translation using the transform property
    transitionImage.style.transform = "translateX(" + translateXValue + "px)";

    // Toggle the direction for the next iteration
    moveToLeft = !moveToLeft;
  }

  // Call the function every second (1000 milliseconds)
  animateArrowId = setInterval(slideImage, 300);
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
  changeBgId = setInterval(changeBackgorundColor, 300);
};

// initializaing the game
init();

// creating functiion that generate rondom number
const randomDice = function () {
  return Math.floor(Math.random() * 6 + 1);
};

// creating switchPlayer function
function switchPlayer() {
  clearInterval(changeBgId);
  clearInterval(animateArrowId);

  document
    .querySelector(`.arrow-player-${activePlayer}`)
    .classList.add("hidden");
  activePlayer = activePlayer === 0 ? 1 : 0;
  animateArrow(activePlayer);

  if (activePlayer === 1) changeOpacity(activePlayer, playerOneColor);
  else changeOpacity(activePlayer, ["#00c8ff", "#4dd9ff"]);
  document
    .querySelector(`.dice-player-${activePlayer}`)
    .classList.remove("hidden");
  document
    .querySelector(`.arrow-player-${activePlayer}`)
    .classList.remove("hidden");
}
// creating buttons for both buttons

btnEl0.addEventListener("click", function () {
  if (activePlayer === 1) return;

  document
    .querySelector(`.arrow-player-${activePlayer}`)
    .classList.add("hidden");
  // generating random dice
  const dice = randomDice();

  // cheaking if the dice less that 6

  btnEl0.classList.add("shake");
  setTimeout(() => {
    btnEl0.classList.remove("shake");
    btnEl0.src = `./Images/Dice-images/dice-${dice}.png`;
    dice < 6
      ? setTimeout(() => {
          switchPlayer();
          setTimeDice(0);
        }, 1000)
      : document
          .querySelector(`.arrow-player-${activePlayer}`)
          .classList.remove("hidden");
  }, 1000);
});

btnEl1.addEventListener("click", function () {
  if (activePlayer === 0) return;

  // generating random dice
  document
    .querySelector(`.arrow-player-${activePlayer}`)
    .classList.add("hidden");
  const dice = randomDice();
  // cheaking if the dice less that 6

  btnEl1.classList.add("shake");
  setTimeout(() => {
    btnEl1.classList.remove("shake");
    btnEl1.src = `./Images/Dice-images/dice-${dice}.png`;
    dice < 6
      ? setTimeout(() => {
          switchPlayer();
          setTimeDice(1);
        }, 1000)
      : document
          .querySelector(`.arrow-player-${activePlayer}`)
          .classList.remove("hidden");
  }, 1000);
});

function setTimeDice(activePlayer) {
  document
    .querySelector(`.dice-player-${activePlayer}`)
    .classList.add("hidden");
}
