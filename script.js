const audio = document.getElementById("audio");
const playPauseButton = document.getElementById("playPause");
const progressBar = document.getElementById("progressBar");
const currentTimeDisplay = document.getElementById("currentTime");
const totalTimeDisplay = document.getElementById("totalTime");

audio.onloadedmetadata = () => {
    totalTimeDisplay.textContent = formatTime(audio.duration);
    progressBar.max = audio.duration;
};

function togglePlay() {
    if (audio.paused) {
        audio.play();
        sessionStorage.setItem("musicaTocando", "true");
        document.getElementById("playPause").innerHTML = "⏸️";
    } else {
        audio.pause();
        sessionStorage.setItem("musicaTocando", "false");
        document.getElementById("playPause").innerHTML = "▶️";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const savedTime = sessionStorage.getItem("musicTime");
    if (savedTime) {
        audio.currentTime = parseFloat(savedTime);
    }
});

window.addEventListener("beforeunload", () => {
    sessionStorage.setItem("musicTime", audio.currentTime);
});



audio.ontimeupdate = () => {
    progressBar.value = audio.currentTime;
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
};

function seekAudio() {
    audio.currentTime = progressBar.value;
}


function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

window.onload = function() {
    let btn = document.getElementById("playPause");
    if (sessionStorage.getItem("musicaTocando") === "true") {
        btn.innerHTML = "⏸️";
    } else {
        btn.innerHTML = "▶️";
    }
};
