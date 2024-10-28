import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
import 'flatpickr/dist/flatpickr.min.css';

let userSelectedDate;
let timerActive = false;
let intervalId = 0;
const startBtn = document.querySelector('button[data-start]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');
const inputEl = document.querySelector('#datetime-picker');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate) {
      if (selectedDate < new Date()) {
        iziToast.show({
          title: 'Attention',
          titleColor: '#FAFAFB',
          color: '#B51B1B',
          messageColor: '#FAFAFB',
          message: 'Please choose a date in the future',
          close: true,
          position: 'topCenter',
          timeout: 3000,
          pauseOnHover: true,
          // transitionIn: 'bounceInRight',
        });
        startBtn.disabled = true;
      } else {
        startBtn.disabled = false;
      }
      userSelectedDate = selectedDate.getTime();
    }
  },
};

const timer = new flatpickr('#datetime-picker', options);
// console.log(timer);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  if (!userSelectedDate || timerActive) {
    return;
  }

  timerActive = true;
  startBtn.disabled = true;
  inputEl.disabled = true;

  const startTime = Date.now();
  let remainingTime = userSelectedDate - startTime;

  intervalId = setInterval(() => {
    const timerTimeObj = convertMs(remainingTime);
    daysEl.textContent = addLeadingZero(timerTimeObj.days);
    hoursEl.textContent = addLeadingZero(timerTimeObj.hours);
    minutesEl.textContent = addLeadingZero(timerTimeObj.minutes);
    secondsEl.textContent = addLeadingZero(timerTimeObj.seconds);
    remainingTime -= 1000;

    if (remainingTime <= 0) {
      clearInterval(intervalId);
      timerActive = false;
      inputEl.disabled = false;
    }
  }, 1000);
}