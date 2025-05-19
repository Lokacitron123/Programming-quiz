// DOM Elements
const startScreen = document.getElementById("start-screen");
const topicScreen = document.getElementById("topic-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const topicContainer = document.getElementById("topic-container");
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
let selectedTopic = "";
let quizQuestions = [];

// Topics array
const topics = [
  {
    topic: "JavaScript",
    questions: [
      {
        question:
          "What is the correct syntax to declare a constant in JavaScript?",
        answers: [
          { text: "var", correct: false },
          { text: "const", correct: true },
          { text: "let", correct: false },
          { text: "constant", correct: false },
        ],
      },
      {
        question: "Which of the following is a JavaScript data type?",
        answers: [
          { text: "String", correct: true },
          { text: "Float", correct: false },
          { text: "Character", correct: false },
          { text: "Double", correct: false },
        ],
      },
      {
        question:
          "Which method is used to convert a JSON string into an object?",
        answers: [
          { text: "JSON.parse()", correct: true },
          { text: "JSON.stringify()", correct: false },
          { text: "parse.JSON()", correct: false },
          { text: "JSON.objectify()", correct: false },
        ],
      },
      {
        question: "How do you write a comment in JavaScript?",
        answers: [
          { text: "# This is a comment", correct: false },
          { text: "// This is a comment", correct: true },
          { text: "<!-- This is a comment -->", correct: false },
          { text: "** This is a comment **", correct: false },
        ],
      },
      {
        question: "What will `typeof null` return?",
        answers: [
          { text: '"null"', correct: false },
          { text: '"undefined"', correct: false },
          { text: '"object"', correct: true },
          { text: '"boolean"', correct: false },
        ],
      },
      {
        question: "Which operator is used to assign a value to a variable?",
        answers: [
          { text: "==", correct: false },
          { text: "=", correct: true },
          { text: "===", correct: false },
          { text: "=>", correct: false },
        ],
      },
      {
        question: "What does `===` do in JavaScript?",
        answers: [
          { text: "Assigns a value", correct: false },
          { text: "Compares values and types", correct: true },
          { text: "Compares only values", correct: false },
          { text: "Checks for null or undefined", correct: false },
        ],
      },
      {
        question: "How can you declare an arrow function?",
        answers: [
          { text: "function => myFunc() {}", correct: false },
          { text: "const myFunc = () => {}", correct: true },
          { text: "myFunc := function() {}", correct: false },
          { text: "const => myFunc() {}", correct: false },
        ],
      },
      {
        question: "Which method adds an element to the end of an array?",
        answers: [
          { text: "push()", correct: true },
          { text: "pop()", correct: false },
          { text: "shift()", correct: false },
          { text: "unshift()", correct: false },
        ],
      },
      {
        question: "What does `NaN` stand for?",
        answers: [
          { text: "Not a Name", correct: false },
          { text: "Not a Number", correct: true },
          { text: "Negative and Null", correct: false },
          { text: "No assigned Name", correct: false },
        ],
      },
      {
        question: "What does the `Array.prototype.map()` method do?",
        answers: [
          { text: "Modifies the original array", correct: false },
          { text: "Returns a new array with modified elements", correct: true },
          { text: "Filters out undefined values", correct: false },
          { text: "Sorts the array", correct: false },
        ],
      },
      {
        question: "What is the result of `Boolean('false')`?",
        answers: [
          { text: "false", correct: false },
          { text: "true", correct: true },
          { text: "undefined", correct: false },
          { text: "null", correct: false },
        ],
      },
      {
        question: "Which keyword is used to handle errors in JavaScript?",
        answers: [
          { text: "try/catch", correct: true },
          { text: "if/else", correct: false },
          { text: "error/handle", correct: false },
          { text: "do/catch", correct: false },
        ],
      },
      {
        question: "What is a closure in JavaScript?",
        answers: [
          { text: "An object with methods", correct: false },
          {
            text: "A function having access to its outer scope",
            correct: true,
          },
          { text: "A block-scoped variable", correct: false },
          { text: "A global variable", correct: false },
        ],
      },
      {
        question: "Which value is *falsy* in JavaScript?",
        answers: [
          { text: `"hello"`, correct: false },
          { text: `0`, correct: true },
          { text: `{}`, correct: false },
          { text: `[]`, correct: false },
        ],
      },
    ],
  },
  {
    topic: "CSS",
    questions: [
      {
        question: "What does CSS stand for?",
        answers: [
          { text: "Cascading Style Sheets", correct: true },
          { text: "Creative Styling Syntax", correct: false },
          { text: "Computer Styled Sections", correct: false },
          { text: "Colorful Style System", correct: false },
        ],
      },
      {
        question: "Which property is used to change text color?",
        answers: [
          { text: "font-color", correct: false },
          { text: "text-color", correct: false },
          { text: "color", correct: true },
          { text: "textStyle", correct: false },
        ],
      },
      {
        question: "How do you select an element with the id 'main'?",
        answers: [
          { text: "#main", correct: true },
          { text: ".main", correct: false },
          { text: "main", correct: false },
          { text: "*main", correct: false },
        ],
      },
      {
        question: "What does the 'box-sizing: border-box' property do?",
        answers: [
          { text: "Adds padding outside the box", correct: false },
          {
            text: "Excludes padding and border from width/height",
            correct: false,
          },
          {
            text: "Includes padding and border in width/height",
            correct: true,
          },
          { text: "Fixes box size to a default value", correct: false },
        ],
      },
      {
        question: "Which property makes text bold?",
        answers: [
          { text: "font-weight", correct: true },
          { text: "font-style", correct: false },
          { text: "text-weight", correct: false },
          { text: "bold", correct: false },
        ],
      },
      {
        question: "How do you apply a class in CSS?",
        answers: [
          { text: "#classname", correct: false },
          { text: ".classname", correct: true },
          { text: "*classname", correct: false },
          { text: "/classname", correct: false },
        ],
      },
      {
        question: "What is the default position value in CSS?",
        answers: [
          { text: "absolute", correct: false },
          { text: "relative", correct: false },
          { text: "static", correct: true },
          { text: "fixed", correct: false },
        ],
      },
      {
        question:
          "Which property is used to set the spacing between lines of text?",
        answers: [
          { text: "line-spacing", correct: false },
          { text: "line-height", correct: true },
          { text: "text-spacing", correct: false },
          { text: "spacing", correct: false },
        ],
      },
      {
        question: "Which property sets the background color?",
        answers: [
          { text: "color", correct: false },
          { text: "background", correct: false },
          { text: "background-color", correct: true },
          { text: "bg-color", correct: false },
        ],
      },
      {
        question: "What does `em` unit refer to in CSS?",
        answers: [
          { text: "The browser default font size", correct: false },
          { text: "The font size of the parent element", correct: true },
          { text: "Exactly 12px", correct: false },
          { text: "The height of the viewport", correct: false },
        ],
      },
      {
        question:
          "Which CSS rule is used to center a block element horizontally?",
        answers: [
          { text: "margin: 0;", correct: false },
          { text: "text-align: center;", correct: false },
          { text: "margin: 0 auto;", correct: true },
          { text: "align: center;", correct: false },
        ],
      },
      {
        question: "What pseudo-class targets the first child of a parent?",
        answers: [
          { text: ":first-element", correct: false },
          { text: ":first-child", correct: true },
          { text: "::first", correct: false },
          { text: ":first", correct: false },
        ],
      },
      {
        question: "Which property controls the stacking order of elements?",
        answers: [
          { text: "order", correct: false },
          { text: "z-index", correct: true },
          { text: "position", correct: false },
          { text: "stack", correct: false },
        ],
      },
      {
        question: "What does `flex: 1` mean in a flexbox layout?",
        answers: [
          { text: "Set the element width to 1px", correct: false },
          {
            text: "Element can grow and shrink, taking available space",
            correct: true,
          },
          { text: "Set the order of the item to 1", correct: false },
          { text: "Center the item", correct: false },
        ],
      },
      {
        question: "Which media query targets screens larger than 768px?",
        answers: [
          { text: "@media (max-width: 768px)", correct: false },
          { text: "@media screen and (width: 768px)", correct: false },
          { text: "@media (min-width: 768px)", correct: true },
          { text: "@media screen and (max-width: 768px)", correct: false },
        ],
      },
    ],
  },
  {
    topic: "HTML",
    questions: [
      {
        question: "What does HTML stand for?",
        answers: [
          { text: "Hyper Trainer Markup Language", correct: false },
          { text: "Hyper Text Markup Language", correct: true },
          { text: "Hyper Text Markdown Language", correct: false },
          { text: "High Text Machine Language", correct: false },
        ],
      },
      {
        question: "Which HTML tag is used to create a hyperlink?",
        answers: [
          { text: "<link>", correct: false },
          { text: "<a>", correct: true },
          { text: "<href>", correct: false },
          { text: "<url>", correct: false },
        ],
      },
      {
        question: "Which tag is used to insert an image in HTML?",
        answers: [
          { text: "<image>", correct: false },
          { text: "<img>", correct: true },
          { text: "<pic>", correct: false },
          { text: "<src>", correct: false },
        ],
      },
      {
        question: "What does the <head> element contain?",
        answers: [
          { text: "The main content", correct: false },
          { text: "Metadata about the document", correct: true },
          { text: "Page footer information", correct: false },
          { text: "Navigation links", correct: false },
        ],
      },
      {
        question: "Which HTML element is used for the largest heading?",
        answers: [
          { text: "<h6>", correct: false },
          { text: "<heading>", correct: false },
          { text: "<h1>", correct: true },
          { text: "<header>", correct: false },
        ],
      },
      {
        question: "What is the correct way to create a checkbox in HTML?",
        answers: [
          { text: "<input type='checkbox'>", correct: true },
          { text: "<checkbox>", correct: false },
          { text: "<input type='check'>", correct: false },
          { text: "<input checkbox='true'>", correct: false },
        ],
      },
      {
        question: "What is the purpose of the alt attribute on <img> tags?",
        answers: [
          { text: "To change image size", correct: false },
          { text: "To style the image", correct: false },
          { text: "To display text if the image fails to load", correct: true },
          { text: "To create a link from the image", correct: false },
        ],
      },
      {
        question: "Which HTML tag is used to define a table row?",
        answers: [
          { text: "<tr>", correct: true },
          { text: "<td>", correct: false },
          { text: "<table-row>", correct: false },
          { text: "<row>", correct: false },
        ],
      },
      {
        question: "Which element is used for inserting a line break?",
        answers: [
          { text: "<break>", correct: false },
          { text: "<lb>", correct: false },
          { text: "<br>", correct: true },
          { text: "<newline>", correct: false },
        ],
      },
      {
        question: "How do you make text italic in HTML?",
        answers: [
          { text: "<italic>", correct: false },
          { text: "<em>", correct: true },
          { text: "<iText>", correct: false },
          { text: "<it>", correct: false },
        ],
      },
      {
        question: "Which tag is used to define an unordered list?",
        answers: [
          { text: "<ol>", correct: false },
          { text: "<ul>", correct: true },
          { text: "<list>", correct: false },
          { text: "<li>", correct: false },
        ],
      },
      {
        question: "What is the purpose of the <form> element?",
        answers: [
          { text: "To style inputs", correct: false },
          { text: "To send user input to a server", correct: true },
          { text: "To create an image gallery", correct: false },
          { text: "To validate text", correct: false },
        ],
      },
      {
        question: "Which tag is used to create a dropdown list?",
        answers: [
          { text: "<input type='dropdown'>", correct: false },
          { text: "<select>", correct: true },
          { text: "<dropdown>", correct: false },
          { text: "<listbox>", correct: false },
        ],
      },
      {
        question: "What does the <meta> tag do?",
        answers: [
          { text: "Displays a message to the user", correct: false },
          { text: "Adds styling to the page", correct: false },
          {
            text: "Provides metadata like character set and page description",
            correct: true,
          },
          { text: "Links to JavaScript files", correct: false },
        ],
      },
      {
        question: "Which tag is used to embed JavaScript in an HTML page?",
        answers: [
          { text: "<js>", correct: false },
          { text: "<script>", correct: true },
          { text: "<javascript>", correct: false },
          { text: "<code>", correct: false },
        ],
      },
    ],
  },
];

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners

startButton.addEventListener("click", moveToTopics);
restartButton.addEventListener("click", restartQuiz);

function moveToTopics() {
  startScreen.classList.remove("active");
  topicScreen.classList.add("active");

  topics.forEach((topic) => {
    const button = document.createElement("button");
    button.textContent = topic.topic;

    button.addEventListener("click", () => {
      selectedTopic = topic.topic;
      quizQuestions = topic.questions;

      startQuiz(selectedTopic);
    });

    topicContainer.appendChild(button);
  });
}

function startQuiz(selectedTopic) {
  // reset vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;
  totalQuestionsSpan.textContent = quizQuestions.length;

  topicScreen.remove("active");
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
