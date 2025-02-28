// Mobile menu functionality
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize EmailJS with a check
(function() {
    try {
        emailjs.init("VF47U1cuocLseFXy-");
        console.log("EmailJS initialized successfully");
    } catch (error) {
        console.error("EmailJS initialization error:", error);
    }
})();

// Contact form handling
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');
const errorMessage = document.getElementById('error-message');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Hide any existing messages
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';

    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    try {
        // Get form data
        const templateParams = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            event_type: document.getElementById('event-type').value,
            event_date: document.getElementById('event-date').value,
            message: document.getElementById('message').value,
            to_name: 'Rahul DJ Services'
        };

        console.log("Attempting to send email with params:", templateParams);
        
        // Send the email using EmailJS
        const response = await emailjs.send(
            'service_qx4aixv',
            'template_vpowbsd',
            templateParams
        );
        
        console.log("Email sent successfully:", response);
        successMessage.textContent = "Thank you! Your message has been sent successfully.";
        successMessage.style.display = 'block';
        contactForm.reset();
    } catch (error) {
        console.error("Detailed error:", error);
        errorMessage.textContent = `Error: ${error.text || 'Failed to send message. Please try again.'}`;
        errorMessage.style.display = 'block';
    } finally {
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
    }
});

// Animate progress bars on scroll
const progressBars = document.querySelectorAll('.progress');
const animateProgressBars = () => {
    progressBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            bar.style.width = bar.parentElement.dataset.progress || '90%';
        }
    });
};

window.addEventListener('scroll', animateProgressBars);
animateProgressBars(); // Initial animation check
