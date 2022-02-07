
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
let opponent = opponentInput.value;
let turn = turnInput.value;
let opponentTurn;

const winningCombinations = [[1,2,3],[4,5,6],[7,8,9],
                             [1,4,7],[2,5,8],[3,6,9],
                             [1,5,9],[3,5,7]];

const playerFactory = (turn) => {
    const inputs = [];
    let mark = turn;

    return {inputs, mark};
}

const getRandom = () => {
    let random = parseInt(Math.random() * 8) + 1;

    return random;
}

let player1 = playerFactory("X");
let player2 = playerFactory("O");

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
            return true;
        }
        counter = 0;
    }

    if (player1.inputs.length + player2.inputs.length >= 9){
        endGame("Draw");
        return true;
    }
    
    return false;
}

function startGame(opponent) {
    
        cells.forEach((cell) => {
            cell.addEventListener('click', () => {
                let cellNumber, player;
        
                if (player1.inputs.length > player2.inputs.length) player = player2;
                else player = player1;

                if (opponent == "human") {
                    cellNumber = cell.getAttribute('data-cell-number');
                } else {
                    if (player === player1) {
                        cellNumber = cell.getAttribute('data-cell-number');
                    } else {
                        cellNumber = getRandom();
                        while (!isEmpty[cellNumber]){
                            cellNumber = getRandom();
                        }
                    }
                }

                if (isEmpty[cellNumber - 1]) {
                    isEmpty[cellNumber - 1] = false;
                    drawMark(player, cell);
                    player.inputs.push(parseInt(cellNumber));
                    checkWinner(player);  
                }
            });
        });
    
}

function drawMark(player, cell) {

    return cell.innerText = player.mark;
}

function restartGame() {
   location.reload();
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
        const resultHolder = document.createElement('div');
        resultHolder.innerText = "It's a draw!";
        message.appendChild(resultHolder);
    }
    else {
        const resultHolder = document.createElement('div');
        resultHolder.innerText = `Player ${player.mark} won!`;
        message.appendChild(resultHolder);
    }
}
