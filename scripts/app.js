const slideElements = document.getElementById('nav-bar');
const showResultBtnElement = document.getElementById('result-btn')
const previousButtonElements = document.querySelectorAll('.previous-btn');
const nextButtonElements = document.querySelectorAll('.next-btn');


showResultBtnElement.addEventListener('click', questionResults)
slideElements.addEventListener('click', slideThrough);

for(const previousButtonElement of previousButtonElements) {
    previousButtonElement.addEventListener('click', slideBackward);
}

for(const nextButtonElement of nextButtonElements){
    nextButtonElement.addEventListener('click', slideForward)
}

