var welcomeEl = document.getElementById("welcome-title");
var timerEl = document.getElementById("timer-section");
var startbutton = document.getElementById("start-button");
var questionsection = document.getElementById("question-section");
var answersection = document.getElementById("answer-section");
var resultsection = document.getElementById("result-section");
var formsection = document.getElementById("main");
var usernameinput = document.getElementById("user-name");
var submitButton = document.getElementById("submit-button");
var highscoreList = document.getElementById("high-score-list");
var scorePage = document.getElementById("score-page");
var restartButton = document.getElementById("restart-button");

scorePage.style.display = "none";
formsection.style.display = "none";

var quizbank = [
	{
		question: "What is 10/2?",
		answers: {
			a: '3',
			b: '5',
			c: '115',
      d: '118'
		},
		correctAnswer: 'b'
	},

	{
		question: "What is 30/3?",
		answers: {
			a: '3',
			b: '5',
			c: '10',
      d: '12'
		},
		correctAnswer: 'c'
	},

  {
		question: "What is 50/2?",
		answers: {
			a: '25',
			b: '35',
			c: '10',
      d: '15'
		},
		correctAnswer: 'a'
	}
];

var WINCOUNTER = 0
var QUIZCOUNTER = 0
timeLeft = 30;


// START BUTTON
startbutton.addEventListener("click", function() {
  timerEl.textContent = timeLeft + " seconds remaining";
  countdown();
  showquestion();
  startbutton.style.display = "none";
});

// COUNT DOWN FUNCTION
function countdown() {
  var timerInterval = setInterval(MYFUNCTION,1000);
  
  function MYFUNCTION() {
    timeLeft--;
    timerEl.textContent = timeLeft + " seconds remaining";
    if(timeLeft == 1) {
      timerEl.textContent = timeLeft + " second remaining";
    }
    if(timeLeft <= 0) {
      clearInterval(timerInterval);
      timerEl.textContent = "TIME IS FREAKING UP";
      gameisover();
    }
  };
}

// SHOW QUESTIONS AND ANSWERS
function showquestion() {
  questionsection.textContent = quizbank[QUIZCOUNTER].question;

  let btna = document.createElement("button");
  btna.id ='a';
  btna.classList.add('mp');
  btna.innerHTML = quizbank[QUIZCOUNTER].answers.a;
  answersection.appendChild(btna);
  
  let btnb = document.createElement("button");
  btnb.id ='b';
  btnb.classList.add('mp');
  btnb.innerHTML = quizbank[QUIZCOUNTER].answers.b;
  answersection.appendChild(btnb);
  
  let btnc = document.createElement("button");
  btnc.id ='c';
  btnc.classList.add('mp');
  btnc.innerHTML = quizbank[QUIZCOUNTER].answers.c;
  answersection.appendChild(btnc);

  let btnd = document.createElement("button");
  btnd.id ='d';
  btnd.classList.add('mp');
  btnd.innerHTML = quizbank[QUIZCOUNTER].answers.d;
  answersection.appendChild(btnd);

  answerquestion();
}


// ANSWER THE QUESTION 
function answerquestion() {
  var buttonchoices = document.querySelectorAll('.mp')
  console.log(buttonchoices.length)

  for (var i = 0; i < buttonchoices.length; i++) {
      buttonchoices[i].addEventListener("click", 
      function (event) {

      buttonchoices.forEach(buttonchoice => {
        buttonchoice.remove();
      });

	    if (event.target.id == quizbank[QUIZCOUNTER].correctAnswer) {
        WINCOUNTER += timeLeft;
        resultsection.textContent = "CORRECT!";
        setTimeout(function() {
          resultsection.textContent = "";
        }, 1000);
      } 
      
      if (event.target.id !== quizbank[QUIZCOUNTER].correctAnswer) {
        timeLeft -= 15;
        resultsection.textContent = "WRONG YOU IDIOT! 15 LESS SECONDS NOW! HAHAHA!"
        setTimeout(function() {
          resultsection.textContent = "";
        }, 1000);
      } 

      if (QUIZCOUNTER < quizbank.length -+ 1) {
        QUIZCOUNTER++;
        showquestion();
      } else {
        timeLeft=0;
      }
      
      }); 
  }
}


// OOPS GAME IS OVER 
function gameisover() {
  formsection.style.display = "block";
  welcomeEl.textContent = "You Score is " + WINCOUNTER + ". Please enter your name!";
  timerEl.style.display = "none";
  questionsection.style.display = "none";
  answersection.style.display = "none";
  resultsection.style.display = "none";
}


// SUBMISSION IS ALL I ASK FOR (STORES USERNAME AND SCORES)
var highscores = [];
var players = [];
submitButton.addEventListener("click", function(event) {
  event.preventDefault();

  var storedScores = JSON.parse(localStorage.getItem("highscores"));
  var storedPlayers = JSON.parse(localStorage.getItem("players"));

  if (storedScores !== null) {
    highscores = storedScores;
    players = storedPlayers;
  }

  highscores.push(WINCOUNTER);
  players.push(usernameinput.value);

  localStorage.setItem("highscores", JSON.stringify(highscores));
  localStorage.setItem("players", JSON.stringify(players));
  
  formsection.style.display = "none";
  renderHighscores()
});



function renderHighscores() {
  // Clear todoList element and update todoCountSpan
  highscoreList.innerHTML = "";
  scorePage.style.display = "block";

  // Render a new li for each todo
  for (var i = 0; i < players.length; i++) {
    var player = players[i];
    var score = highscores[i];

    var li = document.createElement("li");
    li.textContent = "Player "+player+" has a score of "+score;
    li.setAttribute("data-index", i);

    highscoreList.appendChild(li);
  }
}

restartButton.addEventListener("click", function(event) {
  location.reload()
});

