const questions = [
    {
        question:"Which keyword is used to declare a variable in JavaScript?",
        answers:[
            {text:"let",correct:true},
            {text:"print",correct:false},
            {text:"int",correct:false},
            {text:"echo",correct:false}
        ]
    },

    {
        question:"Which method is used to add an element at the end of an array?",
        answers:[
            {text:"push()",correct:true},
            {text:"pop()",correct:false},
            {text:"shift()",correct:false},
            {text:"slice()",correct:false}
        ]
    },

    {
        question: "Which method converts JSON string into JavaScript object?",
        answers:[
            {text:"JSON.parse()",correct:true},
            {text:"JSON.stringify()",correct:false},
            {text:"JSON.convert()",correct:false},
            {text:"JSON.object()",correct:false},
        ]
    },

    {
        question:"Which method is used to select an element using a CSS selector?",
        answers:[
            { text: "querySelector()", correct: true },
            { text: "getElement()", correct: false },
            { text:  "select()", correct: false },
            { text: "findElement()", correct:false },
        ]
    },
];

const questionElement = document.querySelector("#question");
const answerButtons = document.querySelector("#answers");
const nextButton = document.querySelector("#next-btn");
const questionNumber = document.querySelector("#question-number");
const scoreElement = document.querySelector("#score");
const resultElement = document.querySelector("#result");
const finalScore = document.querySelector("#final-score");
const restartButton = document.querySelector("#restart-btn");

let currentQuestionIndex = 0;
let score = 0;

//Quiz Start
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = "Score:0";
    nextButton.style.display = "block";
    resultElement.style.display = "none";
    showQuestion();
}

//Question show karna
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
    questionNumber.textContent =
    `Question ${questionNo} of ${questions.length}`;
    questionElement.textContent = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answers-btn");
        if(answer.correct){
            button.dataset.correct = "true";
        }
        button.addEventListener("click",selectAnswer);
        answerButtons.appendChild(button);
    });
}

// Purane buttons remove karna
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Answer select karna
function selectAnswer(event){
   const selectedButton = event.target;
   const isCorrect = selectedButton.dataset.correct === "true";

   if(isCorrect){
    selectedButton.classList.add("correct");
    score++;
    scoreElement.textContent = `Score: ${score}`;
   }else{
       selectedButton.classList.add("wrong");
   }

   Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true"){
         button.classList.add("correct");
    }
    button.disabled = true;
   });
   nextButton.style.display = "block";
}

// Next button
nextButton.addEventListener("click",()=>{
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showResult();
    }
});

// Result
function showResult(){
    questionElement.style.display = "none";
    answerButtons.style.display = "none";
    nextButton.style.display = "none";
    questionNumber.style.display = "none";
    scoreElement.style.display = "none";
    resultElement.style.display = "block";
    finalScore.textContent = `You scored ${score} out of ${questions.length}`;
}

//Restart
restartButton.addEventListener("click",() => {
    questionElement.style.display = "block";
    answerButtons.style.display = "flex";
    questionNumber.style.display = "block";
    scoreElement.style.display = "block";
    
})

//Restart button
restartButton.addEventListener("click", () => {
    startQuiz();
});
startQuiz();