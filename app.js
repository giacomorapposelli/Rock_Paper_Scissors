/* TO FILL EMPTY VALIDATION INPUT - MISSING 2ENTER" */
const form = document.getElementById('form');

const getInputValue = () => {
    let namePlayer = document.getElementById('input').value;
    let field = input.value;

    if (field.length < 1) {
        document.getElementById('name').innerHTML = '???';
    } else {
        document.getElementById('name').innerHTML = namePlayer;
    }
    document.getElementById('input').innerHTML = '';
    form.reset();
};

form.onsubmit = (e) => {
    e.preventDefault();
    getInputValue();
};

/* ------------------------*/
const choices = ['Rock', 'Paper', 'Scissors'];
const computerChoices = document.querySelectorAll('.imgPcGame img');
const computerChoiceDisplay = document.getElementById('computer-choice');
const userChoices = document.querySelectorAll('.imgGame img');
const userChoiceDisplay = document.getElementById('user-choice');
const possibleChoices = document.querySelectorAll('div.buttons > button');
const resultDisplay = document.getElementById('result');
let userChoice;
let computerChoice;
let result;

const resetChoices = (arr, display) => {
    for (const choice of arr) {
        if (choice.style.visibility === 'visible') {
            choice.style.visibility = 'hidden';
        }
    }
    display.innerHTML = '';
};

const disableButtons = (buttons) => {
    for (const button of buttons) {
        button.disabled = true;
    }
};

const enableButtons = (buttons) => {
    for (const button of buttons) {
        button.disabled = false;
    }
};

possibleChoices.forEach((possibleChoice) => {
    possibleChoice.addEventListener('click', (e) => {
        resultDisplay.innerHTML = 'waiting..';
        resetChoices(computerChoices, computerChoiceDisplay);
        playersChoice(e.target.id)
            .then(() => generateComputerChoice())
            .then(() => {
                getResult();
                scoreUser();
                enableButtons(possibleChoices);
            });
        let seconds = 4;
        ola();
        let x = setInterval(ola, 500);
        function ola() {
            if (seconds < 2) {
                clearInterval(x);
                document.getElementById('vs').innerHTML = 'FIGHT';
            } else if (seconds > 1) {
                seconds--;
                document.getElementById('vs').innerHTML = seconds;
            }
        }
    });
});

const playersChoice = (card) => {
    userChoice = choices[choices.indexOf(card)];
    resetChoices(userChoices, userChoiceDisplay);
    userChoices[choices.indexOf(card)].style.visibility = 'visible';
    userChoiceDisplay.innerHTML = userChoice;
    disableButtons(possibleChoices);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1500);
    });
};

const getResult = () => {
    if (computerChoice === userChoice) {
        result = 'TIE!';
    }
    if (computerChoice === 'Rock' && userChoice === 'Paper') {
        result = 'you win!';
    }
    if (computerChoice === 'Rock' && userChoice === 'Scissors') {
        result = 'you lose!';
    }
    if (computerChoice === 'Paper' && userChoice === 'Scissors') {
        result = 'you win!';
    }
    if (computerChoice === 'Paper' && userChoice === 'Rock') {
        result = 'you lose!';
    }
    if (computerChoice === 'Scissors' && userChoice === 'Rock') {
        result = 'you win!';
    }
    if (computerChoice === 'Scissors' && userChoice === 'Paper') {
        result = 'you lose!';
    }
    resultDisplay.innerHTML = result;
};

// ---------- not working ---------//

let incrementUserScore = 0;
let incrementComputerScore = 0;

function scoreUser() {
    if (result === 'you win!') {
        incrementUserScore++;
    } else if (result === 'you lose!') {
        incrementComputerScore++;
    } else {
        console.log('suka');
    }
    document.getElementById('userScore').innerHTML = incrementUserScore;
    document.getElementById('computerScore').innerHTML = incrementComputerScore;
}

// WRONG INTERVAL //
/* let seconds = 3;
const go = "GO!";
function startCountdown() {
  let x = setInterval(function () {
    document.getElementById("vs").innerHTML = seconds;
    if (seconds > 0) {
      seconds--;
    } else {
       document.getElementById("vs").innerHTML = "GO!";
      clearInterval(x);
    }
  }, 300);
} */

const generateComputerChoice = () => {
    return new Promise((resolve) => {
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const random = Math.floor(Math.random() * 3);
                resetChoices(computerChoices, computerChoiceDisplay);
                computerChoices[random].style.visibility = 'visible';
                computerChoice = choices[random];
                computerChoiceDisplay.innerHTML = computerChoice;
            }, 48 * i);
        }
        setTimeout(resolve, 1498);
    });
};
