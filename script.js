// Array of Question Objects
const questions = [
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    correctIndex: 3
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats"
    ],
    correctIndex: 1
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hypertext Markup Language",
      "Hypertext Markdown Language",
      "Hyperloop Machine Language",
      "Helicopters Terminals Motorboats"
    ],
    correctIndex: 0
  },
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    options: ["<script>", "<css>", "<style>", "<link>"],
    correctIndex: 2
  },
  {
    question: "How do you write 'Hello World' in an alert box in JavaScript?",
    options: [
      "msg('Hello World');",
      "alert('Hello World');",
      "alertBox('Hello World');",
      "msgBox('Hello World');"
    ],
    correctIndex: 1
  }
];

// DOM Elements
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");

const finalScore = document.getElementById("final-score");
const totalQuestions = document.getElementById("total-questions");
const scoreMessage = document.getElementById("score-message");
const restartBtn = document.getElementById("restart-btn");

// App State
let currentQuestionIndex = 0;
let score = 0;
let selectedOptionIndex = null;

// Initialize Quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  selectedOptionIndex = null;
  resultScreen.classList.add("hide");
  quizScreen.classList.remove("hide");
  loadQuestion();
}

// Load Question Details
function loadQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];

  // Update Header & Text
  questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  questionText.textContent = currentQuestion.question;

  // Create Options Buttons
  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option-btn");
    button.addEventListener("click", () => selectOption(index, button));
    optionsContainer.appendChild(button);
  });
}

// Reset Options and Next Button state
function resetState() {
  selectedOptionIndex = null;
  nextBtn.disabled = true;
  optionsContainer.innerHTML = "";
}

// Handle Option Selection
function selectOption(index, selectedButton) {
  selectedOptionIndex = index;

  // Remove selected highlight from all buttons
  const buttons = optionsContainer.querySelectorAll(".option-btn");
  buttons.forEach(btn => btn.classList.remove("selected"));

  // Highlight selected button & enable Next button
  selectedButton.classList.add("selected");
  nextBtn.disabled = false;
}

// Handle Next Button Click
nextBtn.addEventListener("click", () => {
  // Check if answer is correct
  if (selectedOptionIndex === questions[currentQuestionIndex].correctIndex) {
    score++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
});

// Show Final Result Screen
function showResults() {
  quizScreen.classList.add("hide");
  resultScreen.classList.remove("hide");

  finalScore.textContent = score;
  totalQuestions.textContent = questions.length;

  // Set Feedback Message based on score percentage
  const percentage = (score / questions.length) * 100;
  if (percentage === 100) {
    scoreMessage.textContent = "Excellent!";
  } else if (percentage >= 60) {
    scoreMessage.textContent = "Good Job!";
  } else {
    scoreMessage.textContent = "Keep Practicing!";
  }
}

// Restart Quiz Listener
restartBtn.addEventListener("click", startQuiz);

// Initial Call
startQuiz();