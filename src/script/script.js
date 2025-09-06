// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const loadingPercentage = document.getElementById('loading-percentage');
    const loadingText = document.getElementById('loading-text');
    const progressBar = document.getElementById('progress-bar');
    
    // Loading messages
    const loadingMessages = [
        "Getting Stronger...",
        "Loading Your Journey...",
        "Preparing Your Transformation...",
        "Building Your Strength...",
        "Fueling Your Motivation...",
        "Activating Your Potential..."
    ];
    
    let progress = 0;
    let messageIndex = 0;
    
    // Simulate loading progress
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        
        if (progress >= 100) {
            progress = 100;
            loadingPercentage.textContent = '100%';
            loadingText.textContent = 'Ready to Transform!';
            progressBar.style.width = '100%';
            
            // Hide loading screen and show main content
            setTimeout(() => {
                loadingScreen.classList.add('opacity-0');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    mainContent.classList.remove('opacity-0');
                    mainContent.style.opacity = '1';
                }, 500);
            }, 500);
            
            clearInterval(loadingInterval);
        } else {
            loadingPercentage.textContent = `${Math.floor(progress)}%`;
            progressBar.style.width = `${progress}%`;
            
            // Change message randomly
            if (Math.random() > 0.7) {
                messageIndex = (messageIndex + 1) % loadingMessages.length;
                loadingText.textContent = loadingMessages[messageIndex];
            }
        }
    }, 150);
    
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active Navigation Link Highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-secondary');
            link.classList.add('text-white');
            
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.remove('text-white');
                link.classList.add('text-secondary');
            }
        });
    });
    
    // Counter Animation for About Section
    const counters = [
        { element: document.getElementById('years-counter'), target: 7 },
        { element: document.getElementById('members-counter'), target: 1000 },
        { element: document.getElementById('trainers-counter'), target: 5 }
    ];
    
    // Animate counters when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    let current = 0;
                    const increment = counter.target / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= counter.target) {
                            current = counter.target;
                            clearInterval(timer);
                        }
                        counter.element.textContent = Math.floor(current);
                    }, 30);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(document.querySelector('#about'));
    
    // Class Schedule Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const classItems = document.querySelectorAll('.class-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active', 'bg-secondary', 'text-white'));
            filterButtons.forEach(btn => btn.classList.add('bg-white', 'text-gray-700'));
            button.classList.add('active', 'bg-secondary', 'text-white');
            
            // Filter classes
            const filter = button.getAttribute('data-filter');
            
            classItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-type') === filter) {
                    item.parentElement.parentElement.style.display = '';
                } else {
                    item.parentElement.parentElement.style.display = 'none';
                }
            });
        });
    });
    
    // Testimonial Carousel
    const testimonialContainer = document.querySelector('.testimonial-container');
    const prevButton = document.getElementById('prev-testimonial');
    const nextButton = document.getElementById('next-testimonial');
    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('.testimonial-slide').length;
    
    function updateTestimonialPosition() {
        testimonialContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateTestimonialPosition();
    });
    
    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateTestimonialPosition();
    });
    
    // Auto-play testimonials
    let testimonialInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateTestimonialPosition();
    }, 5000);
    
    // Pause auto-play on hover
    const testimonialSlider = document.querySelector('.testimonial-slider');
    testimonialSlider.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateTestimonialPosition();
        }, 5000);
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // In a real application, you would send this data to a server
        // For this demo, we'll just show a success message
        alert(`Thank you, ${name}! Your message has been sent. We'll get back to you soon.`);
        
        // Reset form
        contactForm.reset();
    });
    
    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Gallery Lightbox (simplified version)
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            const imgAlt = item.querySelector('img').alt;
            
            // In a real implementation, this would open a lightbox modal
            alert(`Viewing: ${imgAlt}\nImage URL: ${imgSrc}`);
        });
    });
    
    // Add animation to elements when they come into view
    const animateOnScroll = document.querySelectorAll('.service-card, .trainer-card, .pricing-card, .class-item');
    
    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animateOnScroll.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        animateObserver.observe(element);
    });
});