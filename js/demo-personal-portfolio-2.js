// Keep this part as is, it handles the Locomotive Scroll initialization
(($ => {
    // We will move the Locomotive Scroll initialization into our async function
    // So, the original initialization block here will be modified or effectively replaced.
    // The $.fn.showErrorMessage part can remain as a fallback.

    // --- NEW ASYNC FUNCTION TO HANDLE FONT LOADING AND SCROLL INIT ---
    async function initializePortfolioFeatures() {
        const heroTitleElement = document.getElementById('hero-main-title'); // Your <strong> element

        if (heroTitleElement) {
            const computedStyle = window.getComputedStyle(heroTitleElement);
            const fontFamily = computedStyle.fontFamily;
            const fontSize = computedStyle.fontSize;
            const fontWeight = computedStyle.fontWeight;
            const primaryFont = fontFamily.split(',')[0].trim().replace(/['"]/g, '');

            console.log(`Ensuring font "${primaryFont}" (size: ${fontSize}, weight: ${fontWeight}) is loaded for hero title...`);

            try {
                if (document.fonts) {
                    await document.fonts.load(`${fontWeight} ${fontSize} "${primaryFont}"`);
                    console.log(`Font "${primaryFont}" is confirmed loaded.`);
                } else {
                    console.warn('Font Loading API not supported. Using a delay fallback.');
                    await new Promise(resolve => setTimeout(resolve, 350)); // Increased delay slightly
                }
            } catch (error) {
                console.error(`Error waiting for font "${primaryFont}":`, error);
                // Proceed with initialization even if font loading check fails
            }
        } else {
            console.warn('Hero title element (#hero-main-title) not found. Proceeding without font check for it.');
        }

        // --- ORIGINAL LOCOMOTIVE SCROLL INITIALIZATION (MOVED HERE) ---
        if (typeof LocomotiveScroll !== 'undefined') {
            window.scrollTo(0, 0); // Keep this if needed for initial scroll position

            // The original setTimeout is for a slight delay, perhaps for other DOM elements to settle.
            // We can keep it, or if the font loading takes time, this might be redundant.
            // For now, let's keep it as it might be intentional for other reasons in the theme.
            setTimeout(() => {
                const scrollContainer = document.querySelector("[data-scroll-container]");
                if (scrollContainer) {
                    // Store the scroller instance on the window object if you need to access it elsewhere
                    window.locoScroll = new LocomotiveScroll({
                        el: scrollContainer,
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

                    console.log('Locomotive Scroll initialized AFTER font check (or delay).');

                    // Re-attach hash link handling if it was previously outside or specific to the old init
                    $('[data-hash]').off().on('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        const anchor = $($(this).attr('href')).get(0);
                        if (window.locoScroll && anchor) {
                            window.locoScroll.scrollTo(anchor);
                        }
                    });

                    // After initializing Locomotive Scroll, also call handleHeroScrollEffect
                    // because it might depend on the scroll library being ready or DOM being final
                    if (typeof handleHeroScrollEffect === 'function') {
                        handleHeroScrollEffect();
                        // And re-attach its resize listener if it was previously global
                        // window.addEventListener('resize', handleHeroScrollEffect);
                        // Note: handleHeroScrollEffect is already attached to 'load' and 'resize' globally later
                    }

                } else {
                    console.error("Locomotive Scroll container ([data-scroll-container]) not found.");
                }
            }, 100); // Original delay from your script

        } else {
            // This part from your original script can stay for error messaging
            if (theme && theme.fn && typeof theme.fn.showErrorMessage === 'function') {
                theme.fn.showErrorMessage('Failed to Load File', 'Failed to load: Locomotive Scroll - Include the following file(s): (vendor/locomotive-scroll/locomotive-scroll.min.js)');
            } else {
                console.error('Locomotive Scroll is not defined, and theme error function is unavailable.');
            }
        }
    } // --- END OF initializePortfolioFeatures ---

    // --- CALL OUR NEW INITIALIZATION FUNCTION ---
    // We'll call this on DOMContentLoaded to ensure the DOM elements exist.
    // The original script was an IIFE, so we mimic that by calling it.
    if (document.readyState === 'loading') { // Alternative to DOMContentLoaded for IIFE style
        document.addEventListener('DOMContentLoaded', initializePortfolioFeatures);
    } else {
        initializePortfolioFeatures(); // Call immediately if DOM is already loaded
    }


    // Keep this outside if it's a general utility
    window.onbeforeunload = () => {
        window.scrollTo(0, 0);
    };

})).apply(this, [jQuery]);


// --- handleHeroScrollEffect function (Keep as is, or with slight improvement) ---
function handleHeroScrollEffect() {
    // Ensure #hero-main-title is used for robust selection of the text element itself,
    // then find its parent [data-scroll] container.
    const heroTitleElement = document.getElementById('hero-main-title');
    if (!heroTitleElement) {
        // console.warn("handleHeroScrollEffect: #hero-main-title not found.");
        return;
    }

    // Find the closest ancestor with `data-scroll` attribute
    const scrollElementContainer = heroTitleElement.closest('[data-scroll]');

    if (!scrollElementContainer) {
        // console.warn("handleHeroScrollEffect: data-scroll container for hero title not found.");
        return;
    }

    // Store original attributes if not already stored
    if (!scrollElementContainer.hasAttribute('data-original-scroll-direction')) {
        const currentDirection = scrollElementContainer.getAttribute('data-scroll-direction');
        if (currentDirection) { // Only store if it exists
            scrollElementContainer.setAttribute('data-original-scroll-direction', currentDirection);
        }
    }
    if (!scrollElementContainer.hasAttribute('data-original-scroll-speed')) {
        const currentSpeed = scrollElementContainer.getAttribute('data-scroll-speed');
        if (currentSpeed) { // Only store if it exists
            scrollElementContainer.setAttribute('data-original-scroll-speed', currentSpeed);
        }
    }

    const shouldDisableHorizontalScroll = window.innerWidth < 768;

    if (shouldDisableHorizontalScroll) {
        if (scrollElementContainer.getAttribute('data-scroll-direction') === 'horizontal') {
            scrollElementContainer.removeAttribute('data-scroll-direction');
            // Optionally, to be very sure Locomotive Scroll doesn't pick it up for horizontal:
            // scrollElementContainer.removeAttribute('data-scroll-speed'); // Or set to 0
            // scrollElementContainer.removeAttribute('data-scroll'); // More drastic
            // console.log('Horizontal scroll disabled for hero text via attribute removal.');
        }
    } else {
        const originalDirection = scrollElementContainer.getAttribute('data-original-scroll-direction');
        if (originalDirection && scrollElementContainer.getAttribute('data-scroll-direction') !== originalDirection) {
            scrollElementContainer.setAttribute('data-scroll-direction', originalDirection);
            // Restore speed if it was removed/changed
            const originalSpeed = scrollElementContainer.getAttribute('data-original-scroll-speed');
            if (originalSpeed) {
                scrollElementContainer.setAttribute('data-scroll-speed', originalSpeed);
            }
            // console.log('Horizontal scroll re-enabled for hero text via attribute restoration.');
        }
    }

    // CRITICAL: After changing data-scroll attributes, Locomotive Scroll needs to be updated
    // for the changes to take effect if it has already been initialized.
    if (window.locoScroll && typeof window.locoScroll.update === 'function') {
        // console.log('handleHeroScrollEffect: Updating Locomotive Scroll due to attribute changes.');
        window.locoScroll.update();
    }
}

// Run on load and on resize (these listeners remain the same)
window.addEventListener('load', handleHeroScrollEffect);
window.addEventListener('resize', handleHeroScrollEffect);

// Ensure your HTML for the hero title is:
// <strong id="hero-main-title" class="hero-title-stable text-dark">Full Stack Developer</strong>
// The class `hero-title-stable` (or your previous `custom-hero-font-1`) should define the font-family.