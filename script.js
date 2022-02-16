// DOM objects
const player1Input = document.querySelectorAll('.player-1');
const player2Input = document.querySelectorAll('.player-2');
const cells = document.querySelectorAll('.cell');

const restart = document.querySelector('.restart');
restart.addEventListener('click', () => {
    location.reload();
});

const refresh = document.querySelector('.refresh');
refresh.addEventListener('click', () => {
    clearDisplay();
    startGame(player1, player2);
})

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

const playerFactory = (playerState, input) => {
    const inputs = [];
    const mark = input;

    const getChoice = (boardState) => {
        if (playerState == "RandomAI") {
            return randomChoice(boardState);
        } else return smartChoice(boardState, playerState);
    }

    return { playerState, inputs, mark, getChoice };
}

const randomChoice = (boardState) => {

    let emptySlots = [];
    for (let i = 0; i < boardState.length; i++) {
        if (boardState[i] == "") emptySlots.push(i);
    }

    let random = parseInt(Math.random() * emptySlots.length);

    return emptySlots[random];
}

const smartChoice = (boardState) => {

    // I know I could have use playerX.inputs and playerO.inputs here
    // I will fix it if I have time. I prioritized the concept here anyway.
    let emptySlots = [];
    let xInputs = [];
    let oInputs = [];

    for (let i = 0; i < boardState.length; i++) {
        if (boardState[i] == "") emptySlots.push(i);
        if (boardState[i] == "X") xInputs.push(i);
        if (boardState[i] == "O") oInputs.push(i);
    }

    const minmax = (emptySlots, xInputs, oInputs) => {


        }
    

    return minmax;
}

const startGame = (player1, player2) => {

    const playerX = playerFactory(player1, "X");
    const playerO = playerFactory(player2, "O");

    if (player1 == "Human" && player2 == "Human") {
        return humanGame(playerX, playerO);
    } else if (player1 == "Human") {
        return gameWithHuman(playerX, playerO);
    } else if (player2 == "Human"){
        gameWithHuman(playerO, playerX);
    } else {
        return aiGame(playerX, playerO);
    }
}

const aiGame = (playerX, playerO) => {

    const boardState = ["", "", "", "", "", "", "", "", ""];

    while (true) {
        let pick1 = playerX.getChoice(boardState);
        boardState[pick1] = playerX.mark;
        playerX.inputs.push(pick1);
        drawMark(playerX, pick1);
        if (isGameOver(playerX)) break;

        let pick2 = playerO.getChoice(boardState);
        boardState[pick2] = playerO.mark;
        playerO.inputs.push(pick2);
        drawMark(playerO, pick2);
        if (isGameOver(playerO)) break;

    }
}

const humanGame = (playerX, playerO) => {

    const boardState = ["", "", "", "", "", "", "", "", ""];

    cells.forEach((cell) => {
        cell.addEventListener('click', () => {
            let cellNumber, playing;

            if (playerX.inputs.length > playerO.inputs.length) playing = playerO;
            else playing = playerX;

            cellNumber = cell.getAttribute('data-cell-number');

            if (boardState[cellNumber] == "") {
                boardState[cellNumber] = playing.mark;
                drawMark(playing, cellNumber);
                playing.inputs.push(parseInt(cellNumber));
                if (isGameOver(playing)) {
                    endGame(boardState);
                }
            }
        });
    });
}

const gameWithHuman = (humanPlayer, aiPlayer) => {

    const boardState = ["", "", "", "", "", "", "", "", ""];
    
    if (humanPlayer.mark != "X") {
        let cellNumber = aiPlayer.getChoice(boardState);
        boardState[cellNumber] = aiPlayer.mark;
        drawMark(aiPlayer, cellNumber);
        aiPlayer.inputs.push(cellNumber);
    }
    
    cells.forEach((cell) => {
        cell.addEventListener('click', () => {

            let cellNumber = cell.getAttribute('data-cell-number');

            if (boardState[cellNumber] == "") {
                boardState[cellNumber] = humanPlayer.mark;
                drawMark(humanPlayer, cellNumber);
                humanPlayer.inputs.push(parseInt(cellNumber));
                if (isGameOver(humanPlayer)){
                    endGame(boardState);
                }

                cellNumber = aiPlayer.getChoice(boardState);
                boardState[cellNumber] = aiPlayer.mark;
                drawMark(aiPlayer, cellNumber);
                aiPlayer.inputs.push(cellNumber);
                if (isGameOver(aiPlayer)){
                    endGame(boardState);
                }
            }
        });
    });
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
const winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
[0, 3, 6], [1, 4, 7], [2, 5, 8],
[0, 4, 8], [2, 4, 6]];

function endGame(boardState) {

    for (let i = 0; i < boardState.length; i++) {
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

function clearDisplay() {
    const message = document.querySelector('.message');
    message.innerText = "";

    cells.forEach((cell) => {
        cell.innerText = "";
    });

}