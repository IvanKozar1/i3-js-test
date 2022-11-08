function slideThrough(event) {
  if (event.target.tagName !== 'LI') {
    return;
  }

  if (event.target.textContent === '1') {
    if (QuestionAnswers[0].length === 0) {
      const randomNumberOfAnswers = Math.floor(Math.random() * 7 + 1) + 1;
      for (let i = 1; i <= randomNumberOfAnswers; i++) {
        const list = document.createElement('li');
        QuestionAnswers[0].push(i);
        list.textContent = i;
        list.classList.add('original-color-li');
        list.addEventListener('click', answeredQuestion);
        document.getElementById('renderFirstAnswers').appendChild(list);
      }
    }
    removeHighlight([slideTwo, slideThree, slideFour]);
    setShow(questionOne);
    setHide([questionTwo, questionThree, questionFour]);
    addHighlight(event.target);
  } else if (event.target.textContent === '2') {
    if (QuestionAnswers[1].length === 0) {
      const randomNumberOfAnswers = Math.floor(Math.random() * 7 + 1) + 1;
      for (let i = 1; i <= randomNumberOfAnswers; i++) {
        const list = document.createElement('li');
        QuestionAnswers[1].push(i);
        list.textContent = i;
        list.classList.add('original-color-li');
        list.addEventListener('click', answeredQuestion);
        document.getElementById('renderSecondAnswers').appendChild(list);
      }
    }
    removeHighlight([slideOne, slideThree, slideFour]);
    setShow(questionTwo);
    setHide([questionOne, questionThree, questionFour]);
    addHighlight(event.target);
  } else if (event.target.textContent === '3') {
    if (QuestionAnswers[2].length === 0) {
      const randomNumberOfAnswers = Math.floor(Math.random() * 7 + 1) + 1;
      for (let i = 1; i <= randomNumberOfAnswers; i++) {
        const list = document.createElement('li');
        QuestionAnswers[2].push(i);
        list.textContent = i;
        list.classList.add('original-color-li');
        list.addEventListener('click', answeredQuestion);
        document.getElementById('renderThirdAnswers').appendChild(list);
      }
    }
    removeHighlight([slideTwo, slideOne, slideFour]);
    setShow(questionThree);
    setHide([questionOne, questionTwo, questionFour]);
    addHighlight(event.target);
  } else {
    if (QuestionAnswers[3].length === 0) {
      const randomNumberOfAnswers = Math.floor(Math.random() * 7 + 1) + 1;
      for (let i = 1; i <= randomNumberOfAnswers; i++) {
        const list = document.createElement('li');
        QuestionAnswers[3].push(i);
        list.textContent = i;
        list.classList.add('original-color-li');
        list.addEventListener('click', answeredQuestion);
        document.getElementById('renderForthAnswers').appendChild(list);
      }
    }
    removeHighlight([slideTwo, slideThree, slideOne]);
    setShow(questionFour);
    setHide([questionOne, questionTwo, questionThree]);
    addHighlight(event.target);
  }
}

function removeHighlight(elements) {
  for (const element of elements) {
    document.getElementById(element).classList.remove('navbar-click-highlight');
    document.getElementById(element).classList.add('default-navbar');
  }
}

const addHighlight = (element) => {
  element.classList.add('navbar-click-highlight');
  element.classList.remove('default-navbar');
};

const setHide = (elements) => {
  elements.forEach((element) => {
    document.getElementById(element).style.display = 'none';
  });
};

const setShow = (element) => {
  document.getElementById(element).style.display = 'block';
};

