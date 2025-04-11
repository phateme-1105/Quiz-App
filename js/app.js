// ** Select Elements **

const startBtn = document.querySelector(".start-btn button");
const infoBox = document.querySelector(".info-box");
const exitBtn = infoBox.querySelector(".buttons .quit");
const continueBtn = infoBox.querySelector(".buttons .restart");

const quizBox = document.querySelector(".quiz-box");
const timeText = quizBox.querySelector(".timer-text");
const timeCount = quizBox.querySelector(".timer .timer-sec");
const queText = quizBox.querySelector(".que-text");
const optionList = quizBox.querySelector(".option-list");
const nextBtn = quizBox.querySelector(".next-btn");
const timeLine = quizBox.querySelector(".time-line");

const resultBox = document.querySelector(".result-box");
const restartQuiz = resultBox.querySelector(".buttons .restart");
const quitQuiz = resultBox.querySelector(".buttons .quit");
const scoreText = resultBox.querySelector(".score-text");

let queCount = 0;
let counter;
let timeValue = 15;
let counterLine;
let widthValue = 0;
let userScore = 0;

// ** Click Button **
startBtn.onclick = () => {
  infoBox.classList.add("active-info");
};

exitBtn.onclick = () => {
  infoBox.classList.remove("active-info");
};

continueBtn.onclick = () => {
  infoBox.classList.remove("active-info");
  quizBox.classList.add("active-quiz");

  startTimer(timeValue);

  showQuestions(0);
  queCounter(0);
};

nextBtn.onclick = () => {
  if (queCount < questions.length - 1) {
    queCount++;

    clearInterval(counter);
    startTimer(timeValue);

    showQuestions(queCount);
    queCounter(queCount);
    nextBtn.style.display = "none";
    timeText.textContent = "Time Left";
  } else {
    clearInterval(counterLine);
    clearInterval(counter);
    console.log("questions completed");
    showResultBox();
  }
};

quitQuiz.onclick = () => {
  window.location.reload();
};

restartQuiz.onclick = () => {
  resultBox.classList.remove("active-result");
  quizBox.classList.add("active-quiz");
  queCount = 0;
  timeValue = 20;
  widthValue = 0;
  userScore = 0;
  showQuestions(queCount);
  queCounter(queCount);
  clearInterval(counter);
  startTimer(timeValue);
  clearInterval(counterLine);
  startTimerLilne(widthValue);
  nextBtn.style.display = "none";
  timeText.textContent = "Time Left";
};

function showQuestions(index) {
  let queTag = `<span>${questions[index].number}. ${questions[index].question}</span>`;

  let optionsTag = ` <div class="option">
  ${questions[index].options[0]}
  </div>
          <div class="option">
            ${questions[index].options[1]}
          </div>
          <div class="option">
            ${questions[index].options[2]}
          </div>
          <div class="option">
            ${questions[index].options[3]}
          </div>`;

  queText.innerHTML = queTag;
  optionList.innerHTML = optionsTag;

  const options = optionList.querySelectorAll(".option");
  options.forEach((option) => {
    option.setAttribute("onclick", "optionSelected(this)");
  });
}

let tickIcon = ` <div class="icon tick"><i class="fas fa-check"></i></div>`;
let crossIcon = ` <div class="icon cross"><i class="fas fa-times"></i></div>`;

function optionSelected(answer) {
  clearInterval(counter);
  clearInterval(counterLine);
  const options = optionList.querySelectorAll(".option");

  let userAns = answer.innerText;
  let correctAns = questions[queCount].answer;

  if (userAns === correctAns) {
    userScore += 1;

    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", tickIcon);
    console.log("Answer is correct");
  } else {
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend", crossIcon);
    console.log("Answer is wrong");

    // if answer is incorrect then automatically selected the correct answer
    options.forEach((option) => {
      if (option.innerText === correctAns) {
        option.classList.add("correct");
        option.insertAdjacentHTML("beforeend", tickIcon);
      }
    });
  }

  //Once user selected, disabled all options
  options.forEach((option) => option.classList.add("disabled"));
  nextBtn.style.display = "block";
}

function queCounter(index) {
  const bottomQesCounter = quizBox.querySelector(".total-que");

  let totalQuesCountTag = `<span><p>${questions[index].number}
  </p>of<p>${questions.length}</p>Questions</span>`;

  bottomQesCounter.innerHTML = totalQuesCountTag;
}

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    time--;
    if (time < 9) {
      let time = timeCount.textContent;
      timeCount.textContent = `0${time}`;
    }
    if (time < 0) {
      clearInterval(counter);
      timeCount.textContent = "00";
      timeText.textContent = "Time Off";

      let correctAns = questions[queCount].answer;
      const options = optionList.querySelectorAll(".option");

      options.forEach((option) => {
        if (option.innerText === correctAns) {
          option.classList.add("correct");
          option.insertAdjacentHTML("beforeend", tickIcon);
        }

        option.classList.add("disabled");
      });
      nextBtn.style.display = "block";
    }
  }
}

function showResultBox() {
  infoBox.classList.remove("active-info");
  quizBox.classList.remove("active-quiz");
  resultBox.classList.add("active-result");

  if (userScore > 3) {
    let scoreTag = ` <span>and congrats, You got<p>${userScore}</p>out of<p>${questions.length}</p></span>`;
    scoreText.innerHTML = scoreTag;
  } else if (userScore > 1) {
    let scoreTag = ` <span>and nice, You got<p>${userScore}</p>out of<p>${questions.length}</p></span>`;
    scoreText.innerHTML = scoreTag;
  } else {
    let scoreTag = ` <span>and sorry, You got<p>${userScore}</p>out of<p>${questions.length}</p></span>`;
    scoreText.innerHTML = scoreTag;
  }
}
