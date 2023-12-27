class Stopwatch {
    constructor() {
        this.startTime = 0;
        this.interval = 0;
        this.running = false;
        this.lapCount = 1;
        this.startStopButton = document.getElementById("startStop");
        this.resetButton = document.getElementById("reset");
        this.lapButton = document.getElementById("lap");
        this.display = document.getElementById("display");
        this.laps = document.getElementById("laps");

        this.startStopButton.addEventListener('click', () => this.startStop());
        this.resetButton.addEventListener('click', () => this.reset());
        this.lapButton.addEventListener('click', () => this.lap());
    }

    startStop() {
        if (this.running) {
            clearInterval(this.interval);
            this.startStopButton.innerHTML = "Start";
        } else {
            this.startTime = Date.now() - (this.lapCount === 1 ? 0 : this.lapCount - 1) * this.interval;
            this.interval = setInterval(() => this.updateTime(), 10);
            this.startStopButton.innerHTML = "Stop";
        }
        this.running = !this.running;
    }

    reset() {
        clearInterval(this.interval);
        this.startStopButton.innerHTML = "Start";
        this.display.innerHTML = "00:00:00";
        this.laps.innerHTML = "";
        this.lapCount = 1;
        this.running = false;
    }

    lap() {
        if (this.running) {
            const lapTime = this.formatTime(Date.now() - this.startTime);
            const listItem = document.createElement("li");
            listItem.innerHTML = `Lap ${this.lapCount}: ${lapTime}`;
            this.laps.appendChild(listItem);
            this.lapCount++;
        }
    }

    updateTime() {
        const currentTime = Date.now() - this.startTime;
        this.display.innerHTML = this.formatTime(currentTime);
    }

    formatTime(time) {
        const minutes = Math.floor((time / 60000) % 60);
        const seconds = Math.floor((time / 1000) % 60);
        const milliseconds = (time % 1000).toString().slice(0, 2);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${milliseconds}`;
    }
}

const stopwatch = new Stopwatch();
stopwatch.reset();
