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

    makeBoard();

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
            (gameBoard[0][1] + gameBoard[1][1] + gameBoard[2][1] !== 0 &&
            gameBoard[0][1] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][1]) ||
            (gameBoard[0][2] + gameBoard[1][2] + gameBoard[2][2] !== 0 &&
            gameBoard[0][2] === gameBoard[1][2] && gameBoard[1][2] === gameBoard[2][2]) ||
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

    function getPlayers() {
        return [player1, player2];
    }

    // makePlayers();

    return {makePlayers, getPlayers};
})();

const PlayGame = (function() {
    const gameBoard = GameBoard;

    let players = Players.getPlayers();
    let currentPlayer = players[0];
    let winningPlayer = gameOver();

    function getNewPlayers() {
        players = Players.getPlayers();
    }

    function newGame() {
        gameBoard.makeBoard();
        currentPlayer = players[0];
        winningPlayer = gameOver();
    }

    function playTurn(player = currentPlayer, row, column) {
        currentPlayer = player;
        if (gameBoard.markPlace(player, row, column)) {
            return true;
        } else {
            return false;
        }
    }

    function nextPlayer() {
        if (currentPlayer === players[0]) {
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
        if (gameBoard.checkWinner() === 'Tie!') {
            winningPlayer = 'Tie!';
            return 'Tie!';
        } else if (gameBoard.checkWinner()) {
            winningPlayer = currentPlayer;
            return true;
        } else {
            return false;
        } 
    }

    return {playTurn, checkCurrentPlayer, checkWinningPlayer, newGame, nextPlayer, gameOver, getNewPlayers};

})();

const displayGame = (function() {
    const board = document.querySelector('.board');
    const display = document.querySelector('.display');
    const buttons = document.querySelector('.buttons');
    
    const boardFunctions = GameBoard;
    const playFunctions = PlayGame;
    const playerFunctions = Players;

    let gameBoard = boardFunctions.seeBoard();

    let gameOn = false;

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
                if (gameBoard[row][cell] !== 0) {
                    thisCell.textContent = gameBoard[row][cell];
                }
                board.appendChild(thisCell);
            }
        }
    }

    drawBoard();

    board.addEventListener('click', (button) => {
        if (gameOn) {
            let row = button.target.getAttribute('row');
            let column = button.target.getAttribute('column');
            let player = playFunctions.checkCurrentPlayer();
            if (playFunctions.playTurn(player, row, column)) {
                drawBoard();
                if (playFunctions.gameOver() === 'Tie!') {
                    display.textContent = `Tie!`;
                    gameOn = false;
                } else if (playFunctions.gameOver() !== false) {
                    console.log('the game is over...')
                    display.textContent = `${playFunctions.checkWinningPlayer().name} wins!`;
                    gameOn = false;
                } else {
                    playFunctions.nextPlayer();
                    player = playFunctions.checkCurrentPlayer();
                    display.textContent = `${player.name}'s turn...`;
                }
            } else {
                display.textContent = "Can't play there. Try again.";
            }
        }
    });

    buttons.addEventListener('click', (button) => {
        if (button.target.classList.contains('new')) {
            gameOn = true;
            playerFunctions.makePlayers(
                prompt("Player 1's name:"),
                prompt("Player 2's name:")
            );
            playFunctions.getNewPlayers();
            playFunctions.newGame();
            gameBoard = boardFunctions.seeBoard();
            drawBoard();
            display.textContent = `${playFunctions.checkCurrentPlayer().name}'s turn...`;
        } else if (button.target.classList.contains('replay')) {
            gameOn = true;
            playFunctions.newGame();
            gameBoard = boardFunctions.seeBoard();
            drawBoard();
            display.textContent = `${playFunctions.checkCurrentPlayer().name}'s turn...`;
        }
    })

})

const gameTime = displayGame;
gameTime();