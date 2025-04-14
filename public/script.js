// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 150) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Set initial header state on page load
document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 150) {
        header.classList.add('scrolled');
    }
    
    // Check for URL with hash coming from another page
    if (window.location.hash && window.location.pathname.endsWith('index.html')) {
        setTimeout(function() {
            const targetId = window.location.hash;
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 30;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileNav = document.getElementById('mobile-nav');
    const menuToggle = document.getElementById('mobile-menu-toggle');
    
    // If menu is open and click is outside menu and not on the toggle button
    if (mobileNav.classList.contains('active') && 
        !mobileNav.contains(event.target) && 
        event.target !== menuToggle && 
        !menuToggle.contains(event.target)) {
        
        // Close the menu
        mobileNav.classList.remove('active');
        
        // Reset icon to bars
        const icon = document.querySelector('#mobile-menu-toggle i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when screen is resized to desktop
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        const mobileNav = document.getElementById('mobile-nav');
        if (mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            
            // Reset icon to bars
            const icon = document.querySelector('#mobile-menu-toggle i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
});

// Mobile menu toggle
document.getElementById('mobile-menu-toggle').addEventListener('click', function() {
    const mobileNav = document.getElementById('mobile-nav');
    mobileNav.classList.toggle('active');
    
    // Toggle menu icon between bars and times
    const icon = this.querySelector('i');
    if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when a link is clicked
document.querySelectorAll('#mobile-nav a').forEach(link => {
    link.addEventListener('click', function() {
        const mobileNav = document.getElementById('mobile-nav');
        mobileNav.classList.remove('active');
        
        // Reset icon to bars
        const icon = document.querySelector('#mobile-menu-toggle i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') {
            // Scroll to top for home link
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 30;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animation on scroll
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.animate__animated');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.visibility = 'visible';
                entry.target.classList.add('animate__fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        element.style.visibility = 'hidden';
        observer.observe(element);
    });
});

// ConvertKit form submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('convertkit-form');
    const successMessage = document.getElementById('success-message');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = form.querySelector('input[name="email_address"]').value;
            const formId = 'YOUR_FORM_ID_HERE'; // Replace with form ID
            
            // Submit to ConvertKit
            fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    api_key: 'YOUR_PUBLIC_API_KEY_HERE', // Replace with ConvertKit public API key
                    email: email
                })
            })
            .then(response => response.json())
            .then(data => {
                // Clear form and show success message
                form.reset();
                successMessage.style.display = 'block';
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Something went wrong. Please try again.');
            });
        });
    }
});