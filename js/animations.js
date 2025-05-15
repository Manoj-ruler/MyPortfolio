document.addEventListener('DOMContentLoaded', function() {

    // Function to wrap each character in a span for animation
    function setupCharAnimation(textElement) {
        const text = textElement.textContent;
        textElement.innerHTML = ''; // Clear original content
        let delay = 0;
        text.split(/(\s+)/).forEach(part => {
            if (part.match(/\s+/)) {
                const spaceSpan = document.createElement('span');
                spaceSpan.innerHTML = part;
                spaceSpan.style.display = 'inline';
                textElement.appendChild(spaceSpan);
            } else {
                part.split('').forEach(char => {
                    const charSpan = document.createElement('span');
                    charSpan.className = 'char-animated';
                    charSpan.textContent = char;
                    charSpan.style.transitionDelay = `${delay}s`;
                    textElement.appendChild(charSpan);
                    delay += 0.03;
                });
            }
        });
    }

    // Apply to main section title, column titles
    document.querySelectorAll('.edu-exp-section .section-title, .edu-exp-section .column-title').forEach(el => {
        if(!el.classList.contains('chars-wrapped')) {
            setupCharAnimation(el);
            el.classList.add('chars-wrapped');
        }
    });

    // Apply to item titles (H4s)
    document.querySelectorAll('.edu-exp-section .item-title').forEach(el => {
         if(!el.classList.contains('chars-wrapped')) {
            setupCharAnimation(el);
            el.classList.add('chars-wrapped');
        }
    });

    // Intersection Observer for triggering animations on scroll
    const animatedElements = document.querySelectorAll(
        '.edu-exp-section .section-title, .edu-exp-section .column-title, .edu-exp-section .timeline-item'
    );

    const observer = new IntersectionObserver((entries) => { // Removed observerInstance as it's not needed for unobserve here
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Element is scrolling INTO view
                entry.target.classList.add('is-visible');
            } else {
                // Element is scrolling OUT of view
                entry.target.classList.remove('is-visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible.
                       // Adjust if needed. For example, a threshold of [0, 0.1]
                       // would trigger once when it just starts to enter and
                       // once when it's fully out (after 10% was visible).
                       // 0.1 as a single value is good for general cases.
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

});