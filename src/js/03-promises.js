import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const delayEl = document.querySelector('input[name="delay"]');
const stepEl = document.querySelector('input[name="step"]');
const amountEl = document.querySelector('input[name="amount"]');

form.addEventListener('submit', startPromise);

function startPromise(evt) {
  evt.preventDefault();
  let promiseValue = {
    position: '',
    delay: '',
  };
  let delay = Number(delayEl.value);
  for (let i = 1; i <= amountEl.value; i++) {
    const position = i;
    promiseValue.position = position;
    promiseValue.delay = delay;
    console.log(promiseValue);

    createPromise(promiseValue);

    delay = delay + Number(stepEl.value);
  }
}

function createPromise(promiseValue) {
  const shouldResolve = Math.random() > 0.3;

  setTimeout(() => {
    if (shouldResolve) {
      // Fulfill
      Notify.success(`Promise # ${promiseValue.position} is OK`);
      console.log(`delay is ${promiseValue.delay}`);
    } else {
      Notify.failure(`Promise # ${promiseValue.position} is'nt OK`);
      console.log(`delay is ${promiseValue.delay}`);
      // Reject
    }
  }, promiseValue.delay);
}
