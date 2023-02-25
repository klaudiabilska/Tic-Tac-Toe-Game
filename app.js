let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box'))

let winnerIndicatior = getComputedStyle(document.body).getPropertyValue('--winning-blocks') //pozwala uzyc tego koloru w js
let drawInticatior = getComputedStyle(document.body).getPropertyValue('--gradient-one') //pozwala uzyc tego koloru w js


const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT


// which one was clicked?
let spaces = Array(9).fill(null);
let count_plays = 0

//start game
const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

//when game start, loop over all of boxes and add eventlistener to each one of this elements - na klikniecie tworzy tam funckje "box clicked"

function boxClicked(e) {
    const id = e.target.id 
    //now when i click for every empty spaces, pokazuje w konsoli id konkretnego boxa
    
    if(!spaces[id] && count_plays < 9){
        //check czy spacess array, ktora jest teraz fill przez null, nie zaiwera id(nie jest fill przez id, wtedy kontynuujemy)
    spaces[id] = currentPlayer 
    //wypelniam spaces X albo O
    e.target.innerText =  currentPlayer 
    //feedback to user

    if(playerHasWon() !==false ){
        playerText.innerHTML = `${currentPlayer} has won!`
        let winning_blocks = playerHasWon()
        count_plays = 10
        winning_blocks.map(box => boxes[box].style.backgroundColor=winnerIndicatior)
        return
    }
    count_plays++
    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT 
    // ot jest if statement. if currentplayer jest rowne X, zmien ja na O, OR ELSE zmien na X i zapisz to w currentplayer

    }

    if(count_plays === 9) {
        playerText.innerHTML = 'Draw Game!'
        boxes.forEach(box => box.style.color = drawInticatior)
    }
}

//combination of winning
const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


//playerhaswon
function playerHasWon() {
//sprawdza, czy player posiada winning cominations
    for (const condition of winningCombos) {
        let [a, b, c] = condition
        
        // czy sa trzy w rzedzie
        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])){
            return [a, b, c] // zwraca zwycieska kombinacje
        } 
    }
    return false //  nie ma wygranej
}


//restart the game
restartBtn.addEventListener('click', restart)

function restart() {
    //clear out everything and spaces array
    spaces.fill(null)
    count_plays = 0
    boxes.forEach( box => {
        //reset O/X text and set it back to blank
        box.innerHTML = '';
        //reset color
        box.style.backgroundColor=''
        box.style.color ='#60a0b0'
    })

    playerText.innerHTML = 'Tic Tac Toe'

    //retsart default player
    currentPlayer = X_TEXT

}

startGame()

