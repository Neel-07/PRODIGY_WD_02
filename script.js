let startTime;
let interval;
let running = false;
let lapCount = 1;

function startStop() {
    if (running) {
        clearInterval(interval);
        document.getElementById("startStop").innerHTML = "Start";
    } else {
        startTime = Date.now() - (lapCount === 1 ? 0 : lapCount - 1) * interval;
        interval = setInterval(updateTime, 10);
        document.getElementById("startStop").innerHTML = "Stop";
    }
    running = !running;
}

function reset() {
    clearInterval(interval);
    document.getElementById("startStop").innerHTML = "Start";
    document.getElementById("display").innerHTML = "00:00:00";
    document.getElementById("laps").innerHTML = "";
    lapCount = 1;
    running = false;
}

function lap() {
    if (running) {
        const lapTime = formatTime(Date.now() - startTime);
        const lapList = document.getElementById("laps");
        const listItem = document.createElement("li");
        listItem.innerHTML = `Lap ${lapCount}: ${lapTime}`;
        lapList.appendChild(listItem);
        lapCount++;
    }
}

function updateTime() {
    const currentTime = Date.now() - startTime;
    document.getElementById("display").innerHTML = formatTime(currentTime);
}

function formatTime(time) {
    const minutes = Math.floor((time / 60000) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    const milliseconds = (time % 1000).toString().slice(0, 2);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${milliseconds}`;
}

reset();
