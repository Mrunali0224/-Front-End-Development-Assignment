// Function to validate the form fields
function validateForm() {
    let isValid = true;

    // Get input fields
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const emailError = document.querySelector('#emailError');
    const passwordError = document.querySelector('#passwordError');

    // Reset error messages
    emailError.textContent = '';
    passwordError.textContent = '';

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value) {
        emailError.textContent = 'Email is required';
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        emailError.textContent = 'Please enter a valid email';
        isValid = false;
    }

    // Validate password
    if (!password.value) {
        passwordError.textContent = 'Password is required';
        isValid = false;
    } else if (password.value.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters long';
        isValid = false;
    }

    return isValid;
}

// Function to handle the form submission
async function handleLogin(event) {
    event.preventDefault(); // Prevent default form submission

    // Validate form before submitting
    if (!validateForm()) {
        return;
    }

    // Show loading spinner
    const spinner = document.querySelector('.spinner');
    spinner.classList.remove('hidden');

    // Get input values
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    // API request data
    const data = {
        username: email,
        password: password
    };

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Login successful:', result);

            // Display success message
            alert('Login successful!');
        } else {
            // Handle login failure
            alert('Login failed, please check your credentials.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while trying to log in.');
    } finally {
        // Hide loading spinner after the request is completed
        spinner.classList.add('hidden');
    }
}

// Toggle password visibility
const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');

togglePassword.addEventListener('click', function () {
    // Toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);

    // Toggle the "Show"/"Hide" text
    this.textContent = type === 'password' ? 'Show' : 'Hide';
});

// Handle form submission
const form = document.querySelector('form');
form.addEventListener('submit', handleLogin);

