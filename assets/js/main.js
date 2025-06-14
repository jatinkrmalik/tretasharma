// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const backToTopBtn = document.getElementById('back-to-top');
const modal = document.getElementById('project-modal');
const modalClose = document.querySelector('.close');
const themeToggle = document.getElementById('theme-toggle');

// Theme functionality
const initTheme = () => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update toggle button state
    if (themeToggle) {
        updateToggleState(savedTheme);
    }
};

const updateToggleState = (theme) => {
    const track = themeToggle.querySelector('.toggle-track');
    if (theme === 'dark') {
        track.style.background = 'linear-gradient(45deg, #374151, #1f2937)';
    } else {
        track.style.background = 'linear-gradient(45deg, #f9fafb, #ffffff)';
    }
};

const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleState(newTheme);
    
    // Update navbar background for scroll effect
    updateNavbarBackground();
};

const updateNavbarBackground = () => {
    const theme = document.documentElement.getAttribute('data-theme');
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        if (theme === 'dark') {
            navbar.style.background = 'rgba(31, 41, 55, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        }
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        if (theme === 'dark') {
            navbar.style.background = 'rgba(31, 41, 55, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        navbar.style.boxShadow = 'none';
    }
};

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initTheme();
    
    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Hide loading screen
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1000);

    // Mobile navigation toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        updateNavbarBackground();
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to top button
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'flex';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Animated counters for metrics
    const observeMetrics = () => {
        const metricNumbers = document.querySelectorAll('.metric-number');
        
        const animateCounter = (element, target) => {
            let current = 0;
            const increment = target / 150; // Slower animation - 150 steps instead of 100
            const metricCard = element.closest('.metric-card');
            
            // Add animating class for visual effect
            if (metricCard) {
                metricCard.classList.add('animating');
            }
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                    // Remove animating class when done
                    if (metricCard) {
                        setTimeout(() => {
                            metricCard.classList.remove('animating');
                        }, 500);
                    }
                }
                
                // Format the number based on its size
                let displayValue;
                if (target >= 1000000) {
                    displayValue = (current / 1000000).toFixed(1) + 'M+';
                } else if (target >= 1000) {
                    displayValue = (current / 1000).toFixed(0) + 'K+';
                } else if (target === 20) {
                    displayValue = Math.floor(current) + '%';
                } else {
                    displayValue = Math.floor(current) + '+';
                }
                
                element.textContent = displayValue;
            }, 40); // Slower interval - 40ms instead of 20ms for more dramatic effect
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    animateCounter(entry.target, target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3, // Trigger when 30% of the element is visible
            rootMargin: '0px 0px -50px 0px' // Trigger 50px before entering viewport
        });

        metricNumbers.forEach(number => {
            observer.observe(number);
        });
    };

    // Skill bars animation
    const observeSkills = () => {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.getAttribute('data-width');
                    entry.target.style.width = width;
                    observer.unobserve(entry.target);
                }
            });
        });

        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    };

    // Fade in animation on scroll
    const observeFadeIn = () => {
        const elements = document.querySelectorAll('.timeline-item, .project-card, .education-tile, .certification-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(element => {
            observer.observe(element);
        });
    };

    // Initialize animations
    observeMetrics();
    observeSkills();
    observeFadeIn();

    // Project modal functionality
    if (modal && modalClose) {
        modalClose.addEventListener('click', closeModal);
        
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Escape key to close modal
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    }

    // Rotating text animation
    initRotatingText();

    // Initialize theme
    initTheme();
});

