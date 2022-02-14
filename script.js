// DOM objects
const player1Input = document.querySelectorAll('.player-1');
const player2Input = document.querySelectorAll('.player-2');
const cells = document.querySelectorAll('.cell');

player1Input.forEach((choice) => {
    choice.addEventListener('click', () => {
        // clear the selected of all the DOM object
        player1Input.forEach((cell) => {
            cell.classList.remove("selected");
        });
        choice.classList.add("selected");
        player1 = choice.value;
    });
});

player2Input.forEach((choice) => {
    choice.addEventListener('click', () => {
        // clear the selected of all the DOM object
        player2Input.forEach((cell) => {
            cell.classList.remove("selected");
        });
        choice.classList.add("selected");
        player2 = choice.value;
    });
});

const start = document.querySelector('.start');

start.addEventListener('click', () => {
    const modal = document.querySelector('.modal-container');
    if (player1 != undefined && player2 != undefined) {
        modal.style.display = "none";
        startGame(player1, player2);
    }
});

const restart = document.querySelector('.restart');
restart.addEventListener('click', () => {
    location.reload();
});

const playerFactory = (playerState, input) => {
    const inputs = [];
    const mark = input;
    const getChoice = (emptySlots) => {
        if (playerState == "Human") {
            cells.forEach((cell) => {
                cell.addEventListener('click', () => {
                    let cellNumber = cell.getAttribute('data-cell-number');
                    if (boardState[cellNumber] == "") {
                        return cellNumber;
                    }
                });
            });
        } else if (playerState == "RandomAI") {
            return randomChoice(emptySlots);
        } else return smartChoice(emptySlots, playerState, boardState);
    }

    return { playerState, inputs, mark, getChoice };
}

const randomChoice = (emptySlots) => {
    let random = parseInt(Math.random() * emptySlots.length);

    return emptySlots[random];
}
/*
const smartChoice = (emptySlots, playerState, boardState) => {
    const minmax = (emptySlots, playerState, boardState) => {
        for (let i = 0; i < emptySlots.length; i++) {
            let temp = 0;

        }

    return minmax;
}
*/
const startGame = (player1, player2) => {
    const playerX = playerFactory(player1, "X");
    const playerO = playerFactory(player2, "O");

    return newGame(playerX, playerO);
}

const newGame = (playerX, playerO) => {

    while (true) {
        let emptySlots = [];
        for (let i = 0; i < boardState.length; i++) {
            if (boardState[i] == "") emptySlots.push(i);
        }
        let pick1 = playerX.getChoice(emptySlots);
        boardState[pick1] = playerX.mark;
        playerX.inputs.push(pick1);
        drawMark(playerX, pick1);
        if (isGameOver(playerX)) break;

        emptySlots = [];
        for (let i = 0; i < boardState.length; i++) {
            if (boardState[i] == "") emptySlots.push(i);
        }
        let pick2 = playerO.getChoice(emptySlots);
        boardState[pick2] = playerO.mark;
        playerO.inputs.push(pick2);
        drawMark(playerO, pick2);
        if (isGameOver(playerO)) break;

    }
}

const isGameOver = (player) => {

    let counter = 0;
    for (let i = 0; i < winningCombinations.length; i++) {
        for (let j = 0; j < winningCombinations[i].length; j++) {
            if (player.inputs.includes(winningCombinations[i][j])) {
                counter++;
            }
        }
        if (counter == 3) {
            postMessage(player);
            return true;
        }
        counter = 0;
    }

    if (player.inputs.length >= 5) {
        postMessage("draw");
        return true;
    }

    return false;
}

function drawMark(player, cellNumber) {

    const draw = document.createElement('img');

    if (player.mark == "X") draw.src = "Resources/X.png";
    else draw.src = "Resources/O.png";

    const cell = document.querySelector(`[data-cell-number='${cellNumber}']`);
    cell.appendChild(draw);
}

let player1, player2;
const boardState = [];
const winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
[0, 3, 6], [1, 4, 7], [2, 5, 8],
[0, 4, 8], [2, 4, 6]];
setInitialValue();

// Initializing default variables values
function setInitialValue() {
    for (let i = 0; i < 9; i++) {
        boardState.push("");
    }
}

function endGame(player) {

    for (let i = 0; i < isEmpty.length; i++) {
        boardState[i] = "X";
    }
}

function postMessage(player) {
    const message = document.querySelector('.message');
    if (player == "draw") {
        message.innerText = "It's a draw. What a close match!"
    } else {
        message.innerText = `Player ${player.mark} won! Congratulations. 
                            ${player.playerState} won this time.`;
    }
}
