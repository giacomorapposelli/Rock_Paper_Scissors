const newGame = document.getElementById('new-game');
const resetGame = document.getElementById('reset');
const resetBtn = document.querySelector('.reset');
const choices = ['Rock', 'Paper', 'Scissors'];
const computerChoices = document.querySelectorAll('.imgPcGame img');
const computerChoiceDisplay = document.getElementById('computer-choice');
const userChoices = document.querySelectorAll('.imgGame img');
const userChoiceDisplay = document.getElementById('user-choice');
const possibleChoices = document.querySelectorAll('div.buttons > button');
const resultDisplay = document.getElementById('result');
const userName = document.getElementById('name');
const userScore = document.getElementById('userScore');
const computerScore = document.getElementById('computerScore');
let userChoice;
let computerChoice;
let result;
let incrementUserScore = 0;
let incrementComputerScore = 0;

window.onload = () => {
    if (localStorage.length) {
        resetGame.style.display = 'block';
        newGame.style.display = 'none';
    }
    if (localStorage.getItem('user'))
        userName.innerHTML = localStorage.getItem('user');
    if (localStorage.getItem('user-score'))
        userScore.innerHTML = localStorage.getItem('user-score');
    incrementUserScore = +localStorage.getItem('user-score');
    if (localStorage.getItem('computer-score'))
        computerScore.innerHTML = localStorage.getItem('computer-score');
    incrementComputerScore = +localStorage.getItem('computer-score');
};

const getInputValue = () => {
    let namePlayer = document.getElementById('input').value;
    let field = input.value;

    if (!field.length) {
        userName.innerHTML = '???';
    } else {
        userName.innerHTML = namePlayer;
    }
    document.getElementById('input').innerHTML = '';
    localStorage.setItem('user', !field.length ? '???' : namePlayer);
    resetGame.style.display = 'block';
    newGame.style.display = 'none';
    newGame.reset();
};

newGame.onsubmit = (e) => {
    e.preventDefault();
    getInputValue();
};

resetBtn.onclick = () => {
    localStorage.clear();
    location.reload();
};

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

possibleChoices.forEach((possibleChoice) => {
    possibleChoice.addEventListener('click', (e) => {
        if (!localStorage.getItem('user')) {
            alert('insert your name first!');
            return;
        }
        resultDisplay.innerHTML = 'waiting..';
        resetChoices(computerChoices, computerChoiceDisplay);
        Promise.all([
            playersChoice(e.target.id),
            generateComputerChoice()
        ]).then(() => {
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

const scoreUser = () => {
    if (result === 'you win!') {
        incrementUserScore++;
    } else if (result === 'you lose!') {
        incrementComputerScore++;
    }
    localStorage.setItem('user-score', incrementUserScore);
    localStorage.setItem('computer-score', incrementComputerScore);
    userScore.innerHTML = incrementUserScore;
    computerScore.innerHTML = incrementComputerScore;
};

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