function answeredQuestion(event) {
  const slide = findActiveSlide();
  if (slide.id === slideOne) {
    if (firstQuestionAnswers.length < parseInt(slide.textContent) + 2) {
      if (event.target.classList.contains('original-color-li')) {
        saveAnswers(event.target.textContent, slide.id);
        toggleSelectedAnswer(event);
        if (firstQuestionAnswers.length > 0) {
          slide.classList.add('highlight-navbar');
        }
      } else {
        toggleSelectedAnswer(event);
        deleteAnswers(event.target.textContent, slide.id);
        slide.classList.remove('highlight-navbar');
      }
    } else if (
      firstQuestionAnswers.length ===
      parseInt(slide.textContent) + 2
    ) {
      if (event.target.classList.contains('original-color-li')) {
        alertMessage();
      } else {
        toggleSelectedAnswer(event);
        deleteAnswers(event.target.textContent, slide.id);
      }
    }
  }
  if (slide.id === slideTwo) {
    if (secondQuestionAnswers.length < parseInt(slide.textContent) + 2) {
      if (event.target.classList.contains('original-color-li')) {
        saveAnswers(event.target.textContent, slide.id);
        toggleSelectedAnswer(event);
        if (secondQuestionAnswers.length > 0) {
          slide.classList.add('highlight-navbar');
        }
      } else {
        toggleSelectedAnswer(event);
        deleteAnswers(event.target.textContent, slide.id);
        if (secondQuestionAnswers.length === 0) {
          slide.classList.remove('highlight-navbar');
        }
      }
    } else if (
      secondQuestionAnswers.length ===
      parseInt(slide.textContent) + 2
    ) {
      if (event.target.classList.contains('original-color-li')) {
        alertMessage();
      } else {
        toggleSelectedAnswer(event);
        deleteAnswers(event.target.textContent, slide.id);
      }
    }
  }
  if (slide.id === slideThree) {
    if (thirdQuestionAnswers.length < parseInt(slide.textContent) + 2) {
      if (event.target.classList.contains('original-color-li')) {
        saveAnswers(event.target.textContent, slide.id);
        toggleSelectedAnswer(event);
        if (thirdQuestionAnswers.length > 0) {
          slide.classList.add('highlight-navbar');
        }
      } else {
        toggleSelectedAnswer(event);
        deleteAnswers(event.target.textContent, slide.id);
        if (thirdQuestionAnswers.length === 0) {
          slide.classList.remove('highlight-navbar');
        }
      }
    } else if (
      thirdQuestionAnswers.length ===
      parseInt(slide.textContent) + 2
    ) {
      if (event.target.classList.contains('original-color-li')) {
        alertMessage();
      } else {
        toggleSelectedAnswer(event);
        deleteAnswers(event.target.textContent, slide.id);
      }
    }
  }
  if (slide.id === slideFour) {
    if (forthQuestionAnswers.length < parseInt(slide.textContent) + 2) {
      if (event.target.classList.contains('original-color-li')) {
        saveAnswers(event.target.textContent, slide.id);
        toggleSelectedAnswer(event);
        if (forthQuestionAnswers.length > 0) {
          slide.classList.add('highlight-navbar');
        }
      } else {
        toggleSelectedAnswer(event);
        deleteAnswers(event.target.textContent, slide.id);
        if (forthQuestionAnswers.length === 0) {
          slide.classList.remove('highlight-navbar');
        }
      }
    } else if (
      forthQuestionAnswers.length ===
      parseInt(slide.textContent) + 2
    ) {
      if (event.target.classList.contains('original-color-li')) {
        alertMessage();
      } else {
        toggleSelectedAnswer(event);
        deleteAnswers(event.target.textContent, slide.id);
      }
    }
  }

  showResultButton();
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
  if (slideId === slideOne) {
    firstQuestionAnswers.push(answer);
  }
  if (slideId === slideTwo) {
    secondQuestionAnswers.push(answer);
  }
  if (slideId === slideThree) {
    thirdQuestionAnswers.push(answer);
  }
  if (slideId === slideFour) {
    forthQuestionAnswers.push(answer);
  }
}

function deleteAnswers(answer, slideId) {
  if (slideId === slideOne) {
    const index = firstQuestionAnswers.indexOf(answer);
    firstQuestionAnswers.splice(index, 1);
  }
  if (slideId === slideTwo) {
    const index = secondQuestionAnswers.indexOf(answer);
    secondQuestionAnswers.splice(index, 1);
  }
  if (slideId === slideThree) {
    const index = thirdQuestionAnswers.indexOf(answer);
    thirdQuestionAnswers.splice(index, 1);
  }
  if (slideId === slideFour) {
    const index = forthQuestionAnswers.indexOf(answer);
    forthQuestionAnswers.splice(index, 1);
  }
}

