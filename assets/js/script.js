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
var clearButton = document.getElementById("clear-button");

scorePage.style.display = "none";
formsection.style.display = "none";

var quizbank = [
	{
		question: "Inside which HTML element do we put the JavaScript?",
		answers: {
			a: '<js>',
			b: '<script>',
			c: '<scripting>',
      d: '<javascript>'
		},
		correctAnswer: 'b'
	},

	{
		question: "What is the correct syntax for referring to an external script called xxx.js?",
		answers: {
			a: '<script src="xxx.js">',
			b: '<script name="xxx.js">',
			c: '<script href="xxx.js">',
      d: '<script id="xxx.js">'
		},
		correctAnswer: 'a'
	},

	{
		question: "Which of the following is not a valid JavaScript variable name?",
		answers: {
			a: 'java_names',
			b: '2java',
			c: 'javaandjava',
      d: 'none of the above'
		},
		correctAnswer: 'b'
	},

	{
		question: "How do you write Hello World in an alert box?",
		answers: {
			a: 'msgBox("Hello World")',
			b: 'alertBox("Hello World")',
			c: 'msg("Hello World")',
      d: 'alert("Hello World")'
		},
		correctAnswer: 'd'
	},

  {
		question: "Which attribute needs to be changed to make elements invisible?",
		answers: {
			a: 'visibility',
			b: 'invisible',
			c: 'invisibility',
      d: 'visible'
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
  btna.textContent = quizbank[QUIZCOUNTER].answers.a;
  answersection.appendChild(btna);
  
  let btnb = document.createElement("button");
  btnb.id ='b';
  btnb.classList.add('mp');
  btnb.textContent = quizbank[QUIZCOUNTER].answers.b;
  answersection.appendChild(btnb);
  
  let btnc = document.createElement("button");
  btnc.id ='c';
  btnc.classList.add('mp');
  btnc.textContent = quizbank[QUIZCOUNTER].answers.c;
  answersection.appendChild(btnc);

  let btnd = document.createElement("button");
  btnd.id ='d';
  btnd.classList.add('mp');
  btnd.textContent = quizbank[QUIZCOUNTER].answers.d;
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
        resultsection.textContent = "CORRECT! YOU ARE ACING THIS EXTREMELY BASIC QUIZ!";
        setTimeout(function() {
          resultsection.textContent = "";
        }, 3000);
      } 
      
      if (event.target.id !== quizbank[QUIZCOUNTER].correctAnswer) {
        timeLeft -= 15;
        resultsection.textContent = "WRONG YOU IDIOT! 15 LESS SECONDS NOW! HAHAHA!"
        setTimeout(function() {
          resultsection.textContent = "";
        }, 3000);
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

  
  if (usernameinput.value == '') {
    alert('PLEASE ENTER YOUR NAME! YOU HAD ONE JOB!')
  } else {
    highscores.push(WINCOUNTER);
    players.push(usernameinput.value);
    
    const combinedlist = [];
    for (var j = 0; j < players.length; j++) 
        combinedlist.push({'player': players[j], 'score': highscores[j]});
  
    combinedlist.sort((a, b) => {
      if (a.score < b.score)
        return 1;
      if (a.score > b.score)
        return -1;
      return 0;
    });
  
    console.log(combinedlist)
  
    for (var k = 0; k < combinedlist.length; k++) {
        players[k] = combinedlist[k].player;
        highscores[k] = combinedlist[k].score;
    }
  
    localStorage.setItem("highscores", JSON.stringify(highscores));
    localStorage.setItem("players", JSON.stringify(players));
    
    formsection.style.display = "none";
    renderHighscores()
  }

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
    var rank = i+1
    li.textContent = "#" + rank + ": Player "+player+" has a score of "+score;
    li.setAttribute("data-index", i);

    highscoreList.appendChild(li);
  }
}


restartButton.addEventListener("click", function(event) {
  location.reload()
});


clearButton.addEventListener("click", function(event) {
  highscoreList.innerHTML = "";
  clearButton.style.display = "none";
  var highscores = [];
  var players = [];
  localStorage.setItem("highscores", JSON.stringify(highscores));
  localStorage.setItem("players", JSON.stringify(players));
});
