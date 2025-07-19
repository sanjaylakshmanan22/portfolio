let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
};

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
        }
    });

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
};

document.addEventListener('DOMContentLoaded', () => {
    const textTypingElement = document.querySelector('.text-typing');
    const roles = ["Web Developer", "Front-end Enthusiast", "Back-end Learner", "Problem Solver"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;
    let deletingSpeed = 100;
    let delayBetweenRoles = 2000;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        const currentText = currentRole.substring(0, charIndex);
        textTypingElement.textContent = currentText;

        if (!isDeleting && charIndex < currentRole.length) {
            charIndex++;
            setTimeout(typeEffect, typingSpeed);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(typeEffect, deletingSpeed);
        } else if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(typeEffect, delayBetweenRoles);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeEffect, typingSpeed);
        }
    }

    typeEffect();

    const contactForm = document.querySelector('.contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
            let allValid = true;
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    allValid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '';
                }
            });

            if (allValid) {
                console.log('Form submitted successfully! Data sent to Google Forms.');
                contactForm.reset();
            } else {
                console.warn('Form validation failed. Please fill in all required fields.');
            }
        });
    }
});
