let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box'))

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)
let gameOver = false;  // Add gameOver flag to track game state

const startGame = () => {
    playerText.innerHTML = `Player ${currentPlayer}'s Turn`  // Initial turn text
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

function boxClicked(e) {
    const id = e.target.id

    if (!spaces[id] && !gameOver) {  // Prevent clicking if space is filled or game is over
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        if (playerHasWon() !== false) {
            playerText.innerHTML = `${currentPlayer} has won!`
            let winning_blocks = playerHasWon()

            winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator)
            gameOver = true;  // Set gameOver to true to stop further clicks
            return
        }

        // Switch player
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
        playerText.innerHTML = `Player ${currentPlayer}'s Turn`  // Update turn text
    }
}

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition

        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a, b, c]
        }
    }
    return false
}

restartBtn.addEventListener('click', restart)

function restart() {
    spaces.fill(null)

    boxes.forEach(box => {
        box.innerText = ''
        box.style.backgroundColor = ''
    })

    playerText.innerHTML = 'Tic Tac Toe'  // Reset the game title
    currentPlayer = X_TEXT
    playerText.innerHTML = `Player ${currentPlayer}'s Turn`  // Set the turn text again
    gameOver = false;  // Reset gameOver to allow playing again
}

startGame()
