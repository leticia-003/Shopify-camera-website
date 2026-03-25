document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const revealItems = document.querySelectorAll('[data-reveal]');
  const faqItems = document.querySelectorAll('.lp-faq-item');

  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 16) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    });
  }

  if (revealItems.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index * 60, 360)}ms`;
      observer.observe(item);
    });
  }

  if (faqItems.length) {
    faqItems.forEach((item) => {
      const trigger = item.querySelector('.lp-faq-question');
      if (!trigger) return;

      trigger.addEventListener('click', (event) => {
        event.preventDefault();
        const isOpen = item.hasAttribute('open');

        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.removeAttribute('open');
          }
        });

        if (isOpen) {
          item.removeAttribute('open');
        } else {
          item.setAttribute('open', 'open');
        }
      });
    });
  }
});
