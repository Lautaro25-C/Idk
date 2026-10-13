//DOM//
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("screen-q");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("Question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("total-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "Cuál de estas es la capital de Francia?",
    answers: [
      { text: "Londres", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Qué planeta es conocido como el planeta rojo?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Marte", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturno", correct: false },
    ],
  },
  {
    question: "Cuál es el óceano más grande?",
    answers: [
      { text: "Óceano Atlántico", correct: false },
      { text: "Óceano Índico", correct: false },
      { text: "Óceano Ártico", correct: false },
      { text: "Óceano Pacífico", correct: true },
    ],
  },
  {
    question: "Cuál de estos NO es un lenguaje de programación?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "Cuál es el símbolo del oro en la tabla periódica?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

//event listeners//

startButton.addEventListener("click", StartQuiz);
restartButton.addEventListener("click", RestartQuiz);

function StartQuiz() {
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

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";
  questionText.textContent = currentQuestion.question;
  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    //answer funciona como un nombre para cada elemento del array, puede tomar el valor que queramos.//
    const button = document.createElement("button"); //construcción de botones//
    button.textContent = answer.text;
    button.classList.add("answer-btn"); //Agrega la clase para editar en el CSS ya que los botones no se crearon en html//
    button.dataset.correct = answer.correct; //accede al valor booleano, dataset guarda extra data, en este caso el valor correct//
    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button); //Incorpora el botón al html, append siginifca agregar al final y child signifia que queda dentro de otro elemento en HTML, en este caso el div declarado al final//
  });
}
function selectAnswer(event) {
  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct == "true";

  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct == "true") {
      button.classList.add("correct");
    } else if (button == selectedButton) {
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
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;
  if (percentage == 100) {
    resultMessage.textContent = "10/10, perfecto felicitaciones!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Casi perfecto, muy bien!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Acertaste la mayoria, muy bien!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Acertaste algunas, a mejorar!";
  } else {
    resultMessage.textContent =
      "Acertaste pocas, pero siempre se puede mejorar!";
  }
}

function RestartQuiz() {
  resultScreen.classList.remove("active");

  StartQuiz();
}
