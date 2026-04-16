let playerName = "";
let currentQuestion = 0;
let score = 0;
let timeLeft = 180;

let questions = [
  { type: "normal", question: "What is the capital of France?", options: ["Paris", "Madrid", "Berlin"], answer: 0 },
  { type: "normal", question: "Which continent is Brazil in?", options: ["Europe", "South America", "Asia"], answer: 1 },
  { type: "door", question: "Which country is Paris the capital of?", answer: 1 },
  { type: "normal", question: "What is the largest ocean?", options: ["Atlantic", "Indian", "Pacific"], answer: 2 },
  { type: "normal", question: "What is the capital of Norway?", options: ["Stockholm", "Helsinki", "Oslo"], answer: 2 },
  { type: "door", question: "Which country is Madrid the capital of?", answer: 0 },
  { type: "normal", question: "Which country has the pyramids?", options: ["Egypt", "India", "Mexico"], answer: 0 },
  { type: "normal", question: "What is climate?", options: ["Daily weather", "Long-term patterns", "Earth rotation"], answer: 1 },
  { type: "door", question: "Which country is Tokyo the capital of?", answer: 2 },
  { type: "food", question: "🍽️ Final Level: What is a traditional Spanish food?", options: ["🥘 Paella", "🍔 Burger", "🍣 Sushi"], answer: 0 }
];

questions.sort(() => Math.random() - 0.5);

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
          btn.style.backgroundColor = "green";
          score++;
        } else {
          btn.style.backgroundColor = "red";
        }
        setTimeout(next, 500);
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
          btn.style.backgroundColor = "green";
          score++;
        } else {
          btn.style.backgroundColor = "red";
        }
        setTimeout(next, 500);
      };

      game.appendChild(btn);
    });

    game.style.display = "block";
  }
}

function chooseDoor(i) {
  if (i === questions[currentQuestion].answer) {
    score++;
    alert("Correct!");
  } else {
    alert("Wrong!");
  }
  next();
}

function next() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
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

// PARTICLES
particlesJS("particles-js", {
  particles: {
    number: { value: 60 },
    size: { value: 3 },
    move: { speed: 2 },
    opacity: { value: 0.5 }
  }
});

// RESULT
function showResult() {
  let total = questions.length;
  let percent = Math.round((score / total) * 100);

  let msg = "";

  if (percent >= 80) msg = "🌍 Excellent geography knowledge!";
  else if (percent >= 50) msg = "👍 Good job!";
  else msg = "📚 Keep studying!";

  document.getElementById("quiz-screen").style.display = "none";
  document.getElementById("result-screen").style.display = "block";

  document.getElementById("result").innerText =
    `${playerName} scored ${score}/${total} (${percent}%)\n${msg}`;
}
