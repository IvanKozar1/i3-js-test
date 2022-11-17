const numberOfQuestions = 4;
const questions = [];
let selectedQuestion = {};

function initializeState() {
  for (let i = 1; i <= numberOfQuestions; i++) {
    const question = {
      id: i,
      title: `Pitanje ${i}`,
      answers: genereteArrayOfAnswers(),
      selectedAnswers: []
    };
    questions.push(question);
  }
  selectedQuestion = questions[0];
}

function genereteArrayOfAnswers() {
  const answersArray = [];
  const randomNumberOfAnswers = Math.floor(Math.random() * 7 + 1) + 1;
  for (let i = 1; i <= randomNumberOfAnswers; i++) {
    answersArray.push(i);
  }
  return answersArray;
}

function createNavigation() {
  for (let i = 0; i < questions.length; i++) {
    const navbar = document.createElement('li');
    navbar.className = 'default-navbar';
    navbar.id = `slide${questions[i].id}`;
    navbar.textContent = questions[i].id;
    navbar.addEventListener('click', selectQuestion);
    document.getElementById('slides').appendChild(navbar);
    if (questions[0]) {
      document.getElementById('slide1').classList.add('navbar-click-highlight');
    }
  }
}

function createQuestionDisplay() {
  //CREATE DIV
  const divElement = document.createElement('div');
  divElement.className = 'question';
  divElement.id = `question${selectedQuestion.id}`;
  document.getElementById('container-id').appendChild(divElement);
  createPrevNextButtons();
  //create H2
  const h2Element = document.createElement('h2');
  h2Element.textContent = `Pitanje ${selectedQuestion.id}`;
  document.getElementById(divElement.id).appendChild(h2Element);
  //create UL
  const ulElement = document.createElement('ul');
  ulElement.className = 'answers';
  ulElement.id = `answers${selectedQuestion.id}`;
  document.getElementById(divElement.id).appendChild(ulElement);
  //create list of answers
  for (let k = 1; k <= selectedQuestion.answers.length; k++) {
    const answerList = document.createElement('li');
    answerList.id = `question${selectedQuestion.id}answer${k}`;
    answerList.textContent = [k];
    if (selectedQuestion.selectedAnswers.includes(k)) {
      answerList.classList.toggle('green-answer');
    } else {
      answerList.className = 'original-color-li';
    }
    answerList.addEventListener('click', toggleSelectedAnswer);
    document.getElementById(ulElement.id).appendChild(answerList);
  }
}

function clearQuestionDisplay() {
  const divElement = document.getElementById('container-id');
  let child = divElement.lastElementChild;
  while (child) {
    divElement.removeChild(child);
    child = divElement.lastElementChild;
  }
}

function createPrevNextButtons() {
  const lastElement = questions[questions.length - 1];
  const divElement = document.createElement('div');

  divElement.className = 'buttons';
  divElement.id = `buttons-${selectedQuestion.id}`;
  document.getElementById(`question${selectedQuestion.id}`).appendChild(divElement);

  if (lastElement.id !== selectedQuestion.id) {
    const prevBtn = document.createElement('button');
    const nextBtn = document.createElement('button');
    prevBtn.className = `prev${selectedQuestion.id}`;
    nextBtn.className = `next${selectedQuestion.id}`;
    prevBtn.textContent = 'Previous';
    nextBtn.textContent = 'Next';
    prevBtn.id = `prev${selectedQuestion.id}`;
    nextBtn.id = `next${selectedQuestion.id}`;
    prevBtn.addEventListener('click', previousQuestion);
    nextBtn.addEventListener('click', nextQuestion);
    document.getElementById(divElement.id).appendChild(prevBtn);
    document.getElementById(divElement.id).appendChild(nextBtn);
  } else {
    const prevBtn = document.createElement('button');
    const resultBtn = document.createElement('button');
    prevBtn.textContent = 'Previous';
    prevBtn.className = `prev${selectedQuestion.id}`;
    prevBtn.id = `prev${selectedQuestion.id}`;
    resultBtn.textContent = 'Show result';
    resultBtn.className = 'result-button';
    resultBtn.id = 'result-btn';
    resultBtn.disabled = true;
    prevBtn.addEventListener('click', previousQuestion);
    resultBtn.addEventListener('click', displayResults);
    document.getElementById(divElement.id).appendChild(prevBtn);
    document.getElementById(divElement.id).appendChild(resultBtn);
  }
}

