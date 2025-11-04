document.addEventListener('DOMContentLoaded', function () {

    // --- Smooth Scrolling ---
    const navLinks = document.querySelectorAll('.nav-links a, .btn[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
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

    // --- Skill Card Animation on Scroll ---
    const skillCards = document.querySelectorAll('.animated-skill');

    const skillObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                skillObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    skillCards.forEach(card => {
        card.style.animationPlayState = 'paused'; 
        skillObserver.observe(card);
    });

    // --- Active Navigation Link & Header Background ---
    const sections = document.querySelectorAll('.section');
    const navLiLinks = document.querySelectorAll('nav .nav-links a');
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        
        // Highlight active nav link
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const triggerPoint = sectionTop - (header.offsetHeight + 100); 
            
            if (window.pageYOffset >= triggerPoint) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLiLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(currentSectionId)) {
                a.classList.add('active');
            }
        });

        // Header scroll effect
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Parallax Effect for Stars ---
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const stars1 = document.getElementById('stars');
        const stars2 = document.getElementById('stars2');
        const stars3 = document.getElementById('stars3');
        
        if (stars1) stars1.style.transform = `translateY(${scrolled * 0.2}px)`;
        if (stars2) stars2.style.transform = `translateY(${scrolled * 0.4}px)`;
        if (stars3) stars3.style.transform = `translateY(${scrolled * 0.6}px)`;
    });

    // --- Card Hover Glow Effect ---
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const glow = card.querySelector('.card-glow');
            if (glow) {
                glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 240, 255, 0.15), transparent 50%)`;
            }
        });
    });

    // --- Typing Effect for Subtitle ---
    const subtitle = document.querySelector('.typing-effect');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }

    // --- Random Particle Effect on Button ---
    const primaryButtons = document.querySelectorAll('.btn-primary');
    
    primaryButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            createParticles(this);
        });
    });

    function createParticles(button) {
        const colors = ['#00f0ff', '#7b2cbf', '#ff006e'];
        
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('span');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 5px;
                height: 5px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                pointer-events: none;
                animation: particleFloat 1s ease-out forwards;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            
            button.appendChild(particle);
            
            setTimeout(() => particle.remove(), 1000);
        }
    }

    // Add particle animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes particleFloat {
            to {
                transform: translateY(-30px) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

});
