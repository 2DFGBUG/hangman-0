document.addEventListener("DOMContentLoaded", () => {
const wordDisplay = document.querySelector(".word-display");
const hintText = document.querySelector(".hint-text b");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");

let selectWord = "";
let correctLetters = [];
let wrongGuessCount = 0;

function createKeyboard() {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    keyboardDiv.innerHTML = "";
    letters.split(``).forEach(letter => {
        const button = document.createElement("button");
        button.innerText = letter;
        button.addEventListener("click", () => handleButtonClick(button));
        keyboardDiv.appendChild(button);
    });
}

function getRandomWord() {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    selectedWord = word;
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = "images/hangman-0.svg";
    hintText.innerText = hint;
    guessesText.innerText = `0 / 6`;
    wordDisplay.innerHTML ="";
    for (let i = 0; i < word.length; i++) {
        const li = document.createElement("li");       
        li.classList.add("letter");
        wordDisplay.appendChild(li);
    }
    createKeyboard();
}

function handleButtonClick(button) {
    const letter = button.innerText;
    if (selectedWord.includes(letter)) {
        [...selectedWord].forEach((char, i) => {
            if (char === letter) {
                wordDisplay.querySelectorAll("li")[i].innerText = char;
                correctLetters.push(char);
            }
        });
    } else {
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / 6`;

    if (wrongGuessCount === 6) {
        alert(`Game Over! The word was: ${selectedWord}`);
        getRandomWord();
    }  else {
        const allRevealed = [...wordDisplay.querySelectorAll("li")].every(li => li.innerText !== "");
        if (allRevealed) {
            alert('Congratulations! You won!');
            getRandomWord();
            }
    }
    }
 
    getRandomWord();
});
