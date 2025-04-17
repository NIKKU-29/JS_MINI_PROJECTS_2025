const uppers = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowers = "abcdefghijklmnopqrstuvwxyz";
const numbers = "123456789";
const special = "~!@#$%^&*()_+/";

const userlen = document.querySelector(`#total-char`);
const upperEl = document.querySelector(`#upper-case`);
const lowerEl = document.querySelector(`#lower-case`);
const numberEl = document.querySelector(`#numbers`);
const symbolEl = document.querySelector(`#symbols`);
const passBox = document.querySelector(`#pass-box`);
const btn = document.querySelector(`#btn`);

const runner = (dataset) => dataset[Math.floor(Math.random() * dataset.length)];

btn.addEventListener('click', () => {

    let selected = [];
    if(upperEl.checked) selected.push(uppers);
    if(lowerEl.checked) selected.push(lowers);
    if(numberEl.checked) selected.push(numbers);
    if(symbolEl.checked) selected.push(special);

    let pass = "";

    const len = parseInt(userlen.value);
    if (selected.length === 0 || isNaN(len)) {
        passBox.innerText = "INVALID !! NO SELCTION";
        return;
    }

    selected.forEach(set => {
        pass += runner(set); 
    });

    for(let i = pass.length ; i <= len ; i++){
        const randomset = selected[Math.floor(Math.random() * selected.length)]
        pass += runner(randomset);
    }

    passBox.innerText = pass;

});