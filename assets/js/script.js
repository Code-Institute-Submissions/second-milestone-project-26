// Function to toggle background music

let backgroundSlider = document.getElementById('backgroundSlider');
let backgroundMusic = document.getElementById('backgroundMusic');

backgroundSlider.addEventListener("click", function () {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        backgroundMusic.volume = 0.25;
    } else {
        backgroundMusic.pause();
    }
});