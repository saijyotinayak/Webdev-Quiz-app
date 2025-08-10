const questions = [
    {
        question: "What is the use of the 'typeof' operator in JavaScript?",
        answers:[
            {text:"To check if a variable is defined",correct: false},
            {text:" To determine the type of a variable",correct: true},
            {text:"To declare a variable",correct: false},
            {text:"To compare two values",correct: false},
        ]
    },
    {
        question: "What is the difference between == and === in JavaScript?",
        answers:[
            {text:"== is strict, === is loose",correct: false},
            {text:"== compares value, === compares value and type",correct: true},
            {text:"=== compares only values",correct: false},
            {text:"Both are the same",correct: false},
        ]
    },
    {
        question: "What does 'const' do in JavaScript?",
        answers:[
            {text:"Declares a variable that can be reassigned",correct: false},
            {text:"Declares a block-scoped variable",correct: false},
            {text:"Declares a constant that can’t be reassigned",correct: true},
            {text:"Declares a global variable",correct: false},
        ]
    },
    {
        question: "What is a callback function?",
        answers:[
            {text:"A function that calls itself",correct: false},
            {text:"A function passed into another function as an argument",correct: true},
            {text:"A function used to create closures",correct: false},
            {text:"A function used in async/await",correct: false},
        ]
    },
    {
        question: "What is the default display of 'div'?",
        answers:[
            {text:"inline",correct: false},
            {text:"block",correct: true},
            {text:"inline-block",correct: false},
            {text:"none",correct: false},
        ]
    },
    {
        question: "What does position: fixed; do?",
        answers:[
            {text:"Scrolls with page",correct: false},
            {text:"Hides element",correct: false},
            {text:"Stays in place",correct: true},
            {text:"Floats right",correct: false},
        ]
    },
    {
        question: "What is the Temporal Dead Zone (TDZ) in JavaScript?",
        answers:[
            {text:"When a variable is globally undefined",correct: false},
            {text:"An error related to var hoisting",correct: false},
            {text:"A deprecated feature",correct: false},
            {text:"The time between variable declaration and initialization",correct: true},
        ]
    },
    {
        question: "How does 'this' behave inside an arrow function?",
        answers:[
            {text:"this refers to the global object",correct: false},
            {text:"this is dynamically scoped",correct: false},
            {text:"this is lexically bound to its surrounding scope",correct: true},
            {text:"this always refers to the function itself",correct: false},
        ]
    },
    {
        question: "What happens if the image is not found?",
        answers:[
            {text:"Shows a blank",correct: false},
            {text:"Shows error",correct: false},
            {text:"Shows alt text",correct: true},
            {text:"Reloads page",correct: false},
        ]
    },
    {
        question: "How does NaN === NaN evaluate?",
        answers:[
            {text:"true",correct: false},
            {text:"false",correct: true},
            {text:"Error",correct: false},
            {text:"undefined",correct: false},
        ]
    }
    
    
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true; 
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});


startQuiz();
