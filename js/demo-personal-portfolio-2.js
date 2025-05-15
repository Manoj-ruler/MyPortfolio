/*
Name:           Demo Personal Portfolio 2
Written by:     Okler Themes - (http://www.okler.net)
Theme Version:  12.1.0
*/

(($ => {
    /*
	Locomotive
	*/
    if (typeof LocomotiveScroll !== 'undefined') {

		window.scrollTo(0,0);

		setTimeout(() => {

			const scroller = new LocomotiveScroll({
				el: document.querySelector("[data-scroll-container]"),
				smooth: true,
				mobile: {
					breakpoint: 0,
					smooth: true
				},
				tablet: {
					breakpoint: 0,
					smooth: true
				}
			});

			$('[data-hash]').off().on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				const anchor = $($(this).attr('href')).get(0);

				scroller.scrollTo(anchor);
			});

		}, 100);

		window.onbeforeunload = () => {
		    window.scrollTo(0,0);
		};

	} else {

		theme.fn.showErrorMessage('Failed to Load File', 'Failed to load: Locomotive Scroll - Include the following file(s): (vendor/locomotive-scroll/locomotive-scroll.min.js)');

	}
})).apply( this, [ jQuery ]);
function handleHeroScrollEffect() {
    const heroFullStackRow = document.querySelector('#home .row.py-3.py-lg-0.custom-border-bottom-1:first-child');
    if (!heroFullStackRow) return;

    const scrollElementContainer = heroFullStackRow.querySelector('.col > div[data-scroll]');
    if (!scrollElementContainer) return;

    // Store original attributes if you want to re-enable them later
    if (!scrollElementContainer.hasAttribute('data-original-scroll-direction')) {
        scrollElementContainer.setAttribute('data-original-scroll-direction', scrollElementContainer.getAttribute('data-scroll-direction'));
    }
    if (!scrollElementContainer.hasAttribute('data-original-scroll-speed')) {
        scrollElementContainer.setAttribute('data-original-scroll-speed', scrollElementContainer.getAttribute('data-scroll-speed'));
    }


    if (window.innerWidth < 768) { // Threshold, e.g., 768px
        // Disable horizontal scroll
        if (scrollElementContainer.getAttribute('data-scroll-direction') === 'horizontal') {
            scrollElementContainer.removeAttribute('data-scroll-direction');
            // Optionally, remove data-scroll entirely or set speed to 0 if the library still acts
            // scrollElementContainer.removeAttribute('data-scroll');
            // scrollElementContainer.setAttribute('data-scroll-speed', '0');
            console.log('Horizontal scroll disabled for hero text');
        }
    } else {
        // Re-enable horizontal scroll if it was disabled
        const originalDirection = scrollElementContainer.getAttribute('data-original-scroll-direction');
        if (originalDirection && scrollElementContainer.getAttribute('data-scroll-direction') !== originalDirection) {
            scrollElementContainer.setAttribute('data-scroll-direction', originalDirection);
             // Potentially re-add data-scroll or original speed if removed/changed
            console.log('Horizontal scroll re-enabled for hero text');
        }
    }

    // Important: If your data-scroll library initializes on load and doesn't watch for attribute changes,
    // you might need to re-initialize it or call an update function after changing attributes.
    // This depends heavily on the specific library.
    // Example: if (typeof someScrollLibrary !== 'undefined') { someScrollLibrary.update(); }
}

// Run on load and on resize
window.addEventListener('load', handleHeroScrollEffect);
window.addEventListener('resize', handleHeroScrollEffect);

// Ensure you fix the typo in HTML from "DEVLOPER" to "DEVELOPER"
// and ideally give that <strong> an ID for robust selection.
// Example if HTML is: <strong id="hero-main-title" class="custom-hero-font-1 ...">Full Stack Developer</strong>
// Then JS selectors would be: const scrollElementContainer = document.getElementById('hero-main-title').closest('[data-scroll]');
