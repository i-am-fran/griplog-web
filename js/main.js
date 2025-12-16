// Main JavaScript for Griplog Website

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
});

// Scroll Animations
function initScrollAnimations() {
    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) return;

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

    // Observe feature cards
    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(30px)';
        feature.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(feature);
    });

    // Observe manifesto
    const manifesto = document.querySelector('.manifesto');
    if (manifesto) {
        manifesto.style.opacity = '0';
        manifesto.style.transform = 'translateY(30px)';
        manifesto.style.transition = 'all 0.6s ease';
        observer.observe(manifesto);
    }
}

// Smooth Scroll for anchor links (if any are added later)
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
