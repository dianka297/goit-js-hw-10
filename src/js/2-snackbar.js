import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const delay = event.target.elements.delay.value;
  const state = event.target.elements.state.value;

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  const fulfilledMsg = {
    color: '#59A10D',
    messageColor: '#FFFFFF',
    message: `✅ Fulfilled promise in ${delay}ms`,
    position: 'topRight',
    timeout: 3000,
  };
  const rejectedMsg = {
    color: '#EF4040',
    messageColor: '#FFFFFF',
    message: `❌ Rejected promise in ${delay}ms`,
    position: 'topRight',
    timeout: 3000,
  };

  promise
    .then(value => iziToast.show(fulfilledMsg))
    .catch(error => iziToast.show(rejectedMsg));

  formEl.reset();
}