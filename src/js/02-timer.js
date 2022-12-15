import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const btnStart = document.querySelector('[data-start]');

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let timer = null;
// console.log('getFullYear(): ', thisDate.getFullYear());
// console.log('getDate(): ', thisDate.getDate());

// console.log('getMonth(): ', thisDate.getMonth() + 1);
// console.log('getHours(): ', thisDate.getHours());
// console.log('getMinutes(): ', thisDate.getMinutes());
// console.log('getSeconds(): ', thisDate.getSeconds());
// console.log('getMilliseconds(): ', thisDate.getMilliseconds());

// console.log('Milliseconds(old): ', thisDate.getTime());

const inputTime = document.getElementById('datetime-picker');

const options = {
  enableTime: true,
  time_24hr: true,
  dateFormat: 'd-m-Y    H:i',
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const newDateMs = selectedDates[0].getTime();
  },
};

btnStart.setAttribute('disabled', 'disabled');

flatpickr(inputTime, options);

btnStart.addEventListener('click', calc);

function calc() {
  let thisDate = new Date();
  let thisDateMs = thisDate.getTime();
  let diff = newDateMs - thisDateMs;
  if (diff > 0) {
    btnStart.removeAttribute('disabled');
    // timer = setInterval(() => {
    //   thisDate = new Date();
    //   thisDateMs = thisDate.getTime();
    //   diff = newDateMs - thisDateMs;
    //   convertMs(diff);
    // }, 1000);
  } else {
    clearTimeout(timer);
    window.alert(`Please choose a date in the future`);
  }
}

// function convertMs(diff) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;
//   // Remaining days
//   const days = Math.floor(diff / day);
//   // Remaining hours
//   const hours = Math.floor((diff % day) / hour);
//   // Remaining minutes
//   const minutes = Math.floor(((diff % day) % hour) / minute);
//   // Remaining seconds
//   const seconds = Math.floor((((diff % day) % hour) % minute) / second);
//   daysEl.textContent = days;
//   hoursEl.textContent = hours;
//   minutesEl.textContent = minutes;
//   secondsEl.textContent = seconds;
// }
