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
let timeoutId = null;
let userAnswers = [];

function showQuestion() {
    // Clear any existing timeout
    if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
    }
    
    const q = questions[currentQuestion];
    document.getElementById('question').textContent = q.question;
    document.getElementById('current').textContent = currentQuestion + 1;
    document.getElementById('total').textContent = questions.length;
    
    const optionsEl = document.getElementById('options');
    optionsEl.innerHTML = '';
    
    q.options.forEach((option, i) => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.onclick = () => selectAnswer(i);
        optionsEl.appendChild(btn);
    });
    
    document.getElementById('feedback').style.display = 'none';
}

function selectAnswer(i) {
    const q = questions[currentQuestion];
    const feedbackEl = document.getElementById('feedback');
    
    // Store user answer
    userAnswers[currentQuestion] = i;
    
    // Disable all option buttons after selection
    const optionButtons = document.querySelectorAll('#options button');
    optionButtons.forEach(btn => {
        btn.disabled = true;
    });
    
    if (i === q.answer) {
        feedbackEl.textContent = "✅ Correct!";
        feedbackEl.className = "correct";
        score++;
    } else {
        feedbackEl.textContent = `❌ Wrong! The correct answer is: ${q.options[q.answer]}`;
        feedbackEl.className = "incorrect";
    }
    
    document.getElementById('score').textContent = score;
    feedbackEl.style.display = 'block';
    
    // Auto-advance after 2 seconds
    timeoutId = setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 2000);
}

function showResults() {
    const percentage = Math.round((score / questions.length) * 100);
    
    // Update results display
    document.getElementById('final-score').textContent = percentage;
    document.getElementById('correct-count').textContent = score;
    document.getElementById('total-questions').textContent = questions.length;
    
    // Animate the performance meter
    document.getElementById('meter-fill').style.width = `${percentage}%`;
    
    // Generate question review
    const reviewContainer = document.getElementById('question-review');
    reviewContainer.innerHTML = '';
    
    questions.forEach((q, index) => {
        const reviewItem = document.createElement('div');
        reviewItem.className = `question-review-item ${userAnswers[index] === q.answer ? 'correct' : 'incorrect'}`;
        reviewItem.innerHTML = `
            <p><strong>Q${index + 1}:</strong> ${q.question}</p>
            <p>Your answer: ${q.options[userAnswers[index]] || 'Not answered'}</p>
            ${userAnswers[index] !== q.answer ? `<p>Correct answer: ${q.options[q.answer]}</p>` : ''}
        `;
        reviewContainer.appendChild(reviewItem);
    });
    
    // Show results section
    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('results').classList.remove('hidden');
    
    // Add share functionality
    document.getElementById('share').addEventListener('click', () => {
        const shareText = `I scored ${percentage}% on the Tech Quiz! Can you beat my score?`;
        if (navigator.share) {
            navigator.share({
                title: 'Tech Quiz Results',
                text: shareText
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            alert(shareText);
        }
    });
}

document.getElementById('restart').addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    document.getElementById('quiz').classList.remove('hidden');
    document.getElementById('results').classList.add('hidden');
    document.getElementById('score').textContent = 0;
    showQuestion();
});

// Initialize quiz
showQuestion();