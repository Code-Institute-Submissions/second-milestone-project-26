// Constants for the functions to use

const question = document.getElementById('text-content');
const choices = Array.from(document.querySelectorAll('.option'));
const progressText = document.getElementById('progress-text');
const progressBar = document.getElementById('progress-bar');
const musicToggle = document.getElementById('background-slider');
const soundToggle = document.getElementById('sounds-slider');
const op1Btn = document.getElementById('op1');
const op3Btn = document.getElementById('op3');
const difficulty = document.getElementById('difficulty');
const MAX_QUESTIONS = 5

//Event listeners for music controls

musicToggle.addEventListener('click', function () {
    toggleMusic();
})

soundToggle.addEventListener('click', function () {
    toggleSound();
})

// Variables for the quiz functions

let level = 0;
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// Easy Question Roster - Currently Dummy

let easyQuestions = [{
        question: 'Dummy Q A',
        choice1: 'A1',
        choice2: 'A2',
        choice3: 'A3',
        answer: 2,
        answerText: 'A2'
    },
    {
        question: 'Dummy Q B',
        choice1: 'B1',
        choice2: 'B2',
        choice3: 'B3',
        answer: 3,
        answerText: 'B3'
    },
    {
        question: 'Dummy Q C',
        choice1: 'C1',
        choice2: 'C2',
        choice3: 'C3',
        answer: 1,
        answerText: 'C1'
    },
    {
        question: 'Dummy Q D',
        choice1: 'D1',
        choice2: 'D2',
        choice3: 'D3',
        answer: 2,
        answerText: 'D2'
    },
    {
        question: 'Dummy Q E',
        choice1: 'E1',
        choice2: 'E2',
        choice3: 'E3',
        answer: 3,
        answerText: 'E3'
    }
]

// Medium Question Roster - Currently Dummy

let mediumQuestions = [{
    question: 'Dummy Q A',
    choice1: 'A1',
    choice2: 'A2',
    choice3: 'A3',
    answer: 2,
    answerText: 'A2'
},
{
    question: 'Dummy Q B',
    choice1: 'B1',
    choice2: 'B2',
    choice3: 'B3',
    answer: 3,
    answerText: 'B3'
},
{
    question: 'Dummy Q C',
    choice1: 'C1',
    choice2: 'C2',
    choice3: 'C3',
    answer: 1,
    answerText: 'C1'
},
{
    question: 'Dummy Q D',
    choice1: 'D1',
    choice2: 'D2',
    choice3: 'D3',
    answer: 2,
    answerText: 'D2'
},
{
    question: 'Dummy Q E',
    choice1: 'E1',
    choice2: 'E2',
    choice3: 'E3',
    answer: 3,
    answerText: 'E3'
}
]

// Hard Question Roster - Currently Dummy

let hardQuestions = [{
    question: 'Dummy Q A',
    choice1: 'A1',
    choice2: 'A2',
    choice3: 'A3',
    answer: 2,
    answerText: 'A2'
},
{
    question: 'Dummy Q B',
    choice1: 'B1',
    choice2: 'B2',
    choice3: 'B3',
    answer: 3,
    answerText: 'B3'
},
{
    question: 'Dummy Q C',
    choice1: 'C1',
    choice2: 'C2',
    choice3: 'C3',
    answer: 1,
    answerText: 'C1'
},
{
    question: 'Dummy Q D',
    choice1: 'D1',
    choice2: 'D2',
    choice3: 'D3',
    answer: 2,
    answerText: 'D2'
},
{
    question: 'Dummy Q E',
    choice1: 'E1',
    choice2: 'E2',
    choice3: 'E3',
    answer: 3,
    answerText: 'E3'
}
]

// Start Game Function

function startGame() {
    questionCounter = 0;
    score = 0;
    level = difficulty.dataset.number;
    if (level === '1') {
        availableQuestions = [...easyQuestions];
        getNewQuestion();
    } else if (level === '2') {
        availableQuestions = [...mediumQuestions];
        getNewQuestion();
    } else if (level === '3') {
        availableQuestions = [...hardQuestions];
        getNewQuestion();
    } else {
        let url = 'https://youtu.be/dQw4w9WgXcQ';
        window.open(url, '_blank');
    }
}

// Move to next question function

function getNewQuestion() {
    // Code to execute when the user has answered all the available questions
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        question.innerText = `Congratulations! You answered ${score} out of ${MAX_QUESTIONS} correctly!`;
        progressText.innerText = `That's all the questions this time!`;
        choices.forEach(choice => {
            choice.innerHTML = `<a href="index.html" class="return">Try Again!</a>`
        })
        op1Btn.classList.add('hide');
        op3Btn.classList.add('hide');
    } else {

        // Code to execute until all questions are answered

        // Increments the question counter and updates progress bar
        questionCounter++;
        progressText.innerText = `You are on question ${questionCounter} out of ${MAX_QUESTIONS}`;
        progressBar.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

        // Randomises the question list

        const questionIndex = Math.floor(Math.random() * availableQuestions.length);

        currentQuestion = availableQuestions[questionIndex];
        question.innerText = currentQuestion.question;

        // Applies answer choices to the option buttons

        choices.forEach(choice => {
            const number = choice.dataset['number']
            choice.innerText = currentQuestion['choice' + number]
        })

        availableQuestions.splice(questionIndex, 1);

        acceptingAnswers = true;
    }
}

// Adds event listeners to the option buttons

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        playSound();
        if (!acceptingAnswers) return;
        // Checks if selected answer is correct
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            score++;
            question.innerText = `Great Job! The correct answer was ${currentQuestion.answerText}`;
        } else if (classToApply !== 'correct') {
            question.innerText = `Afraid not! the correct answer was ${currentQuestion.answerText}`;
        }
        // Applies correct or incorrect class to the selected option
        selectedChoice.classList.add(classToApply);

        setTimeout(function () {
            selectedChoice.classList.remove(classToApply);
            getNewQuestion();
        }, 2000);
    })
});

startGame();

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