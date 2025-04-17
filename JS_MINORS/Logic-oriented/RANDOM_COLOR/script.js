
const create = () =>{
    
    const newcolor = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'); 
    console.log(newcolor);
    document.body.style.backgroundColor = `#${newcolor}`
    document.querySelector("span").innerHTML = `#${newcolor}`;
    document.body.classList.add('blur-out');
    
    setTimeout(() => {
        document.body.style.backgroundColor = `#${newcolor}`;
        document.body.classList.remove("blur-out");
    }, 100); // match the CSS animation duration
};


const button = document.querySelector(".TAP");

button.addEventListener('click',create);