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
const maxQuestions = 10

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

// Easy Question Roster

let easyQuestions = [{
        question: 'Who fought at the Battle of Actium in 31BC?',
        choice1: 'Octavian vs Mark Anthony and Cleopatra',
        choice2: 'Julius Caesar and Mark Anthony vs Cleopatra',
        choice3: 'Julius Caesar vs Cleopatra and Mark Antony',
        answer: 1,
        answerText: 'Octavian vs Mark Anthony and Cleopatra'
    },
    {
        question: 'What is the name of the Native American woman who helped the Lewis and Clark Expedition?',
        choice1: 'Zitkala-Sa',
        choice2: 'Sacagawea',
        choice3: 'Pocahontas',
        answer: 2,
        answerText: 'Sacagawea'
    },
    {
        question: 'What was Christopher Columbus looking for when he discovered America?',
        choice1: 'El Dorado',
        choice2: 'Proof of sea monsters',
        choice3: 'Passage to Asia',
        answer: 3,
        answerText: 'Passage to Asia'
    },
    {
        question: "Who was the founder of the Women's Social and Political Union, which was established to fight for women's suffrage in Britain?",
        choice1: 'Emmeline Pankhurst',
        choice2: 'Emily Wilding Davison',
        choice3: 'Constance Bryer',
        answer: 1,
        answerText: 'Emmeline Pankhurst'
    },
    {
        question: 'In what year did the Battle of Hastings take place?',
        choice1: '1036',
        choice2: '1066',
        choice3: '1096',
        answer: 2,
        answerText: '1066'
    },
    {
        question: 'Which two English counties fought against each other in the War of the Roses?',
        choice1: 'Hertfordshire and Bedfordshire',
        choice2: 'Yorkshire and Gloucestershire',
        choice3: 'Yorkshire and Lancashire',
        answer: 3,
        answerText: 'Yorkshire and Lancashire'
    },
    {
        question: 'During the War of the Roses, which other conflict broke out?',
        choice1: 'The One Hundred Years War',
        choice2: 'The Pretenders War',
        choice3: 'The French and Indian War',
        answer: 1,
        answerText: 'The One Hundred Years War'
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 2,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 3,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 1,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 2,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 3,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 1,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 2,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 3,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 1,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 2,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 3,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 1,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 2,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 3,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 1,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 2,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 3,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 1,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 2,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 3,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 1,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 2,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 3,
        answerText: ''
    }
]

// Medium Question Roster

let mediumQuestions = [{
        question: 'What is the name of the woman-shaped columns which famously hold up the Erectheion on the Acropolis in Athens?',
        choice1: 'Caryatids',
        choice2: 'Atheneiids',
        choice3: 'Caroliniads',
        answer: 1,
        answerText: 'Caryatids'
    },
    {
        question: 'The Stonewall Riots of 1969 were important for establishing the rights of which community in the USA?',
        choice1: 'African Americans',
        choice2: 'LGBTQIA+',
        choice3: 'Mexican immigrants',
        answer: 2,
        answerText: 'LGBTQIA+'
    },
    {
        question: "Who was the founder of the Women's Social and Political Union, which was established to fight for women's suffrage in Britain?",
        choice1: 'Constance Bryer',
        choice2: 'Emily Wilding Davison',
        choice3: 'Emmeline Pankhurst',
        answer: 3,
        answerText: 'Emmeline Pankhurst'
    },
    {
        question: 'In which historical period did Leonardo da Vinci live?',
        choice1: 'The Renaissance',
        choice2: 'Middle Ages',
        choice3: 'Victorian Era',
        answer: 1,
        answerText: 'The Renaissance'
    },
    {
        question: "How long is the Roman fortification of Hadrian's Wall?",
        choice1: '143 miles',
        choice2: '73 miles',
        choice3: '103 miles',
        answer: 2,
        answerText: '73 miles'
    },
    {
        question: 'Why did the War of the Roses begin?',
        choice1: "A marriage crisis where the king didn't marry who he was supposed to",
        choice2: 'The murder of the true heir followed by a hostile takeover',
        choice3: 'A succession crisis where the child of an heir took over from the king',
        answer: 3,
        answerText: 'A succession crisis where the child of an heir took over from the king'
    },
    {
        question: 'Which French national hero was captured and executed by Richard of York?',
        choice1: 'Joan of Arc',
        choice2: 'Charles the Victorious',
        choice3: 'John of Burgundy',
        answer: 1,
        answerText: 'Joan of Arc'
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 2,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 3,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 1,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 2,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 3,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 1,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 2,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 3,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 1,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 2,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 3,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 1,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 2,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 3,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 1,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 2,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 3,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 1,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 2,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 3,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 1,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 2,
        answerText: ''
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 3,
        answerText: ''
    }
]

