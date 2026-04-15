let playerName = "";
let currentQuestion = 0;
let score = 0;
let timeLeft = 180;
let playerPosition = 0;

// 10 preguntas JUNIOR CYCLE
let questions = [
  {
    type: "normal",
    question: "What is the capital of France?",
    options: ["Paris", "Madrid", "Berlin"],
    answer: 0
  },
  {
    type: "normal",
    question: "Which continent is Brazil in?",
    options: ["Europe", "South America", "Asia"],
    answer: 1
  },
  {
    type: "mario",
    question: "Go to the pipe of Japan",
    answer: 1
  },
  {
    type: "normal",
    question: "What is the largest ocean?",
    options: ["Atlantic", "Indian", "Pacific"],
    answer: 2
  },
  {
    type: "normal",
    question: "What is the capital of Japan?",
    options: ["Seoul", "Beijing", "Tokyo"],
    answer: 2
  },
  {
    type: "mario",
    question: "Go to the pipe of Spain",
    answer: 2
  },
  {
    type: "normal",
    question: "Which country has the pyramids?",
    options: ["Egypt", "India", "Mexico"],
    answer: 0
  },
  {
    type: "normal",
    question: "What is climate?",
    options: ["Daily weather", "Long-term weather patterns", "Earth rotation"],
    answer: 1
  },
  {
    type: "mario",
    question: "Go to the pipe of Brazil",
    answer: 0
  },
  {
    type: "food",
    question: "🍽️ Final Boss: What is a traditional Spanish food?",
    options: ["🥘 Paella", "🍔 Burger", "🍣 Sushi"],
    answer: 0
  }
];

questions.sort(() => Math.random() - 0.5);

// START
function startGame() {
  let name = document.getElementById("name").value;

  if (name === "") {
    alert("Enter your name!");
    return;
  }

  playerName = name;

  document.getElementById("start-screen").style.display = "none";
  document.getElementById("quiz-screen").style.display = "block";

  showQuestion();
  startTimer();
}

// SHOW QUESTION
function showQuestion() {
  let q = questions[currentQuestion];

  document.getElementById("question").innerText = q.question;
  document.getElementById("answers").innerHTML = "";

  document.getElementById("game-area").style.display = "none";
  document.getElementById("food-game").style.display = "none";

  // NORMAL
  if (q.type === "normal") {
    q.options.forEach((opt, i) => {
      let btn = document.createElement("button");
      btn.innerText = opt;
      btn.onclick = () => checkAnswer(i);
      document.getElementById("answers").appendChild(btn);
    });
  }

  // MARIO
  if (q.type === "mario") {
    playerPosition = 0;
    updatePlayer();
    document.getElementById("game-area").style.display = "block";
  }

  // FOOD (FINAL LEVEL)
  if (q.type === "food") {
    let game = document.getElementById("food-game");

    game.innerHTML = `
      <h3>🍄🧍 ${q.question}</h3>
      <p>Choose what the character eats:</p>
    `;

    q.options.forEach((opt, i) => {
      let btn = document.createElement("button");
      btn.innerText = opt + " 🍴";
      btn.onclick = () => checkFood(i);
      game.appendChild(btn);
    });

    game.style.display = "block";
  }
}

// NORMAL ANSWER
function checkAnswer(i) {
  if (i === questions[currentQuestion].answer) score++;
  next();
}

// MARIO MOVEMENT
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

function choosePipe(i) {
  if (i === questions[currentQuestion].answer && i === playerPosition) {
    score++;
  }
  next();
}

// FOOD GAME
function checkFood(i) {
  if (i === questions[currentQuestion].answer) {
    score++;
    alert("🍽️ Correct! Delicious!");
  } else {
    alert("❌ Not typical Spanish food!");
  }
  next();
}

// NEXT
function next() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// TIMER
function startTimer() {
  let timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      showResult();
    }
  }, 1000);
}

// RESULT
function showResult() {
  let total = questions.length;
  let percent = Math.round((score / total) * 100);

  let msg = "";
  if (percent >= 80) msg = "🌟 Excellent!";
  else if (percent >= 50) msg = "👍 Good!";
  else msg = "📚 Keep studying!";

  document.getElementById("quiz-screen").style.display = "none";
  document.getElementById("result-screen").style.display = "block";

  document.getElementById("result").innerText =
    `${playerName} scored ${score}/${total} (${percent}%)\n${msg}`;
}
