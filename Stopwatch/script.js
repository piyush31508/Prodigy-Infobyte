let timer;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;

function startStopwatch() {
    timer = setInterval(updateStopwatch, 10);
    document.getElementById("startBtn").disabled = true;
}

function stopStopwatch() {
    clearInterval(timer);
    document.getElementById("startBtn").disabled = false;
}

function resetStopwatch() {
    clearInterval(timer);
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    updateDisplay();
    document.getElementById("startBtn").disabled = false;
}

function updateStopwatch() {
    milliseconds += 10;
    if (milliseconds === 1000) {
        milliseconds = 0;
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
    }
    updateDisplay();
}

function updateDisplay() {
    document.getElementById("minutes").innerText = padNumber(minutes);
    document.getElementById("seconds").innerText = padNumber(seconds);
    document.getElementById("milliseconds").innerText = padNumber(milliseconds);
}

function padNumber(num) {
    return num < 10 ? "0" + num : num;
}
