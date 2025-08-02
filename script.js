const questions = [
    {
        question: "What does 'HTTP' stand for?",
        options: ["HyperText Transfer Protocol", "High-Level Text Protocol", "Hyperlink Text Transfer Process"],
        answer: 0
    },
    {
        question: "Which data structure uses LIFO principle?",
        options: ["Queue", "Stack", "Tree"],
        answer: 1
    },
    {
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n²)"],
        answer: 1
    },
    {
        question: "Which language is primarily used for Android development?",
        options: ["Swift", "Java/Kotlin", "C#"],
        answer: 1
    }
];

let currentQuestion = 0;
let score = 0;

function showQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('question').textContent = q.question;
    const optionsEl = document.getElementById('options');
    optionsEl.innerHTML = '';
    
    q.options.forEach((option, i) => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.onclick = () => selectAnswer(i);
        optionsEl.appendChild(btn);
    });
    
    document.getElementById('total').textContent = questions.length;
    document.getElementById('next').style.display = 'none';
    document.getElementById('feedback').style.display = 'none';
}

function selectAnswer(i) {
    const q = questions[currentQuestion];
    const feedbackEl = document.getElementById('feedback');
    
    if (i === q.answer) {
        feedbackEl.textContent = "✅ Correct!";
        feedbackEl.className = "correct";
        score++;
    } else {
        feedbackEl.textContent = "❌ Wrong!";
        feedbackEl.className = "incorrect";
    }
    
    document.getElementById('score').textContent = score;
    feedbackEl.style.display = 'block';
    document.getElementById('next').style.display = 'block';
}

function showResults() {
    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('results').classList.remove('hidden');
    document.getElementById('final-score').textContent = 
        Math.round((score / questions.length) * 100);
}

document.getElementById('next').addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
});

document.getElementById('restart').addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    document.getElementById('quiz').classList.remove('hidden');
    document.getElementById('results').classList.add('hidden');
    document.getElementById('score').textContent = 0;
    showQuestion();
});

// Initialize quiz
showQuestion();