// Project modal functions
function openProjectModal(projectId) {
    const modalBody = document.getElementById('modal-body');
    const projectData = getProjectData(projectId);
    
    modalBody.innerHTML = `
        <h2>${projectData.title}</h2>
        <div class="modal-project-image">
            <img src="${projectData.image}" alt="${projectData.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
        </div>
        <p class="project-status ${projectData.status}">${projectData.status.toUpperCase()}</p>
        <p><strong>Description:</strong> ${projectData.description}</p>
        <p><strong>Objectives:</strong> ${projectData.objectives}</p>
        <p><strong>Methodology:</strong> ${projectData.methodology}</p>
        <p><strong>Impact:</strong> ${projectData.impact}</p>
        ${projectData.technologies ? `<p><strong>Technologies Used:</strong> ${projectData.technologies}</p>` : ''}
        ${projectData.publications ? `<p><strong>Publications:</strong> ${projectData.publications}</p>` : ''}
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Project data
function getProjectData(projectId) {
    const projects = {
        'ai-website': {
            title: 'Designing AI-Integrated Website for Self-Directed Learners',
            image: '/assets/images/project-ai-website.jpg',
            status: 'ongoing',
            description: 'This ongoing research project focuses on integrating artificial intelligence into learning platforms to enhance self-directed learning experiences. The project aims to create personalized learning pathways using AI algorithms.',
            objectives: 'To develop an AI-powered platform that adapts to individual learning styles, provides personalized recommendations, and supports autonomous learning processes.',
            methodology: 'Design-based research approach combining user experience design, machine learning algorithms, and educational psychology principles.',
            impact: 'Expected to improve learning outcomes for self-directed learners by providing personalized, adaptive learning experiences.',
            technologies: 'Machine Learning, Natural Language Processing, Web Development, Learning Analytics'
        },
        'innovation': {
            title: 'Personal Innovation Project - Leadership in Community Centred Tech Innovation',
            image: '/assets/images/project-innovation.jpg',
            status: 'completed',
            description: 'Research initiative exploring technology innovation within community-centered leadership frameworks, focusing on how technology can be leveraged to strengthen community bonds and leadership development.',
            objectives: 'To investigate the intersection of technology innovation and community leadership, developing frameworks for community-centered tech initiatives.',
            methodology: 'Qualitative research methods including interviews, focus groups, and participatory action research with community leaders.',
            impact: 'Provided insights into effective community-tech integration strategies and leadership development in digital contexts.',
            publications: 'Presented at Northwestern University Innovation Conference 2024'
        },
        'socioeconomic': {
            title: 'Socio-Economic Research in Delhi Urban Villages',
            image: '/assets/images/project-socioeconomic.jpg',
            status: 'completed',
            description: 'Comprehensive study examining socio-economic factors affecting education in urban village communities in Delhi, India.',
            objectives: 'To understand the relationship between socio-economic conditions and educational outcomes in urban village settings.',
            methodology: 'Mixed-methods research including surveys, interviews, and statistical analysis of educational and economic data.',
            impact: 'Informed policy recommendations for improving educational access and quality in urban village communities.',
            technologies: 'STATA, Qualtrics, NVivo for data analysis'
        },
        'design-research': {
            title: 'Design-based Research for Self-Directed Learning Intervention',
            image: '/assets/images/project-design-research.jpg',
            status: 'ongoing',
            description: 'Research methodology focused on developing and testing interventions for self-directed learning environments using iterative design processes.',
            objectives: 'To create evidence-based interventions that support self-directed learning through systematic design and testing.',
            methodology: 'Design-based research methodology with iterative cycles of design, implementation, analysis, and redesign.',
            impact: 'Contributing to the theoretical framework for self-directed learning interventions in educational technology.',
            technologies: 'Learning Management Systems, Data Analytics, User Experience Design'
        },
        'energy-city': {
            title: 'The Energy City Board Game - NGSS Engineering Design',
            image: '/assets/images/project-energy-city.jpg',
            status: 'completed',
            description: 'Educational board game designed to teach engineering design principles aligned with Next Generation Science Standards (NGSS).',
            objectives: 'To create an engaging, hands-on learning experience that teaches engineering design thinking and sustainability concepts.',
            methodology: 'Game design principles combined with educational pedagogy and NGSS alignment analysis.',
            impact: 'Successfully implemented in classrooms, improving student engagement with engineering concepts by 40%.',
            technologies: 'Game Design, Educational Assessment, Curriculum Development'
        },
        'ai-literacy': {
            title: 'AI Literacy Workshop Curriculum',
            image: '/assets/images/project-ai-literacy.jpg',
            status: 'completed',
            description: 'Comprehensive curriculum development for AI literacy workshops targeting educators and administrators.',
            objectives: 'To develop AI literacy skills among educators and prepare them for AI integration in educational settings.',
            methodology: 'Curriculum design principles with hands-on workshops, interactive demonstrations, and practical applications.',
            impact: 'Trained 200+ educators across 15 institutions, improving AI readiness in educational settings.',
            technologies: 'AI Tools, Workshop Design, Adult Learning Principles'
        }
    };
    
    return projects[projectId] || {};
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    
    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

function initRotatingText() {
    const rotatingTexts = document.querySelectorAll('.rotating-text span');
    if (rotatingTexts.length === 0) return;
    
    // The CSS animation handles the rotation automatically
    // This function can be simplified or removed since CSS animations are preferred
    // CSS animation duration: 24s total for 12 items = 2s per item
    
    // Optional: Add hover pause functionality
    const rotatingContainer = document.querySelector('.rotating-text');
    if (rotatingContainer) {
        rotatingContainer.addEventListener('mouseenter', () => {
            rotatingTexts.forEach(text => {
                text.style.animationPlayState = 'paused';
            });
        });
        
        rotatingContainer.addEventListener('mouseleave', () => {
            rotatingTexts.forEach(text => {
                text.style.animationPlayState = 'running';
            });
        });
    }
}

// PDF Resume download functionality
function downloadResume() {
    // This would typically link to an actual PDF file
    // For now, we'll show a notification
    showNotification('Resume download will be available soon. Please contact for a copy.', 'info');
}

// Intersection Observer for animations
const createIntersectionObserver = (callback, options = {}) => {
    const defaultOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    return new IntersectionObserver(callback, { ...defaultOptions, ...options });
};

// Performance optimization: Lazy loading images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[src*="placeholder"]');
    
    const imageObserver = createIntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Replace with actual image loading logic
                img.style.background = '#f3f4f6';
                img.style.display = 'flex';
                img.style.alignItems = 'center';
                img.style.justifyContent = 'center';
                img.style.color = '#9ca3af';
                img.style.fontSize = '0.875rem';
                img.alt = 'Image placeholder';
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Keyboard accessibility
document.addEventListener('keydown', function(e) {
    // Tab navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Print functionality
function printPage() {
    window.print();
}

// Social sharing functionality
function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent('Treta Sharma - Learning Sciences & Educational Technology Specialist');
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`, '_blank');
}

// Google Analytics integration (if needed)
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
}

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.background = '#f3f4f6';
            this.style.border = '1px solid #e5e7eb';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.innerHTML = '<span style="color: #9ca3af; font-size: 0.875rem;">Image not available</span>';
        });
    });
});
