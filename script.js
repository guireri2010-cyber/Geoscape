let playerName = "";
let currentQuestion = 0;
let score = 0;
let timeLeft = 180;

// Preguntas (una es tipo juego)
let questions = [
  {
    type: "normal",
    question: "What is the capital of France?",
    options: ["Madrid", "Paris", "Rome"],
    answer: 1
  },
  {
    type: "normal",
    question: "Which continent is Brazil in?",
    options: ["Europe", "South America", "Asia"],
    answer: 1
  },
  {
    type: "game",
    question: "Which pipe leads to Japan? (Tokyo)",
    options: ["Spain", "Japan", "Italy"],
    answer: 1
  },
  {
    type: "normal",
    question: "Which ocean is the biggest?",
    options: ["Atlantic", "Indian", "Pacific"],
    answer: 2
  },
  {
    type: "normal",
    question: "Which country has the pyramids?",
    options: ["Egypt", "India", "Mexico"],
    answer: 0
  }
];

// Mezclar preguntas
questions.sort(() => Math.random() - 0.5);

// Start
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

// Mostrar pregunta
function showQuestion() {
  let q = questions[currentQuestion];

  document.getElementById("question").innerText = q.question;

  let answersDiv = document.getElementById("answers");
  let gameArea = document.getElementById("game-area");

  answersDiv.innerHTML = "";
  gameArea.style.display = "none";

  if (q.type === "normal") {
    q.options.forEach((option, index) => {
      let btn = document.createElement("button");
      btn.innerText = option;
      btn.onclick = () => checkAnswer(index);
      answersDiv.appendChild(btn);
    });
  } else if (q.type === "game") {
    gameArea.style.display = "block";
  }
}

// Respuesta normal
function checkAnswer(selected) {
  if (selected === questions[currentQuestion].answer) {
    score++;
  }

  nextQuestion();
}

// Juego pipes
function choosePipe(selected) {
  if (selected === questions[currentQuestion].answer) {
    alert("Correct pipe!");
    score++;
  } else {
    alert("Wrong pipe!");
  }

  nextQuestion();
}

// Siguiente
function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

// Timer
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

// Resultados
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
