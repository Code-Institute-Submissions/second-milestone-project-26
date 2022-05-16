// Function to toggle background music

let backgroundSlider = document.getElementById('backgroundSlider');
let backgroundMusic = document.getElementById('backgroundMusic');

backgroundSlider.addEventListener('click', function () {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        backgroundMusic.volume = 0.25;
    } else {
        backgroundMusic.pause();
    }
});

// Function to toggle mute for answer sounds
let answerSound = document.getElementById('answerSound');
let soundsSlider = document.getElementById('soundsSlider');

soundsSlider.addEventListener('click', function () {
    if (answerSound.muted === true) {
        answerSound.muted = false;
    } else {
        answerSound.muted = true;
    }
});

// Plays sound when user clicks their answer

let btns = document.getElementsByClassName('option');

for (i of btns) {
    i.addEventListener ('click', function() {
        answerSound.play();
    });
}

