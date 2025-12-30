document.addEventListener('DOMContentLoaded', function() {
    // Enhanced Loader with smooth transitions
    const loader = document.querySelector('.loader');
    window.addEventListener('load', function() {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
    });

    // Enhanced Theme Toggle with improved animations
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');
    
    let scrollTimer = null;
    let isScrolling = false;

    // Enhanced theme setting with circle color updates
    function setTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        updateCircleColors(theme);
    }

    // Enhanced circle color updates for theme changes
    function updateCircleColors(theme) {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.style.setProperty('--circle-normal-glow', 'rgba(76, 201, 240, 0.9)');
            root.style.setProperty('--circle-hover-glow', 'rgba(247, 37, 133, 0.8)');
            root.style.setProperty('--circle-playing-dim', 'rgba(114, 9, 183, 0.4)');
        } else {
            root.style.setProperty('--circle-normal-glow', 'rgba(76, 201, 240, 0.8)');
            root.style.setProperty('--circle-hover-glow', 'rgba(247, 37, 133, 0.7)');
            root.style.setProperty('--circle-playing-dim', 'rgba(114, 9, 183, 0.3)');
        }
    }

    const initTheme = currentTheme || (prefersDarkScheme.matches ? 'dark' : 'light');
    setTheme(initTheme);

    // Enhanced scroll detection with smoother animations
    function handleScroll() {
        isScrolling = true;
        themeToggle.classList.add('hidden');
        
        if (scrollTimer) {
            clearTimeout(scrollTimer);
        }
        
        scrollTimer = setTimeout(() => {
            isScrolling = false;
            themeToggle.classList.remove('hidden');
        }, 800);
    }

    // Enhanced initial setup
    setTimeout(() => {
        themeToggle.classList.remove('hidden');
    }, 1200);

    // Optimized scroll event listener
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                handleScroll();
                scrollTimeout = null;
            }, 16);
        }
    }, { passive: true });

    // Enhanced theme toggle with morphing animation
    themeToggle.addEventListener('click', function () {
        const newTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);

        themeIcon.classList.add('morph');
        
        setTimeout(() => {
            themeIcon.classList.remove('morph');
        }, 800);
    });

    // Enhanced smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced Music Player with 3-State Circle System
    const musicTrigger = document.querySelector('.music-trigger');
    const musicHint = document.getElementById('music-hint');
    const audio = document.getElementById('bg-music');
    const nowPlaying = document.getElementById('now-playing');
    const profileImgWrapper = document.querySelector('.profile-img-wrapper');
    const profileImg = document.querySelector('.profile-img');
    const circleNormal = document.querySelector('.circle-normal');
    const circleHover = document.querySelector('.circle-hover');
    let isPlaying = false;
    let musicVisualizationActive = false;
    
    // Enhanced music trigger with immediate visual feedback
    musicTrigger.addEventListener('click', function (event) {
        event.preventDefault();
        
        // Add immediate click feedback
        this.style.transform = 'scale(0.95)';
        this.style.transition = 'transform 0.1s ease';
        
        setTimeout(() => {
            this.style.transform = '';
            this.style.transition = '';
        }, 100);
        
        // Toggle state immediately for better responsiveness
        isPlaying = !isPlaying;
        
        if (isPlaying) {
            // Start music/visual mode immediately
            updateMusicButton('loading');
            musicHint.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Starting music...</span>';
            
            const playPromise = audio.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        activateMusicMode();
                    })
                    .catch(error => {
                        console.log('Audio playback failed, enabling visual mode:', error);
                        activateVisualizationMode();
                    });
            } else {
                activateVisualizationMode();
            }
        } else {
            // Stop music immediately
            updateMusicButton('play');
            stopMusicMode();
        }
    });

    // Enhanced button state management
    function updateMusicButton(state) {
        const buttonBg = '<div class="music-button-bg"></div>';
        
        switch(state) {
            case 'play':
                musicTrigger.innerHTML = `
                    ${buttonBg}
                    <i class="fas fa-play"></i>
                    <span>Play Music</span>
                `;
                musicTrigger.classList.remove('playing', 'loading');
                break;
            case 'pause':
                musicTrigger.innerHTML = `
                    ${buttonBg}
                    <i class="fas fa-pause"></i>
                    <span>Stop Music</span>
                `;
                musicTrigger.classList.add('playing');
                musicTrigger.classList.remove('loading');
                break;
            case 'loading':
                musicTrigger.innerHTML = `
                    ${buttonBg}
                    <i class="fas fa-spinner fa-spin"></i>
                    <span>Loading...</span>
                `;
                musicTrigger.classList.add('loading');
                musicTrigger.classList.remove('playing');
                break;
        }
    }

    // Enhanced music mode activation
    function activateMusicMode() {
        document.body.classList.add('music-playing');
        profileImg.classList.add('playing');
        updateMusicButton('pause');
        nowPlaying.classList.add('show');
        musicHint.innerHTML = '<i class="fas fa-pause-circle"></i> <span>Music is playing • Click to stop</span>';
        
        // Activate State 3: Playing mode with dim idle circles
        profileImgWrapper.classList.add('music-playing');
        musicVisualizationActive = true;
    }

    // Enhanced visualization mode for demo
    function activateVisualizationMode() {
        musicHint.innerHTML = '<i class="fas fa-eye"></i> <span>Visual mode active • Click to stop</span>';
        document.body.classList.add('music-playing');
        profileImg.classList.add('playing');
        profileImgWrapper.classList.add('music-playing');
        updateMusicButton('pause');
        nowPlaying.classList.add('show');
        musicVisualizationActive = true;
    }

    // Enhanced stop function
    function stopMusicMode() {
        audio.pause();
        document.body.classList.remove('music-playing');
        profileImg.classList.remove('playing');
        profileImgWrapper.classList.remove('music-playing');
        nowPlaying.classList.remove('show');
        musicHint.innerHTML = '<i class="fas fa-music"></i> <span>Click to play music</span>';
        musicVisualizationActive = false;
    }
    
    // Enhanced audio event handlers
    audio.addEventListener('ended', function () {
        resetMusicState();
        isPlaying = false;
    });

    audio.addEventListener('error', function () {
        console.log('Audio file not available, visual mode ready');
        musicHint.innerHTML = '<i class="fas fa-eye"></i> <span>Visual mode available • Click to activate</span>';
    });

    // Enhanced reset function
    function resetMusicState() {
        document.body.classList.remove('music-playing');
        profileImg.classList.remove('playing');
        profileImgWrapper.classList.remove('music-playing');
        musicTrigger.innerHTML = `
            <div class="music-button-bg"></div>
            <i class="fas fa-play"></i>
            <span>Play Music</span>
        `;
        nowPlaying.classList.remove('show');
        musicHint.innerHTML = '<i class="fas fa-music"></i> <span>Click to play music</span>';
        musicVisualizationActive = false;
    }

    // Enhanced Profile Image Hover Effects for State 2
    if (profileImgWrapper) {
        profileImgWrapper.addEventListener('mouseenter', () => {
            if (!musicVisualizationActive) {
                // Activate State 2: Hover mode with enhanced two-circle glow
                profileImgWrapper.classList.add('hover-active');
                
                // Smooth profile image transform
                setTimeout(() => {
                    profileImg.style.transform = 'scale(1.08) rotate(3deg)';
                }, 150);
            }
        });

        profileImgWrapper.addEventListener('mouseleave', () => {
            if (!musicVisualizationActive) {
                // Return to State 1: Normal mode with single circle
                profileImgWrapper.classList.remove('hover-active');
                profileImg.style.transform = '';
            }
        });
    }

    // Enhanced Magnetic Effect with improved physics
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(element => {
        let animationId = null;
        let isHovering = false;
        
        element.addEventListener('mouseenter', function() {
            isHovering = true;
        });
        
        element.addEventListener('mouseleave', function() {
            isHovering = false;
            
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            
            // Enhanced return animation
            this.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            this.style.transform = '';
            
            setTimeout(() => {
                this.style.transition = '';
            }, 600);
        });
        
        element.addEventListener('mousemove', function(e) {
            if (!isHovering) return;
            
            const strength = parseInt(this.getAttribute('data-strength')) || 20;
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            const translateX = deltaX * strength;
            const translateY = deltaY * strength;
            
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            
            // Enhanced magnetic animation with element-specific effects
            animationId = requestAnimationFrame(() => {
                let transform = `translate(${translateX}px, ${translateY}px)`;
                
                if (this.classList.contains('btn')) {
                    transform += ` rotate(${deltaX * 3}deg) scale(${1 + Math.abs(deltaX) * 0.08})`;
                } else if (this.classList.contains('music-trigger')) {
                    transform += ` rotate(${deltaX * 2}deg) scale(${1 + Math.abs(deltaX) * 0.05})`;
                } else if (this.classList.contains('social-icon')) {
                    transform += ` rotate(${deltaX * 4}deg) scale(${1 + Math.abs(deltaX) * 0.15})`;
                } else {
                    transform += ` scale(${1 + Math.abs(deltaX) * 0.03})`;
                }
                
                this.style.transform = transform;
            });
        });
    });

    // Enhanced Social Icon Animations
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            const iconElement = this.querySelector('i');
            if (iconElement) {
                iconElement.style.animation = 'socialBounce 0.8s ease';
                
                setTimeout(() => {
                    iconElement.style.animation = '';
                }, 800);
            }
        });
        
        // Enhanced click ripple effect
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '100px';
            ripple.style.height = '100px';
            ripple.style.marginLeft = '-50px';
            ripple.style.marginTop = '-50px';
            ripple.style.pointerEvents = 'none';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                this.removeChild(ripple);
                // Navigate to actual link after animation
                window.open(this.href, '_blank');
            }, 600);
        });
    });

    // Enhanced Skill Icon Animations
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.skill-icon i');
            if (icon) {
                icon.style.animation = 'skillIconPulse 0.8s ease';
                setTimeout(() => {
                    icon.style.animation = '';
                }, 800);
            }
        });
    });

    // Enhanced Info Item Animations
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.animation = 'iconWobble 0.8s ease';
                setTimeout(() => {
                    icon.style.animation = '';
                }, 800);
            }
        });
    });

    // Enhanced Intersection Observer for smoother animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Enhanced staggered animation
                const children = entry.target.querySelectorAll('.info-item, .skill-card, .project-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 120);
                });
            }
        });
    }, observerOptions);

    // Observe sections for enhanced animations
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Enhanced ScrollReveal animations with improved timing
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal().reveal('.section-header', {
            delay: 250,
            distance: '50px',
            origin: 'bottom',
            easing: 'cubic-bezier(0.5, 0, 0, 1)',
            reset: false,
            duration: 800
        });

        ScrollReveal().reveal('.skill-card', {
            delay: 400,
            distance: '70px',
            origin: 'bottom',
            interval: 180,
            easing: 'cubic-bezier(0.5, 0, 0, 1)',
            reset: false,
            duration: 800
        });

        ScrollReveal().reveal('.project-card', {
            delay: 500,
            distance: '90px',
            origin: 'bottom',
            interval: 250,
            easing: 'cubic-bezier(0.5, 0, 0, 1)',
            reset: false,
            duration: 800
        });

        ScrollReveal().reveal('.info-item', {
            delay: 300,
            distance: '60px',
            origin: 'left',
            interval: 150,
            easing: 'cubic-bezier(0.5, 0, 0, 1)',
            reset: false,
            duration: 800
        });
    }

    // Enhanced dynamic year update
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Enhanced keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Space bar to toggle music (only when not in input)
        if (e.code === 'Space' && e.target === document.body) {
            e.preventDefault();
            musicTrigger.click();
        }
        
        // T key to toggle theme
        if (e.code === 'KeyT' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            themeToggle.click();
        }
        
        // M key for music toggle
        if (e.code === 'KeyM' && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
            if (e.target === document.body) {
                e.preventDefault();
                musicTrigger.click();
            }
        }
    });

    // Enhanced performance optimization
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
        document.body.classList.add('reduced-motion');
        
        // Disable complex animations for better performance
        const style = document.createElement('style');
        style.textContent = `
            .reduced-motion * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Enhanced touch device optimizations
    const isTouchDevice = 'ontouchstart' in window;
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
        
        // Enhanced touch interactions
        const hoverElements = document.querySelectorAll('.hover-3d, .hover-float, .hover-tilt');
        hoverElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 400);
            });
        });
    }

    // Enhanced error handling
    function addEnhancedErrorHandling() {
        const interactiveElements = document.querySelectorAll('button, a, [role="button"]');
        interactiveElements.forEach(element => {
            element.addEventListener('error', function(e) {
                console.warn('Interactive element error:', e);
                this.classList.add('error-state');
                setTimeout(() => {
                    this.classList.remove('error-state');
                }, 3000);
            });
        });
        
        // Add global error handling
        window.addEventListener('error', function(e) {
            console.warn('Global error caught:', e.error);
        });
    }

    addEnhancedErrorHandling();

    // Enhanced performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                    console.log(`Enhanced portfolio loaded in ${loadTime}ms`);
                    
                    // Optimize based on performance
                    if (loadTime > 3000) {
                        console.log('Slow loading detected, reducing animation complexity');
                        document.body.classList.add('performance-optimized');
                    }
                }
            }, 1200);
        });
    }

    // Add ripple effect animation to CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .error-state {
            animation: errorShake 0.5s ease-in-out;
        }
        
        @keyframes errorShake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        .performance-optimized .profile-circle {
            animation: none !important;
        }
        
        .performance-optimized .music-trigger {
            animation: none !important;
        }
    `;
    document.head.appendChild(rippleStyle);

    // Enhanced initialization complete
    console.log('Enhanced portfolio with 3-state circle system loaded successfully');
    
    // Add smooth fade-in for the entire page
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.6s ease';
    }, 100);
});