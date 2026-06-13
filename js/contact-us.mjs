import { getTranslation } from './languages.mjs';

const formspree_endpoint = 'https://formspree.io/f/mqeogrdp';

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
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const emailField = document.getElementById('email');
            const purposeField = document.getElementById('message-type');
            const messageField = document.getElementById('message');
            const submitBtn = contactForm.querySelector('.submit-btn');

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

            const payload = {
                email: emailField.value.trim(),
                purpose: purposeField.value,
                message: messageField.value.trim()
            };

            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = getTranslation('contact_sending') || 'Sending...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            try {
                const response = await fetch(formspree_endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    contactForm.reset();
                    feedbackElement.textContent = getTranslation('contact_success_msg') || 'Message sent successfully!';
                    feedbackElement.className = 'success';

                    setTimeout(() => {
                        contactModal.classList.add('hidden');
                    }, 2000);
                } else {
                    const data = await response.json();
                    if (Object.hasOwn(data, 'errors')){
                        feedbackElement.textContent = data.errors.map(err => err.message).join(', ');
                    } else {
                        feedbackElement.textContent = getTranslation('contact_error_server') || 'Oops! There was a problem submitting your form.';
                    }
                    feedbackElement.className = 'error';
                }
            } catch (error) {
                console.error("Form submission error: ", error);
                feedbackElement.textContent = getTranslation('contact_error_network') || 'Network error. Please check your connection and try again.';
                feedbackElement.className = 'error';
            } finally {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            }
        });
    }
}