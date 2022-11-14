function slideThrough(event) {
  if (event.target.tagName !== 'LI') {
    return;
  }
  switch (event.target.textContent) {
    case '1': {
      renderAnswers(0, 'renderFirstAnswers', event.target.id, questionOne);
      break;
    }
    case '2': {
      renderAnswers(1, 'renderSecondAnswers', event.target.id, questionTwo);
      break;
    }
    case '3': {
      renderAnswers(2, 'renderThirdAnswers', event.target.id, questionThree);
      break;
    }
    case '4': {
      renderAnswers(3, 'renderForthAnswers', event.target.id, questionFour);
      break;
    }
  }
}

function renderAnswers(questionAnswersIdx, elementId, targetId, question) {
  if (QuestionAnswers[questionAnswersIdx].length === 0) {
    for (let i = 1; i <= randomNumberOfAnswers(); i++) {
      const list = document.createElement('li');
      QuestionAnswers[questionAnswersIdx].push(i);
      list.textContent = i;
      list.classList.add('original-color-li');
      list.addEventListener('click', answeredQuestion);
      document.getElementById(elementId).appendChild(list);
    }
  }
  displayQuestion(question);
  highlightSlide(targetId);
}

const displayQuestion = (show) => {
  for (let question of questions) {
    if (question === show) {
      document.getElementById(show).style.display = 'block';
      continue;
    }
    document.getElementById(question).style.display = 'none';
  }
}

const highlightSlide = (slide) => {
  for (let s of slides) {
    if (s === slide) {
      document.getElementById(slide).classList.add('navbar-click-highlight');
      document.getElementById(slide).classList.remove('default-navbar');
      continue;
    }
    document.getElementById(s).classList.remove('navbar-click-highlight');
    document.getElementById(s).classList.add('default-navbar');
  }
}

function displayLogic(event, slide, questionAnswers) {
  if (questionAnswers.length < parseInt(slide.textContent) + 2) {
    if (event.target.classList.contains('original-color-li')) {
      saveAnswers(event.target.textContent, slide.id);
      toggleSelectedAnswer(event);
      if (questionAnswers.length > 0) {
        slide.classList.add('highlight-navbar');
      }
    } else {
      toggleSelectedAnswer(event);
      deleteAnswers(event.target.textContent, slide.id);
      slide.classList.remove('highlight-navbar');
    }
    showResultButton();
    return;
  }
  if (event.target.classList.contains('original-color-li')) {
      alertMessage();
    } 
    else {
      toggleSelectedAnswer(event);
      deleteAnswers(event.target.textContent, slide.id);
    }
  showResultButton();
}

function answeredQuestion(event) {
  const slide = findActiveSlide();
  switch (slide.id) {
    case slideOne: {
      displayLogic(event, slide, firstQuestionAnswers);
      break;
    }
    case slideTwo: {
      displayLogic(event, slide, secondQuestionAnswers);
      break;
    }
    case slideThree: {
      displayLogic(event, slide, thirdQuestionAnswers);
      break;
    }
    case slideFour: {
      displayLogic(event, slide, forthQuestionAnswers);
      break;
    }
  }
}

function findActiveSlide() {
  const slides = document.getElementById('slides').getElementsByTagName('li');
  for (const slide of slides) {
    if (slide.classList.contains('navbar-click-highlight')) {
      return slide;
    }
  }
}

function toggleSelectedAnswer(event) {
  event.target.classList.toggle('green-answer');
  event.target.classList.toggle('original-color-li');
}

function saveAnswers(answer, slideId) {
  switch (slideId) {
    case slideOne: {
      addAnswer(firstQuestionAnswers, answer);
      break;
    }
    case slideTwo: {
      addAnswer(secondQuestionAnswers, answer);
      break;
    }
    case slideThree: {
      addAnswer(thirdQuestionAnswers, answer);
      break;
    }
    case slideFour: {
      addAnswer(forthQuestionAnswers, answer);
      break;
    }
  }
}

function addAnswer(questionAnswers, answer) {
  questionAnswers.push(answer);
}

function deleteAnswers(answer, slideId) {
  switch (slideId) {
    case slideOne: {
      removeAnswer(firstQuestionAnswers, answer);
      break;
    }
    case slideTwo: {
      removeAnswer(secondQuestionAnswers, answer);
      break;
    }
    case slideThree: {
      removeAnswer(thirdQuestionAnswers, answer);
      break;
    }
    case slideFour: {
      removeAnswer(forthQuestionAnswers, answer);
      break;
    }
  }
}

function removeAnswer(questionAnswers, answer) {
  const index = questionAnswers.indexOf(answer);
  questionAnswers.splice(index, 1);
}

function questionResults() {
  if (areAllAnswersAnswered()) {
    alert(
      'ODGOVORI: \n' +
        'Pitanje 1: ' +
        firstQuestionAnswers +
        '\nPitanje 2: ' +
        secondQuestionAnswers +
        '\nPitanje 3: ' +
        thirdQuestionAnswers +
        '\nPitanje 4: ' +
        forthQuestionAnswers
    );
  }
}

function showResultButton() {
  if (areAllAnswersAnswered()) {
    document.getElementById('result-btn').disabled = false;
    document.getElementById('result-btn').classList.add('show-result-btn-hover');
    return;
  } 
    document.getElementById('result-btn').disabled = true;
    document.getElementById('result-btn').classList.remove('show-result-btn-hover');
}

function areAllAnswersAnswered() {
  return firstQuestionAnswers.length > 0 
  && secondQuestionAnswers.length > 0 
  && thirdQuestionAnswers.length > 0 
  && forthQuestionAnswers.length > 0;
}

function alertMessage() {
  const message = document.getElementById('snackbar');
  message.className = 'show';
  setTimeout(function () {
    message.className = message.className.replace('show', '');
  }, 3000);
}

function slide(event) {
  const btn = event.target.id;
  switch (btn) {
    case 'first-next': {
      renderAnswers(1, 'renderSecondAnswers', slideTwo, questionTwo);
      break;
    }
    case 'second-next': {
      renderAnswers(2, 'renderThirdAnswers', slideThree, questionThree);
      break;
    }
    case 'third-next': {
      renderAnswers(3, 'renderForthAnswers', slideFour, questionFour);
      break;
    }
    case 'second-prev': {
      renderAnswers(0, 'renderForthAnswers', slideOne, questionOne);
      break;
    }
    case 'third-prev': {
      renderAnswers(1, 'renderSecondAnswers', slideTwo, questionTwo);
      break;
    }
    case 'fourth-prev': {
      renderAnswers(2, 'renderThirdAnswers', slideThree, questionThree);
      break;
    }
  }  
}


function randomNumberOfAnswers() {
  return Math.floor(Math.random() * 7 + 1) + 1;
}

window.onload = renderAnswers(0, 'renderFirstAnswers', slideOne, questionOne);