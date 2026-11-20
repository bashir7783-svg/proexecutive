// Google Apps Script endpoint for form submission
const FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzQMzgMf4cOX5Nrhy30WHZxfzOTpOq25e3dfuJ_YYpwk3C8tQQXw-KnWwxhcUjYW0oa/exec';

// Flag to check if form was submitted
let submitted = false;

// Function to show success message and reset form
function showSuccess() {
    const form = document.getElementById('learningForm');
    const messageDiv = document.getElementById('formMessage');

    if (!form || !messageDiv) {
        console.warn('showSuccess: required elements not found.');
        return;
    }

    // Hide the form and show the success message
    form.style.display = 'none';
    messageDiv.style.display = 'block';

    // Reset the form fields
    form.reset();

    // Reset the flag and show form again after 5 seconds
    setTimeout(() => {
        form.style.display = 'block';
        messageDiv.style.display = 'none';
        submitted = false;
    }, 5000);
}

// Ensure the script waits for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Get the form element
    const form = document.getElementById('learningForm');

    if (!form) {
        console.warn('Learning form not found.');
        return;
    }

    // Attach the Google Apps Script endpoint to the form
    form.setAttribute('action', FORM_ENDPOINT);
    form.setAttribute('method', 'POST');
    form.setAttribute('target', 'hidden_iframe');

    // Add a submit event listener to validate and handle UX
    form.addEventListener('submit', (e) => {
        const nameField = form.querySelector('input[name="fullName"]');
        const emailField = form.querySelector('input[name="email"]');
        const goalField = form.querySelector('input[name="learningGoal"]');

        if (!nameField || !emailField || !goalField) {
            e.preventDefault();
            console.error('One or more form fields are missing.');
            return;
        }

        const name = nameField.value.trim();
        const email = emailField.value.trim();
        const goal = goalField.value.trim();

        // Basic validation check
        if (!name || !email || !goal) {
            e.preventDefault();
            alert('Please fill out all fields.');
            return;
        }

        // Validation passed — mark as submitted; the form posts to the hidden iframe
        submitted = true;
    });
});