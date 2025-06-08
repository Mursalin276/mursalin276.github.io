document.addEventListener('DOMContentLoaded', function() {
    // Loader
    const loader = document.querySelector('.loader');
    window.addEventListener('load', function() {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
    });

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.body.setAttribute('data-theme', 'dark');
    }
    
    themeToggle.addEventListener('click', function() {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Music Player with Enhanced Wave Effects
    const profileImg = document.querySelector('.profile-img');
    const playIcon = document.querySelector('.play-icon');
    const audio = document.getElementById('bg-music');
    let isPlaying = false;
    
    profileImg.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
            document.body.classList.remove('music-playing');
            profileImg.classList.remove('playing');
            playIcon.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            audio.play()
                .then(() => {
                    document.body.classList.add('music-playing');
                    profileImg.classList.add('playing');
                    playIcon.innerHTML = '<i class="fas fa-pause"></i>';
                })
                .catch(error => {
                    console.error('Audio playback failed:', error);
                });
        }
        isPlaying = !isPlaying;
    });
    
    audio.addEventListener('ended', function() {
        document.body.classList.remove('music-playing');
        profileImg.classList.remove('playing');
        playIcon.innerHTML = '<i class="fas fa-play"></i>';
        isPlaying = false;
    });

    // Magnetic Buttons with enhanced effect
    const magneticButtons = document.querySelectorAll('.magnetic');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const strength = parseInt(this.getAttribute('data-strength')) || 20;
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            this.style.transform = `translate(${deltaX * strength}px, ${deltaY * strength}px)`;
            
            // Add rotation effect for more dynamism
            if (this.classList.contains('btn')) {
                this.style.transform += ` rotate(${deltaX * 3}deg)`;
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0) rotate(0)';
        });
    });

    // Current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Scroll reveal animation
    ScrollReveal().reveal('.section-header, .skill-card, .project-card', {
        delay: 200,
        distance: '40px',
        origin: 'bottom',
        interval: 100,
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        reset: true
    });

    // Add hover effect to profile image
    const profileImage = document.querySelector('.profile-img img');
    if (profileImage) {
        profileImage.addEventListener('mouseenter', () => {
            profileImage.style.transform = 'scale(1.05)';
        });
        profileImage.addEventListener('mouseleave', () => {
            if (!document.body.classList.contains('music-playing')) {
                profileImage.style.transform = 'scale(1)';
            }
        });
    }
});