
// DOM objects
// const opponentInput = document.querySelector('#opponent');
const turnInput = document.querySelector('#turn');
const cells = document.querySelectorAll('.cell');

// Initializing default variables values
const isEmpty = [true, true, true, true, true, true, true, true, true];
// let opponent = opponentInput.value;
let turn = turnInput.value;
let opponentTurn;


const winningCombinations = [[1,2,3],[4,5,6],[7,8,9],
                             [1,4,7],[2,5,8],[3,6,9],
                             [1,5,9],[3,5,7]];

// the default value of select is "" if not changed so we set it explicitly
setNoInput();

setOpponentMark();


// Adding event listeners
cells.forEach((cell) => {
    cell.addEventListener('click', () => {
        // draw mark
        let cellNumber = cell.getAttribute('data-cell-number');
        console.log(cellNumber);

        let player;

        if (player1.inputs.length > player2.inputs.length) player = player2;
        else player = player1;

        if (isEmpty[cellNumber - 1]) {
            isEmpty[cellNumber - 1] = false;
            drawMark(player, cell);
            player.inputs.push(parseInt(cellNumber));
            checkWinner(player);
            // console.log(player.inputs[player.inputs.length - 1]);
        }
    });
});

const playerFactory = (turn) => {
    const inputs = [];
    let mark = turn;

    return {inputs, mark};
}

let player1 = playerFactory(turn);
let player2 = playerFactory(opponentTurn);

function drawMark(player, cell) {

    return cell.innerText = player.mark;
}

function setNoInput() {
    if (turn == "") turn = "X";
    // if (opponent == "") opponent = "human";
}

function setOpponentMark() {
    if (turn == "X") opponentTurn = "O";
    else opponentTurn = "X";
}

function checkWinner(player) {
    if (player1.inputs.length + player2.inputs.length >= 9){
        console.log("Draw");
        restartGame();
    } 

    let counter = 0;
    for (let i = 0; i < winningCombinations.length; i++){
        
    }

}

function restartGame() {
    
    for (let i = 0; i < isEmpty.length; i++){
        isEmpty[i] = true;
    }
    player1 = playerFactory(turn);
    player2 = playerFactory(opponentTurn);
}
