// The unordered list where the player’s guessed letters will appear.
const guessedLettersElement = document.querySelector(".guessed-letters");
// The button with the text “Guess!” in it.
const guessButton = document.querySelector(".guess");
// The text input where the player will guess a letter
const letterInput = document.querySelector(".letter");
// The empty paragraph where the word in progress will appear.
const emptyParagraph = document.querySelector(".word-in-progress");
// The paragraph where the remaining guesses will display.
const remainingGuesses = document.querySelector(".remaining");
// The span inside the paragraph where the remaining guesses will display.
const GuessDisplay = document.querySelector(".remaining span");
// The empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector(".message");
// The hidden button that will appear prompting the player to play again.
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = []; // guessedLetters is an empty array for storing all the letters the player guesses.

const placeholder = function(word) {
    const placeholderLetters = []; // create placeholder for each text
    for (const letter of word) {  // loop through the word array
        console.log(letter); // print the letter on the screen
        placeholderLetters.push("●"); // push method to include symbol for each letter of the word
    }
emptyParagraph.innerText = placeholderLetters.join(""); // join method to return array as a string
};

placeholder(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault(); // to prevent the default behavior of clicking a button
    message.innerText = ""; //empty the text of the message element. 
    const guess = letterInput.value; // create a function to capture the value of guess the word by user
    // console.log(inputLetter); // log out the value of capture function
    // textInput.value = ""; // empty the value of the input when the player guess a letter
    const goodGuess = validateInput(guess); //use validateinput function to save input value as an argument.
    // console.log(inputLetter);
    if (goodGuess) {
        makeGuess(guess);
    }
    letterInput.value = ""; // empty the value of the input when the player guess a letter
});

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) { // if input is empty?
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
            message.innerText = "Please enter a single letter only.";
    } else if (!input.match(acceptedLetter)) { // if input is an accepted letter using match method.
        message.innerText = "Please enter a valir character from A to Z.";
    } else {
        return input;
    }
};

const makeGuess = function(guess) { // function that makes sure that the input letter is not entered again.
    guess = guess.toUpperCase(); // letter converted to uppercase if you entered in lowercase it converts it for the console
    if (guessedLetters.includes(guess)) { //checks if the array of guesses already has a letter which user entered.
        message.innerText = "You have already guessed that letter so try again."
    } else {
        guessedLetters.push(guess); //if the letter is not entered already use push method to include it in the guessed array.
        console.log(guessedLetters);
        showGuessedLetters();
        updateTheWordInProgress(guessedLetters);
    }
};

const showGuessedLetters = function () {
    
    guessedLettersElement.innerHTML = "";

    for (const letter of guessedLetters) { //loop through the guesseletter array but why? Ask skillcrush? 
        const li = document.createElement("li"); // create a new list item for each letter inside array for webpage.
        li.innerText = letter; // add the letter to list item of the unordered list.  
        guessedLettersElement.append(li); // append the list item to unordered list.
    }
};

const updateTheWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    console.log(wordArray);
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    } 
    emptyParagraph.innerText = revealWord.join("");
    checkPlayerWin();
};


const checkPlayerWin = function () {
    if (word.toUpperCase() === emptyParagraph.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
};