let playerName = "";
let currentQuestion = 0;
let score = 0;
let timeLeft = 180;
 
let playerPosition = 0;

let questions = [
  {
    type: "normal",
    question: "What is the capital of France?",
    options: ["Madrid", "Paris", "Rome"],
    answer: 1
  },
  {
    type: "mario",
    question: "Go to the pipe of Japan (Tokyo)",
    answer: 1
  },
  {
    type: "normal",
    question: "Which ocean is the biggest?",
    options: ["Atlantic", "Indian", "Pacific"],
    answer: 2
  },
  {
    type: "mario",
    question: "Go to the pipe of Brazil",
    answer: 0
  },
  {
    type: "arcade",
    question: "Which continent is Egypt in?",
    answer: 1
  }
];

questions.sort(() => Math.random() - 0.5);

function startGame() {
  let nameInput = document.getElementById("name").value;

  if (nameInput === "") {
    alert("Enter your name!");
    return;
  }

  playerName = nameInput;

  document.getElementById("start-screen").style.display = "none";
  document.getElementById("quiz-screen").style.display = "block";

  showQuestion();
  startTimer();
}

function showQuestion() {
  let q = questions[currentQuestion];

  document.getElementById("question").innerText = q.question;

  document.getElementById("answers").innerHTML = "";
  document.getElementById("mario-game").style.display = "none";
  document.getElementById("arcade-game").style.display = "none";

  if (q.type === "normal") {
    q.options.forEach((option, index) => {
      let btn = document.createElement("button");
      btn.innerText = option;
      btn.onclick = () => checkAnswer(index);
      document.getElementById("answers").appendChild(btn);
    });
  }

  if (q.type === "mario") {
    playerPosition = 0;
    document.getElementById("player").style.left = "0px";
    document.getElementById("mario-game").style.display = "block";
  }

  if (q.type === "arcade") {
    document.getElementById("arcade-game").style.display = "block";
  }
}

function checkAnswer(selected) {
  if (selected === questions[currentQuestion].answer) {
    score++;
  }
  nextQuestion();
}

// MARIO MOVEMENT
function moveLeft() {
  if (playerPosition > 0) {
    playerPosition--;
    updatePlayer();
  }
}

function moveRight() {
  if (playerPosition < 2) {
    playerPosition++;
    updatePlayer();
  }
}

function updatePlayer() {
  let positions = [ -80, 0, 80 ];
  document.getElementById("player").style.left = positions[playerPosition] + "px";
}

function checkMario(pipeIndex) {
  if (pipeIndex === questions[currentQuestion].answer && pipeIndex === playerPosition) {
    alert("Correct!");
    score++;
  } else {
    alert("Wrong!");
  }
  nextQuestion();
}

// ARCADE
function checkArcade(selected) {
  if (selected === questions[currentQuestion].answer) {
    score++;
  }
  nextQuestion();
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function startTimer() {
  let timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      showResults();
    }
  }, 1000);
}

function showResults() {
  let total = questions.length;
  let percentage = Math.round((score / total) * 100);

  let message = "";

  if (percentage >= 80) {
    message = "🌟 Excellent!";
  } else if (percentage >= 50) {
    message = "👍 Good job!";
  } else {
    message = "📚 Keep practicing!";
  }

  document.getElementById("quiz-screen").style.display = "none";
  document.getElementById("result-screen").style.display = "block";

  document.getElementById("result").innerText =
    playerName + " scored " + score + "/" + total +
    " (" + percentage + "%)\n" + message;
}
