const btnEl0 = document.querySelector(".dice-player-0");
const btnEl1 = document.querySelector(".dice-player-1");
const lowerLeftContainer = document.querySelector(
  ".inner-rectangle-for-lower-left"
);
const upperRightContainer = document.querySelector(
  ".inner-rectangle-for-upper-right"
);
let tokensInLOwerLeftContainer =
  lowerLeftContainer.querySelectorAll(".blue-token-image").length;
let TokensInUpperRightContainer =
  upperRightContainer.querySelectorAll(".green-token-image").length;

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

// const randomDice = () => Math.floor(Math.random() * (6 - 5 + 1)) + 5; //for testing purpose

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
    if (dice < 6) {
      setTimeout(() => {
        if (
          activePlayer === 0
            ? tokensInLOwerLeftContainer
            : TokensInUpperRightContainer === 4
        ) {
          switchPlayer();
          removeDiceImage(activePlayer);
        }

        if (
          activePlayer === 0
            ? tokensInLOwerLeftContainer
            : TokensInUpperRightContainer != 4
        ) {
          moveDice(dice, activePlayer);
        }
      }, 1000);
    }
    if (dice === 6) {
      addArrowImage(activePlayer);
      appStart(dice, activePlayer);
    }
  }, 1000);
};

btnEl0.addEventListener("click", () => handleClickImages(0));

btnEl1.addEventListener("click", () => handleClickImages(1));

const appStart = function (dice, activePlayer) {
  const blue1 = document.querySelector(".blue-1");
  const blue2 = document.querySelector(".blue-2");
  const blue3 = document.querySelector(".blue-3");
  const blue4 = document.querySelector(".blue-4");
  const blueTokens = [blue1, blue2, blue3, blue4];
  const square = document.getElementById("sqr1");

  const green1 = document.querySelector(".green-1");
  const green2 = document.querySelector(".green-2");
  const green3 = document.querySelector(".green-3");
  const green4 = document.querySelector(".green-4");
  const greenTokens = [green1, green2, green3, green4];
  const square2 = document.getElementById("sqr27");

  if (activePlayer === 0) {
    if (dice === 6) {
      blueTokens.forEach((blueToken) => {
        blueToken.addEventListener("click", function () {
          blueToken.parentNode.removeChild(blueToken);
          square.appendChild(blueToken);
          tokensInLOwerLeftContainer =
            lowerLeftContainer.querySelectorAll(".blue-token-image").length;
          const tokensInSquare =
            square.querySelectorAll(".blue-token-image").length;
          blueTokens.forEach((blueToken) => {
            if (square.contains(blueToken)) {
              blueToken.style.width = `${2.3 / tokensInSquare}rem`;
              if (tokensInSquare > 1) blueToken.style.height = `2rem`;
            }
          });
        });
      });
    }
  }

  if (activePlayer === 1) {
    if (dice === 6) {
      greenTokens.forEach((greenToken) => {
        greenToken.addEventListener("click", function () {
          greenToken.parentNode.removeChild(greenToken);
          square2.appendChild(greenToken);
          TokensInUpperRightContainer =
            upperRightContainer.querySelectorAll(".green-token-image").length;
          const tokensInSquare =
            square2.querySelectorAll(".green-token-image").length;
          greenTokens.forEach((greenToken) => {
            if (square2.contains(greenToken)) {
              greenToken.style.width = `${2.3 / tokensInSquare}rem`;
              if (tokensInSquare > 1) greenToken.style.height = `2rem`;
            }
          });
        });
      });
    }
  }
};

function moveDice(dice, activePlayer) {
  const blue1 = document.querySelector(".blue-1");
  const blue2 = document.querySelector(".blue-2");
  const blue3 = document.querySelector(".blue-3");
  const blue4 = document.querySelector(".blue-4");
  const blueTokens = [blue1, blue2, blue3, blue4];
  const square = document.getElementById("sqr1");

  const green1 = document.querySelector(".green-1");
  const green2 = document.querySelector(".green-2");
  const green3 = document.querySelector(".green-3");
  const green4 = document.querySelector(".green-4");
  const greenTokens = [green1, green2, green3, green4];
  const square2 = document.getElementById("sqr27");

  if (activePlayer === 0) {
    if (dice < 6) {
      blueTokens.forEach((blueToken) => {
        blueToken.addEventListener("click", function () {
          if (square.contains(blueToken)) {
            blueToken.style.width = "2.3rem";
            blueToken.style.height = "3.7rem";
            const newSquare = document.getElementById(`sqr${1 + dice}`);
            blueToken.parentNode.removeChild(blueToken);
            newSquare.appendChild(blueToken);
            removeDiceImage(activePlayer);
          }
          switchPlayer();
        });
      });
    }
  }

  if (activePlayer === 1) {
    if (dice < 6) {
      greenTokens.forEach((greenToken) => {
        greenToken.addEventListener("click", function () {
          if (square2.contains(greenToken)) {
            greenToken.style.width = "2.3rem";
            greenToken.style.height = "3.7rem";
            const newSquare = document.getElementById(`sqr${27 + dice}`);
            greenToken.parentNode.removeChild(greenToken);
            newSquare.appendChild(greenToken);
            removeDiceImage(activePlayer);
          }
          switchPlayer();
        });
      });
    }
  }
}

function init() {
  activePlayer = 0;
  animateArrow(activePlayer);
  changeOpacity(activePlayer, playerZeroColor);
}

init();
