import { winningCombinations } from "./script.js"

export const minimax = (board, depth, isMaximizing) => {

}

const findBestMove = (moveArray) => {

}

const heuristicEval = (board) => {

    let counterX = 0;
    let counterO = 0;
    for (let i = 0; i < winningCombinations.length; i++) {
        for (let j = 0; j < winningCombinations[i].length; j++) {
            if (board[winningCombinations[i][j]] == "X") counterX++;
            else if (board[winningCombinations[i][j]] == "O") counterO++;
            else continue;
        }
        if (counterX == 3) return 10;
        else if (counterO == 3) return -10;
        counterX = 0;
        counterO = 0;
    }
    return 0;
}