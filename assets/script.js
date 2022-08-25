var wordBlank = document.querySelector(".questions");
var win = document.querySelector(".win");
var lose = document.querySelector(".lose");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");

const choiceA = document.getElementById("A");

const choiceB = document.getElementById("B");

const choiceC = document.getElementById("C");

const counter = document.getElementById("counter");
var timer;
var timerCount;

function init() {
  getWins();
  getlosses();
}
// The startGame function is called when the start button is clicked
function startGame() {
  isWin = false;
  timerCount = 10;
  // Prevents start button from being clicked when round is in progress
  startButton.disabled = true;
  startTimer()
}
// The winGame function is called when the win condition is met
function winGame() {
  wordBlank.textContent = "YOU WON!!!🏆 ";
  winCounter++
  startButton.disabled = false;
  setWins()
}
// The loseGame function is called when timer reaches 0
function loseGame() {
  wordBlank.textContent = "GAME OVER";
  loseCounter++
  startButton.disabled = false;
  setLosses()
}
// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
  // Sets timer
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      // Tests if win condition is met
      if (isWin && timerCount > 0) {
        // Clears interval and stops timer
        clearInterval(timer);
        winGame();
      }
    }
    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      loseGame();
    }
  }, 1000);
}
// Creates multiple choice questions
let questions = [

  {

      question : "What is a user story?",

      choiceA : "Identifying goals and rewards",

      choiceB : "A picture",

      choiceC : "Who what where",

      correct : "A"

  },{

      question : "What does CSS stand for?",

      choiceA : "Wrong",

      choiceB : "Correct",

      choiceC : "Wrong",

      correct : "B"

  },{

      question : "What are screen readers for?",

      choiceA : "phone light",

      choiceB : "volume control",

      choiceC : "Vision Impaired",

      correct : "C"

  }

];
// index of the questions

const lastQuestion = questions.length - 1;

let runningQuestion = 0;

// render questions//

function renderQuestion(){

  let q = questions[runningQuestion];

 

  question.innerHTML = "<p>"+ q.question +"</p>";

  qImg.innerHTML = "<img src="+ q.imgSrc +">";

  choiceA.innerHTML = q.choiceA;

  choiceB.innerHTML = q.choiceB;

  choiceC.innerHTML = q.choiceC;

}
// render progress //
function renderProgress(){

  for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){

      progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";

  }
}
// Updates win count on screen and sets win count to client storage
function setWins() {
  win.textContent = winCounter;
  localStorage.setItem("winCount", winCounter);
}
// Updates lose count on screen and sets lose count to client storage
function setLosses() {
  lose.textContent = loseCounter;
  localStorage.setItem("loseCount", loseCounter);
}
// These functions are used by init
function getWins() {
  // Get stored value from client storage, if it exists
  var storedWins = localStorage.getItem("winCount");
  // If stored value doesn't exist, set counter to 0
  if (storedWins === null) {
    winCounter = 0;
  } else {
    // If a value is retrieved from client storage set the winCounter to that value
    winCounter = storedWins;
  }
  //Render win count to page
  win.textContent = winCounter;
}
function getlosses() {
  var storedLosses = localStorage.getItem("loseCount");
  if (storedLosses === null) {
    loseCounter = 0;
  } else {
    loseCounter = storedLosses;
  }
  lose.textContent = loseCounter;
}
function checkWin() {
  // If the word equals the blankLetters array when converted to string, set isWin to true
  if (chosenWord === blanksLetters.join("")) {
    // This value is used in the timer function to test if win condition is met
    isWin = true;
  }
}
// Checks if answers are correct


// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);
// Calls init() so that it fires when page opened
init();
// Bonus: Add reset button
var resetButton = document.querySelector(".reset-button");
function resetGame() {
  // Resets win and loss counts
  winCounter = 0;
  loseCounter = 0;
  // Renders win and loss counts and sets them into client storage
  setWins()
  setLosses()
}
// Attaches event listener to button
resetButton.addEventListener("click", resetGame);