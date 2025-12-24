// ===============================
// CONFIG
// ===============================
const QUIZ_STORAGE_KEY = "quizAttempted";
const SCORE_STORAGE_KEY = "quizFinalScore"; // ✅ ADDED
const ADMIN_RESET_CODE = "2026"; // 🔐 CHANGE THIS

// ===============================
// DOM ELEMENTS
// ===============================
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");

const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");

const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");

const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");

const resultMessage = document.getElementById("result-message");
const progressBar = document.getElementById("progress");

const symbol = "\u2208"; // ∈

// ===============================
// QUESTIONS
// ===============================
const quizQuestions = [
    {
    question: "What is (2)<sup>9</sup>  x (2)<sup>11</sup> ?",
    answers: [
      { text: "1024", correct: false },
      { text: "(2)<sup>20</sup>", correct: true },
      { text: "(2)<sup>3</sup>", correct: false },
      { text: "none of these", correct: false },
    ],
  },
  {
    question: "What is the value of -p<sup>125</sup> &divide; -p<sup>100</sup>?",
    answers: [
      { text: "-p<sup>225</sup>", correct: false },
      { text: "p<sup>125</sup>", correct: false },
      { text: "-p<sup>25</sup>", correct: true },
      { text: "none of these", correct: false },
    ],
  },
  {
    question: "Evaluate (<sup> -4</sup>&frasl;<sub>11</sub>)<sup>3</sup>",
    answers: [
      { text: "(<sup>-1331</sup>&frasl;<sub>64</sub>)", correct: true },
      { text: "(<sup>-64</sup>&frasl;<sub>1331</sub>)", correct: false },
      { text: "(<sup>-11</sup>&frasl;<sub>4</sub>)<sup>3</sup>", correct: false},
      { text: "none of these", correct: false },
    ],
  },
  {
    question: "Simplify ((3x)<sup>2</sup>)<sup>2</sup>(xy)<sup>-2</sup>",
    answers: [
      { text: "9x<sup>2</sup>&frasl;<sub> y</sub><sup>2</sup>", correct: true },
      { text: "(9x<sup>2</sup>)<sup>4</sup>&frasl; y<sup>4</sup>", correct: false },
      { text: "3x<sup>2</sup>&frasl; y<sup>2</sup>", correct: false},
      { text: "none of these", correct: false },
    ],
  },
  {
    question: "Simplify (-3)<suP>5</sup> &divide; (-3)<suP>3</sup> x (-3)<suP>7</sup>",
    answers: [
      { text: "(3)<suP>9</sup>", correct: false },
      { text: "(-3)<suP>7</sup>", correct: false },
      { text: "(-3)<suP>9</sup>", correct: true},
      { text: "none of these", correct: false },
    ],
  },
  {
    question: "Simplify (-7)<suP>0</sup> + (8)<suP>0</sup> + (5)<suP>0</sup>",
    answers: [
      { text: "1", correct: false },
      { text: "0", correct: false },
      { text: "3", correct: true},
      { text: "none of these", correct: false },
    ],
  },
   {
    question: "Solve for x,   7<suP>3x-1</sup> = 49 x 7<suP>3</sup>",
    answers: [
      { text: "x = 1", correct: false },
      { text: "x = 0", correct: false },
      { text: "x = 2", correct: true},
      { text: "none of these", correct: false },
    ],
  },
   {
    question: "Simplify (<suP>1</sup> &frasl; <sub>3</sub>)<suP>-2</sup> + (<suP>1</sup> &frasl; <sub>5</sub>)<suP>-2</sup> +  (<suP>1</sup> &frasl; <sub>7</sub>)<suP>-2</sup>",
    answers: [
      { text: "91", correct: false },
      { text: "<suP>1</sup> &frasl; <sub>83</sub>", correct: false },
      { text: "83", correct: true},
      { text: "none of these", correct: false },
    ],
  },
  {
    question: "Solve for x,   5<sup>2x+1</sup> = 5<suP>3</sup> x 625",
    answers: [
      { text: "x = 4", correct: false },
      { text: "x = 3", correct: true},
      { text: "x = 2", correct: false},
      { text: "none of these", correct: false },
    ],
  },
  {
    question: "Expressed as a product of prime factors in exponential form :- 2500",
    answers: [
      { text: " 2<sup>2</sup> x  5<sup>4</sup>", correct: true },
      { text: "5<sup>2</sup> x  10<sup>2</sup>", correct: false},
      { text: "2<sup>3</sup> x  5<sup>2</sup>", correct: false},
      { text: "none of these", correct: false },
    ],
  },
  {
    question: "Simplify, [{( <sup>-1</sup> &frasl; <sub>5</sub> )<sup>2</sup>}<sup>2</sup>]<sup>3</sup> &divide; (-5)<sup>-8</sup>",
    answers: [
      { text: "3125", correct: false },
      { text: "<sup>1</sup> &frasl; <sub>625</sub>", correct: true},
      { text: "625", correct: false},
      { text: "none of these", correct: false },
    ],
  },
  {
    question: "Simplify:- <sup>81 x 8</sup> &frasl; <sub>32 x 243</sub>",
    answers: [
      { text: "24", correct: false },
      { text: "<suP>1</sup> &frasl; <sub>24</sub>", correct: false },
      { text: "<sup>1</sup> &frasl; <sub>12</sub>", correct: true},
      { text: "none of these", correct: false },
    ],
  },
  {
    question: "Simplify:- <sup>5<sup>6</sup> x 11<sup>3</sup> &frasl; <sub>121 x 11<sup>4</sup> x 625</sub>",
    answers: [
      { text: "<sup>25</sup> &frasl; <sub>1331</sub>", correct: true },
      { text: "<sup>1331</sup> &frasl; <sub>625</sub>", correct: false },
      { text: "<sup>125</sup> &frasl; <sub>121</sub>", correct: false},
      { text: "none of these", correct: false },
    ],
  },
  {
    question: "Simplify:- (5<sup>2</sup> - 3 <sup>2</sup>) x (<sup>2<sub>&frasl;<sub>3</sub>)<sup>-2</sup>",
    answers: [
      { text: "48", correct: false },
      { text: "36", correct: true },
      { text: "9", correct: false},
      { text: "none of these", correct: false },
    ],
  },
  {
    question: "Simplify:- {(5)<sup> -5 </sup>}<sup> -7 </sup> = (5)<sup> x-3 </sup>",
    answers: [
      { text: "33", correct: false },
      { text: "18", correct: false },
      { text: "36", correct: false},
      { text: "none of these", correct: true },
    ],
  },
    {
    question: "Which of these statements are set?",
    answers: [
      { text: "The collection of members between 4 and 12", correct: false },
      { text: "The collection of class XII Physics books by the same author", correct: false },
      { text: "The collection of students in your classroom", correct: false },
      { text: "All of these", correct: true },
    ],
  },
   {
    question: "{6, 9, 10} is the same as {10, 9, 6}",
    answers: [
      { text: "False", correct: false },
      { text: "Undefined", correct: false },
      { text: "True", correct: true },
      { text: "None of these", correct: false },
    ],
  },
   {
    question: "D = Set of prime numbers from 5 to 18 (in roaster notation)",
    answers: [
      { text: "{5, 7, 11, 13, 17}", correct: true },
      { text: "{7, 11, 13, 17}", correct: false },
      { text: "{5, 7, 9, 11, 13, 17}", correct: false },
      { text: "None of these", correct: false },
    ],
  },
  {
    question: "G ={x:x ∈ W and x ≤ 6 } (in roaster notation)",
    answers: [
      { text: "{1, 2, 3, 4, 5, 6}", correct: false },
      { text: "{0, 1, 2, 3, 4, 5, 6}", correct: true },
      { text: "{-1, 0, 1, 2, 3, 4, 5, 6}", correct: false },
      { text: "None of these", correct: false },
    ],
  },
   {
    question: "Express in set builder form {2, 4, 6, 8, 10, ...}",
    answers: [
      { text: "{x:x = 2n, n ∈ W }", correct: false },
      { text: "{x:x = 2n<sup> 2 </sup>, n ∈ N }", correct: false },
      { text: "{x:x = 2n, n ∈ N }", correct: true },
      { text: "None of these", correct: false },
    ],
  },
  {
    question: "Express in description method {x:x is an integer and -4 < x < 4}",
    answers: [
      { text: "{All whole numbers between -4 and 4}", correct: false },
      { text: "{All integers between -4 and 4}", correct: true  },
      { text: "{All natural numbers between -4 and 4 }", correct: false },
      { text: "None of these", correct: false },
    ],
  },
  {
    question: "Cardinal number of D = Set of letters in the word 'AMAZING'",
    answers: [
      { text: "n(E) = 7", correct: false },
      { text: "n(E) = 6", correct: false  },
      { text: "n(D) = 5", correct: false },
      { text: "None of these", correct: true },
    ],
  },
  {
    question: "Which of these are Finite set",
    answers: [
      { text: "A = {Multiple of 8 less than 100}", correct: false },
      { text: "B = {Whole numbers more than 10 less than 22}", correct: false  },
      { text: "Both A and B", correct: true },
      { text: "None of these", correct: false },
    ],
  },
  {
    question: "Which of these are Infinite set",
    answers: [
      { text: "A = {set of quadrilaterals}", correct: true },
      { text: "B = {x : x is a natural number less than -2}", correct: false  },
      { text: "Both A and B", correct: false },
      { text: "None of these", correct: false },
    ],
  },
  {
    question: "Which of the following sets are disjoint",
    answers: [
      { text: "{set of all odd numbers} and {set of all even numbers} ", correct: false },
      { text: "{x : x is a member of Cricket team} and {x : x is a member of Football team}", correct: false  },
      { text: "Both A and B", correct: true },
      { text: "None of these", correct: false },
    ],
  },
   {
    question: "Which of the following are equivalent sets",
    answers: [
      { text: "A = {multiples of 6 less than 50} and B = {Multiples of 4 up to 32} ", correct: false },
      { text: "P = {Prime numbers which divide 70 exactly} and Q = {Prime numbers which divide 90 exactly}", correct: false  },
      { text: "M = {x is an odd natural number less than 12 and N = {x:x = m + 2, m ∈ N and m ≤ 6  ", correct: false },
      { text: "All of these", correct: true },
    ],
  },
  {
    question: "Which of the following are empty sets",
    answers: [
      { text: "{x : x + 4 = 1 and x ∈ N} ", correct: false },
      { text: "A = {32nd day of a month}", correct: false  },
      { text: "{Letter v in the word 'remember'}", correct: false },
      { text: "All of these", correct: true },
    ],
  },
  {
    question: "An empty set is a _______ of every set.",
    answers: [
      { text: "subset", correct: false },
      { text: "proper subset", correct: true },
      { text: "Null", correct: false },
      { text: "None of these", correct: false },
    ],
  },
  {
    question: "The number of proper subsets can be found out using the formula ______ .",
    answers: [
      { text: "2<sup>n</sup>", correct: false },
      { text: "2n", correct: false  },
      { text: "2n-1", correct: true },
      { text: "None of these", correct: false },
    ],
  },
  {
    question: "If A = {2, 3, 4, 6} then which of the following are subsets of A .",
    answers: [
      { text: "C = {0}", correct: false },
      { text: "D = {2, 8}", correct: false  },
      { text: "Both C and D", correct: false },
      { text: "None of these", correct: true },
    ],
  },
  {
    question: "How many subsets can be made from Set of square numbers less than 10 ?",
    answers: [
      { text: "8", correct: true },
      { text: "9", correct: false  },
      { text: "Undefined", correct: false },
      { text: "None of these", correct: false },
    ],
  },
];

