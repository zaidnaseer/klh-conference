document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll('.card');
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target); // Stop observing once the animation is triggered
        }
      });
    }, {
      threshold: 0.3 // Adjust this value as needed
    });
  
    cards.forEach(card => {
      observer.observe(card);
    });
  });
  

