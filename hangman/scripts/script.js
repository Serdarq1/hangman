const keyboardDiv = document.querySelector(".keyboard")
const hangmanImg = document.querySelector(".hangman-box img")
const guesses = document.querySelector(".guesses-text b")
const wordDisplay = document.querySelector(".word-display")
const gameModal = document.querySelector(".game-modal")
const playAgainBtn = gameModal.querySelector("button")

let currentWord, correctLetters ,wrongGuesses;
const maxGuesses = 6


const resetGame = () => {
    correctLetters = []
    wrongGuesses = 0
    wordDisplay.innerHTML = currentWord.split("").map(() =>`<li class="letter"><li/>`).join("")
    gameModal.classList.remove("show")
    hangmanImg.setAttribute("src", `images/hangman-${wrongGuesses}.svg`)
    guesses.innerText = `${wrongGuesses} / ${maxGuesses}`
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false)
}


const getRandomWord = () => {
    const {word, hint} = wordList[Math.floor(Math.random() * wordList.length )]
    document.querySelector(".hint-text b").innerText = hint
    currentWord = word
    console.log(word)
    resetGame()
}


const gameOver = (isVictory) =>{
    setTimeout(() => {
        const modalText = isVictory ? `You found the word!` : `The correct word was:`
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`
        gameModal.querySelector("h4").innerText = `${isVictory ? "Congrats!" : "Game Over!"}`
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`
        gameModal.classList.add("show")
    },100);
}

const initGame = (button, clickedLetter) => {
    if(currentWord.includes(clickedLetter)){
        [...currentWord].forEach((letter,index) => {
            if(letter === clickedLetter){
                correctLetters.push(letter)
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed")
            }
        })
    }else{
        wrongGuesses++;
        hangmanImg.setAttribute("src", `images/hangman-${wrongGuesses}.svg`)
    }
    button.disabled = true,
    guesses.innerText = `${wrongGuesses} / ${maxGuesses}`

    if(wrongGuesses === maxGuesses) return gameOver(false)
    if(correctLetters.length === currentWord.length) return gameOver(true)
}

for(let i = 97; i <= 122; i++){
    const button = document.createElement("button")
    button.innerText = String.fromCharCode(i)
    keyboardDiv.appendChild(button )
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)))
}

getRandomWord()
playAgainBtn.addEventListener("click", getRandomWord)