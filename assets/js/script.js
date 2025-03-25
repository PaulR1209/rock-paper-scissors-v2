// Set initial score values
let myScore = 0;
let opponentScore = 0;

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.getElementsByClassName("button");
  const options = ["rock", "paper", "scissors"];

  // Add click listener to reset button (acts as Play Again when game is over)
  document.getElementById("resetScore").addEventListener("click", resetScore);

  // Add click listeners to Rock, Paper, Scissors buttons
  for (let button of buttons) {
    button.addEventListener("click", function () {
      // Only allow choice buttons if game isn't over
      if (checkWinner()) return; // Prevent further clicks after game over

      const myInput = this.getAttribute("data-choice");
      const opponentInput = options[Math.floor(Math.random() * 3)];

      updateResultImage(myInput, opponentInput);
      game(myInput, opponentInput);
      updateScore();

      if (checkWinner()) {
        // checkWinner() will handle updating final message and button styling.
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

// Update feedback message (optionally with final styling)
function updateTextFeedback(feedback, isFinal = false) {
  const textFeedback = document.getElementById("text-feedback");
  textFeedback.textContent = feedback;

  // Remove all previous styling classes
  textFeedback.classList.remove(
    "win",
    "lose",
    "win-final",
    "lose-final",
    "final"
  );

  if (!isFinal) {
    if (feedback === "You Win This Round") {
      textFeedback.classList.add("win");
    } else if (feedback === "You Lose This Round...") {
      textFeedback.classList.add("lose");
    }
  } else {
    // Apply extra styling for final result feedback
    textFeedback.classList.add("final");
    if (feedback === "Victory is Yours!") {
      textFeedback.classList.add("win-final");
    } else if (feedback === "Defeat... Try Again!") {
      textFeedback.classList.add("lose-final");
    }
  }
}

// Update score in the DOM
function updateScore() {
  document.getElementById("my-score").textContent = myScore;
  document.getElementById("opponent-score").textContent = opponentScore;
}

// Check for a winner and update final UI if game is over
function checkWinner() {
  if (myScore === 5 || opponentScore === 5) {
    const finalMessage =
      myScore === 5 ? "Victory is Yours!" : "Defeat... Try Again!";
    setTimeout(() => {
      updateTextFeedback(finalMessage, true);
      // Change the reset button text to "Play Again" and add extra styling
      const resetBtn = document.getElementById("resetScore");
      resetBtn.textContent = "Play Again";
      resetBtn.classList.add("play-again");
      // Disable choice buttons so the game doesn't continue
      disableChoiceButtons();
    }, 10);
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

// Reset score via Reset button (or Play Again)
function resetScore() {
  resetGame();
  updateScore();
  updateTextFeedback("");
  updateResultImage("paper", "paper");

  // Reset the reset button text back to "Reset" and remove extra styling
  const resetBtn = document.getElementById("resetScore");
  resetBtn.textContent = "Reset";
  resetBtn.classList.remove("play-again");

  // Re-enable the Rock, Paper, Scissors buttons
  enableChoiceButtons();
}

// Helper functions to disable/enable choice buttons
function disableChoiceButtons() {
  const buttons = document.querySelectorAll("[data-choice]");
  buttons.forEach((btn) => (btn.disabled = true));
}

function enableChoiceButtons() {
  const buttons = document.querySelectorAll("[data-choice]");
  buttons.forEach((btn) => (btn.disabled = false));
}
