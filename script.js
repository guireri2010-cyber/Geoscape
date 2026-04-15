let playerName = "";
let currentQuestion = 0;
let score = 0;
let timeLeft = 180;
 
let playerPosition = 0;

// 10 preguntas TOTAL
// 7 normales + 3 juegos

let questions = [
  // NORMAL 1
  {
    type: "normal",
    question: "What is the capital of France?",
    options: ["Madrid", "Paris", "Rome"],
    answer: 1
  },

  // MARIO 1
  {
    type: "mario",
    question: "Go to the pipe of Japan (Tokyo)",
    answer: 1
  },

  // NORMAL 2
  {
    type: "normal",
    question: "Which continent is Brazil in?",
    options: ["Europe", "South America", "Asia"],
    answer: 1
  },

  // NORMAL 3
  {
    type: "normal",
    question: "Which ocean is the largest?",
    options: ["Atlantic", "Indian", "Pacific"],
    answer: 2
  },

  // ARCADE 1
  {
    type: "arcade",
    question: "Which continent is Egypt in?",
    options: ["Europe", "Africa", "Asia"],
    answer: 1
  },

  // NORMAL 4
  {
    type: "normal",
    question: "What is the capital of Japan?",
    options: ["Seoul", "Beijing", "Tokyo"],
    answer: 2
  },

  // MARIO 2
  {
    type: "mario",
    question: "Go to the pipe of Spain",
    answer: 2
  },

  // NORMAL 5
  {
    type: "normal",
    question: "Which country has the pyramids?",
    options: ["Egypt", "India", "Mexico"],
    answer: 0
  },

  // ARCADE 2
  {
    type: "arcade",
    question: "Which continent is Australia in?",
    options: ["Europe", "Oceania", "Asia"],
    answer: 1
  },

  // MARIO 3
  {
    type: "mario",
    question: "Go to the pipe of Brazil",
    answer: 0
  }
];

// Mezclar preguntas
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

  // NORMAL
  if (q.type === "normal") {
    q.options.forEach((option, index) => {
      let btn = document.createElement("button");
      btn.innerText = option;
      btn.onclick = () => checkAnswer(index);
      document.getElementById("answers").appendChild(btn);
    });
  }

  // MARIO
  if (q.type === "mario") {
    playerPosition = 0;
    updatePlayer();
    document.getElementById("mario-game").style.display = "block";
  }

  // ARCADE
  if (q.type === "arcade") {
    let arcade = document.getElementById("arcade-game");
    arcade.innerHTML = "<p>Click the correct answer!</p>";

    q.options.forEach((opt, i) => {
      let btn = document.createElement("button");
      btn.innerText = opt;
      btn.onclick = () => checkArcade(i);
      arcade.appendChild(btn);
    });

    arcade.style.display = "block";
  }
}

// NORMAL
function checkAnswer(selected) {
  if (selected === questions[currentQuestion].answer) {
    score++;
  }
  nextQuestion();
}

// MARIO
function moveLeft() {
  if (playerPosition > 0) playerPosition--;
  updatePlayer();
}

function moveRight() {
  if (playerPosition < 2) playerPosition++;
  updatePlayer();
}

function updatePlayer() {
  let pos = [-80, 0, 80];
  document.getElementById("player").style.left = pos[playerPosition] + "px";
}

function choosePipe(pipe) {
  if (pipe === questions[currentQuestion].answer && pipe === playerPosition) {
    score++;
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

// NEXT
function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

// TIMER
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

// RESULT
function showResults() {
  let total = questions.length;
  let percentage = Math.round((score / total) * 100);

  let message = "";

  if (percentage >= 80) message = "🌟 Excellent!";
  else if (percentage >= 50) message = "👍 Good job!";
  else message = "📚 Keep practicing!";

  document.getElementById("quiz-screen").style.display = "none";
  document.getElementById("result-screen").style.display = "block";

  document.getElementById("result").innerText =
    `${playerName} scored ${score}/${total} (${percentage}%)\n${message}`;
}
