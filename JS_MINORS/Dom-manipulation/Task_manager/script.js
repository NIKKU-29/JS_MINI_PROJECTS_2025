const input = document.querySelector('.Task');
const add = document.querySelector('#add');
const list = document.querySelector('.show');

// Load tasks from localStorage
document.addEventListener('DOMContentLoaded', loadTasks);

add.addEventListener('click', function () {
    const taskText = input.value.trim();
    if (taskText) {
        addTask(taskText);
        saveTaskToStorage(taskText); // Save to localStorage
        input.value = ''; 
    }
});

// Function to create and add task to the list
function addTask(taskText) {
    const listItem = document.createElement('li');

    // Task text
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    taskSpan.classList.add('task-text');

    // Button container
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    // Remove button
    const remover = document.createElement('button');
    remover.innerHTML = 'Remove';
    remover.classList.add('remove-btn');
    remover.addEventListener('click', function () {
        list.removeChild(listItem);
        removeTaskFromStorage(taskText);
    });

    // Edit button
    const edit = document.createElement('button');
    edit.innerHTML = 'Edit';
    edit.classList.add('edit-btn');
    edit.addEventListener('click', function () {
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.classList.add('edit-input');
        inputField.value = taskSpan.textContent;

        const saveBtn = document.createElement('button');
        saveBtn.innerHTML = 'Save';
        saveBtn.classList.add('save-btn');

        listItem.innerHTML = '';
        listItem.appendChild(inputField);
        listItem.appendChild(saveBtn);

        saveBtn.addEventListener('click', function () {
            const updatedTask = inputField.value.trim();
            if (updatedTask) {
                updateTaskInStorage(taskSpan.textContent, updatedTask);
                taskSpan.textContent = updatedTask;
                listItem.innerHTML = '';
                listItem.appendChild(taskSpan);
                listItem.appendChild(buttonContainer);
            }
        });
    });

    // Append buttons to container
    buttonContainer.appendChild(edit);
    buttonContainer.appendChild(remover);

    // Append elements
    listItem.appendChild(taskSpan);
    listItem.appendChild(buttonContainer);
    list.appendChild(listItem);
}

// Function to save tasks in localStorage
function saveTaskToStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to remove task from localStorage
function removeTaskFromStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to update task in localStorage
function updateTaskInStorage(oldTask, newTask) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const index = tasks.indexOf(oldTask);
    if (index !== -1) {
        tasks[index] = newTask;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

// Function to load tasks from localStorage on page load
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    console.log(tasks);
    tasks.forEach(task => addTask(task));
}
