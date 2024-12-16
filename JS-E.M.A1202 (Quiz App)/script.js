const myQuestions = [
  {
    question: "Question 01: Javascript is ......language",
    answers: {
      a: "Programming",
      b: "Application",
      c: "None of these",
      d: "Scripting",
    },
    multi: false,
    correctAnswer: "d",
  },

  {
    question:
      "Question 02: Which is of the folowwing is a valid type of function javascript supports",
    answers: {
      a: "named function",
      b: "anoymus function",
      c: "both of the above",
      d: "none of the above",
    },
    multi: false,
    correctAnswer: "c",
  },

  {
    question:
      "Question 03: Which built-in method returns the index within the calling String object of the first occurrence of the specifed value",
    answers: {
      a: "getIndex()",
      b: "location()",
      c: "indexOf()",
      d: "getLocation()",
    },
    multi: false,
    correctAnswer: "c",
  },

  {
    question:
      "Question 04: Which one of the folowwing is valid data type of Javascript",
    answers: {
      a: "number",
      b: "void",
      c: "boolean",
      d: "nothing",
    },
    multi: false,
    correctAnswer: "c",
  },
];

let currentQuiz = 0;
let nextQuiz = 0;

// query element
const quizTitle = document.querySelector(".quiz__title");
const quizAnswers = document.querySelectorAll(".answer");
console.log(quizAnswers);

const aText = document.getElementById("a-label");
const bText = document.getElementById("b-label");
const cText = document.getElementById("c-label");
const dText = document.getElementById("d-label");
const nextBtn = document.getElementById("next");
const previousBtn = document.getElementById("previous");
const quizNumber = document.getElementById("quiz__number");

function loadQuiz() {
  deselectAnswer();
  const currentData = myQuestions[currentQuiz];
  quizTitle.innerText = currentData.question;
  aText.innerText = currentData.answers.a;
  bText.innerText = currentData.answers.b;
  cText.innerText = currentData.answers.c;
  dText.innerText = currentData.answers.d;
  quizNumber.innerText = currentQuiz + 1 + "/" + myQuestions.length;
}

function deselectAnswer() {
  quizAnswers.forEach((answersEl) => (answersEl.checked = false));
}

function getAnswer() {
  let answer;
  quizAnswers.forEach((answersEl) => {
    if (answersEl.checked) {
      answer = answersEl.id;
    }
  });
  return answer;
}

nextBtn.addEventListener("click", () => {
  let selectedAnswer = getAnswer();
  if (!selectedAnswer) {
    window.alert("Choose a answer, please");
    return;
  }

  if (selectedAnswer) {
    if (selectedAnswer === myQuestions[currentQuiz].correctAnswer) {
      window.alert("Your answer is correct");
    } else {
      window.alert("Wrong answer, please try again");
      return;
    }
  }

  if (currentQuiz < myQuestions.length - 1) {
    currentQuiz++;
    loadQuiz();
  } else {
    window.confirm("You have completed all the question. Congrat!!");
    currentQuiz = 0;
    loadQuiz();
  }
});

previousBtn.addEventListener("click", () => {
  if (currentQuiz > 0) {
    currentQuiz--;
    loadQuiz();
  } else {
    window.confirm("You must answer the questions in ascending order.");
  }
});

loadQuiz();
