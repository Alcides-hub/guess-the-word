// The unordered list where the player’s guessed letters will appear.
const guessedLettersElement = document.querySelector(".guessed-letters");
// The button with the text “Guess!” in it.
const guessButton = document.querySelector(".guess");
// The text input where the player will guess a letter
const letterInput = document.querySelector(".letter");
// The empty paragraph where the word in progress will appear.
const emptyParagraph = document.querySelector(".word-in-progress");
// The paragraph where the remaining guesses will display.
const remainingGuessesElement = document.querySelector(".remaining");
// The span inside the paragraph where the remaining guesses will display.
const guessDisplay = document.querySelector(".remaining span");
// The empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector(".message");
// The hidden button that will appear prompting the player to play again.
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
const guessedLetters = []; // guessedLetters is an empty array for storing all the letters the player guesses.
let remainingGuesses = 8; // important to state right at the beginning the limits of the game, a global variable. You could change the number of guesses to make it harder or easier.

const getWord = async function () {
    const response = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    // console.log(wordArray);
    // console.log(words);
    const randomIndex = Math.floor(Math.random()* wordArray.length); 
    word = wordArray[randomIndex].trim();
    placeholder(word); //call the function with word as paramenter.   
};

getWord();




const placeholder = function(word) {
    const placeholderLetters = []; // create placeholder for each text
    for (const letter of word) {  // loop through the word array
        console.log(letter); // print the letter on the screen
        placeholderLetters.push("●"); // push method to include symbol for each letter of the word
    }
emptyParagraph.innerText = placeholderLetters.join(""); // join method to return array as a string
};




guessButton.addEventListener("click", function (e) {
    e.preventDefault(); // to prevent the default behavior of clicking a button
    message.innerText = ""; //empty the text of the message element. 
    const guess = letterInput.value; // create a function to capture the value of guess the word by user
    // console.log(inputLetter); // log out the value of capture function
    // textInput.value = ""; // empty the value of the input when the player guess a letter
    const goodGuess = validateInput(guess); // create a variable to run validateinput function. Use validateinput function to save input value as an argument.
    // console.log(inputLetter);
    if (goodGuess) {
        makeGuess(guess);
    }
    letterInput.value = ""; // empty the value of the input when the player guess a letter
});

const validateInput = function (input) { //create a function to validate input of the user to check if the letter is correct.
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) { // if input is empty?
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1) { // if input more than one letter.
            message.innerText = "Please enter a single letter only.";
    } else if (!input.match(acceptedLetter)) { // if input is an accepted letter using match method.
        message.innerText = "Please enter a valid character from A to Z.";
    } else {
        return input;
    }
};

const makeGuess = function(guess) { // function that captures the input of the user and allows other functions to be called.
    guess = guess.toUpperCase(); // letter converted to uppercase if you entered in lowercase it converts it for the console
    if (guessedLetters.includes(guess)) { //checks if the array of guesses already has a letter which user entered.
        message.innerText = "You have already guessed that letter so try again."
    } else {
        guessedLetters.push(guess); //if the letter is not entered already use push method to include it in the guessed array.
        console.log(guessedLetters);
        showGuessedLetters();
        updateGuessRemaining(guess);
        updateTheWordInProgress(guessedLetters); // call the new function and pass the guessLetters as an argument.
    }
};

const showGuessedLetters = function () { //function to show on the page the letters that the player guesses.
    
    guessedLettersElement.innerHTML = ""; //empty the innerHTML of the unordered list where the players guesslist will display.

    for (const letter of guessedLetters) { //loop through the guessletter array  
        const li = document.createElement("li"); // create a new list item for each letter inside array for webpage.
        li.innerText = letter; // add the letter to list item of the unordered list.  
        guessedLettersElement.append(li); // append the list item to unordered list.
    }
};

const updateTheWordInProgress = function (guessedLetters) { //this function will replace the circle symbols with the correct letters guessed
    const wordUpper = word.toUpperCase(); //create a variable to change the word variable to uppercase
    const wordArray = wordUpper.split(""); // variable to split the word string into an array so that the letter can appear in the guessedletters array.
    const revealWord = []; // create a new array with updated characters.
    console.log(wordArray);
    for (const letter of wordArray) { //check if the wordArray contains any letters from the guessedLetters array by looping.
        if (guessedLetters.includes(letter)) {  // function that checks if includes letter from word array and reveals and push
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    } 
    emptyParagraph.innerText = revealWord.join(""); //update empty paragraph element where the correct guess word in progress will appear.
    checkPlayerWin();
};

const updateGuessRemaining = function (guess) { //function for counting guesses remaining and checking guess with word for updating message element and updating span.
    const upperWord = word.toUpperCase(); // name a variable for making the word they are guessing uppercase.
    if (!upperWord.includes(guess)) {  //if the guess letter doesn't contain in word or upperWord. 
        message.innerText = `Sorry, the word doesn't contain ${guess}`; //write a message in message element in HTML.
        remainingGuesses -= 1; // substract by - 1 the number of remaining guesses.
    } else {
        message.innerText = `Congratulation! the ${guess} is in the word`; // if the guess letter is in the word, include a message congratulating the user.
    }

    if (remainingGuesses === 0) { //this checks the remaning number of guesses and provides a message that once the remaining hits 0 or 1, a message must be printed to warn the user. If number is higher than 0 or 1, a message must be logged out as well.
        message.innerHTML = `The game is over! the word was <span class="highlight">${word}</span>.`;
    } else if (remainingGuesses === 1) {
        guessDisplay.innerText = `${remainingGuesses} guess`; //updates the span for number of guessedLetters.
    } else {
        guessDisplay.innerText = `${remainingGuesses} guesses`;
    } 
};   

const checkPlayerWin = function () { //function that checks if the player has won.
    if (word.toUpperCase() === emptyParagraph.innerText) {
        message.classList.add("win"); // add class win to html with css attributes.
        message.innerHTML = `<p class="highlight">You guessed the word! Congrats!</p>`;
    } //add HTML code to word in progress class. 
};

