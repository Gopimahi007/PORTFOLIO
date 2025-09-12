document.addEventListener('DOMContentLoaded', function () {

    // --- Smooth scrolling for navigation links ---
    // This part handles the smooth transition when a navigation link is clicked.
    const navLinks = document.querySelectorAll('.nav-links a, .btn'); // Include buttons for smooth scroll too

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Ensure it's an on-page link before preventing default
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // --- Animate Skill Cards on Scroll ---
    // This uses the Intersection Observer API to trigger animations when elements become visible.
    const skillCards = document.querySelectorAll('.animated-skill');

    const skillObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When the skill card enters the viewport, allow the CSS animation to play.
                entry.target.style.animationPlayState = 'running';
                // Stop observing the element once it has animated in to save resources.
                skillObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the element is visible
    });

    skillCards.forEach(card => {
        // Initially pause the animation. It will be set to 'running' by the observer.
        card.style.animationPlayState = 'paused'; 
        skillObserver.observe(card);
    });


    // --- Combined Scroll Event Listener ---
    // This single listener handles both the active navigation link and header background changes.
    const sections = document.querySelectorAll('.section'); // Ensure your sections have the .section class
    const navLiLinks = document.querySelectorAll('nav .nav-links a');
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        
        // 1. Highlight active navigation link on scroll
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // A common offset to trigger the highlight a bit before the section top
            const triggerPoint = sectionTop - (header.offsetHeight + 50); 
            
            if (window.pageYOffset >= triggerPoint) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLiLinks.forEach(a => {
            a.classList.remove('active');
            // Check if the link's href contains the ID of the current section
            if (a.getAttribute('href').includes(currentSectionId)) {
                a.classList.add('active');
            }
        });

        // 2. Change header background on scroll
        if (window.scrollY > 50) {
            // Apply a semi-transparent background when scrolled
            header.style.backgroundColor = 'rgba(44, 62, 80, 0.95)'; 
        } else {
            // Revert to the original background color from the CSS variable
            header.style.backgroundColor = 'var(--dark-bg-color)'; 
        }
    });

});
