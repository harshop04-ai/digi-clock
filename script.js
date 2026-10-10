// Dom Element References
const dateText = document.getElementById('date-text');
const timeText = document.getElementById('time-text');
const ampmText = document.getElementById('ampm-text');
const formatToggle = document.getElementById('format-toggle');

// Application State Tracking
let is24HourFormat = false;

// Core Execution Clock Loop
function updateClock() {
    const now = new Date();

    // 1. Process Date Output
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateText.textContent = now.toLocaleDateString('en-US', dateOptions);

    // 2. Process Numerical Time Components
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    let ampm = '';

    if (is24HourFormat) {
        hours = String(hours).padStart(2, '0');
        ampmText.style.display = 'none'; // Hide AM/PM block when in 24h mode
    } else {
        ampmText.style.display = 'inline'; // Ensure visibility
        ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // Handle structural '0' hours evaluate to 12
        hours = String(hours).padStart(2, '0');
    }

    // 3. Render Outputs to DOM
    timeText.textContent = `${hours}:${minutes}:${seconds}`;
    ampmText.textContent = ampm;
}

// Global Event Listeners
formatToggle.addEventListener('click', () => {
    is24HourFormat = !is24HourFormat;
    formatToggle.textContent = is24HourFormat ? 'SWITCH TO 12-HOUR' : 'SWITCH TO 24-HOUR';
    updateClock(); // Instantly update view context after state switch
});

// Bootstrapping Core Loops
updateClock(); 
setInterval(updateClock, 1000);
