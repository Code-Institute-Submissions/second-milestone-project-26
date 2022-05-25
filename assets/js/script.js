// JS waits for DOM content to load first before running

window.addEventListener('DOMContentLoaded', () => {

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
    const maxQuestions = 10;

    //Event listeners for music controls

    musicToggle.addEventListener('click', function () {
        toggleMusic();
    });

    soundToggle.addEventListener('click', function () {
        toggleSound();
    });

    // Variables for the quiz functions

    let level = 0;
    let currentQuestion = {};
    let acceptingAnswers = true;
    let score = 0;
    let questionCounter = 0;
    let availableQuestions = [];

    // Variables for rememebering user audio choice

    let musicMemory = window.localStorage.getItem('bckgrdMusic');
    let soundMemory = window.localStorage.getItem('answerSound');

    // Start Game Function

    function startGame() {
        checkAudio();
        questionCounter = 0;
        score = 0;
        /* 
        Checks the page difficulty setting and pulls questions from the appropriate roster.
        If page does not have setting then game instructions are displayed
        */
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
            let instructions = document.getElementById('instructions');
            instructions.innerText = `Test your History Knowledge with this challenging quiz!
             Click on your desired difficulty below and try your hand at ${maxQuestions} questions.
              Read the question and click on the answer you think is the correct one.
               You'll find out whether you're right or wrong and then the next question will appear ready for you!`;
        }
    }

    // Move to next question function

    function getNewQuestion() {
        /* 
        Code to execute when the user has answered all the available questions. 
        Displays user score against the total number of questions asked.
        Hide's extra buttons and offer's user option to try again.
        Edited from Brian Design tutorial
        */
        if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
            question.innerText = `Congratulations! You answered ${score} out of ${maxQuestions} correctly!`;
            progressText.innerText = `That's all the questions this time!`;
            choices.forEach(choice => {
                choice.innerHTML = `<a href="index.html" class="return">Try Again!</a>`;
            });
            op1Btn.classList.add('hide');
            op3Btn.classList.add('hide');
        } else {

            // Code to execute until all questions are answered

            // Increments the question counter and updates progress bar - edited from Brian Design tutorial
            questionCounter++;
            progressText.innerText = `You are on question ${questionCounter} out of ${maxQuestions}`;
            progressBar.style.width = `${(questionCounter/maxQuestions) * 100}%`;

            // Randomises the question list - from Brian Design tutorial

            const questionIndex = Math.floor(Math.random() * availableQuestions.length);

            currentQuestion = availableQuestions[questionIndex];
            question.innerText = currentQuestion.question;

            // Applies answer choices to the option buttons - from Brian Design tutorial

            choices.forEach(choice => {
                const number = choice.dataset.number;
                choice.innerText = currentQuestion['choice' + number];
            });

            availableQuestions.splice(questionIndex, 1);

            acceptingAnswers = true;
        }
    }

    // Adds event listeners to the option buttons - from Brian Design tutorial

    choices.forEach(choice => {
        choice.addEventListener('click', e => {
            playSound();
            if (!acceptingAnswers) return;
            // Checks if selected answer is correct - edited from Brian Design tutorial
            acceptingAnswers = false;
            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.dataset.number;

            let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

            // Displays message depending on whether user answer is correct or incorrect 
            if (classToApply === 'correct') {
                score++;
                question.innerText = `Great Job! The correct answer was ${currentQuestion.answerText}`;
            } else if (classToApply !== 'correct') {
                question.innerText = `Afraid not! the correct answer was ${currentQuestion.answerText}`;
            }
            // Applies correct or incorrect class to the selected option - Edited from Brian Design tutorial
            selectedChoice.classList.add(classToApply);

            setTimeout(function () {
                selectedChoice.classList.remove(classToApply);
                getNewQuestion();
            }, 3000);
        });
    });

    startGame();

    // Functions to control background music and answer sounds

    // Starts and Pauses the background music on user click

    function toggleMusic() {
        let backgroundMusic = document.getElementById('background-music');
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            backgroundMusic.volume = 0.1;
            //Sets the session storage to remember user choice from page to page 
            window.localStorage.setItem('bckgrdMusic', 'true');
        } else {
            backgroundMusic.pause();
            //Sets the session storage to remember user choice from page to page
            window.localStorage.setItem('bckgrdMusic', 'false');
        }
    }
    
    // Toggles mute for the answer sounds

    function toggleSound() {
        let answerSound = document.getElementById('answer-sound');
        if (answerSound.muted === true) {
            answerSound.muted = false;
            answerSound.volume = 0.1;
            //Sets the session storage to remember user choice from page to page
            window.localStorage.setItem('answerSound', 'true');
        } else {
            answerSound.muted = true;
            //Sets the session storage to remember user choice from page to page
            window.localStorage.setItem('answerSound', 'false');
        }
    }

    // Plays answer sound on user click

    function playSound() {
        let answerSound = document.getElementById('answer-sound');
        answerSound.play();
    }

    // Checked the Audio settings against the session storage, sets the switch toggles and audio to user's selection.

    function checkAudio() {
        let soundInput = document.getElementById('sound');
        let backgrndInput = document.getElementById('bckgrnd');
        if (musicMemory === 'true' && soundMemory === 'true') {
            backgrndInput.checked = true;
            toggleMusic();
            soundInput.checked = true;
            toggleSound();
        } else if (musicMemory === 'false' && soundMemory === 'true') {
            backgrndInput.checked = false;
            soundInput.checked = true;
            toggleSound();
        } else if (musicMemory === 'true' && soundMemory === 'false') {
            backgrndInput.checked = true;
            toggleMusic();
            soundInput.checked = false;
        } else {
            backgrndInput.checked = false;
            soundInput.checked = false;
        }
    }

});