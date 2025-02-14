const myP = document.querySelector('p');
myP.innerText = 'Testing, 1, 2, 3...';

// You’re going to store the gameboard as an array inside of a Gameboard object, so start there!
const GameBoard = (function() {
    let gameBoard = []
    let gameRows = 0;
    let gameColumns = 0;

    function makeBoard(rows = 3, columns = 3) {
        gameBoard = [];
        gameRows = rows;
        gameColumns = columns;

        for (let i = 0; i < rows; i++) {
            gameBoard[i] = [];
            for (let j = 0; j < columns; j++) {
                gameBoard[i][j] = 0;
            }
        }
    }

    function markPlace(player, row, column, board = gameBoard) {
        if (board[row] === undefined || board[row][column] === undefined || board[row][column] !== 0) {
            console.log(`Can't play there.`);
            return false;
        } else {
            board[row][column] = player.mark;
            console.log(`${player.name} placed ${player.mark} at row ${row}, column ${column}.`);
            return true;
        }
    }

    function seeBoard() {
        console.log(gameBoard);
    }

    function checkWinner() {
        let placesLeft = gameRows * gameColumns;
        for (let row in gameBoard) {
            for (let column in gameBoard) {
                if (gameBoard[row][column] !== 0) {
                    placesLeft--;
                }
            }
        }
        if (placesLeft === 0) {
            return "Tie!";
        } else if (
            (gameBoard[0][0] + gameBoard[0][1] + gameBoard[0][2] !== 0 &&
            gameBoard[0][0] === gameBoard[0][1] && gameBoard[0][1] === gameBoard[0][2]) ||
            (gameBoard[1][0] + gameBoard[1][1] + gameBoard[1][2] !== 0 &&
            gameBoard[1][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[1][2]) ||
            (gameBoard[2][0] + gameBoard[2][1] + gameBoard[2][2] !== 0 &&
            gameBoard[2][0] === gameBoard[2][1] && gameBoard[2][1] === gameBoard[2][2]) ||
            (gameBoard[0][0] + gameBoard[1][0] + gameBoard[2][0] !== 0 &&
            gameBoard[0][0] === gameBoard[1][0] && gameBoard[1][0] === gameBoard[2][0]) ||
            (gameBoard[1][0] + gameBoard[1][1] + gameBoard[1][2] !== 0 &&
            gameBoard[1][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[1][2]) ||
            (gameBoard[2][0] + gameBoard[2][1] + gameBoard[2][2] !== 0 &&
            gameBoard[2][0] === gameBoard[2][1] && gameBoard[2][1] === gameBoard[2][2]) ||
            (gameBoard[0][0] + gameBoard[1][1] + gameBoard[2][2] !== 0 &&
            gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2]) ||
            (gameBoard[2][0] + gameBoard[1][1] + gameBoard[0][2] !== 0 &&
            gameBoard[2][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[0][2])
        ) {
            return true;
        } else {
            return false;
        }
    }

    return {markPlace, seeBoard, checkWinner, makeBoard};

})();

// Your players are also going to be stored in objects,
const Players = (function(first = 'player1', second = 'player2') {
    const player1 = {name: first, mark: 'X'};
    const player2 = {name: second, mark: 'O'};
    return [player1, player2];
})();

// and you’re probably going to want an object to control the flow of the game itself.
const PlayGame = (function() {

    const players = Players;
    const gameBoard = GameBoard;
    gameBoard.makeBoard()
    let winner = gameBoard.checkWinner()

    function playGame() {
        let winningPlayer;
        while (winner === false) {
            for (let player in players) {
                while (!gameBoard.markPlace(
                    players[player],
                    +prompt(`${players[player].name}, in what row would you like to place your ${players[player].mark}?`), 
                    +prompt(`${players[player].name}, in what column would you like to place your ${players[player].mark}?`)
                ));
                gameBoard.seeBoard();
                winner = gameBoard.checkWinner();
                if (winner === true) {
                    winningPlayer = players[player].name;
                    break;
                } else if (winner !== false) {
                    break;
                }
            }
        }
        if (winner === true) {
            console.log(`We have a winner! ${winningPlayer} wins!`);
        } else if (winner === "Tie!") {
            console.log(winner);
        }
        console.log(winner);
        gameBoard.makeBoard();
        winner = gameBoard.checkWinner();
    }

    return {playGame, winner};

    // displayController (later)

})();

// Make sure you include logic that checks for when the game is over!
// You should be checking for all winning 3-in-a-rows and ties.

const gameTime = PlayGame;