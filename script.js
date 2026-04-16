let playerName="";
let currentQuestion=0;
let score=0;
let timeLeft=180;

let questions=[
  {type:"normal",question:"Capital of France?",options:["Paris","Madrid","Berlin"],answer:0},
  {type:"normal",question:"Brazil is in?",options:["Europe","South America","Asia"],answer:1},
  {type:"door",question:"Paris is in?",answer:1},
  {type:"normal",question:"Largest ocean?",options:["Atlantic","Indian","Pacific"],answer:2},
  {type:"normal",question:"Capital of Norway?",options:["Oslo","Stockholm","Copenhagen"],answer:0},
  {type:"door",question:"Madrid is in?",answer:0},
  {type:"normal",question:"Pyramids country?",options:["Egypt","India","Mexico"],answer:0},
  {type:"normal",question:"Climate is?",options:["Weather","Long term","Rotation"],answer:1},
  {type:"door",question:"Tokyo is in?",answer:2},
  {type:"food",question:"Spanish food?",options:["Paella","Burger","Sushi"],answer:0}
];

questions.sort(()=>Math.random()-0.5);

function startGame(){
  let name=document.getElementById("name").value;
  if(!name) return alert("Enter name");

  playerName=name;

  document.getElementById("start-screen").style.display="none";
  document.getElementById("quiz-screen").style.display="block";

  showQuestion();
  startTimer();
}

function showQuestion(){
  let q=questions[currentQuestion];

  document.getElementById("question").innerText=q.question;
  document.getElementById("answers").innerHTML="";
  document.getElementById("progress").innerText=
    `Q ${currentQuestion+1}/${questions.length}`;

  document.getElementById("door-game").style.display="none";
  document.getElementById("food-game").style.display="none";

  if(q.type==="normal"){
    q.options.forEach((opt,i)=>{
      let b=document.createElement("button");
      b.innerText=opt;
      b.onclick=()=>{if(i===q.answer)score++;next();};
      document.getElementById("answers").appendChild(b);
    });
  }

  if(q.type==="door"){
    document.getElementById("door-game").style.display="block";
  }

  if(q.type==="food"){
    let g=document.getElementById("food-game");
    g.innerHTML=q.question;

    q.options.forEach((opt,i)=>{
      let b=document.createElement("button");
      b.innerText=opt;
      b.onclick=()=>{if(i===q.answer)score++;next();};
      g.appendChild(b);
    });
  }
}

function chooseDoor(i){
  if(i===questions[currentQuestion].answer)score++;
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
    if(timeLeft<=0) endGame(0);
  },1000);
}

---

# 🦖 DINO GAME

function startDinoGame(){
  document.getElementById("game-intro").style.display="none";
  document.getElementById("game-screen").style.display="block";

  const dino=document.getElementById("dino");
  const obstacle=document.getElementById("obstacle");
  const scoreText=document.getElementById("game-score");

  let jumping=false;
  let obs=0;
  let pos=300;

  document.addEventListener("keydown",(e)=>{
    if(e.code==="Space"&&!jumping){
      jumping=true;
      dino.style.bottom="80px";
      setTimeout(()=>{dino.style.bottom="0px";jumping=false;},400);
    }
  });

  function loop(){
    pos-=6;

    if(pos<-40){
      obs++;
      scoreText.innerText=`${obs}/10`;
      pos=300;

      if(obs===10){
        endGame(obs);
        return;
      }
    }

    obstacle.style.right=pos+"px";

    let dinoBottom=parseInt(getComputedStyle(dino).bottom);

    if(pos<60&&pos>20&&dinoBottom<40){
      endGame(obs);
      return;
    }

    requestAnimationFrame(loop);
  }

  loop();
}

---

# 🏁 LEADERBOARD + FINAL SCREEN

function endGame(result){
  document.getElementById("game-screen").style.display="none";
  document.getElementById("level-screen").style.display="block";

  let percent=result*10;

  document.getElementById("level-text").innerText=
    `${playerName} → ${result}/10 (${percent}%)`;

  saveScore(result);
  showLeaderboard();
}

function saveScore(result){
  let board=JSON.parse(localStorage.getItem("board"))||[];

  board.push({name:playerName,score:result});

  board.sort((a,b)=>b.score-a.score);
  board=board.slice(0,5);

  localStorage.setItem("board",JSON.stringify(board));
}

function showLeaderboard(){
  let board=JSON.parse(localStorage.getItem("board"))||[];
  let html="";

  board.forEach((p,i)=>{
    html+=`${i+1}. ${p.name} - ${p.score}/10<br>`;
  });

  document.getElementById("leaderboard").innerHTML=html;
}

function resetGame(){
  location.reload();
}

---

# 🎨 STYLE.CSS (añade SOLO esto si te falta)

```css id="q8z1lp"
#leaderboard{
  margin-top:10px;
  font-size:18px;
}
