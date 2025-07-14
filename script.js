// Enhanced Portfolio JavaScript with Modern Interactions

// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  // Animate hamburger
  navToggle.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Close mobile menu if open
      navLinks.classList.remove('active');
      navToggle.classList.remove('active');
    }
  });
});

// Skill card interactions
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-15px) scale(1.05)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});



// Enhanced contact form with validation

// (Contact form JS removed)

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.skill-card, .project-item, .about-content');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero) {
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
  const letters = element.querySelectorAll('.letter');
  let i = 0;
  
  // Hide all letters initially
  letters.forEach(letter => {
    letter.style.opacity = '0';
  });
  
  function type() {
    if (i < letters.length) {
      letters[i].style.opacity = '1';
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    setTimeout(() => {
      typeWriter(heroTitle, '', 80);
    }, 1000);
  }
});

// Add loading animation
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
  // Escape key to close mobile menu
  if (e.key === 'Escape') {
    navLinks.classList.remove('active');
    navToggle.classList.remove('active');
  }
  
  // Enter key for skill cards
  if (e.key === 'Enter' && document.activeElement.classList.contains('skill-card')) {
    const skill = document.activeElement.getAttribute('data-skill');
    showSkillTooltip(document.activeElement, skill);
  }
});

// Add focus styles for accessibility
document.querySelectorAll('a, button, .skill-card').forEach(element => {
  element.addEventListener('focus', function() {
    this.style.outline = '2px solid #63f2c8';
    this.style.outlineOffset = '2px';
  });
  
  element.addEventListener('blur', function() {
    this.style.outline = 'none';
  });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
  // Scroll-based animations can go here
}, 10);

// Track active section and update navigation
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// Update active nav link on scroll
window.addEventListener('scroll', debouncedScrollHandler);
window.addEventListener('scroll', updateActiveNavLink);

// Remove focus outline from navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function() {
    this.blur(); // Remove focus after click
  });
  
  link.addEventListener('focus', function() {
    this.style.outline = 'none';
  });
}); 

// Unique section scroll-triggered animations
const sectionAnimations = [
  { selector: '.about', className: 'section-animate-about' },
  { selector: '.skills', className: 'section-animate-skills' },
  { selector: '.projects', className: 'section-animate-projects' },
  { selector: '.certificates', className: 'section-animate-certificates' },
  { selector: '.contact', className: 'section-animate-contact' },
  { selector: '.experience-section', className: 'section-animate-experience' },
  { selector: '.education-section', className: 'section-animate-education' },
];

const sectionAnimObserverOptions = {
  threshold: 0.18
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const section = entry.target;
    const anim = sectionAnimations.find(a => section.matches(a.selector));
    if (anim) {
      if (entry.isIntersecting) {
        section.classList.add(anim.className);
      } else {
        section.classList.remove(anim.className);
      }
    }
  });
}, sectionAnimObserverOptions);

sectionAnimations.forEach(anim => {
  document.querySelectorAll(anim.selector).forEach(section => {
    sectionObserver.observe(section);
  });
}); 

// Project Card Slideshow on Hover
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  const slideshow = card.querySelector('.project-header-slideshow');
  if (!slideshow) return;
  const slides = slideshow.querySelectorAll('.slide');
  let current = 0;
  let interval = null;

  function showSlide(idx) {
    slides.forEach((img, i) => {
      img.classList.toggle('active', i === idx);
    });
  }

  card.addEventListener('mouseenter', () => {
    if (slides.length <= 1) return;
    let idx = 0;
    interval = setInterval(() => {
      idx = (idx + 1) % slides.length;
      showSlide(idx);
    }, 1000);
  });

  card.addEventListener('mouseleave', () => {
    clearInterval(interval);
    showSlide(0);
  });
}); 

const counter = document.querySelector(".visitor-count");

async function updateCounter() {
    try {
        let response = await fetch("https://deet4hizp44u4o73rux5x6o5im0kudci.lambda-url.ap-southeast-2.on.aws/");
        let data = await response.json();
        
        // Add elegant animation class
        const counterContainer = counter.closest('.visitor-counter');
        counterContainer.classList.add('updating');
        
        // Update counter with elegant transition
        counter.innerHTML = data;
        
        // Remove animation class after animation completes
        setTimeout(() => {
            counterContainer.classList.remove('updating');
        }, 600);
        
    } catch (error) {
        console.error('Error updating visitor counter:', error);
        counter.innerHTML = '0';
    }
}

// Update counter on page load
updateCounter();

document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const data = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value
  };

  try {
    const response = await fetch("https://bgoxf9u74e.execute-api.ap-southeast-2.amazonaws.com/redeploy/contact", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    alert(result.message);
  } catch (err) {
    console.error('Error submitting form:', err);
    alert("There was a problem submitting the form.");
  }
});
