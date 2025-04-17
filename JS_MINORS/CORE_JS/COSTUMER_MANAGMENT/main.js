const prompt = require("prompt-sync")();
let People = [];

const landing = () => {
    console.log("\nWELCOME TO THE MANAGEMENT SYSTEM\n");
    console.log("SELECT YOUR OPTIONS FROM BELOW");
    console.log("1. ADD A USER");
    console.log("2. REMOVE A USER");
    console.log("3. SEARCH A USER");
    console.log("4. SHOW ALL USERS");
    console.log("5. EXIT\n");
};

landing();

const USER_add = () => {
    console.log("\nADD NEW USER\n");
    const NAMEA = prompt("ENTER THE NAME: ");
    People.push(NAMEA);  // Using push() to add a new user
    console.log(`${NAMEA} has been added successfully.\n`);
};

const USER_remove = () => {
    console.log("\nUSER NAME TO REMOVE\n");
    const NAMER = prompt("ENTER THE NAME: ");
    
    const index = People.indexOf(NAMER);  // Find the index of the name
    if (index !== -1) {
        People.splice(index, 1);  // Using splice() to remove the user by index
        console.log(`${NAMER} has been removed.\n`);
    } else {
        console.log(`${NAMER} not found.\n`);
    }
};

const USER_find = () => {
    console.log("\nSEARCH FOR A USER\n");
    const NAMEF = prompt("ENTER THE NAME: ");
    if (People.includes(NAMEF)) {  // Using includes() to check if the name exists
        console.log("USER FOUND: " + NAMEF + "\n");
    } else {
        console.log("USER NOT FOUND\n");
    }
};

const USER_show = () => {
    console.log("\nSHOWING ALL USERS\n");
    let rank = 1;
    if (People.length > 0) {
        People.forEach(element => {
            console.log(rank + ". " + element);
            rank++;
        });
        console.log("");  // Adding a blank line after the user list
    } else {
        console.log("No users available.\n");
    }
};

let options = true;

while (options) {
    const choice = prompt("ENTER YOUR CHOICE (1-5): ");
    switch (choice) {
        case "1":
            USER_add();
            break;

        case "2":
            USER_remove();
            break;

        case "3":
            USER_find();
            break;

        case "4":
            USER_show();
            break;

        case "5":
            options = false;
            console.log("\nExiting the system. Goodbye!\n");
            break;

        default:
            console.log("Invalid choice. Please select a number between 1 and 5.\n");
    }
}
