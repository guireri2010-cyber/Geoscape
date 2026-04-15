let playerName = "";
let currentQuestion = 0;
let score = 0;
let timeLeft = 120;

let questions = [
  {
    question: "¿Capital de Francia?",
    options: ["Madrid", "París", "Roma"],
    answer: 1
  },
  {
    question: "¿Dónde está Brasil?",
    options: ["Europa", "Sudamérica", "Asia"],
    answer: 1
  },
  {
    question: "¿Capital de Japón?",
    options: ["Seúl", "Pekín", "Tokio"],
    answer: 2
  }
];

function startGame() {
  let nameInput = document.getElementById("name").value;

  if (nameInput === "") {
    alert("Debes introducir tu nombre");
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

  let answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.options.forEach((option, index) => {
    let btn = document.createElement("button");
    btn.innerText = option;
    btn.onclick = () => checkAnswer(index);
    answersDiv.appendChild(btn);
  });
}

function checkAnswer(selected) {
  if (selected === questions[currentQuestion].answer) {
    score++;
  }

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

  document.getElementById("quiz-screen").style.display = "none";
  document.getElementById("result-screen").style.display = "block";

  document.getElementById("result").innerText =
    playerName + " sacó " + score + "/" + total + " (" + percentage + "%)";
}
