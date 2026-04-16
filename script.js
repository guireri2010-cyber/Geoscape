let playerName = "";
let currentQuestion = 0;
let score = 0;
let timeLeft = 180;
let bonus = 0;

let questions = [
  { type: "normal", question: "What is the capital of France?", options: ["Paris", "Madrid", "Berlin"], answer: 0 },
  { type: "normal", question: "Which continent is Brazil in?", options: ["Europe", "South America", "Asia"], answer: 1 },
  { type: "door", question: "Which country is Paris the capital of?", answer: 1 },
  { type: "normal", question: "What is the largest ocean?", options: ["Atlantic", "Indian", "Pacific"], answer: 2 },
  { type: "normal", question: "What is the capital of Norway?", options: ["Oslo", "Stockholm", "Copenhagen"], answer: 0 },
  { type: "door", question: "Which country is Madrid the capital of?", answer: 0 },
  { type: "normal", question: "Which country has the pyramids?", options: ["Egypt", "India", "Mexico"], answer: 0 },
  { type: "normal", question: "What is climate?", options: ["Daily weather", "Long-term patterns", "Earth rotation"], answer: 1 },
  { type: "door", question: "Which country is Tokyo the capital of?", answer: 2 },
  { type: "food", question: "🍽️ Final Level: What is a traditional Spanish food?", options: ["🥘 Paella", "🍔 Burger", "🍣 Sushi"], answer: 0 }
];

questions.sort(() => Math.random() - 0.5);

function startGame() {
  let name = document.getElementById("name").value;
  if (name === "") return alert("Enter your name!");

  playerName = name;

  document.getElementById("start-screen").style.display = "none";
  document.getElementById("quiz-screen").style.display = "block";

  showQuestion();
  startTimer();
}

function showQuestion() {
  let q = questions[currentQuestion];

  document.getElementById("question").innerText = q.question;
  document.getElementById("answers").innerHTML = "";

  document.getElementById("door-game").style.display = "none";
  document.getElementById("food-game").style.display = "none";

  document.getElementById("progress").innerText =
    `Question ${currentQuestion + 1} / ${questions.length}`;

  if (q.type === "normal") {
    q.options.forEach((opt, i) => {
      let btn = document.createElement("button");
      btn.innerText = opt;

      btn.onclick = () => {
        if (i === q.answer) {
          btn.style.background = "green";
          score++;
        } else {
          btn.style.background = "red";
        }
        setTimeout(next, 400);
      };

      document.getElementById("answers").appendChild(btn);
    });
  }

  if (q.type === "door") {
    document.getElementById("door-game").style.display = "block";
  }

  if (q.type === "food") {
    let game = document.getElementById("food-game");
    game.innerHTML = `<h3>${q.question}</h3>`;

    q.options.forEach((opt, i) => {
      let btn = document.createElement("button");
      btn.innerText = opt;

      btn.onclick = () => {
        if (i === q.answer) {
          btn.style.background = "green";
          score++;
        } else {
          btn.style.background = "red";
        }
        setTimeout(next, 400);
      };

      game.appendChild(btn);
    });

    game.style.display = "block";
  }
}

function chooseDoor(i) {
  if (i === questions[currentQuestion].answer) score++;
  next();
}

function next() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    startMiniGame();
  }
}

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

// MINI GAME
function startMiniGame() {
  document.getElementById("quiz-screen").style.display = "none";
  document.getElementById("game-screen").style.display = "block";

  let dino = document.getElementById("dino");
  let obstacle = document.getElementById("obstacle");

  document.addEventListener("keydown", function(e) {
    if (e.code === "Space" && !dino.classList.contains("jump")) {
      dino.classList.add("jump");
      setTimeout(() => dino.classList.remove("jump"), 500);
    }
  });

  let gameLoop = setInterval(() => {
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

    if (obstacleLeft < 80 && obstacleLeft > 20 && dinoTop > 130) {
      clearInterval(gameLoop);
      showResult();
    }
  }, 10);

  setTimeout(() => {
    bonus = 1;
    clearInterval(gameLoop);
    showResult();
  }, 5000);
}

// PARTICLES
particlesJS("particles-js", {
  particles: {
    number: { value: 60 },
    size: { value: 3 },
    move: { speed: 2 }
  }
});

function showResult() {
  let total = questions.length + 1;
  let finalScore = score + bonus;
  let percent = Math.round((finalScore / total) * 100);

  let msg = percent >= 80 ? "🌍 Excellent!" :
            percent >= 50 ? "👍 Good job!" :
            "📚 Keep studying!";

  document.getElementById("game-screen").style.display = "none";
  document.getElementById("result-screen").style.display = "block";

  document.getElementById("result").innerText =
    `${playerName} scored ${finalScore}/${total} (${percent}%)\n${msg}`;
}
