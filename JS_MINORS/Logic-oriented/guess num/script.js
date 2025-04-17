let target = Math.floor(Math.random() * 100) + 1;
const outputView = document.querySelector('.lowOrHi');
const guessField = document.querySelector('#guessField');
const guessLeftElement = document.querySelector('.lastResult');
const prevGuessElement = document.querySelector('.guesses');
const form = document.querySelector('form');

let guessLeft = Number(guessLeftElement.textContent);
let prevGuesses = [];

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = parseInt(guessField.value);

  if (!isNaN(input)) {
    if (input === target) {
      outputView.innerHTML = `🎉 Congratulations! You found the number ${input}!`;
      setTimeout(() => location.reload(), 10000);
      return;
    }

    prevGuesses.push(input);
    guessLeftElement.textContent = --guessLeft;

    outputView.innerHTML = input < target ? '📈 Go higher!' : '📉 Go lower!';
    prevGuessElement.innerHTML = prevGuesses.join(', ');
    if (guessLeft <= 0) {
      outputView.innerHTML = `😞 No more guesses left! The number was ${target}.`;
      setTimeout(() => location.reload(), 2000);
    }
  } else {
    alert('⚠️ Please enter a valid number!');
  }

  guessField.value = '';
});
