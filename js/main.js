
document.addEventListener('DOMContentLoaded', () => {
    const modeToggle = document.getElementById('modeToggle');
    const body = document.body;

    const savedMode = localStorage.getItem('mode');
    let isDayMode = savedMode !== 'night';

    if (isDayMode) {
        body.classList.add('day-mode');
        modeToggle.textContent = 'Night';
    } else {
        body.classList.add('night-mode');
        modeToggle.textContent = 'Day';
    }

    modeToggle.addEventListener('click', () => {
        isDayMode = !isDayMode;
        if (isDayMode) {
            body.classList.remove('night-mode');
            body.classList.add('day-mode');
            modeToggle.textContent = 'Night';
            localStorage.setItem('mode', 'day');
        } else {
            body.classList.remove('day-mode');
            body.classList.add('night-mode');
            modeToggle.textContent = 'Day';
            localStorage.setItem('mode', 'night');
        }
    });
});