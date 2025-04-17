// Array of quotes for typing test
const quotes = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing speed tests are fun and challenging.",
    "JavaScript is a versatile programming language.",
    "Code every day to improve your skills.",
    "Practice makes perfect in typing.",
    "Good programmers write code that humans can understand.",
    "Debugging is twice as hard as writing the code in the first place.",
    "Any fool can write code that a computer can understand.",
    "First, solve the problem. Then, write the code.",
    "Clean code always looks like it was written by someone who cares."
];

// DOM Elements
const quoteDisplay = document.querySelector('.quote-display');
const inputField = document.querySelector('.input-field');
const timerDisplay = document.querySelector('.timer');
const startButton = document.querySelector('.start-btn');
const resultDisplay = document.querySelector('.result');
const accuracyDisplay = document.querySelector('.accuracy');
const ghostTextDisplay = document.querySelector('.ghost-text');

// Test Variables
let timeLeft = 30;
let timer;
let currentQuote = "";
let correctChars = 0;
let totalChars = 0;
let testActive = false;
let mistakes = 0;

// Function to start the test
function startTest() {
    if (testActive) return;
    
    testActive = true;
    inputField.value = "";
    inputField.disabled = false;
    inputField.focus();
    resultDisplay.textContent = "";
    accuracyDisplay.textContent = "";
    correctChars = 0;
    totalChars = 0;
    mistakes = 0;
    loadNewQuote();
    startTimer();
}

// Function to load a random quote
function loadNewQuote() {
    currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
    renderQuote();
}

// Function to render the quote with character-by-character styling
function renderQuote() {
    quoteDisplay.innerHTML = '';
    ghostTextDisplay.textContent = '';
    
    const typed = inputField.value;
    const typedLength = typed.length;
    
    // Display the typed part with appropriate styling
    for (let i = 0; i < Math.min(typedLength, currentQuote.length); i++) {
        const charSpan = document.createElement('span');
        const quoteChar = currentQuote[i];
        const typedChar = typed[i];
        
        charSpan.textContent = quoteChar;
        
        if (typedChar === quoteChar) {
            charSpan.classList.add('correct');
        } else {
            charSpan.classList.add('incorrect');
        }
        
        quoteDisplay.appendChild(charSpan);
    }
    
    // Display the remaining part that hasn't been typed yet
    for (let i = typedLength; i < currentQuote.length; i++) {
        const charSpan = document.createElement('span');
        charSpan.textContent = currentQuote[i];
        charSpan.classList.add('remaining');
        quoteDisplay.appendChild(charSpan);
    }
    
    // Update ghost text (next few characters to type)
    const ghostTextLength = 15; // Show next 15 characters
    const remainingText = currentQuote.slice(typedLength, typedLength + ghostTextLength);
    ghostTextDisplay.textContent = remainingText;
}

// Function to start the timer
function startTimer() {
    timeLeft = 30;
    timerDisplay.textContent = `Time: ${timeLeft}s`;
    
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time: ${timeLeft}s`;

        if (timeLeft === 0) {
            clearInterval(timer);
            endTest();
        }
    }, 1000);
}

// Function to end the test
function endTest() {
    testActive = false;
    inputField.disabled = true;
    clearInterval(timer);
    showResult();
}

// Function to calculate and show typing speed result
function showResult() {
    // Calculate words per minute (WPM)
    // Standard: 5 characters = 1 word
    const wordsTyped = correctChars / 5;
    const wpm = Math.round(wordsTyped * (60 / 30)); // Convert to words per minute
    
    // Calculate accuracy
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;
    
    resultDisplay.textContent = `Typing Speed: ${wpm} WPM`;
    accuracyDisplay.textContent = `Accuracy: ${accuracy}%`;
}

// Event listener for user input
inputField.addEventListener('input', function() {
    if (!testActive) {
        startTest();
        return;
    }
    
    const typedText = inputField.value;
    totalChars = typedText.length;
    correctChars = 0;
    
    // Compare typed text with current quote for accuracy
    for (let i = 0; i < typedText.length; i++) {
        if (i < currentQuote.length && typedText[i] === currentQuote[i]) {
            correctChars++;
        }
    }
    
    // If user completes the current quote, load a new one
    if (typedText === currentQuote) {
        inputField.value = "";
        loadNewQuote();
    } else {
        renderQuote();
    }
});

// Start button event listener
startButton.addEventListener('click', startTest);

// Prevent users from copying the text
quoteDisplay.addEventListener('copy', e => e.preventDefault());
ghostTextDisplay.addEventListener('copy', e => e.preventDefault());

// Add keyboard shortcut for restarting (Ctrl+Enter)
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'Enter') {
        startTest();
    }
});

// Initialize the interface
window.addEventListener('DOMContentLoaded', () => {
    loadNewQuote();
    inputField.disabled = true;
});