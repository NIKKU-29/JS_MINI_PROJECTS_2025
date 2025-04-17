// Selectors
const adder = document.getElementById('addBtn');
const pad = document.getElementById('main');

// User function
const LocalSave = () => {
    const notes = document.querySelectorAll(".note textarea");
    let data = [];
    
    notes.forEach(info => {
        data.push(info.value);
    });
    
    if (data.length === 0) {
        localStorage.removeItem("data");
    } else {
        localStorage.setItem("data", JSON.stringify(data));
    }
};

// Function to create a new note with all event listeners
const addNote = () => {
    const note = document.createElement("div");
    note.classList.add("note");

    note.innerHTML = `
        <div class="tool">
            <i id="S" class="fas fa-save"></i>
            <i id="X" class="fas fa-trash"></i>
        </div>
        <textarea class="textarea"></textarea>
    `;
    
    pad.appendChild(note);
    
    // Add event listeners to the new note
    note.querySelector("#X").addEventListener('click', () => {
        // Add deleting animation class
        note.classList.add('deleting');
        
        // Wait for animation to complete before actually removing
        setTimeout(() => {
            note.remove();
            LocalSave();
        }, 500); // Match this to the animation duration
    });

    note.querySelector("#S").addEventListener('click', () => {
        // Add saving animation class
        note.classList.add('saving');
        
        // Save the data
        LocalSave();
        
        // Remove the class after animation completes
        setTimeout(() => {
            note.classList.remove('saving');
        }, 800); // Match this to the animation duration
    });
    
    note.querySelector("textarea").addEventListener('input', () => {
        LocalSave();
    });
    
    return note;
};

window.onload = () => {
    const savedNotes = JSON.parse(localStorage.getItem("data")) || [];

    // If there are no saved notes, create an empty note
    if (savedNotes.length === 0) {
        addNote();
    } else {
        // Load saved notes
        savedNotes.forEach(content => {
            const note = addNote();
            note.querySelector("textarea").value = content;
        });
    }
};

// Add new note button event listener
adder.addEventListener('click', () => {
    addNote();
});