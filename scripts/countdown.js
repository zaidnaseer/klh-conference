function countdown() {
    const monthsElement = document.getElementById("months");
    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    const now = new Date();
    const targetDate = new Date("2024-12-31 00:00:00"); // Replace with your desired target date

    const timeDiff = targetDate - now;

    const months = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 31));
    const days = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 31)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    monthsElement.textContent = months;
    daysElement.textContent = days;
    hoursElement.textContent = hours;
    minutesElement.textContent = minutes;
    secondsElement.textContent = seconds;
}

setInterval(countdown, 1000);