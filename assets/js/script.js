// set value of scores
var myScore = 0;
var opponentScore = 0;

document.addEventListener("DOMContentLoaded", function () {
  var buttons = document.getElementsByClassName("button");
  var options = ["rock", "paper", "scissors"];

  // button click function

  document.getElementById("resetScore").addEventListener("click", resetScore);

  document.getElementById("instructions").addEventListener("click", modalBox);
  modalBox();

  function buttonClickEvent(button) {
    button.addEventListener("click", function () {
      const myInput = button.getAttribute("data-choice");

      // computer input which chooses randomly

      const opponentInput = options[Math.floor(Math.random() * 3)];

      updateResultImage(myInput, opponentInput);
      game(myInput, opponentInput);
      updateScore();

      if (checkWinner()) {
        setTimeout(resetGameAndAlert, 0);
      }
    });
  }
  for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    buttonClickEvent(button);
  }
});

/** This function compares the input of the user and computer
 *  and determines result */
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

// this allows me to change the color of the message depending on result in CSS
function updateTextFeedback(feedback) {
  var textFeedbackElement = document.getElementById("text-feedback");
  textFeedbackElement.textContent = feedback;

  textFeedbackElement.classList.remove("win", "lose");
  if (feedback === "You Win This Round") {
    textFeedbackElement.classList.add("win");
  } else if (feedback === "You Lose This Round...") {
    textFeedbackElement.classList.add("lose");
  }
}

/**
 * This updates the scores on the HTML page
 */
function updateScore() {
  document.getElementById("my-score").textContent = myScore;
  document.getElementById("opponent-score").textContent = opponentScore;
}

/** checks if player or computer has 5 points.
 * If either reach 5 points, they win, if not the loop starts again */
function checkWinner() {
  if (myScore === 5 || opponentScore === 5) {
    let winner;

    if (myScore === 5) {
      winner = "You Win!";
    } else {
      winner = "You Lose...";
    }

    alert(winner);

    return true;
  }

  return false;
}

/** changes the image based on player and computer input */
function updateResultImage(myInput, opponentInput) {
  document.getElementById("my-input-img").src = `assets/images/${myInput}.png`;

  document.getElementById(
    "opp-input-img"
  ).src = `assets/images/${opponentInput}.png`;
}

// These two functions allow the final round results to display after winner is declared
// and then reset after "game over" alert
function resetGame() {
  myScore = 0;
  opponentScore = 0;
}

function resetGameAndAlert() {
  resetGame();
  alert("Game Over");
  updateScore();
}

/** resets the score to 0-0 upon clicking the reset button */
function resetScore() {
  myScore = 0;
  opponentScore = 0;
  updateScore();
}

/** opens and closes the instrcutions when clicking the instructions button */
function modalBox() {
  let modal = document.getElementById("my-modal");
  let button = document.getElementById("instructions");
  let close = document.getElementById("close");

  button.onclick = function () {
    modal.style.display = "block";
  };

  close.onclick = function () {
    modal.style.display = "none";
  };
}
