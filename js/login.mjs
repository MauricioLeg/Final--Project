export function setupAuth() {
    const loginLink = document.getElementById('nav-login');
    const registerLink = document.getElementById('nav-register');
    const authModal = document.getElementById('auth-modal');
    const closeBtn = document.getElementById('auth-close-btn');

    const authTitle = document.getElementById('auth-title');
    const authForm = document.getElementById('auth-form');
    const ageGroup = document.getElementById('auth-age-group');
    const ageInput = document.getElementById('auth-age');
    const submitBtn = document.getElementById('auth-submit-btn');
    const toggleLink = document.getElementById('auth-toggle-link');
    const feedbackDiv = document.getElementById('auth-feedback');

    let isLoginMode = false;

    function openModal(mode) {
        authModal.classList.remove('hidden');
        feedbackDiv.classList.add('hidden');
        authForm.reset();

        if (mode === 'login') {
            setLoginMode();
        } else {
            setRegisterMode();
        }
    }

    function closeModal() {
        authModal.classList.add('hidden');
    }

    function setLoginMode() {
        isLoginMode = true;
        authTitle.textContent = 'Log In';
        ageGroup.style.display = 'none';
        ageInput.removeAttribute('required');
        submitBtn.textContent = 'Log In';
        toggleLink.textContent = 'Need an account? Register here'
    }
    function setRegisterMode() {
        isLoginMode = false;
        authTitle.textContent = 'Register';
        ageGroup.style.display = 'flex';
        ageInput.setAttribute('required', 'true');
        submitBtn.textContent = 'Create Account';
        toggleLink.textContent = 'Already have an account? Log in here'
    }

    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        openModal('login')
    });
    registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        openModal('register');
    });

    closeBtn.addEventListener('click', closeModal);

    toggleLink.addEventListener('click', (e) => {
        e.preventDefault();
        feedbackDiv.classList.add('hidden');
        if (isLoginMode) {
            setRegisterMode();
        } else {
            setLoginMode();
        }
    });
    
    authModal.addEventListener('click', (e) => {
        if (e.target === authModal) {
            closeModal();
        }
    });

    authForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('auth-username').value.trim();
        const password = document.getElementById('auth-password').value.trim();

        feedbackDiv.classList.remove('hidden');

        if (isLoginMode) {
            const storedUser = localStorage.getItem(`user_${username}`);

            if (storedUser) {
                const userData = JSON.parse(storedUser);
                if (userData.password === password) {
                    showFeedback(`Welcome back, ${username}!`, 'success');
                    sessionStorage.setItem('active-user', username);
                    setTimeout(closeModal, 1500);
                } else {
                    showFeedback('Incorrect password', 'error');
                }
            } else {
                showFeedback('Username not found', 'error');
            }
        } else {
            const age = ageInput.value.trim();

            if (localStorage.getItem(`user_${username}`)) {
                showFeedback('Username already exists. Please log in', 'error');
                return;
            }

            const newProfile = {
                username: username,
                age: age,
                password: password // This is a simulation, don't do this in the real world bro
            }

            localStorage.setItem(`user_${username}`, JSON.stringify(newProfile));
            sessionStorage.setItem('active_user', username);

            showFeedback('Account created successfully', 'success');
            setTimeout(closeModal, 1500);
        }
    });

    function showFeedback(message, type) {
        feedbackDiv.textContent = message;
        if (type === 'success') {
            feedbackDiv.style.backgroundColor = '#e6f4ea';
            feedbackDiv.style.color = '#137333';
            feedbackDiv.style.border = '1px solid #137333';
        } else {
            feedbackDiv.style.backgroundColor = '#fce8e6';
            feedbackDiv.style.color = '#c5221f';
            feedbackDiv.style.border = '1px solid #c5221f';
        }
    }
}