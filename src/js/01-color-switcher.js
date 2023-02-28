
const startBtnEl = document.querySelector('[data-start]');
const stopBtnEl = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');
let timer = 0;

const onStart = () => { 
  timer = setInterval(changeBcgColor, 1000);
  
  startBtnEl.toggleAttribute('disabled');
};
startBtnEl.addEventListener('click', onStart);

const onStop = () => {
  clearInterval(timer);

  startBtnEl.removeAttribute('disabled');  
};
stopBtnEl.addEventListener('click', onStop);

const changeBcgColor = () => {
    bodyEl.style.backgroundColor = getRandomHexColor();
};
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
console.log(getRandomHexColor);
