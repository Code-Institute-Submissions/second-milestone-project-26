//JS code for the audio play and control functions

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

// Plays sound when user clicks an answer

let btns = document.getElementsByClassName('option');

for (i of btns) {
    i.addEventListener('click', function () {
        answerSound.play();
    });
}

// JS code for quiz section

document.addEventListener('DOMContentLoaded', function() {
    shuffleQuizList();
});

function startQuiz () {

};

function shuffleQuizList () {
    for (let i = easyQuestionList.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i)
        let k = easyQuestionList[i]
        easyQuestionList[i] = easyQuestionList[j]
        easyQuestionList[j] = k
    }
    console.log('List shuffled');
};

function createQuizArray () {

};

function showQuestion () {

};

function showOptions () {

};

function checkAnswer () {

};

function showAnswer () {

};

//Questions List - Easy

const easyQuestionList = [
    {
        question:"Dummy question 1",
        answers: {
            a: 'Dummy answer 1a',
            b: 'Dummy answer 1b',
            c: 'Dummy answer 1c'
        },
        correctAnswer: 'b'
    },
    {
        question:"Dummy question 2",
        answers: {
            a: 'Dummy answer 2a',
            b: 'Dummy answer 2b',
            c: 'Dummy answer 2c'
        },
        correctAnswer: 'b'
    },
    {
        question:"Dummy question 3",
        answers: {
            a: 'Dummy answer 3a',
            b: 'Dummy answer 3b',
            c: 'Dummy answer 3c'
        },
        correctAnswer: 'a'
    },
    {
        question:"Dummy question 4",
        answers: {
            a: 'Dummy answer 4a',
            b: 'Dummy answer 4b',
            c: 'Dummy answer 4c'
        },
        correctAnswer: 'c'
    }
];