// ===============================
// STATE
// ===============================
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

// ===============================
// INIT
// ===============================
totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// ===============================
// LOCK CHECK
// ===============================
if (localStorage.getItem(QUIZ_STORAGE_KEY)) {
  startScreen.classList.remove("active");
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  // ✅ ADDED: restore saved score
  const savedScore = localStorage.getItem(SCORE_STORAGE_KEY);
  if (savedScore !== null) {
    finalScoreSpan.textContent = savedScore;
    scoreSpan.textContent = savedScore;
  }

  resultMessage.textContent = "Don't try to cheat, Saishree .";
  restartButton.style.display = "none";

  setTimeout(() => {
    const code = prompt("Enter admin reset code:");
    if (code === ADMIN_RESET_CODE) {
      localStorage.removeItem(QUIZ_STORAGE_KEY);
      localStorage.removeItem(SCORE_STORAGE_KEY); // ✅ ADDED
      location.reload();
    }
  }, 500);
} else {
  startButton.addEventListener("click", startQuiz);
}

// ===============================
// FUNCTIONS
// ===============================
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = score;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent =
    ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.innerHTML = currentQuestion.question;
  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("answer-btn");
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  if (answersDisabled) return;
  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

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
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  localStorage.setItem(QUIZ_STORAGE_KEY, "true");

  // ✅ ADDED: save final score
  localStorage.setItem(SCORE_STORAGE_KEY, score);

  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Just Perfect!";
  } else if (percentage >= 85) {
    resultMessage.textContent = "Good effort! SaiShree!";
  } else if (percentage >= 70) {
    resultMessage.textContent = "Not bad! Keep learning SaiShree!";
  } else if (percentage >= 50) {
    resultMessage.textContent = "Very bad! Clear your concepts to improve!";
  } else {
    resultMessage.textContent = "Be ready to be scolded!";
  }

  restartButton.style.display = "none";
}
