const body = document.querySelector('body');
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
let timer = null;

btnStop.setAttribute('disabled', 'disabled');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeColor() {
  body.style.backgroundColor = getRandomHexColor();
}

function changeStatus() {
  btnStart.toggleAttribute('disabled');
  btnStop.toggleAttribute('disabled');
}

btnStart.addEventListener('click', () => {
  timerId = setInterval(() => {
    changeColor();
  }, 1000);
  changeStatus();
});

btnStop.addEventListener('click', () => {
  clearInterval(timerId);
  changeStatus();
});
