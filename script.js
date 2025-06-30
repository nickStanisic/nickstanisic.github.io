// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Dynamic typing effect for hero section
const heroTitle = document.querySelector('.hero-content h1');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect after page loads
    setTimeout(typeWriter, 500);
}

// Project filtering functionality - Fixed version
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for all elements to be ready
    setTimeout(() => {
        const categoryButtons = document.querySelectorAll('.category-btn');
        const projectCards = document.querySelectorAll('.project-card');

        console.log('Found buttons:', categoryButtons.length);
        console.log('Found cards:', projectCards.length);

        // Initialize scroll observer for all cards
        projectCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });

        categoryButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Button clicked:', button.getAttribute('data-category'));

                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const selectedCategory = button.getAttribute('data-category');

                projectCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    console.log('Card category:', cardCategory, 'Selected:', selectedCategory);

                    if (selectedCategory === 'all') {
                        card.classList.remove('hidden');
                        card.style.display = 'block';
                    } else if (cardCategory === selectedCategory) {
                        card.classList.remove('hidden');
                        card.style.display = 'block';
                    } else {
                        card.classList.add('hidden');
                        card.style.display = 'none';
                    }
                });

                // Re-trigger scroll animations for visible cards
                setTimeout(() => {
                    projectCards.forEach(card => {
                        if (!card.classList.contains('hidden')) {
                            observer.observe(card);
                        }
                    });
                }, 100);
            });
        });
    }, 100);
});

// Enhanced notebook link tracking (optional analytics)
document.querySelectorAll('a[href*="nbviewer"]').forEach(link => {
    link.addEventListener('click', function() {
        console.log('Notebook viewed:', this.href);
    });
});