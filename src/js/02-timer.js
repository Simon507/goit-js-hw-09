import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnStart = document.querySelector('[data-start]');

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
DATE_KEY = 'newDate';

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

    chekDate(newDateMs);
  },
};

btnStart.setAttribute('disabled', 'disabled');

flatpickr(inputTime, options);

function chekDate(newDateMs) {
  let thisDate = new Date();
  let thisDateMs = thisDate.getTime();
  let diff = newDateMs - thisDateMs;
  localStorage.setItem(DATE_KEY, newDateMs);
  if (diff > 0) {
    btnStart.removeAttribute('disabled');
  } else {
    btnStart.setAttribute('disabled', 'disabled');
    Notify.failure('Please choose a date in the future!');
  }
}

btnStart.addEventListener('click', onClick);

function onClick() {
  let different = 0;
  btnStart.setAttribute('disabled', 'disabled');
  timer = setInterval(() => {
    let thisDate = new Date();
    let thisDateMs = thisDate.getTime();
    different = localStorage.getItem(DATE_KEY) - thisDateMs;
    convertMs(different);
  }, 1000);
}

function convertMs(different) {
  if (different > 0) {
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
    addLeadingZero(days, hours, minutes, seconds);
  } else {
    clearInterval(timer);
    Notify.success('Time - is NOW!');
  }
}

function addLeadingZero(days, hours, minutes, seconds) {
  daysEl.textContent = String(days).padStart(2, '0');
  hoursEl.textContent = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
}
