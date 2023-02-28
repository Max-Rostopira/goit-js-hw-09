import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


flatpickr("#datetime-picker", {
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",
});


const test = document.querySelector('#datetime-picker');
const getValue = () => {

    const today = new Date().getTime();
    const future = new Date(test.value).getTime();

    if (new Date().getTime() > new Date(test.value).getTime()) {
        window.alert('Please choose a date in the future');
    };
    return future - today;
};



test.addEventListener('input', getValue);

const onStartBtn = document.querySelector('[data-start]');

const onStart = () => {
    let diff = getValue();
    console.log(diff);
    console.log(convertMs(diff));
    
    const timerSec = document.querySelector('[data-seconds]');
    const timerHour = document.querySelector('[data-hours]');
    const timerMinuts = document.querySelector('[data-minutes]');
    const timerDays = document.querySelector('[data-days]');
    let w = 36000
    let x = setInterval(() => {
        w--;
    const now = new Date().getTime()
        const obj = convertMs(diff);
        

        timerSec.textContent = obj.seconds;
        timerHour.textContent = obj.hours;
        timerMinuts.textContent = obj.minutes;
        timerDays.textContent = obj.days;
    }, 1000);
};

onStartBtn.addEventListener('click', onStart);

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