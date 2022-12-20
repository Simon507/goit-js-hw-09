import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const delayEl = document.querySelector('input[name="delay"]');
const stepEl = document.querySelector('input[name="step"]');
const amountEl = document.querySelector('input[name="amount"]');

form.addEventListener('submit', startPromise);

function startPromise(evt) {
  evt.preventDefault();
  let delay = Number(delayEl.value);
  for (let i = 1; i <= amountEl.value; i++) {
    const position = i;
    createPromise({ position, delay });
    delay = delay + Number(stepEl.value);
  }
}

function createPromise({ position, delay }) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });

  promise
    .then(value => {
      Notify.success(value);
    })
    .catch(error => {
      Notify.failure(error);
    });
}
