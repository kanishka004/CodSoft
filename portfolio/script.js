// Toggle mobile nav
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});


// Typewriter Effect
const titles = ['Web Developer', 'Web Designer', 'Frontend Enthusiast', 'Creative Coder'];
let typewriterIndex = 0;
let charIndex = 0;
let typewriterText = document.getElementById('typewriter-text');

function typeText() {
  if (charIndex <= titles[typewriterIndex].length) {
    typewriterText.textContent = titles[typewriterIndex].substring(0, charIndex);
    charIndex++;
    setTimeout(typeText, 100);
  } else {
    setTimeout(() => {
      charIndex = 0;
      typewriterIndex = (typewriterIndex + 1) % titles.length;
      typeText();
    }, 1500);
  }
}
typeText();

// Scroll Fade-in
const fadeSections = document.querySelectorAll('.fade-in-section');
const options = { threshold: 0.3 };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('appear');
    }
  });
}, options);

fadeSections.forEach(section => {
  observer.observe(section);
});


// Animate progress bars on scroll
const progressBars = document.querySelectorAll('.progress');

const skillSection = document.querySelector('#skills');
const skillObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      progressBars.forEach(bar => {
        const value = bar.getAttribute('data-progress');
        bar.style.width = value + '%';
      });
      observer.unobserve(entry.target); // Only animate once
    }
  });
}, { threshold: 0.4 });

skillObserver.observe(skillSection);


// Project slider
const slider = document.getElementById('slider');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

// Each card width + margin (adjust if needed)
let slideIndex = 0;
const cardsVisible = window.innerWidth <= 768 ? 1 : 2;
const totalCards = slider.children.length;

function updateSlide(direction) {
  if (direction === 'next') {
    slideIndex += cardsVisible;
    if (slideIndex >= totalCards) slideIndex = 0;
  } else {
    slideIndex -= cardsVisible;
    if (slideIndex < 0) slideIndex = totalCards - cardsVisible;
  }

  const cardWidth = slider.children[0].offsetWidth + 24; // 24 for gap
  slider.scrollTo({
    left: cardWidth * slideIndex,
    behavior: 'smooth'
  });
}

nextBtn.addEventListener('click', () => updateSlide('next'));
prevBtn.addEventListener('click', () => updateSlide('prev'));

// Autoplay every 3 seconds
setInterval(() => updateSlide('next'), 3000);
