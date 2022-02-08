
// DOM objects
const opponentInput = document.querySelector('#opponent');
const turnInput = document.querySelector('#turn');
const cells = document.querySelectorAll('.cell');
const restart = document.querySelector('.restart');
const message = document.querySelector('.message');

// Adding event listeners

opponentInput.addEventListener('change', restartGame);
turnInput.addEventListener('change', restartGame);
restart.addEventListener('click', restartGame);

// Initializing default variables values
const isEmpty = [true, true, true, true, true, true, true, true, true];
let opponent, turn, opponentTurn;
let player1, player2;

const winningCombinations = [[0,1,2],[3,4,5],[6,7,8],
                             [0,3,6],[1,4,7],[2,5,8],
                             [0,4,8],[2,4,6]];

const playerFactory = (turn) => {
    const inputs = [];
    let mark = turn;

    return {inputs, mark};
}

const getRandom = (emptySlots) => {
    let random = parseInt(Math.random() * emptySlots.length);

    return emptySlots[random];
}

const gameWithHuman = () => {
    cells.forEach((cell) => {
        cell.addEventListener('click', () => {
            let cellNumber, player;
    
            if (player1.inputs.length > player2.inputs.length) player = player2;
            else player = player1;

            cellNumber = cell.getAttribute('data-cell-number');

            if (isEmpty[cellNumber]) {
                isEmpty[cellNumber] = false;
                drawMark(player, cell);
                player.inputs.push(parseInt(cellNumber));
                checkWinner(player);  
            }
        });
    });
}

const gameWithRandom = (player) => {
    cells.forEach((cell) => {
        cell.addEventListener('click', () => {
            let cellNumber, player;

            player = player1;

            cellNumber = cell.getAttribute('data-cell-number');

            if (isEmpty[cellNumber]) {
                isEmpty[cellNumber] = false;
                drawMark(player, cell);
                player.inputs.push(parseInt(cellNumber));
                checkWinner(player);  
            }

            let emptySlots = [];

            for (let i = 0; i < isEmpty.length; i++){
                if (isEmpty[i]) emptySlots.push(i);
            }

            console.log(emptySlots);

            cellNumber = getRandom(emptySlots);
            let randomCell = document.querySelector(`[data-cell-number="${cellNumber}"]`);
            isEmpty[cellNumber] = false;
            drawMark(player2, randomCell);
            player2.inputs.push(cellNumber);
            checkWinner(player2); 
            
        });
    });
}

setInitialValue();
startGame(opponent);

function checkWinner(player) {

    let counter = 0;
    for (let i = 0; i < winningCombinations.length; i++){
        for (let j = 0; j < winningCombinations[i].length; j++){
            if(player.inputs.includes(winningCombinations[i][j])) {
                counter++;
            }
        }
        if (counter == 3){
            endGame(player);
            return;
        }
        counter = 0;
    }

    if (player1.inputs.length + player2.inputs.length >= 9){
        endGame("Draw");
    }
    
}

function startGame(opponent) {

    let game;

    if (opponent == "human") {
        game = gameWithHuman();
    }
    else if (opponent == "randomAI") {
        game = gameWithRandom(player1);
    } else {
        game = gameWithSmart(player1);
    }
    
}

function drawMark(player, cell) {

    return cell.innerText = player.mark;
}

function restartGame() {

    clearDisplay();
    setInitialValue();
    startGame(opponent);

}

function clearDisplay() {

    cells.forEach((cell) => {
        cell.innerText = "";
    });
    message.innerText = "";

}

function setInitialValue() {

    for (let i = 0; i < isEmpty.length; i++){
        isEmpty[i] = true;
    }
    player1 = playerFactory("X");
    player2 = playerFactory("O");
    opponent = opponentInput.value;
    turn = turnInput.value;

}

function endGame(player) {

    for (let i = 0; i < isEmpty.length; i++){
        isEmpty[i] = false;
    }

    if (player == "Draw") postMessage("Draw");
    else postMessage(player);
}

function postMessage(player) {

    if (player == "Draw") { 
        message.innerText = "It's a draw!"
    }
    else {
        message.innerText = `Player ${player.mark} won!`;
    }
}
