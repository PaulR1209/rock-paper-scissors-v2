// Set initial score values
let myScore = 0;
let opponentScore = 0;

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.getElementsByClassName("button");
  const options = ["rock", "paper", "scissors"];

  // Add click listener to reset button
  document.getElementById("resetScore").addEventListener("click", resetScore);

  // Add click listeners to Rock, Paper, Scissors buttons
  for (let button of buttons) {
    button.addEventListener("click", function () {
      const myInput = this.getAttribute("data-choice");
      const opponentInput = options[Math.floor(Math.random() * 3)];

      updateResultImage(myInput, opponentInput);
      game(myInput, opponentInput);
      updateScore();

      if (checkWinner()) {
        setTimeout(resetGameAndAlert, 0);
      }
    });
  }
});

/* ==========================
   Game Logic Functions
========================== */

// Compare inputs and update result
function game(myInput, opponentInput) {
  if (myInput === opponentInput) {
    updateTextFeedback("This Round is a Draw");
  } else if (
    (myInput === "rock" && opponentInput === "scissors") ||
    (myInput === "paper" && opponentInput === "rock") ||
    (myInput === "scissors" && opponentInput === "paper")
  ) {
    myScore++;
    updateTextFeedback("You Win This Round");
  } else {
    opponentScore++;
    updateTextFeedback("You Lose This Round...");
  }
}

// Update feedback message
function updateTextFeedback(feedback) {
  const textFeedback = document.getElementById("text-feedback");
  textFeedback.textContent = feedback;

  textFeedback.classList.remove("win", "lose");
  if (feedback === "You Win This Round") {
    textFeedback.classList.add("win");
  } else if (feedback === "You Lose This Round...") {
    textFeedback.classList.add("lose");
  }
}

// Update score in the DOM
function updateScore() {
  document.getElementById("my-score").textContent = myScore;
  document.getElementById("opponent-score").textContent = opponentScore;
}

// Check for a winner
function checkWinner() {
  if (myScore === 5 || opponentScore === 5) {
    const winner = myScore === 5 ? "You Win!" : "You Lose...";
    alert(winner);
    return true;
  }
  return false;
}

// Update hand images
function updateResultImage(myInput, opponentInput) {
  document.getElementById("my-input-img").src = `assets/images/${myInput}.png`;
  document.getElementById(
    "opp-input-img"
  ).src = `assets/images/${opponentInput}.png`;
}

// Reset game after final round
function resetGame() {
  myScore = 0;
  opponentScore = 0;
}

function resetGameAndAlert() {
  resetGame();
  alert("Game Over");
  updateScore();
  updateTextFeedback(""); // Clear feedback
  updateResultImage("paper", "paper"); // Reset to default hand images
}

// Reset score via Reset button
function resetScore() {
  resetGame();
  updateScore();
  updateTextFeedback("");
  updateResultImage("paper", "paper");
}
