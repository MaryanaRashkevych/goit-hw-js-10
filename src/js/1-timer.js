
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";


import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate;
let timerInterval;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      userSelectedDate = selectedDates[0];
      const currentDate = new Date();
      if (userSelectedDate < currentDate) {
        iziToast.error({
          title: "Error",
          message: "Please choose a date in the future",
        });
        disableStartButton();
      } else {
        enableStartButton();
      }
    },
  };
  
  const datetimePicker = document.getElementById("datetime-picker");
  flatpickr(datetimePicker, options);
  
  function disableStartButton() {
    const startButton = document.querySelector('[data-start]');
    startButton.disabled = true;
  }
  
  function enableStartButton() {
    const startButton = document.querySelector('[data-start]');
    startButton.disabled = false;
  }
  

  document.querySelector('[data-start]').addEventListener('click', function() {
    datetimePicker.disabled = true;
    disableStartButton();
    startTimer();
  });
  
  // start the countdown timer
  function startTimer() {
    timerInterval = setInterval(function() {
      const currentDate = new Date();
      const timeDifference = userSelectedDate - currentDate;
  
      if (timeDifference <= 0) {
        clearInterval(timerInterval);
        return;
      }
  
      const { days, hours, minutes, seconds } = convertMs(timeDifference);
  
      // Display the remaining time 
      document.querySelector('[data-days]').textContent = addLeadingZero(days);
      document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
      document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
      document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
    }, 1000);
  }
  
  // Function to add leading zero
  function addLeadingZero(value) {
    return value < 10 ? `0${value}` : value;
  }
  
  // convert milliseconds 
  function convertMs(ms) {
   
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
 

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor((ms % hour) / minute);
    const seconds = Math.floor((ms % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
