import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const btnStart = document.querySelector('[data-start]');

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
DIFF_KEY = 'diff';

let timer = null;

const inputTime = document.getElementById('datetime-picker');

const options = {
  enableTime: true,
  time_24hr: true,
  dateFormat: 'd-m-Y    H:i',
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const newDateMs = selectedDates[0].getTime();
    console.log(newDateMs);
    chekDate(newDateMs);
  },
};

btnStart.setAttribute('disabled', 'disabled');

flatpickr(inputTime, options);

function chekDate(newDateMs) {
  let thisDate = new Date();
  let thisDateMs = thisDate.getTime();
  let diff = newDateMs - thisDateMs;
  localStorage.setItem(DIFF_KEY, diff);
  if (diff > 0) {
    btnStart.removeAttribute('disabled');
    // getDifferent(diff);
  } else {
    btnStart.setAttribute('disabled', 'disabled');
    window.alert(`Please choose a date in the future`);
  }
}

// console.log(diff);

btnStart.addEventListener('click', onClick);

function onClick() {
  timer = setInterval(() => {
    const getDifferent = function (diff) {
      console.log(diff);
    };
    console.log(getDifferent);
    const different = localStorage.getItem('diff');
    convertMs(different);
  }, 1000);
}

// btnStart.addEventListener('click', calc);

// // function calc() {
// //   let thisDate = new Date();
// //   let thisDateMs = thisDate.getTime();
// //   let diff = newDateMs - thisDateMs;
// //   if (diff > 0) {
// //     btnStart.removeAttribute('disabled');
// //     // timer = setInterval(() => {
// //     //   thisDate = new Date();
// //     //   thisDateMs = thisDate.getTime();
// //     //   diff = newDateMs - thisDateMs;
// //     //   convertMs(diff);
// //     // }, 1000);
// //   } else {
// //     clearTimeout(timer);
// //     window.alert(`Please choose a date in the future`);
// //   }
// // }

function convertMs(different) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = Math.floor(different / day);
  // Remaining hours
  const hours = Math.floor((different % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((different % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((different % day) % hour) % minute) / second);
  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}