function questionResults() {
  if (
    firstQuestionAnswers.length > 0 &&
    secondQuestionAnswers.length > 0 &&
    thirdQuestionAnswers.length > 0 &&
    forthQuestionAnswers.length > 0
  ) {
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
  if (
    firstQuestionAnswers.length > 0 &&
    secondQuestionAnswers.length > 0 &&
    thirdQuestionAnswers.length > 0 &&
    forthQuestionAnswers.length > 0
  ) {
    document.getElementById('result-btn').disabled = false;
    document
      .getElementById('result-btn')
      .classList.add('show-result-btn-hover');
  } else {
    document.getElementById('result-btn').disabled = true;
    document
      .getElementById('result-btn')
      .classList.remove('show-result-btn-hover');
  }
}

function alertMessage() {
  const message = document.getElementById('snackbar');
  message.className = 'show';
  setTimeout(function () {
    message.className = message.className.replace('show', '');
  }, 3000);
}






function slideForward(event) {
  const btn = event.target.id;
  if (btn === 'first-next') {
    if (QuestionAnswers[1].length === 0) {
      const randomNumberOfAnswers = Math.floor(Math.random() * 7 + 1) + 1;
      for (let i = 1; i <= randomNumberOfAnswers; i++) {
        const list = document.createElement('li');
        QuestionAnswers[1].push(i);
        list.textContent = i;
        list.classList.add('original-color-li');
        list.addEventListener('click', answeredQuestion);
        document.getElementById('renderSecondAnswers').appendChild(list);
      }
    }
    removeHighlight([slideOne, slideThree, slideFour]);
    setShow(questionTwo);
    setHide([questionOne, questionThree, questionFour]); 
    document.getElementById('slideTwo').classList.remove('default-navbar');
      document.getElementById('slideTwo').classList.add('navbar-click-highlight');
  }else if(btn === 'second-next') {
    if (QuestionAnswers[2].length === 0) {
      const randomNumberOfAnswers = Math.floor(Math.random() * 7 + 1) + 1;
      for (let i = 1; i <= randomNumberOfAnswers; i++) {
        const list = document.createElement('li');
        QuestionAnswers[2].push(i);
        list.textContent = i;
        list.classList.add('original-color-li');
        list.addEventListener('click', answeredQuestion);
        document.getElementById('renderThirdAnswers').appendChild(list);
      }
    }
    removeHighlight([slideTwo, slideOne, slideFour]);
    setShow(questionThree);
    setHide([questionOne, questionTwo, questionFour]);
    document.getElementById('slideThree').classList.remove('default-navbar');
      document.getElementById('slideThree').classList.add('navbar-click-highlight');
    
  } else {
    if (QuestionAnswers[3].length === 0) {
      const randomNumberOfAnswers = Math.floor(Math.random() * 7 + 1) + 1;
      for (let i = 1; i <= randomNumberOfAnswers; i++) {
        const list = document.createElement('li');
        QuestionAnswers[3].push(i);
        list.textContent = i;
        list.classList.add('original-color-li');
        list.addEventListener('click', answeredQuestion);
        document.getElementById('renderForthAnswers').appendChild(list);
      }
    }
    removeHighlight([slideTwo, slideThree, slideOne]);
    setShow(questionFour);
    setHide([questionOne, questionTwo, questionThree]);
    document.getElementById('slideFour').classList.remove('default-navbar');
      document.getElementById('slideFour').classList.add('navbar-click-highlight');
  }
}

function slideBackward(event) {
  const btn = event.target.id;
  if (btn === 'second-prev') {
    if (QuestionAnswers[0].length === 0) {
      const randomNumberOfAnswers = Math.floor(Math.random() * 7 + 1) + 1;
      for (let i = 1; i <= randomNumberOfAnswers; i++) {
        const list = document.createElement('li');
        QuestionAnswers[0].push(i);
        list.textContent = i;
        list.classList.add('original-color-li');
        list.addEventListener('click', answeredQuestion);
        document.getElementById('renderFirstAnswers').appendChild(list);
      }}
      removeHighlight([slideTwo, slideThree, slideFour]);
      setShow(questionOne);
      setHide([questionTwo, questionThree, questionFour]);

      document.getElementById('slideOne').classList.remove('default-navbar');
      document.getElementById('slideOne').classList.add('navbar-click-highlight');
  }else if( btn === 'third-prev') {
    if (QuestionAnswers[1].length === 0) {
      const randomNumberOfAnswers = Math.floor(Math.random() * 7 + 1) + 1;
      for (let i = 1; i <= randomNumberOfAnswers; i++) {
        const list = document.createElement('li');
        QuestionAnswers[1].push(i);
        list.textContent = i;
        list.classList.add('original-color-li');
        list.addEventListener('click', answeredQuestion);
        document.getElementById('renderSecondAnswers').appendChild(list);
      }
    }
    removeHighlight([slideOne, slideThree, slideFour]);
    setShow(questionTwo);
    setHide([questionOne, questionThree, questionFour]);
    document.getElementById('slideTwo').classList.remove('default-navbar');
    document.getElementById('slideTwo').classList.add('navbar-click-highlight');
  } else {
    if (QuestionAnswers[2].length === 0) {
      const randomNumberOfAnswers = Math.floor(Math.random() * 7 + 1) + 1;
      for (let i = 1; i <= randomNumberOfAnswers; i++) {
        const list = document.createElement('li');
        QuestionAnswers[2].push(i);
        list.textContent = i;
        list.classList.add('original-color-li');
        list.addEventListener('click', answeredQuestion);
        document.getElementById('renderThirdAnswers').appendChild(list);
      }
    }
    removeHighlight([slideTwo, slideOne, slideFour]);
    setShow(questionThree);
    setHide([questionOne, questionTwo, questionFour]);
    document.getElementById('slideThree').classList.remove('default-navbar');
      document.getElementById('slideThree').classList.add('navbar-click-highlight');
  }
}

window.onload = function renderFirstQuestionAnswers() {
  if (QuestionAnswers[0].length === 0) {
    const randomNumberOfAnswers = Math.floor(Math.random() * 7 + 1) + 1;
    for (let i = 1; i <= randomNumberOfAnswers; i++) {
      const list = document.createElement('li');
      QuestionAnswers[0].push(i);
      list.textContent = i;
      list.classList.add('original-color-li');
      list.addEventListener('click', answeredQuestion);
      document.getElementById('renderFirstAnswers').appendChild(list);
    }
  }
  setShow(questionOne);
  document.getElementById('slideOne').classList.add('navbar-click-highlight');
  document.getElementById('slideOne').classList.remove('default-navbar');
}