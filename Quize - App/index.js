
const questions = [
    {
        question: "Which is largest animal in the world?",
        answers:[
            {Text: "Shark", correect: false},
            {Text: "Blue whale", correect: true},
            {Text: "Elephant", correect: false},
            {Text: "Giraffe", correect: false}
        ]

    },
    {
        question: "Which is largest country in the world?",
        answers:[
            {Text: "China", correect: false},
            {Text: "Russia", correect: true},
            {Text: "U.S.A", correect: false},
            {Text: "India", correect: false}
        ]
    },
    {
        question: "Which is largest desert in the world?",
        answers:[
            {Text: "kalahari", correect: false},
            {Text: "Gobi", correect: false},
            {Text: "Sahara", correect: false},
            {Text: "Antarctica", correect: true}
        ]
    },
    {
        question: "Which is smallest cotinent in the world?",
        answers:[
            {Text: "Asia", correect: false},
            {Text: "Australia", correect: true},
            {Text: "Arctic", correect: false},
            {Text: "Africa", correect: false}
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
    score = 0 ;
    nextButton.innerHTML = "Next";
    showQuestion();
}




function showQuestion() {
    resetState(); // Clear previous answers
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.Text; // Ensure consistent key naming
        button.classList.add("btn");
        // Optional: Add click functionality
        // button.addEventListener("click", selectAnswer);

        if(answer.correect){
            button.dataset.correect = answer.correect;
        }
        answerButtons.appendChild(button);
        button.addEventListener("click" , selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorreect = selectedBtn.dataset.correect === "true";
    if (isCorreect){
        selectedBtn.classList.add("correect");
        score++;
    }else{
        selectedBtn.classList.add("incorect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correect === "true") { // Fixed 'correect' to 'correct'
            button.classList.add("correect"); // Fixed 'correect' to 'correct'
        }
        button.disabled = true; // Disable all buttons
    });
    
    nextButton.style.display = "block"; // Ensure the next button becomes visible
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}





function handleNextButton (){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else {
        showScore();
    }
}



nextButton.addEventListener("click", () =>{
    if (currentQuestionIndex< questions.length){
        handleNextButton();
    }else {
        startQuiz();
    }
})



// Call the showQuestion() function to display the first question
showQuestion();
