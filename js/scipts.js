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
            return false;
        } else {
            board[row][column] = player.mark;
            return true;
        }
    }

    function seeBoard() {
        return gameBoard;
    }

    function checkWinner() {
        let placesLeft = gameRows * gameColumns;
        for (let row in gameBoard) {
            for (let column in gameBoard[row]) {
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

const Players = (function() {
    let player1;
    let player2;

    function makePlayers(first = 'Player One', second = 'Player Two') {
        player1 = {name: first, mark: 'X'};
        player2 = {name: second, mark: 'O'};
    }

    return {player1, player2, makePlayers};
})();

const PlayGame = (function() {
    const players = Players;
    const gameBoard = GameBoard;

    let currentPlayer = players[0];
    let winningPlayer = gameOver();

    gameBoard.makeBoard();

    function playTurn(player = currentPlayer, row, column) {
        currentPlayer = player;
        gameBoard.markPlace(player, row, column);
        if (gameOver()) {
            winningPlayer = currentPlayer;
        } else if (gameOver() === 'Tie!') {
            winningPlayer = 'Tie!'
        } else if (currentPlayer = players[0]) {
            currentPlayer = players[1];
        } else {
            currentPlayer = players[0];
        }
    }

    function checkCurrentPlayer() {
        return currentPlayer;
    }

    function checkWinningPlayer() {
        return winningPlayer;
    }

    function gameOver() {
        if (gameBoard.checkWinner()) {
            return true;
        } else if (!gameBoard.checkWinner()) {
            return false;
        } else {
            return 'Tie!'
        }
    }

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

    return {playGame, playTurn, checkCurrentPlayer, checkWinningPlayer};

    // displayController (later)

})();

const displayGame = (function() {
    const board = document.querySelector('.board');
    const display = document.querySelector('.display');
    const buttons = document.querySelector('.buttons');
    
    const gameBoard = GameBoard.seeBoard();
    const boardFunctions = GameBoard;
    
    display.textContent = "Player 1's turn..."

    function drawBoard() {
        while (board.firstChild) {
            board.removeChild(board.lastChild);
        }
        for (let row in gameBoard) {
            for (let cell in gameBoard[row]) {
                let thisCell = document.createElement('div');
                thisCell.classList.add('cell');
                thisCell.setAttribute('row', row);
                thisCell.setAttribute('column', cell);
                thisCell.textContent = gameBoard[row][cell];
                board.appendChild(thisCell);
            }
        }
    }

    drawBoard();

    board.addEventListener('click', (button) => {
        let row = button.target.getAttribute('row');
        let column = button.target.getAttribute('column');
        gameBoard[row][column] = 'X';
        drawBoard();
    });

    buttons.addEventListener('click', () => {
        boardFunctions.makeBoard();
        drawBoard();
    })

})

const gameTime = displayGame;
gameTime();