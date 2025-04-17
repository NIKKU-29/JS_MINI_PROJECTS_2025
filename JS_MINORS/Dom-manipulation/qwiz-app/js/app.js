const quizData = [{
    question: "Which of the following is a client site language?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d",
},
{
    question: "What does HTML stand for?",
    a: "Hypertext Markup Language",
    b: "Cascading Style Sheet",
    c: "Jason Object Notation",
    d: "Helicopters Terminals Motorboats Lamborginis",
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
    question: "What does CSS stands for?",
    a: "Hypertext Markup Language",
    b: "Cascading Style Sheet",
    c: "Jason Object Notation",
    d: "Helicopters Terminals Motorboats Lamborginis",
    correct: "b",
}
];

let currentQuestion = 0;
let score = 0;

const chnager = (value) =>{
    const question = document.getElementById("questionBox");
    // const allBoxes = document.querySelectorAll(".box");
    const Data = quizData[value];
    question.innerHTML = `${value + 1}. ${Data.question}`;
    const allBoxes = document.querySelectorAll(".box");
    const choices = [Data.a, Data.b, Data.c, Data.d];
    
    allBoxes.forEach((box, idx) => {
        box.children[1].innerText = choices[idx];
    });

    document.querySelectorAll('input[name="option"]').forEach(input => {
        input.checked = false;
    });
    

};

chnager(currentQuestion);

document.getElementById("submit").addEventListener('click', () => {

    const selected = document.querySelector('input[name="option"]:checked');

    if (!selected) {
        alert("Please select an answer!");
        return;
    }

    if (selected.value === quizData[currentQuestion].correct) {
        score++;
        document.getElementById("score").innerHTML = `YOUR SCORE : ${score}`
      
    } else {
        
        document.getElementById("score").style.backgroundColor = "RED";
        document.getElementById("score").innerHTML = `OOPS ❌ Wrong Answer! `
        setTimeout(() => {
             document.getElementById("score").innerHTML = `YOUR SCORE : ${score}`
             document.getElementById("score").style.backgroundColor = "Green";
        }, 1000);
    }

    currentQuestion++;
    if (currentQuestion < quizData.length) {
        chnager(currentQuestion);
    } else {
        setTimeout(() => {
                document.getElementById("questionBox").innerHTML = `<h2>Quiz Completed ✅</h2>`;
                document.getElementById("submit").style.display = "none";
                document.querySelectorAll(".box").forEach(box => {
                    box.style.display = "none";
                });

        }, 1000);
        
    }
});
