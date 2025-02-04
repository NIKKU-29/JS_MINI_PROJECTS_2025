const name = `Nemish`;
const bankBalance = new Number(200000);
console.log(name);
console.log(typeof(name));
console.log(bankBalance.toString());
console.log(typeof(bankBalance));





//how to use a recursive function
let fun = function() {
    return Math.random();
};

let counter = 1;
let result;

while (true) {  // Loop until a realistic stopping condition is met
    counter++;
    result = fun();
    
    if (result >= 0.9555) {  // This ensures we exit at a high probability
        console.log(`this is to show how to use a recusive function in js`)
        console.log(`We hit it at ${counter}`);
        break;  // Stop the loop
    }
}
