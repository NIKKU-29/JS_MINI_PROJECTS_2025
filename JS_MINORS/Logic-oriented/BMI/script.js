const form = document.querySelector('form');

const calculate = (height, weight) =>
  weight / ((height * height) / 10000).toFixed(2);

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const height = parseInt(form.querySelector('#height').value);
  const weight = parseInt(form.querySelector('#weight').value);
  const ans = form.querySelector('#results');

  if (height === `` || height < 0 || isNaN(height)) {
    ans.innerHTML = `INVALID HEIGHT FORMAT`;
  } else if (weight === `` || weight < 0 || isNaN(weight)) {
    ans.innerHTML = `INVALID WEIGHT FORMAT`;
  } else {
    const bmi = calculate(height, weight);
    ans.innerHTML = `${bmi}`;
  }
});
