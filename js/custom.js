(function ($) {
    "use strict";

    // Theme management functions
    function enableDarkMode() {
        document.documentElement.classList.add('dark-mode');
        $('body').addClass('dark-mode');
        $('.color-mode-icon').addClass('active');
        localStorage.setItem('darkMode', 'enabled');
    }

    function disableDarkMode() {
        document.documentElement.classList.remove('dark-mode');
        $('body').removeClass('dark-mode');
        $('.color-mode-icon').removeClass('active');
        localStorage.setItem('darkMode', 'disabled');
    }

    // Initialize theme on page load
    function initializeTheme() {
        const storedTheme = localStorage.getItem('darkMode');
        if (storedTheme === null) {
            // Default to dark mode for first-time visitors
            enableDarkMode();
        } else if (storedTheme === 'enabled') {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    }

    // Call initializeTheme immediately to apply theme before rendering
    initializeTheme();

    // COLOR MODE TOGGLE
    $('.color-mode').click(function() {
        const isDarkMode = $('body').hasClass('dark-mode');
        if (isDarkMode) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    // HANDLE SYSTEM PREFERENCE CHANGE
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
        // Only apply system preference if no user preference is stored
        if (localStorage.getItem('darkMode') === null) {
            if (event.matches) {
                enableDarkMode();
            } else {
                disableDarkMode();
            }
        }
    });

    // HEADER ANIMATION
    $(".navbar").headroom();

    // PROJECT CAROUSEL
    $('.owl-carousel').owlCarousel({
        items: 1,
        loop: true,
        margin: 10,
        nav: true
    });

    // SMOOTH SCROLL
    $(function() {
        $('.nav-link, .custom-btn-link').on('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - 49
            }, 1000);
            event.preventDefault();
        });
    });

    // TOOLTIP
    $('.social-links a').tooltip();

})(jQuery);