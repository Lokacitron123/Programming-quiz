// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

quizQuestions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Trainer Marking Language", correct: false },
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Hyper Text Markdown Language", correct: false },
      { text: "High Text Machine Language", correct: false },
    ],
  },
  {
    question: "Which HTML tag is used to define an unordered list?",
    answers: [
      { text: "<ul>", correct: true },
      { text: "<ol>", correct: false },
      { text: "<li>", correct: false },
      { text: "<list>", correct: false },
    ],
  },
  {
    question: "Which property is used in CSS to change text color?",
    answers: [
      { text: "text-color", correct: false },
      { text: "font-color", correct: false },
      { text: "color", correct: true },
      { text: "text-style", correct: false },
    ],
  },
  {
    question: "How do you link a CSS file to an HTML file?",
    answers: [
      { text: "<link src='style.css'>", correct: false },
      { text: "<style href='style.css'>", correct: false },
      { text: "<link rel='stylesheet' href='style.css'>", correct: true },
      { text: "<stylesheet>style.css</stylesheet>", correct: false },
    ],
  },
  {
    question: "What is the correct way to declare a JavaScript variable?",
    answers: [
      { text: "variable myVar;", correct: false },
      { text: "let myVar;", correct: true },
      { text: "v myVar;", correct: false },
      { text: "var: myVar;", correct: false },
    ],
  },
  {
    question: "Which of the following is NOT a valid JavaScript data type?",
    answers: [
      { text: "Boolean", correct: false },
      { text: "Number", correct: false },
      { text: "Float", correct: true },
      { text: "String", correct: false },
    ],
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Colorful Style Sheets", correct: false },
      { text: "Creative Style Syntax", correct: false },
      { text: "Cascading Style Sheets", correct: true },
      { text: "Computer Styled Sections", correct: false },
    ],
  },
  {
    question: "How do you write a comment in JavaScript?",
    answers: [
      { text: "<!-- This is a comment -->", correct: false },
      { text: "// This is a comment", correct: true },
      { text: "** This is a comment **", correct: false },
      { text: "# This is a comment", correct: false },
    ],
  },
  {
    question: "Which tag is used to define a table row in HTML?",
    answers: [
      { text: "<td>", correct: false },
      { text: "<th>", correct: false },
      { text: "<tr>", correct: true },
      { text: "<row>", correct: false },
    ],
  },
  {
    question:
      "Which method adds a new element to the end of an array in JavaScript?",
    answers: [
      { text: "append()", correct: false },
      { text: "push()", correct: true },
      { text: "add()", correct: false },
      { text: "insert()", correct: false },
    ],
  },
  {
    question: "Which HTML element is used for the largest heading?",
    answers: [
      { text: "<h1>", correct: true },
      { text: "<head>", correct: false },
      { text: "<header>", correct: false },
      { text: "<h6>", correct: false },
    ],
  },
  {
    question:
      "Which of the following selectors selects an element with id='main'?",
    answers: [
      { text: ".main", correct: false },
      { text: "#main", correct: true },
      { text: "*main", correct: false },
      { text: "main", correct: false },
    ],
  },
  {
    question: "How do you call a function in JavaScript?",
    answers: [
      { text: "call myFunction()", correct: false },
      { text: "myFunction();", correct: true },
      { text: "run myFunction", correct: false },
      { text: "start(myFunction)", correct: false },
    ],
  },
  {
    question: "Which of these is used to apply styles to HTML?",
    answers: [
      { text: "HTML", correct: false },
      { text: "CSS", correct: true },
      { text: "JavaScript", correct: false },
      { text: "XML", correct: false },
    ],
  },
  {
    question: "Which JavaScript keyword is used to define a constant?",
    answers: [
      { text: "let", correct: false },
      { text: "var", correct: false },
      { text: "const", correct: true },
      { text: "constant", correct: false },
    ],
  },
  {
    question: "Which HTML tag is used to display a picture on a web page?",
    answers: [
      { text: "<picture>", correct: false },
      { text: "<img>", correct: true },
      { text: "<src>", correct: false },
      { text: "<image>", correct: false },
    ],
  },
  {
    question: "What does the '===' operator do in JavaScript?",
    answers: [
      { text: "Assigns a value", correct: false },
      { text: "Compares values and types", correct: true },
      { text: "Compares values only", correct: false },
      { text: "Checks if variable exists", correct: false },
    ],
  },
  {
    question: "Which CSS property controls the size of text?",
    answers: [
      { text: "font-weight", correct: false },
      { text: "text-style", correct: false },
      { text: "font-size", correct: true },
      { text: "text-size", correct: false },
    ],
  },
  {
    question: "Which HTML element is used to collect user input?",
    answers: [
      { text: "<input>", correct: true },
      { text: "<collect>", correct: false },
      { text: "<forminput>", correct: false },
      { text: "<textbox>", correct: false },
    ],
  },
  {
    question: "What is the default position of elements in CSS?",
    answers: [
      { text: "absolute", correct: false },
      { text: "relative", correct: false },
      { text: "static", correct: true },
      { text: "fixed", correct: false },
    ],
  },
];



totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  // reset vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  // reset state
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    // what is dataset? it's a property of the button element that allows you to store custom data
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  // optimization check
  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  // Here Array.from() is used to convert the NodeList returned by answersContainer.children into an array, this is because the NodeList is not an array and we need to use the forEach method
  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    // check if there are more questions or if the quiz is over
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}
