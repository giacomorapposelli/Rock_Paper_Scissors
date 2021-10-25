/* TO FILL EMPTY VALIDATION INPUT */
function getInputValue() {
  let namePlayer = document.getElementById("input").value;
  var field = input.value;

  if (field.length < 1) {
    document.getElementById("name").innerHTML = "???";
  } else {
    document.getElementById("name").innerHTML = namePlayer;
  }
}

const computerChoiceDisplay = document.getElementById("computer-choice");
const userChoiceDisplay = document.getElementById("user-choice");
const possibleChoices = document.querySelectorAll("a");
let userChoice;
let computerChoice;

possibleChoices.forEach((possibleChoice) =>
  possibleChoice.addEventListener("click", (e) => {
    userChoice = e.target.id;
    userChoiceDisplay.innerHTML = userChoice;
    getResult();
  })
);

const rockOutFunction = "Rock";
const paperOutFunction = "Paper";
const scissorsOutFunction = "Scissors";

function generateComputerChoice() {
  const randomNumber = Math.floor(Math.random() * 3) + 1;
  if (randomNumber === 1) {
    computerChoice = rockOutFunction;
    document.getElementById("imgPcRock").style.visibility = "visible";
    document.getElementById("imgPcPaper").style.visibility = "hidden";
    document.getElementById("imgPcScissors").style.visibility = "hidden";
  }
  if (randomNumber === 2) {
    computerChoice = paperOutFunction;
    document.getElementById("imgPcRock").style.visibility = "hidden";
    document.getElementById("imgPcPaper").style.visibility = "visible";
    document.getElementById("imgPcScissors").style.visibility = "hidden";
  }
  if (randomNumber === 3) {
    computerChoice = scissorsOutFunction;
    document.getElementById("imgPcRock").style.visibility = "hidden";
    document.getElementById("imgPcPaper").style.visibility = "hidden";
    document.getElementById("imgPcScissors").style.visibility = "visible";
  }

  setTimeout(() => {
    computerChoiceDisplay.innerHTML = computerChoice;
  }, 0000);
}

const resultDisplay = document.getElementById("result");
let result;

function getResult() {
  if (computerChoice === userChoice) {
    result = "TIE!";
  }
  if (computerChoice === "Rock" && userChoice === "Paper") {
    result = "you win!";
  }
  if (computerChoice === "Rock" && userChoice === "Scissors") {
    result = "you lose!";
  }
  if (computerChoice === "Paper" && userChoice === "Scissors") {
    result = "you win!";
  }
  if (computerChoice === "Paper" && userChoice === "Rock") {
    result = "you lose!";
  }
  if (computerChoice === "Scissors" && userChoice === "Rock") {
    result = "you win!";
  }
  if (computerChoice === "Scissors" && userChoice === "Paper") {
    result = "you lose!";
  }
  resultDisplay.innerHTML = result;
}

function rock() {
  document.getElementById("imgRock").style.visibility = "visible";
  document.getElementById("imgPaper").style.visibility = "hidden";
  document.getElementById("imgScissors").style.visibility = "hidden";
}

function paper() {
  document.getElementById("imgRock").style.visibility = "hidden";
  document.getElementById("imgPaper").style.visibility = "visible";
  document.getElementById("imgScissors").style.visibility = "hidden";
}

function scissors() {
  document.getElementById("imgRock").style.visibility = "hidden";
  document.getElementById("imgPaper").style.visibility = "hidden";
  document.getElementById("imgScissors").style.visibility = "visible";
}
