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
const isFilled = [];
const winningCombinations = [[0,1,2],[3,4,5],[6,7,8],
                             [0,3,6],[1,4,7],[2,5,8],
                             [0,4,8],[2,4,6]];

const playerFactory = (playerState) => {
    const inputs = [];
    let mark = turn;
    const playerState = playerState;
    let getChoice;

    if (playerState == "human") {

    } else if (playerState == "randomAI") {
        
    } else {

    }

    return {inputs, mark, playerState};
}

const getRandom = (emptySlots) => {
    let random = parseInt(Math.random() * emptySlots.length);

    return emptySlots[random];
}

const isGameOver = (player) => {

    let counter = 0;
    for (let i = 0; i < winningCombinations.length; i++){
        for (let j = 0; j < winningCombinations[i].length; j++){
            if(player.inputs.includes(winningCombinations[i][j])) {
                counter++;
            }
        }
        if (counter == 3){
            return true;
        }
        counter = 0;
    }

    if (player.inputs.length >= 4){
        return true;
    }

    return false;
}





function setInitialValue() {

    for (let i = 0; i < 9; i++){
        isFilled.push(false);
    }
}

function drawMark(player, cell) {

    const draw = document.createElement('img');
    
    if (player.mark == "X") draw.src = "Resources/X.png";
    else draw.src = "Resources/O.png";

    return draw;
}

function endGame(player) {

    for (let i = 0; i < isEmpty.length; i++){
        isEmpty[i] = false;
    }
}