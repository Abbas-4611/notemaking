
document.addEventListener('DOMContentLoaded', () => {
    const noteForm = document.getElementById('note-form');
    const noteInput = document.getElementById('note-input');
    const noteList = document.getElementById('note-list');
    const logoutBtn = document.getElementById('logout-btn');
    const uppercaseBtn = document.getElementById('uppercase-btn');
    const lowercaseBtn = document.getElementById('lowercase-btn');

    let notes = [];

    noteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const noteText = noteInput.value.trim();
        if (noteText === '') return;

        const note = { id: Date.now(), text: noteText };
        notes.push(note);

        noteInput.value = '';
        displayNotes();
    });

    noteList.addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON') {
            const id = parseInt(e.target.parentElement.getAttribute('data-id'), 10);
            notes = notes.filter(note => note.id !== id);
            displayNotes();
        }
    });

    logoutBtn.addEventListener('click', function() {
        // Clear session data (if any)
        notes = [];
        displayNotes();
        switchToLoginView();
    });

    uppercaseBtn.addEventListener('click', function() {
        notes = notes.map(note => {
            return { ...note, text: note.text.toUpperCase() };
        });
        displayNotes();
    });

    lowercaseBtn.addEventListener('click', function() {
        notes = notes.map(note => {
            return { ...note, text: note.text.toLowerCase() };
        });
        displayNotes();
    });

    function displayNotes() {
        noteList.innerHTML = '';
        notes.forEach(note => {
            const li = document.createElement('li');
            li.textContent = note.text;
            li.setAttribute('data-id', note.id);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            li.appendChild(deleteBtn);

            noteList.appendChild(li);
        });
    }

    function switchToLoginView() {
        document.getElementById('register-view').style.display = 'none';
        document.getElementById('login-view').style.display = 'block';
        document.getElementById('notes-view').style.display = 'none';
    }

    function switchToNotesView() {
        document.getElementById('register-view').style.display = 'none';
        document.getElementById('login-view').style.display = 'none';
        document.getElementById('notes-view').style.display = 'block';
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const registerEmail = document.getElementById('register-email');
    const registerPassword = document.getElementById('register-password');
    const loginEmail = document.getElementById('login-email');
    const loginPassword = document.getElementById('login-password');
    const registerView = document.getElementById('register-view');
    const loginView = document.getElementById('login-view');
    const notesView = document.getElementById('notes-view');

    let registeredEmail = '';
    let registeredPassword = '';

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        registeredEmail = registerEmail.value;
        registeredPassword = registerPassword.value;

        // Replace with actual backend API call for registration
        console.log(`Registering user with email: ${registeredEmail} and password: ${registeredPassword}`);

        // Assuming successful registration
        registerEmail.value = '';
        registerPassword.value = '';
        alert('Registration successful! Please login.');
        switchToLoginView();
    });

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = loginEmail.value;
        const password = loginPassword.value;

        // Validate login
        if (email === registeredEmail && password === registeredPassword) {
            loginEmail.value = '';
            loginPassword.value = '';
            alert('Login successful!');
            switchToNotesView();
        } else {
            alert('Invalid email or password. Please try again.');
        }
    });

    document.getElementById('login-link').addEventListener('click', function() {
        switchToLoginView();
    });

    document.getElementById('register-link').addEventListener('click', function() {
        switchToRegisterView();
    });

    function switchToLoginView() {
        registerView.style.display = 'none';
        loginView.style.display = 'block';
        notesView.style.display = 'none';
    }

    function switchToRegisterView() {
        registerView.style.display = 'block';
        loginView.style.display = 'none';
        notesView.style.display = 'none';
    }

    function switchToNotesView() {
        registerView.style.display = 'none';
        loginView.style.display = 'none';
        notesView.style.display = 'block';
    }
});