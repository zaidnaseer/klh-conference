const observer = new IntersectionObserver(entries => {
    // Loop over the entries
    entries.forEach(entry => {
      console.log(entry);
      // If the element is visible
      if (entry.isIntersecting) {
        // Add the animation class
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  });

  const animationQueue = [];
  let isAnimating = false;
  let lastScrollTime = Date.now();
  let visibleElements = new Set();

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

  function animateNext() {
      if (animationQueue.length === 0) {
          isAnimating = false;
          return;
      }

      isAnimating = true;
      const element = animationQueue.shift();
      if (!visibleElements.has(element)) {
          element.classList.add('visible');
          visibleElements.add(element);
      }

      setTimeout(() => {
          animateNext();
      }, 50); // Reduced delay between animations
  }

  const queueAnimation = debounce((elements) => {
      animationQueue.push(...elements);
      if (!isAnimating) {
          animateNext();
      }
  }, 50);

  function handleVisibleElements(entries) {
      const currentTime = Date.now();
      const scrollSpeed = currentTime - lastScrollTime;
      lastScrollTime = currentTime;

      const newlyVisibleElements = entries
          .filter(entry => entry.isIntersecting)
          .map(entry => entry.target);

      if (scrollSpeed < 100 || newlyVisibleElements.length > 5) {
          // Fast scrolling or many elements: show all at once
          newlyVisibleElements.forEach(el => {
              el.classList.add('visible');
              visibleElements.add(el);
          });
      } else {
          // Slow scrolling: queue animations
          queueAnimation(newlyVisibleElements);
      }

      newlyVisibleElements.forEach(el => observerQueue.unobserve(el));
  }

  const observerQueue = new IntersectionObserver(handleVisibleElements, { threshold: 0.1 });

  document.querySelectorAll('section dt, section dd').forEach(el => {
      observerQueue.observe(el);
  });

  // Handle case when user has scrolled to the bottom quickly
  window.addEventListener('scroll', debounce(() => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
          document.querySelectorAll('section dt:not(.visible), section dd:not(.visible)').forEach(el => {
              el.classList.add('visible');
              visibleElements.add(el);
              observerQueue.unobserve(el);
          });
      }
  }, 100));
  document.querySelectorAll('section h1, section > p').forEach(
    el => {
      observer.observe(el);
    }
  );

  document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});