// Hard Question Roster

let hardQuestions = [{
    question: 'Approximately how long did the Stone Age last?',
    choice1: '2.5 million years',
    choice2: '4.5 million years',
    choice3: '3.5 million years',
    answer: 1,
    answerText: '2.5 million years'
},
{
    question: 'During the War of the Roses, who became know for as the "Kingmaker" for his role in crowning two seperate kings during the conflict?',
    choice1: 'Edward Plantagenet of Middlesex',
    choice2: 'Richard Neville of Warwick',
    choice3: 'Henry Welles of Salisbury ',
    answer: 2,
    answerText: 'Richard Neville of Warwick'
},
{
    question: 'What is the first battle of the War of the Roses?',
    choice1: 'Battle of Northampton',
    choice2: 'Battle of Wakefield',
    choice3: 'Battle of St. Albans',
    answer: 3,
    answerText: 'Battle of St. Albans'
},
{
    question: '',
    choice1: '',
    choice2: '',
    choice3: '',
    answer: 1,
    answerText: ''
},
{
    question: "",
    choice1: '',
    choice2: '',
    choice3: '',
    answer: 2,
    answerText: ''
},
{
    question: '',
    choice1: '',
    choice2: '',
    choice3: '',
    answer: 3,
    answerText: ''
},
{
    question: '',
    choice1: '',
    choice2: '',
    choice3: '',
    answer: 1,
    answerText: ''
},
{
    question: '',
    choice1: '',
    choice2: '',
    choice3: '',
    answer: 2,
    answerText: ''
},
{
    question: '',
    choice1: '',
    choice2: '',
    choice3: '',
    answer: 3,
    answerText: ''
},
{
    question: '',
    choice1: '',
    choice2: '',
    choice3: '',
    answer: 1,
    answerText: ''
},
{
    question: '',
    choice1: '',
    choice2: '',
    choice3: '',
    answer: 2,
    answerText: ''
},
{
    question: '',
    choice1: '',
    choice2: '',
    choice3: '',
    answer: 3,
    answerText: ''
},
{
    question: '',
    choice1: '',
    choice2: '',
    choice3: '',
    answer: 1,
    answerText: ''
},
{
    question: '',
    choice1: '',
    choice2: '',
    choice3: '',
    answer: 2,
    answerText: ''
},
{
    question: '',
    choice1: '',
    choice2: '',
    choice3: '',
    answer: 3,
    answerText: ''
},
{
    question: '',
    choice1: '',
    choice2: '',
    choice3: '',
    answer: 1,
    answerText: ''
},
{
    question: '',
    choice1: '',
    choice2: '',
    choice3: '',
    answer: 2,
    answerText: ''
},
{
    question: '',
    choice1: '',
    choice2: '',
    choice3: '',
    answer: 3,
    answerText: ''
},
{
    question: '',
    choice1: '',
    choice2: '',
    choice3: '',
    answer: 1,
    answerText: ''
},
{
    question: '',
    choice1: '',
    choice2: '',
    choice3: '',
    answer: 2,
    answerText: ''
},
{
    question: '',
    choice1: '',
    choice2: '',
    choice3: '',
    answer: 3,
    answerText: ''
},
{
    question: '',
    choice1: '',
    choice2: '',
    choice3: '',
    answer: 1,
    answerText: ''
},
{
    question: '',
    choice1: '',
    choice2: '',
    choice3: '',
    answer: 2,
    answerText: ''
},
{
    question: '',
    choice1: '',
    choice2: '',
    choice3: '',
    answer: 3,
    answerText: ''
},
{
    question: '',
    choice1: '',
    choice2: '',
    choice3: '',
    answer: 1,
    answerText: ''
},
{
    question: '',
    choice1: '',
    choice2: '',
    choice3: '',
    answer: 2,
    answerText: ''
},
{
    question: '',
    choice1: '',
    choice2: '',
    choice3: '',
    answer: 3,
    answerText: ''
},
{
    question: '',
    choice1: '',
    choice2: '',
    choice3: '',
    answer: 1,
    answerText: ''
},
{
    question: '',
    choice1: '',
    choice2: '',
    choice3: '',
    answer: 2,
    answerText: ''
},
{
    question: '',
    choice1: '',
    choice2: '',
    choice3: '',
    answer: 3,
    answerText: ''
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
    if (availableQuestions.length === 0 || questionCounter > maxQuestions) {
        question.innerText = `Congratulations! You answered ${score} out of ${maxQuestions} correctly!`;
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
        progressText.innerText = `You are on question ${questionCounter} out of ${maxQuestions}`;
        progressBar.style.width = `${(questionCounter/maxQuestions) * 100}%`

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