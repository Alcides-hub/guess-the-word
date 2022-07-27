// The unordered list where the player’s guessed letters will appear.
const unorderedList = document.querySelector(".guessedletters");
// The button with the text “Guess!” in it.
const guessButton = document.querySelector(".guess");
// The text input where the player will guess a letter
const textInput = document.querySelector(".letter");
// The empty paragraph where the word in progress will appear.
const emptyParagraph = document.querySelector(".word-in-progress");
// The paragraph where the remaining guesses will display.
const remainingGuesses = document.querySelector(".remaining");
// The span inside the paragraph where the remaining guesses will display.
const GuessDisplay = document.querySelector(".remaining span");
// The empty paragraph where messages will appear when the player guesses a letter.
const messageParagraph = document.querySelector(".message");
// The hidden button that will appear prompting the player to play again.
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";

const placeholder = function() {
    const placeholderLetters = []; // create placeholder for each text
    for (const letter of word) {  // loop through the word array
        console.log(letter); // print the letter on the screen
        placeholderLetters.push("●"); // push method to include symbol for each letter of the word
    }
emptyParagraph.innerText = placeholderLetters.join(""); // join method to return array as a string
}

guessButton.addEventListener("click", function (e) {
    e.preventDefault(); // to prevent the default behavior of clicking a button
    const inputLetter = textInput.value; // create a function to capture the value of guess the work by user
    console.log(inputLetter); // log out the value of capture function
    textInput.value = ""; // empty the value of the input when the player guess a letter
});



