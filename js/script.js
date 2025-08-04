// Menu Mobile
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuButton && mainNav) {
        mobileMenuButton.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mainNav && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                }
            }
        });
    });
    
    // Testimonial slider navigation
    const testimonialSlider = document.querySelector('.testimonials-slider');
    if (testimonialSlider) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        testimonialSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - testimonialSlider.offsetLeft;
            scrollLeft = testimonialSlider.scrollLeft;
        });
        
        testimonialSlider.addEventListener('mouseleave', () => {
            isDown = false;
        });
        
        testimonialSlider.addEventListener('mouseup', () => {
            isDown = false;
        });
        
        testimonialSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - testimonialSlider.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialSlider.scrollLeft = scrollLeft - walk;
        });
    }
    
    // Cookie Consent Management
    initCookieConsent();
    
    // Track tool clicks for analytics
    document.querySelectorAll('[data-tool]').forEach(tool => {
        tool.addEventListener('click', function() {
            const toolName = this.getAttribute('data-tool');
            if (typeof gtag !== 'undefined') {
                gtag('event', 'tool_click', {
                    'event_category': 'engagement',
                    'event_label': toolName
                });
            }
        });
    });
    
    // Track external links
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'outbound',
                    'event_label': this.href
                });
            }
        });
    });
});

// Cookie Consent Functions
function initCookieConsent() {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
        setTimeout(() => {
            showCookieConsent();
        }, 2000);
    } else if (consent === 'accepted') {
        enableAnalytics();
    }
}

function showCookieConsent() {
    const banner = document.getElementById('cookie-consent');
    if (banner) {
        banner.classList.add('show');
    }
}

function hideCookieConsent() {
    const banner = document.getElementById('cookie-consent');
    if (banner) {
        banner.classList.remove('show');
    }
}

function acceptCookies() {
    localStorage.setItem('cookie-consent', 'accepted');
    hideCookieConsent();
    enableAnalytics();
    
    if (typeof gtag !== 'undefined') {
        gtag('event', 'cookie_consent', {
            'event_category': 'privacy',
            'event_label': 'accepted'
        });
    }
}

function rejectCookies() {
    localStorage.setItem('cookie-consent', 'rejected');
    hideCookieConsent();
    
    // Disable analytics
    if (typeof gtag !== 'undefined') {
        gtag('consent', 'update', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied'
        });
    }
}

function customizeCookies() {
    // In a real implementation, this would open a detailed cookie preferences modal
    alert('Em breve: painel de personalização de cookies. Por enquanto, use Aceitar ou Rejeitar.');
}

function enableAnalytics() {
    if (typeof gtag !== 'undefined') {
        gtag('consent', 'update', {
            'analytics_storage': 'granted',
            'ad_storage': 'granted'
        });
    }
    
    // Initialize AdSense if consent is given
    if (typeof adsbygoogle !== 'undefined') {
        try {
            (adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.log('AdSense not available');
        }
    }
}

// Performance optimization - lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if supported
if ('IntersectionObserver' in window) {
    document.addEventListener('DOMContentLoaded', lazyLoadImages);
}
