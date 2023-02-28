import flatpickr from 'flatpickr';

// // Import additional css styles
import 'flatpickr/dist/flatpickr.min.css';

const inputDateEl = document.querySelector('#datetime-picker');
const startBtnEl = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

startBtnEl.setAttribute('disabled', true);



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] <= Date.now()) {
            window.alert('Please choose a date in the future"');
        } else
            startBtnEl.removeAttribute('disabled');
          
    console.log(selectedDates[0]);
  },
};

const pickerDateEl = flatpickr(inputDateEl, options);

startBtnEl.addEventListener('click', (event) => {
    event.target.setAttribute('disabled', true)
    const timerId = setInterval(() => {
    const diff = pickerDateEl.selectedDates[0] - Date.now();
    
    if (diff <=0) {
        clearInterval(timerId);
        return 
    }
        console.log(convertMs(diff))
        const { days, hours, minutes, seconds } = convertMs(diff)
        dataDays.textContent = addLeadingZero(days);
        dataHours.textContent = addLeadingZero(hours);
        dataMinutes.textContent = addLeadingZero(minutes);
        dataSeconds.textContent = addLeadingZero(seconds);

}, 1000);
})

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
    return value.toString().padStart(2, '0');
};