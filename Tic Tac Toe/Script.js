let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let gameHistory = [];
let playerMode;

function handleCellClick(index) {
    if (!gameActive || gameBoard[index] !== '') return;

    gameBoard[index] = currentPlayer;
    document.getElementById(`cell${index}`).innerText = currentPlayer;

    if (checkWinner()) {
        document.getElementById('message').innerText = `${currentPlayer} wins!`;
        gameHistory.push({ winner: currentPlayer, history: [...gameBoard] });
        gameActive = false;
    } else if (checkDraw()) {
        document.getElementById('message').innerText = 'It\'s a draw!';
        gameHistory.push({ winner: 'Draw', history: [...gameBoard] });
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateMessage();
        if (playerMode === 1 && currentPlayer === 'O') {
            setTimeout(() => playAI(), 500);
        }
    }
}

function playAI() {
    // Simple AI logic: Randomly choose an empty cell
    const emptyCells = gameBoard.reduce((acc, cell, index) => (cell === '' ? acc.concat(index) : acc), []);
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    handleCellClick(emptyCells[randomIndex]);
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
        [0, 4, 8], [2, 4, 6]               // Diagonals
    ];

    return winPatterns.some(pattern => (
        gameBoard[pattern[0]] !== '' &&
        gameBoard[pattern[0]] === gameBoard[pattern[1]] &&
        gameBoard[pattern[1]] === gameBoard[pattern[2]]
    ));
}

function checkDraw() {
    return gameBoard.every(cell => cell !== '');
}

function updateMessage() {
    document.getElementById('message').innerText = `Current Player: ${currentPlayer}`;
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    updateMessage();

    // Clear the board
    const cells = document.getElementsByClassName('cell');
    Array.from(cells).forEach(cell => (cell.innerText = ''));

    // Enable the board
    for (let i = 0; i < cells.length; i++) {
        cells[i].disabled = false;
    }

    playerMode = parseInt(document.getElementById('playerMode').value);
    if (playerMode === 1 && currentPlayer === 'O') {
        setTimeout(() => playAI(), 500);
    }
}

function resetHistory() {
    gameHistory = [];
}

document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('button');
        cell.className = 'cell';
        cell.id = `cell${i}`;
        cell.addEventListener('click', () => handleCellClick(i));
        board.appendChild(cell);
    }

    resetGame();
});

function showHistory() {
    const historyContainer = document.getElementById('history');
    historyContainer.innerHTML = '';

    gameHistory.forEach((game, index) => {
        const gameDiv = document.createElement('div');
        gameDiv.className = 'game-entry';

        const gameInfo = document.createElement('p');
        if (game.winner === 'Draw') {
            gameInfo.innerText = `Game ${index + 1}: Draw`;
        } else {
            gameInfo.innerText = `Game ${index + 1}: ${game.winner} wins`;
        }

        const replayBtn = document.createElement('button');
        replayBtn.innerText = 'Replay';
        replayBtn.addEventListener('click', () => replayGame(game.history));

        gameDiv.appendChild(gameInfo);
        gameDiv.appendChild(replayBtn);
        historyContainer.appendChild(gameDiv);
    });
}

function replayGame(history) {
    resetGame();
    history.forEach((value, index) => {
        if (value !== '') {
            setTimeout(() => {
                document.getElementById(`cell${index}`).innerText = value;
                gameBoard[index] = value;
            }, index * 500);
        }
    });
    setTimeout(() => {
        if (playerMode === 1 && currentPlayer === 'O') {
            playAI();
        }
    }, history.filter(cell => cell !== '').length * 500);
}
