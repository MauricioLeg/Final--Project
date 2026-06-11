import { getTranslation } from './languages.mjs';

export function displayContactModal() {
    const floatingBtn = document.getElementById('contact-btn');
    const contactModal = document.getElementById('contact-modal');
    const closeModalBtn = document.getElementById('close-btn');
    const contactForm = document.getElementById('contact-form');
    const feedbackElement = document.getElementById('form-feedback');

    if (floatingBtn && contactModal) {
        floatingBtn.addEventListener('click', () => {
            contactModal.classList.remove('hidden');
            feedbackElement.className = 'hidden';
        });
    }
    if (closeModalBtn && contactModal) {
        closeModalBtn.addEventListener('click', () => {
            contactModal.classList.add('hidden');
        });
    }
    if (contactModal) {
        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) {
                contactModal.classList.add('hidden');
            }
        });
    }
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const emailField = document.getElementById('email');
            const messageField = document.getElementById('message');

            feedbackElement.className = 'hidden';

            if (!emailField.value.trim() || !messageField.value.trim()) {
                feedbackElement.textContent = getTranslation('contact_error_fields') || 'Please fill in all required fields.';
                feedbackElement.className = "error";
                return;
            }
            if (!emailField.validity.valid) {
                feedbackElement.textContent = getTranslation('contact_error_email') || 'Please provide a valid email address.';
                feedbackElement.className = "error"
                return;
            }

            console.log('Modal payload submitted successfully:', {
                email: emailField.value.trim(),
                purpose: document.getElementById('message-type').value,
                message: messageField.value.trim(),
                timestamp: new Date().toISOString()
            });

            contactForm.reset();
            feedbackElement.textContent = getTranslation('contact_success_msg') || 'Message sent successfully!';
            feedbackElement.className = 'success';

            setTimeout(() => {
                contactModal.classList.add('hidden');
            }, 2000);
        })
    }
}
