let playerName = "";
let currentQuestion = 0;
let score = 0;
let timeLeft = 180;

// GAME VARIABLES
let obstaclesPassed = 0;
let gameRunning = false;
 
let questions = [
  { type: "normal", question: "Capital of France?", options: ["Paris","Madrid","Berlin"], answer: 0 },
  { type: "normal", question: "Brazil is in?", options: ["Europe","South America","Asia"], answer: 1 },
  { type: "door", question: "Paris is in?", answer: 1 },
  { type: "normal", question: "Largest ocean?", options: ["Atlantic","Indian","Pacific"], answer: 2 },
  { type: "normal", question: "Capital of Norway?", options: ["Oslo","Stockholm","Copenhagen"], answer: 0 },
  { type: "door", question: "Madrid is in?", answer: 0 },
  { type: "normal", question: "Pyramids country?", options: ["Egypt","India","Mexico"], answer: 0 },
  { type: "normal", question: "Climate is?", options: ["Weather","Long term","Rotation"], answer: 1 },
  { type: "door", question: "Tokyo is in?", answer: 2 },
  { type: "food", question: "Spanish food?", options: ["Paella","Burger","Sushi"], answer: 0 }
];

questions.sort(() => Math.random() - 0.5);

function startGame() {
  let name = document.getElementById("name").value;
  if (!name) return alert("Enter name");

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
  document.getElementById("progress").innerText =
    `Q ${currentQuestion+1}/${questions.length}`;

  document.getElementById("door-game").style.display = "none";
  document.getElementById("food-game").style.display = "none";

  if (q.type === "normal") {
    q.options.forEach((opt,i)=>{
      let btn=document.createElement("button");
      btn.innerText=opt;

      btn.onclick=()=>{
        if(i===q.answer) score++;
        setTimeout(next,300);
      };

      document.getElementById("answers").appendChild(btn);
    });
  }

  if (q.type === "door") {
    document.getElementById("door-game").style.display = "block";
  }

  if (q.type === "food") {
    let g=document.getElementById("food-game");
    g.innerHTML=q.question;

    q.options.forEach((opt,i)=>{
      let b=document.createElement("button");
      b.innerText=opt;

      b.onclick=()=>{
        if(i===q.answer) score++;
        setTimeout(next,300);
      };

      g.appendChild(b);
    });
  }
}

function chooseDoor(i){
  if(i===questions[currentQuestion].answer) score++;
  next();
}

function next(){
  currentQuestion++;

  if(currentQuestion<questions.length){
    showQuestion();
  } else {
    document.getElementById("quiz-screen").style.display="none";
    document.getElementById("game-intro").style.display="block";
  }
}

function startTimer(){
  setInterval(()=>{
    timeLeft--;
    document.getElementById("timer").innerText=timeLeft;

    if(timeLeft<=0){
      endQuiz();
    }
  },1000);
}

// INTRO → GAME
function startGameLevel(){
  document.getElementById("game-intro").style.display="none";
  document.getElementById("game-screen").style.display="block";

  startDinoGame();
}

// 🦖 GAME LOGIC
function startDinoGame(){
  let dino=document.getElementById("dino");
  let obstacle=document.getElementById("obstacle");
  let scoreText=document.getElementById("game-score");

  let jump=false;
  let obstacleCount=0;

  document.addEventListener("keydown",(e)=>{
    if(e.code==="Space" && !jump){
      jump=true;
      dino.style.bottom="80px";

      setTimeout(()=>{
        dino.style.bottom="0px";
        jump=false;
      },400);
    }
  });

  function spawnObstacle(){
    if(obstacleCount>=10){
      endGame(10);
      return;
    }

    obstacleCount++;
    scoreText.innerText=`${obstacleCount}/10`;

    obstacle.style.right="-20px";

    let move=setInterval(()=>{
      let pos=parseInt(obstacle.style.right||-20);
      obstacle.style.right=(pos+5)+"px";

      let dinoBottom=parseInt(window.getComputedStyle(dino).bottom);

      if(pos>250 && pos<300 && dinoBottom<40){
        clearInterval(move);
        endGame(obstacleCount-1);
      }

      if(pos>400){
        clearInterval(move);
        spawnObstacle();
      }
    },30);
  }

  spawnObstacle();
}

function endGame(result){
  obstaclesPassed=result;

  document.getElementById("game-screen").style.display="none";
  document.getElementById("result-screen").style.display="block";

  let percent=result*10;

  document.getElementById("result").innerText=
    `${playerName}
Quiz Score: ${score}/${questions.length}
Dino Game: ${result}/10 (${percent}%)

FINAL SCORE: ${Math.round((score/questions.length*50)+(percent/2))}%`;
}

// PARTICLES
particlesJS("particles-js", {
  particles:{
    number:{value:50},
    size:{value:3},
    move:{speed:2}
  }
});
