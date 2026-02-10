// Main JavaScript for Treta Sharma Portfolio - Modernized & Accessible

document.addEventListener('DOMContentLoaded', function() {

    // Navigation functionality
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');

            // Focus management for accessibility
            if (!isExpanded) {
                const firstLink = navMenu.querySelector('.nav-link');
                if (firstLink) firstLink.focus();
            }
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (navToggle) {
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Close mobile menu on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (navToggle) {
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.focus();
            }
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Set focus for accessibility
                setTimeout(() => {
                    targetSection.setAttribute('tabindex', '-1');
                    targetSection.focus();
                }, 500);
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link
        updateActiveNavLink();

        // Show/hide back to top button
        toggleBackToTop();
    });

    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    // Back to top button functionality
    const backToTopBtn = document.getElementById('back-to-top');

    function toggleBackToTop() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            document.querySelector('.skip-link').focus();
        });
    }

    // Animated counters for impact metrics
    function animateCounters() {
        const counters = document.querySelectorAll('.metric-number');

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;

                if (current >= target) {
                    counter.textContent = formatNumber(target);
                    clearInterval(timer);
                } else {
                    counter.textContent = formatNumber(Math.floor(current));
                }
            }, 20);
        });
    }

    // Format numbers for display
    function formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K';
        }
        return num.toString();
    }

    // Skill bar animations
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');

        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 500);
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Trigger counter animation for metrics section
                if (entry.target.classList.contains('about')) {
                    animateCounters();
                }

                // Trigger skill bar animation for skills section
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);

    // Observe all sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Project modal functionality with accessibility
    const projectButtons = document.querySelectorAll('.project-btn');
    const projectModal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const modalBody = document.getElementById('modal-body');
    let focusableElements;
    let firstFocusableElement;
    let lastFocusableElement;

    // Project data
    const projectData = {
        'ai-website': {
            title: 'Designing AI-Integrated Website for Self-Directed Learners',
            status: 'Ongoing',
            description: 'This research project focuses on developing an AI-powered learning platform that adapts to individual learner needs and preferences. The project involves extensive user research, design thinking methodologies, and implementation of machine learning algorithms to create personalized learning experiences.',
            objectives: [
                'Design user-centric AI interfaces for educational content',
                'Implement adaptive learning algorithms',
                'Conduct usability testing with diverse learner populations',
                'Develop accessibility features for inclusive learning'
            ],
            technologies: ['Python', 'TensorFlow', 'React', 'Node.js', 'MongoDB'],
            timeline: 'September 2024 - May 2025'
        },
        'community-tech': {
            title: 'Personal Innovation Project - Leadership in Community Centred Tech Innovation',
            status: 'Ongoing',
            description: 'This project explores community-centered approaches to technology innovation in educational contexts, focusing on how local communities can drive meaningful technological change in their educational environments.',
            objectives: [
                'Identify community needs and technological gaps',
                'Develop participatory design methodologies',
                'Create sustainable innovation frameworks',
                'Build community capacity for technology adoption'
            ],
            technologies: ['Design Thinking', 'Community Engagement', 'Ethnographic Research'],
            timeline: 'January 2024 - Ongoing'
        },
        'delhi-research': {
            title: 'Socio-Economic Research in Delhi Urban Villages',
            status: 'Completed',
            description: 'Comprehensive study of socio-economic factors affecting education access in urban villages of Delhi, India. This research examined the intersection of urbanization, socio-economic status, and educational opportunities.',
            objectives: [
                'Analyze socio-economic barriers to education',
                'Document community educational resources',
                'Identify intervention opportunities',
                'Provide policy recommendations'
            ],
            technologies: ['STATA', 'Qualitative Analysis', 'Survey Design', 'GIS Mapping'],
            timeline: '2020-2021',
            outcomes: 'Published findings contributed to local education policy discussions'
        },
        'dbr-learning': {
            title: 'Design-based Research for Self-Directed Learning Intervention',
            status: 'Research',
            description: 'Systematic investigation of design principles for effective self-directed learning interventions using design-based research methodology.',
            objectives: [
                'Develop theoretical framework for self-directed learning',
                'Design and test learning interventions',
                'Iterate based on learner feedback',
                'Create scalable implementation guidelines'
            ],
            technologies: ['Design-Based Research', 'Learning Analytics', 'Prototyping'],
            timeline: 'August 2024 - Present'
        },
        'energy-city': {
            title: 'The Energy City Board Game - NGSS Engineering Design',
            status: 'Published',
            description: 'Educational board game designed to teach engineering design principles aligned with Next Generation Science Standards (NGSS).',
            objectives: [
                'Create engaging STEM learning experience',
                'Align with NGSS engineering standards',
                'Develop assessment rubrics',
                'Test with diverse student populations'
            ],
            technologies: ['Game Design', 'Educational Assessment', 'NGSS Standards'],
            timeline: '2021-2022',
            outcomes: 'Successfully implemented in 15+ schools'
        },
        'ai-literacy': {
            title: 'AI Literacy Workshop Curriculum',
            status: 'Curriculum',
            description: 'Comprehensive curriculum development for AI literacy workshops targeting educators and learners at various levels.',
            objectives: [
                'Develop age-appropriate AI literacy content',
                'Create hands-on learning activities',
                'Train educator facilitators',
                'Assess learning outcomes'
            ],
            technologies: ['Curriculum Design', 'Professional Development', 'AI Ethics'],
            timeline: '2023-2024',
            outcomes: 'Trained 50+ educators across 20 institutions'
        }
    };

    // Project button click handlers
    projectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const project = projectData[projectId];

            if (project) {
                displayProjectModal(project);
                // Store the button that opened the modal for focus restoration
                projectModal.setAttribute('data-return-focus', this.getAttribute('id'));
            }
        });
    });

    // Display project in modal with accessibility
    function displayProjectModal(project) {
        const modalContent = `
            <h2 id="modal-title">${project.title}</h2>
            <div class="project-status ${project.status.toLowerCase()}">${project.status}</div>
            <p><strong>Timeline:</strong> ${project.timeline}</p>
            <h3>Description</h3>
            <p>${project.description}</p>
            <h3>Objectives</h3>
            <ul>
                ${project.objectives.map(obj => `<li>${obj}</li>`).join('')}
            </ul>
            <h3>Technologies/Methods</h3>
            <div class="project-tags">
                ${project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
            </div>
            ${project.outcomes ? `<h3>Outcomes</h3><p>${project.outcomes}</p>` : ''}
        `;

        modalBody.innerHTML = modalContent;
        projectModal.style.display = 'flex';
        projectModal.setAttribute('aria-modal', 'true');
        projectModal.setAttribute('role', 'dialog');
        projectModal.setAttribute('aria-labelledby', 'modal-title');
        document.body.style.overflow = 'hidden';

        // Focus management
        setupFocusTrap();
        modalClose.focus();
    }

    // Setup focus trap for modal
    function setupFocusTrap() {
        focusableElements = projectModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        firstFocusableElement = focusableElements[0];
        lastFocusableElement = focusableElements[focusableElements.length - 1];

        projectModal.addEventListener('keydown', trapFocus);
    }

    // Trap focus within modal
    function trapFocus(e) {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) { // shift + tab
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus();
                e.preventDefault();
            }
        } else { // tab
            if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus();
                e.preventDefault();
            }
        }
    }

    // Close modal
    function closeModal() {
        projectModal.style.display = 'none';
        projectModal.removeAttribute('aria-modal');
        projectModal.removeAttribute('role');
        projectModal.removeAttribute('aria-labelledby');
        document.body.style.overflow = 'auto';

        // Remove focus trap listener
        projectModal.removeEventListener('keydown', trapFocus);

        // Return focus to the button that opened the modal
        const returnFocusId = projectModal.getAttribute('data-return-focus');
        if (returnFocusId) {
            const returnElement = document.getElementById(returnFocusId);
            if (returnElement) returnElement.focus();
        }
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside
    projectModal.addEventListener('click', function(e) {
        if (e.target === projectModal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && projectModal.style.display === 'flex') {
            closeModal();
        }
    });

    // Contact form handling with improved accessibility
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Clear previous errors
            clearFormErrors();

            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            let isValid = true;

            // Validate name
            const nameInput = document.getElementById('name');
            if (!name || name.trim().length < 2) {
                showFieldError(nameInput, 'Please enter your name (at least 2 characters)');
                isValid = false;
            }

            // Validate email
            const emailInput = document.getElementById('email');
            if (!email || !isValidEmail(email)) {
                showFieldError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }

            // Validate subject
            const subjectInput = document.getElementById('subject');
            if (!subject || subject.trim().length < 3) {
                showFieldError(subjectInput, 'Please enter a subject (at least 3 characters)');
                isValid = false;
            }

            // Validate message
            const messageInput = document.getElementById('message');
            if (!message || message.trim().length < 10) {
                showFieldError(messageInput, 'Please enter a message (at least 10 characters)');
                isValid = false;
            }

            if (!isValid) {
                showFormStatus('Please correct the errors above and try again.', 'error');
                return;
            }

            // Form is valid, proceed with submission
            // If using Netlify forms, the form will be submitted automatically
            // For demonstration, we'll show a success message
            showFormSuccess();
        });
    }

    // Show field error with accessibility
    function showFieldError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorDiv = formGroup.querySelector('.form-error');

        if (errorDiv) {
            errorDiv.textContent = message;
        }
        input.setAttribute('aria-invalid', 'true');
        input.setAttribute('aria-describedby', input.id + '-error');
    }

    // Clear form errors
    function clearFormErrors() {
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.removeAttribute('aria-invalid');
            input.removeAttribute('aria-describedby');
            const formGroup = input.closest('.form-group');
            const errorDiv = formGroup.querySelector('.form-error');
            if (errorDiv) errorDiv.textContent = '';
        });
    }

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show form status message
    function showFormStatus(message, type) {
        if (!formStatus) return;

        formStatus.textContent = message;
        formStatus.className = 'form-status ' + type + ' show';
        formStatus.setAttribute('role', 'alert');
        formStatus.setAttribute('aria-live', 'polite');

        // Auto-hide success messages
        if (type === 'success') {
            setTimeout(() => {
                formStatus.classList.remove('show');
            }, 5000);
        }
    }

    // Show form success message
    function showFormSuccess() {
        showFormStatus('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 'success');
        contactForm.reset();
    }

    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Initialize animations on page load
    setTimeout(() => {
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.classList.add('visible');
        }
    }, 100);

    // Add loading animation class
    document.body.classList.add('loaded');
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization - debounced scroll handler
const debouncedScrollHandler = debounce(() => {
    // Additional scroll handling if needed
}, 10);

window.addEventListener('scroll', debouncedScrollHandler, { passive: true });
