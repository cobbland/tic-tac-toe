const myP = document.querySelector('p');
myP.innerText = 'Testing, 1, 2, 3...';


// You’re going to store the gameboard as an array inside of a Gameboard object, so start there!
const GameBoard = (function() {
    
    let gameBoard = {
        'a1':0, 'a2':0, 'a3':0,
        'b1':0, 'b2':0, 'b3':0,
        'c1':0, 'c2':0, 'c3':0
    }; // But how would I generate this programmatically? And it's supposed to be an array...

    function markPlace(player, place, board = gameBoard) {
        if (!board[place] == 0 || board[place] == undefined) {
            console.log(`Can't play there.`);
            return false;
        } else {
            board[place] = player.mark;
            console.log(`${player.name} placed ${player.mark} at ${place}.`);
            return true;
        }
    }

    function seeBoard() {
        console.log(gameBoard);
    }

    function resetBoard() {
        gameBoard = {
            'a1':0, 'a2':0, 'a3':0,
            'b1':0, 'b2':0, 'b3':0,
            'c1':0, 'c2':0, 'c3':0
        };
    }

    function checkWinner() {
        let placesLeft = 9;
        for (let place in gameBoard) {
            if (gameBoard[place] !== 0) {
                placesLeft--;
            }
        }

        if (placesLeft === 0) {
            return "Tie!";
        } else if (
            (gameBoard.a1 == gameBoard.a2 && gameBoard.a2 == gameBoard.a3 && gameBoard.a1 + gameBoard.a2 + gameBoard.a3 !== 0) ||
            (gameBoard.b1 == gameBoard.b2 && gameBoard.b2 == gameBoard.b3 && gameBoard.b1 + gameBoard.b2 + gameBoard.b3 !== 0) ||
            (gameBoard.c1 == gameBoard.c2 && gameBoard.c2 == gameBoard.c3 && gameBoard.c1 + gameBoard.c2 + gameBoard.c3 !== 0) ||
            (gameBoard.a1 == gameBoard.b1 && gameBoard.b1 == gameBoard.c1 && gameBoard.a1 + gameBoard.b1 + gameBoard.c1 !== 0) ||
            (gameBoard.a2 == gameBoard.b2 && gameBoard.b2 == gameBoard.c2 && gameBoard.a2 + gameBoard.b2 + gameBoard.c2 !== 0) ||
            (gameBoard.a3 == gameBoard.b3 && gameBoard.b3 == gameBoard.c3 && gameBoard.a3 + gameBoard.b3 + gameBoard.c3 !== 0) ||
            (gameBoard.a1 == gameBoard.b2 && gameBoard.b2 == gameBoard.c3 && gameBoard.a1 + gameBoard.b2 + gameBoard.c3 !== 0) ||
            (gameBoard.a3 == gameBoard.b2 && gameBoard.b2 == gameBoard.c1 && gameBoard.a3 + gameBoard.b2 + gameBoard.c1 !== 0)
        ) {
            return true;
        } else {
            return false;
        }
    }

    return {markPlace, seeBoard, checkWinner, resetBoard};

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
    let winner = gameBoard.checkWinner();

    function playGame() {
        let winningPlayer;
        while (winner == false) {
            while (!gameBoard.markPlace(
                players[0],
                prompt(`${players[0].name}, where would you like to place your ${players[0].mark}?`)
            ));
            gameBoard.seeBoard();
            winner = gameBoard.checkWinner();
            if (winner != false) {
                winningPlayer = players[0].name;
                break;
            }
            while (!gameBoard.markPlace(
                players[1],
                prompt(`${players[1].name}, where would you like to place your ${players[1].mark}?`)
            ));
            gameBoard.seeBoard();
            winner = gameBoard.checkWinner();
            if (winner != false) {
                winningPlayer = players[1].name;
                break;
            }
        }
        if (winner === true) {
            console.log(`We have a winner! ${winningPlayer} wins!`);
        } else if (winner === "Tie!") {
            console.log(winner);
        }
        gameBoard.resetBoard();
        winner = gameBoard.checkWinner();
    }

    return {playGame};

    // displayController (later)

})();

// Make sure you include logic that checks for when the game is over!
// You should be checking for all winning 3-in-a-rows and ties.

const gameTime = PlayGame;