let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".resetBtn");
let newBtn = document.querySelector(".newBtn");
let msg = document.querySelector(".msg");
let msgContainer = document.querySelector(".msgContainer");

let TurnX = true;
let winnerList = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
const disabledGame = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const enabledGame = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};
const newGame = () => {
  msgContainer.classList.add("hide");
  enabledGame();
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (TurnX === true) {
      //Player x
      box.innerText = "X";
      TurnX = false;
    } else {
      //Player O
      box.innerText = "O";
      TurnX = true;
    }
    box.disabled = true;
    checkWinner();
  });
});
const showWinner = (winner) => {
  msgContainer.classList.remove("hide");
  msg.innerText = `Congratulation ,Winner is ${winner}`;
};

const handleDraw = () => {
  let isDraw = true;
  for (let box of boxes) {
    if (box.innerText === "") {
      isDraw = false;
      break;
    }
  }
  if (isDraw) {
    msgContainer.classList.remove("hide");
    msg.innerText = "It is a Draw Start a New Game";
  }
};
const checkWinner = () => {
  let isWinner = false;
  for (let pattern of winnerList) {
    let posVal1 = boxes[pattern[0]].innerText;
    let posVal2 = boxes[pattern[1]].innerText;
    let posVal3 = boxes[pattern[2]].innerText;
    if (posVal1 != "" && posVal2 != "" && posVal3 != "") {
      if (posVal1 === posVal2 && posVal2 === posVal3) {
        isWinner = true;
        showWinner(posVal1);
        disabledGame();
      }
    }
  }
  if (isWinner === false) {
    handleDraw();
  }
};

newBtn.addEventListener("click", () => {
  newGame();
});
resetBtn.addEventListener("click", () => {
  newGame();
});
