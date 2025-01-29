const quizData = [
    {
        question: "Which language runs in a web browser?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d",
    },
    {
        question: "What does CSS stand for?",
        a: "Central Style Sheets",
        b: "Cascading Style Sheets",
        c: "Cascading Simple Sheets",
        d: "Cars SUVs Sailboats",
        correct: "b",
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Hypertext Markdown Language",
        c: "Hyperloop Machine Language",
        d: "Helicopters Terminals Motorboats Lamborghinis",
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    },
    {
        question: "Which CSS property is used to change the text color of an element?",
        a: "font-color",
        b: "text-color",
        c: "color",
        d: "background-color",
        correct: "c",
    },
    {
        question: "What is the default position value in CSS?",
        a: "absolute",
        b: "relative",
        c: "static",
        d: "fixed",
        correct: "c",
    },
    {
        question: "Which company developed JavaScript?",
        a: "Microsoft",
        b: "Sun Microsystems",
        c: "Netscape",
        d: "Oracle",
        correct: "c",
    },
];

const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');

let currentQuiz = 0;
let score = 0;
let wrongAnswers = []; // Array to store incorrect answers

loadQuiz();

function loadQuiz() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

function deselectAnswers() {
    answerEls.forEach(answerEl => (answerEl.checked = false));
}

function getSelected() {
    let answer;
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected();
    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;
        } else {
            // Push wrong answer info into the array
            wrongAnswers.push({
                question: quizData[currentQuiz].question,
                yourAnswer: quizData[currentQuiz][answer],
                correctAnswer: quizData[currentQuiz][quizData[currentQuiz].correct],
            });
        }
        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            let resultHTML = `<h2>You answered ${score}/${quizData.length} questions correctly</h2>`;
            if (wrongAnswers.length > 0) {
                resultHTML += `<h3>Here are the questions you got wrong:</h3><ul>`;
                wrongAnswers.forEach(wrong => {
                    resultHTML += `<li>${wrong.question}<br>
                    Your Answer: <span style="color: red;">${wrong.yourAnswer}</span><br>
                    Correct Answer: <span style="color: green;">${wrong.correctAnswer}</span>
                    </li>`;
                });
                resultHTML += `</ul>`;
            }
            resultHTML += `<button onclick="location.reload()">Reload</button>`;
            quiz.innerHTML = resultHTML;
        }
    }
});
