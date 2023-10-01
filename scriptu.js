// JavaScript variables
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Function to handle cell clicks
function makeMove(cellIndex) {
  if (gameActive && board[cellIndex] === '') {
    board[cellIndex] = currentPlayer;
    document.getElementById('board').children[cellIndex].textContent = currentPlayer;
    document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;

    if (checkWin()) {
      document.getElementById('status').textContent = `Player ${currentPlayer} wins!`;
      gameActive = false;
    } else if (board.every((cell) => cell !== '')) {
      document.getElementById('status').textContent = "It's a draw!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

// Function to check for a win
function checkWin() {
  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combo of winCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

// Function to reset the board
function resetBoard() {
  currentPlayer = 'X';
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;

  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => (cell.textContent = ''));
  document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;
}

// Add event listeners to cells
const cells = document.querySelectorAll('.cell');
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => makeMove(index));
});

// Add event listener to the reset button
document.getElementById('reset').addEventListener('click', resetBoard);
