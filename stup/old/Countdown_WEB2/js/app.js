// Image background handler with preloading for smoother transitions
const main = document.querySelector(".main");
const images = ["image/img1.jpg", "image/img2.jpg", "image/img3.jpg"];
let currentIndex = 0;

// Preload audio
const birthdayAudio = new Audio();
birthdayAudio.src = "https://cdn.pixabay.com/download/audio/2021/11/25/audio_82dda2bc2c.mp3?filename=happy-birthday-to-you-piano-fast-110763.mp3";
birthdayAudio.preload = "auto";

// Add audio controls container (hidden initially)
const audioControls = document.createElement('div');
audioControls.innerHTML = `
  <div id="audio-controls" style="position: fixed; bottom: 20px; right: 20px; 
       background: rgba(255, 255, 255, 0.2); padding: 10px; border-radius: 50px;
       backdrop-filter: blur(10px); display: none; align-items: center; z-index: 1000;">
    <button id="audio-toggle" style="background: none; border: none; cursor: pointer; margin-right: 10px;">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
           stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
      </svg>
    </button>
    <span id="audio-status" style="color: white; font-size: 14px;">Celebration Sound: Ready</span>
  </div>
`;
document.body.appendChild(audioControls);
const audioControlsDiv = document.getElementById('audio-controls');
const audioToggle = document.getElementById('audio-toggle');
const audioStatus = document.getElementById('audio-status');

// Preload all images for smoother transitions
function preloadImages() {
  images.forEach(imageSrc => {
    const img = new Image();
    img.src = imageSrc;
  });
}

// Function to change background with fade effect
function changeBackground() {
  // Fade out
  main.style.opacity = 0;
  
  setTimeout(() => {
    // Change image
    main.style.backgroundImage = `url('${images[currentIndex]}')`;
    main.style.backgroundSize = 'cover';
    main.style.backgroundPosition = 'center';
    
    // Fade in
    main.style.opacity = 1;
    
    // Update index for next image
    currentIndex = (currentIndex + 1) % images.length;
  }, 500); // Half of transition time
}

// Add transition for opacity to main element using JavaScript
main.style.transition = "opacity 1s ease-in-out, background-image 1s ease-in-out";

// Initialize background image
main.style.backgroundImage = `url('${images[0]}')`;
main.style.opacity = 1;

// Preload images and start rotation
preloadImages();
setInterval(changeBackground, 5000);

// Countdown timer functionality
const endDate = '4 February 2026 00:00 AM';
const inputs = document.querySelectorAll('input');
const labels = ['Days', 'Hours', 'Minutes', 'Seconds'];
const countdownEl = document.getElementById('end-date');

// Display target date
countdownEl.innerHTML = new Date(endDate).toLocaleDateString('en-US', { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
});

// Track if celebration has triggered
let celebrationTriggered = false;

// Create countdown function
function updateCountdown() {
  const end = new Date(endDate);
  const now = new Date();
  const diff = (end - now) / 1000;
  
  // Show audio controls when we're close to the end (24 hours)
  if (diff < 86400 && !audioControlsDiv.style.display) {
    audioControlsDiv.style.display = "flex";
  }
  
  // Check if countdown has ended
  if (diff < 0) {
    document.querySelector('.col').innerHTML = '<h2 style="color: white; font-size: 2rem;">Happy Birthday!</h2>';
    
    // Play birthday sound when countdown first reaches zero
    if (!celebrationTriggered) {
      celebrationTriggered = true;
      
      // Play sound with visual feedback
      playBirthdayCelebrationSound();
      
      // Show confetti animation
      showConfetti();
    }
    return;
  }
  
  // Calculate time units
  const days = Math.floor(diff / 3600 / 24);
  const hours = Math.floor(diff / 3600) % 24;
  const minutes = Math.floor(diff / 60) % 60;
  const seconds = Math.floor(diff) % 60;
  
  // Update input values with time units
  inputs[0].value = formatTimeUnit(days);
  inputs[1].value = formatTimeUnit(hours);
  inputs[2].value = formatTimeUnit(minutes);
  inputs[3].value = formatTimeUnit(seconds);
  
  // Add animation for seconds change
  inputs[3].classList.add('pulse');
  setTimeout(() => {
    inputs[3].classList.remove('pulse');
  }, 500);
}

