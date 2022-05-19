const questionText = document.getElementById('text-content');
const op1Btn = document.getElementById('op1');
const op2Btn = document.getElementById('op2');
const op3Btn = document.getElementById('op3');
const musicButton = document.getElementById('backgroundSlider');
const soundButton = document.getElementById('soundsSlider');
const userProgress = document.getElementById('user-progress');

musicButton.addEventListener('click', toggleMusic);
soundButton.addEventListener('click', toggleSound);
op1Btn.addEventListener('click', playSound, checkAnswer);
op2Btn.addEventListener('click', playSound, checkAnswer);
op3Btn.addEventListener('click', playSound, checkAnswer);

let currentQuestion = 0;
var score = 0;
var newQuestionList;

let easyQuestions = [
        {
            question: 'Dummy Question A',
            answers: [
                {option: 'Dummy Answer A1', answer: true},
                {option: 'Dummy Answer A2', answer: false},
                {option: 'Dummy Answer A3', answer: false}
            ]
        },
        {
            question: 'Dummy Question B',
            answers: [
                {option: 'Dummy Answer B1', answer: false},
                {option: 'Dummy Answer B2', answer: true},
                {option: 'Dummy Answer B3', answer: false}
            ]
        },
        {
            question: 'Dummy Question C',
            answers: [
                {option: 'Dummy Answer C1', answer: true},
                {option: 'Dummy Answer C2', answer: false},
                {option: 'Dummy Answer C3', answer: false}
            ]
        },
        {
            question: 'Dummy Question D',
            answers: [
                {option: 'Dummy Answer D1', answer: true},
                {option: 'Dummy Answer D2', answer: false},
                {option: 'Dummy Answer D3', answer: false}
            ]
        },
        {
            question: 'Dummy Question E',
            answers: [
                {option: 'Dummy Answer E1', answer: true},
                {option: 'Dummy Answer E2', answer: false},
                {option: 'Dummy Answer E3', answer: false}
            ]
        },
]

function createRandomQuiz() {
    for (let i = easyQuestions.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i)
        let k = easyQuestions[i]
        easyQuestions[i] = easyQuestions[j]
        easyQuestions[j] = k
    }
    newQuestionList = easyQuestions.slice(0, 2);
}

function beginQuiz (){
    createRandomQuiz();
    currentQuestion = 0;
    userProgress = 0;
    questionText.innerHTML = newQuestionList[currentQuestion].question;
    op1Btn.innerHTML = newQuestionList[currentQuestion].answers[0].option;
    op2Btn.innerHTML = newQuestionList[currentQuestion].answers[1].option;
    op3Btn.innerHTML = newQuestionList[currentQuestion].answers[2].option;
}

function checkAnswer() {
    if (this === op1Btn) {
        if (newQuestionList[currentQuestion].answers[0].answer) {
            op1Btn.classList.add('correct');
            score++;
        } else {
            op1Btn.classList.add('incorrect');
        }
        userProgress++;
        showAnswer();
    } else if (this === op2Btn) {
        if (newQuestionList[currentQuestion].answers[0].answer) {
            op2Btn.classList.add('correct');
            score++;
        } else {
            op2Btn.classList.add('incorrect');
        }
        userProgress++; 
        showAnswer();
    } else if (this === op3Btn) {
        if (newQuestionList[currentQuestion].answers[0].answer) {
            op3Btn.classList.add('correct');
            score++;
        } else {
            op3Btn.classList.add('incorrect');
        }
        userProgress++;
        showAnswer();
    } else {
        alert ('Something borked, try again!')
    }
}

beginQuiz();


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