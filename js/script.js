const unorderedList = document.querySelector(".guessedletters");
const guessButton = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const emptyParagraph = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const GuessDisplay = document.querySelector("p + span");
const messageParagraph = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";

const updateText = function() {
    emptyParagraph.innerText = "●";
    updateText(word);
    const word = ["●", "●", "●", "●", "●", "●", "●", "●"];
    let updateText = word.join("");
    
}
