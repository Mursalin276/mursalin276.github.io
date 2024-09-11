const enterButton = document.querySelector('.enter-button');
const content = document.querySelector('.content');
const buttons = document.querySelector('.buttons');
const contactInfo = document.querySelector('.contact-info');
const backButton = document.querySelector('.back-button'); // Reference to the existing back button

backButton.style.display = 'none'; // Hide back button initially

enterButton.addEventListener('click', () => {
    content.style.opacity = '0';
    content.style.transform = 'translateX(-100%)';
    setTimeout(() => {
        content.style.display = 'none';
        buttons.style.display = 'flex';
        contactInfo.style.display = 'block';
        setTimeout(() => {
            buttons.style.opacity = '1';
            buttons.style.transform = 'translateX(0)';
            contactInfo.style.opacity = '1';
            contactInfo.style.transform = 'translateY(0)';
        }, 50);
    }, 1000);
});

// When a section button is clicked
document.querySelectorAll('.buttons button').forEach(button => {
    button.addEventListener('click', () => {
        const target = document.querySelector(button.getAttribute('data-target'));
        buttons.style.opacity = '0';
        contactInfo.style.opacity = '0';
        setTimeout(() => {
            buttons.style.display = 'none';
            contactInfo.style.display = 'none';
            document.querySelectorAll('section').forEach(section => {
                section.style.display = 'none';
                section.style.opacity = '0';
            });
            target.style.display = 'block';
            setTimeout(() => {
                target.style.opacity = '1';
            }, 50);
            backButton.style.display = 'block'; // Show the back button
        }, 500);
    });
});

// When the back button is clicked
backButton.addEventListener('click', () => {
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        setTimeout(() => {
            section.style.display = 'none';
            buttons.style.display = 'flex';
            contactInfo.style.display = 'block';
            setTimeout(() => {
                buttons.style.opacity = '1';
                contactInfo.style.opacity = '1';
            }, 50);
        }, 500);
    });
    backButton.style.display = 'none'; // Hide the back button when returning to the main buttons
});
