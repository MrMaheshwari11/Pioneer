document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init();

    // Set current year
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Form elements
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const submitButton = contactForm.querySelector('.submit-button');
    const loader = document.getElementById('loader'); // Loading spinner element

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = contactForm.querySelector('input[name="name"]').value.trim();
        const email = contactForm.querySelector('input[name="email"]').value.trim();
        const message = contactForm.querySelector('textarea[name="message"]').value.trim();

        // Basic Validation
        if (!name || !email || !message) {
            showMessage('Please fill out all fields before submitting.', 'error');
            return;
        }

        if (!validateEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Indicate submission is in progress
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';
        loader.style.display = 'block'; // Show loading spinner

        try {
            const response = await fetch('https://formspree.io/f/manwklnw', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ name, email, message })
            });

            if (response.ok) {
                showMessage(`Thank you for your message, ${name}! We will get back to you soon.`, 'success');
                contactForm.reset();
            } else {
                const data = await response.json();
                showMessage(data.error || 'There was an issue submitting the form. Please try again later.', 'error');
            }
        } catch (error) {
            showMessage(`Error: ${error.message}. Please check your internet connection and try again.`, 'error');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Submit Message';
            loader.style.display = 'none'; // Hide loading spinner
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
    
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000); // Hide after 5 seconds
    }
    
});