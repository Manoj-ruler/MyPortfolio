document.addEventListener('DOMContentLoaded', function() {
  var cards = Array.from(document.querySelectorAll('.animate-in'));
  var observer = new window.IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        // Staggered animation
        var idx = cards.indexOf(entry.target);
        setTimeout(function() {
          entry.target.classList.add('animated');
          entry.target.classList.remove('out');
        }, idx * 120);
      } else {
        // Out animation if card leaves viewport
        entry.target.classList.remove('animated');
        entry.target.classList.add('out');
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(function(el) {
    observer.observe(el);
  });
}); 