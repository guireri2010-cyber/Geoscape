let playerName = "";
let currentQuestion = 0;
let score = 0;
let timeLeft = 180;
 
let playerPosition = 0;

// 10 preguntas TOTAL
// 7 normales + 3 juegos

let questions = [
 let questions = [
  // 1
  {
    type: "normal",
    question: "What is the capital of France?",
    options: ["Paris", "Madrid", "Berlin"],
    answer: 0
  },

  // 2
  {
    type: "normal",
    question: "Which continent is Brazil located in?",
    options: ["Africa", "South America", "Europe"],
    answer: 1
  },

  // 3
  {
    type: "normal",
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean"],
    answer: 2
  },

  // 4 (ARCade style but real)
  {
    type: "arcade",
    question: "Which of these is a European capital city?",
    options: ["Madrid", "Cairo", "Tokyo"],
    answer: 0
  },

  // 5
  {
    type: "normal",
    question: "What is the capital of Japan?",
    options: ["Beijing", "Seoul", "Tokyo"],
    answer: 2
  },

  // 6
  {
    type: "normal",
    question: "Which country has the pyramids of Giza?",
    options: ["Mexico", "Egypt", "India"],
    answer: 1
  },

  // 7 (ARCade style)
  {
    type: "arcade",
    question: "Which of these is a physical feature?",
    options: ["River", "Government", "Population"],
    answer: 0
  },

  // 8
  {
    type: "normal",
    question: "What is the longest river in the world?",
    options: ["Amazon River", "Nile River", "Danube River"],
    answer: 1
  },

  // 9 (ARCade style)
  {
    type: "arcade",
    question: "Which country is part of South America?",
    options: ["Brazil", "Spain", "France"],
    answer: 0
  },

  // 10
  {
    type: "normal",
    question: "What does climate refer to?",
    options: [
      "Daily weather changes",
      "Long-term weather patterns",
      "Earth’s rotation"
    ],
    answer: 1
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