// Play birthday celebration sound
function playBirthdayCelebrationSound() {
  birthdayAudio.volume = 0.7;
  birthdayAudio.play()
    .then(() => {
      audioStatus.textContent = "Celebration Sound: Playing";
      audioToggle.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
             stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>
      `;
    })
    .catch(error => {
      console.log("Audio playback failed:", error);
      audioStatus.textContent = "Sound blocked by browser";
    });
    
  // Show audio controls
  audioControlsDiv.style.display = "flex";
  
  // Event listeners for audio toggle
  audioToggle.addEventListener('click', () => {
    if (birthdayAudio.paused) {
      birthdayAudio.play();
      audioStatus.textContent = "Celebration Sound: Playing";
      audioToggle.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
             stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>
      `;
    } else {
      birthdayAudio.pause();
      audioStatus.textContent = "Celebration Sound: Paused";
      audioToggle.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
             stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
        </svg>
      `;
    }
  });
  
  // Update UI when audio ends
  birthdayAudio.addEventListener('ended', () => {
    audioStatus.textContent = "Celebration Sound: Ended";
    audioToggle.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
           stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
      </svg>
    `;
  });
}

// Add confetti celebration
function showConfetti() {
  // Create and append confetti container
  const confettiContainer = document.createElement('div');
  confettiContainer.id = 'confetti-container';
  confettiContainer.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1000;';
  document.body.appendChild(confettiContainer);
  
  // Create confetti pieces
  const colors = ['#f94144', '#f3722c', '#f8961e', '#f9c74f', '#90be6d', '#43aa8b', '#577590', '#e63946', '#a8dadc', '#1d3557'];
  const confettiCount = 200;
  
  for (let i = 0; i < confettiCount; i++) {
    createConfettiPiece(confettiContainer, colors);
  }
  
  // Clean up confetti after animation
  setTimeout(() => {
    confettiContainer.remove();
  }, 10000);
}

// Create individual confetti pieces
function createConfettiPiece(container, colors) {
  const confetti = document.createElement('div');
  const size = Math.random() * 10 + 6;
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  confetti.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    background-color: ${color};
    top: -10px;
    left: ${Math.random() * 100}vw;
    opacity: ${Math.random() * 0.7 + 0.3};
    transform: rotate(${Math.random() * 360}deg);
    border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
    animation: fall ${Math.random() * 3 + 5}s linear forwards;
  `;
  
  container.appendChild(confetti);
}

// Add leading zero for single-digit time units
function formatTimeUnit(unit) {
  return unit < 10 ? `0${unit}` : unit;
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  
  .pulse {
    animation: pulse 0.5s ease-in-out;
  }
  
  input:read-only {
    cursor: default;
  }
  
  @keyframes fall {
    0% {
      transform: translateY(0) rotate(0deg);
    }
    100% {
      transform: translateY(100vh) rotate(720deg);
    }
  }
  
  #audio-controls {
    transition: all 0.3s ease;
    opacity: 0.7;
  }
  
  #audio-controls:hover {
    opacity: 1;
  }
`;
document.head.appendChild(style);

// Make sure inputs are read-only
inputs.forEach((input, i) => {
  input.setAttribute('readonly', true);
  input.setAttribute('aria-label', labels[i]);
  
  // Set corresponding label texts from our labels array
  const labelElement = input.nextElementSibling;
  if (labelElement && labelElement.tagName === 'LABEL') {
    labelElement.textContent = labels[i];
  }
});

// Initialize countdown and update every second
updateCountdown();
setInterval(updateCountdown, 1000);

// Add visual feedback when page loads
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
});

// Add responsiveness handler for smaller screens
function handleResponsiveness() {
  const width = window.innerWidth;
  if (width < 768) {
    // Adjust any mobile-specific behavior here if needed
    document.querySelectorAll('.col div').forEach(div => {
      div.style.width = width < 400 ? '80px' : '100px';
    });
  } else {
    document.querySelectorAll('.col div').forEach(div => {
      div.style.width = '130px';
    });
  }
}

// Run responsiveness handler on load and resize
window.addEventListener('resize', handleResponsiveness);
window.addEventListener('load', handleResponsiveness);