function selectQuestion(event) {
  const slide = event.target.textContent;
  toggleSelectedSlides(event);
  if (slide !== selectedQuestion.id) {
    clearQuestionDisplay();
    selectedQuestion = questions[slide - 1];
    createQuestionDisplay();
  }
  showResultBtn();
}

function toggleSelectedAnswer(event) {
  let slide = findActiveSlide();
  if (
    selectedQuestion.selectedAnswers.length < parseInt(slide.textContent) + 2) {
    if (event.target.classList.contains('original-color-li')) {
      toggleColorOfAnswer(event);
      selectedQuestion.selectedAnswers.push(parseInt(event.target.textContent));
      if (selectedQuestion.selectedAnswers.length > 0) {
        slide.classList.add('green-answer');
      }
    } else {
      toggleColorOfAnswer(event);
      deleteAnswer(event, event.target.textContent);
    }
  } else if (selectedQuestion.selectedAnswers.length === parseInt(slide.textContent) + 2) {
    if (event.target.classList.contains('original-color-li')) {
      alertMessage();
    } else {
      toggleColorOfAnswer(event);
      deleteAnswer(event, event.target.textContent);
    }
  }
  if (selectedQuestion.selectedAnswers.length === 0) {
    slide.classList.remove('green-answer');
  }
  showResultBtn();
}

function deleteAnswer(event, answer) {
  if (event.target) {
    const index = selectedQuestion.selectedAnswers.indexOf(answer);
    selectedQuestion.selectedAnswers.splice(index, 1);
  }
}

function toggleColorOfAnswer(event) {
  event.target.classList.toggle('green-answer');
  event.target.classList.toggle('original-color-li');
}

function toggleSelectedSlides(event) {
  document.getElementById(`slide${selectedQuestion.id}`).classList.remove('navbar-click-highlight');
  event.target.classList.add('navbar-click-highlight');
}

function findActiveSlide() {
  const slides = document.getElementById('slides').getElementsByTagName('li');
  for (const slide of slides) {
    if (slide.classList.contains('navbar-click-highlight')) {
      return slide;
    }
  }
}

function nextQuestion(event) {
  const currentSlide = findActiveSlide();
  const nextSlide = event.target;
  if (nextSlide) {
    clearQuestionDisplay();
    document.getElementById(`slide${selectedQuestion.id}`).classList.remove('navbar-click-highlight');
    selectedQuestion = questions[currentSlide.textContent];
    createQuestionDisplay();
    document.getElementById(`slide${selectedQuestion.id}`).classList.add('navbar-click-highlight');
  }
  showResultBtn();
}

function previousQuestion(event) {
  const currentSlide = findActiveSlide();
  const prevSlide = event.target;
  if (prevSlide) {
    clearQuestionDisplay();
    document.getElementById(`slide${selectedQuestion.id}`).classList.remove('navbar-click-highlight');
    selectedQuestion = questions[currentSlide.textContent - 2];
    createQuestionDisplay();
    document.getElementById(`slide${selectedQuestion.id}`).classList.add('navbar-click-highlight');
  }
}

function alertMessage() {
  const message = document.getElementById('snackbar');
  message.className = 'show';
  setTimeout(function () {
    message.className = message.className.replace('show', '');
  }, 3000);
}

function showResultBtn() {
  const lastElement = questions[questions.length - 1];
  const resultBtn = document.getElementById('result-btn');
  if (areAllQuestionsAnswered()) {
    if (lastElement.id === selectedQuestion.id) {
      resultBtn.disabled = false;
      resultBtn.className = 'show-result-btn';
    }
  } else {
    if (lastElement.id === selectedQuestion.id) {
      if (!areAllQuestionsAnswered()) {
        resultBtn.disabled = true;
        resultBtn.classList.remove('show-result-btn');
        resultBtn.classList.add('result-button');
      }
    }
  }
}

function areAllQuestionsAnswered() {
  for (const question of questions) {
    if (question.selectedAnswers.length < 1) {
      return false;
    }
  }
  return true;
}

function displayResults() {
  let result = '';
  let i = 1;
  for (const question of questions) {
    result = result.concat(`Pitanje ${i}:  ` + question.selectedAnswers + '\n');
    i++;
  }
  alert('Odgovori: \n' + result);
}

function main() {
  initializeState();
  createNavigation();
  createQuestionDisplay();
}

window.onload = main;
