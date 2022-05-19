const question = document.getElementById('text-content');
const choices = Array.from(document.querySelectorAll('.option'));
const progressText = document.getElementById('progress-text');
const progressBar = document.getElementById('progress-bar');
const musicToggle = document.getElementById('background-slider');
const soundToggle = document.getElementById('sounds-slider');



// Functions to control background music and answer sounds

function toggleMusic() {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        backgroundMusic.volume = 0.25;
    } else {
        backgroundMusic.pause();
    }
}

function toggleSound() {
    if (answerSound.muted === true) {
        answerSound.muted = false;
    } else {
        answerSound.muted = true;
    }
}

function playSound() {
    answerSound.play()
}