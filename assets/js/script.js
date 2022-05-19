const question = document.getElementById('text-content');
const choices = Array.from(document.querySelectorAll('.option'));
const progressText = document.getElementById('progress-text');
const progressBar = document.getElementById('progress-bar');
const musicToggle = document.getElementById('background-slider');
const soundToggle = document.getElementById('sounds-slider');

musicToggle.addEventListener('click', function () {
    toggleMusic();
})

soundToggle.addEventListener('click', function () {
    toggleSound();
})

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [{
        question: 'Dummy Q A',
        choice1: 'A1',
        choice2: 'A2',
        choice3: 'A3',
        answer: 2
    },
    {
        question: 'Dummy Q B',
        choice1: 'B1',
        choice2: 'B2',
        choice3: 'B3',
        answer: 3
    },
    {
        question: 'Dummy Q C',
        choice1: 'C1',
        choice2: 'C2',
        choice3: 'C3',
        answer: 1
    },
    {
        question: 'Dummy Q D',
        choice1: 'D1',
        choice2: 'D2',
        choice3: 'D3',
        answer: 2
    },
    {
        question: 'Dummy Q E',
        choice1: 'E1',
        choice2: 'E2',
        choice3: 'E3',
        answer: 3
    }
]

const MAX_QUESTIONS = 5

function startGame() {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

function getNewQuestion() {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        question.innerText = `Congratulations! You answered ${score} out of ${MAX_QUESTIONS} correctly!`;
        progressText.innerText = `That's all the questions this time!`;
        choices.forEach(choice => {
            choice.innerHTML = `<a href="index.html" class="return">Try Again!</a>`
        })
    } else {

    questionCounter++;
    progressText.innerText = `You are on question ${questionCounter} out of ${MAX_QUESTIONS}`;
    progressBar.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`


    const questionIndex = Math.floor(Math.random() * availableQuestions.length);

    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
}
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        playSound();
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            score++;
        }

        selectedChoice.classList.add(classToApply);

        setTimeout(function () {
            selectedChoice.classList.remove(classToApply);
            getNewQuestion();
        }, 1500);
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