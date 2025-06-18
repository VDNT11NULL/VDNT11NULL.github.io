(function ($) {
    "use strict";

    // Theme management functions
    function enableDarkMode() {
        document.documentElement.classList.remove('light-mode');
        document.documentElement.classList.add('dark-mode');
        $('body').removeClass('light-mode').addClass('dark-mode');
        $('.color-mode-icon').addClass('active');
        localStorage.setItem('theme', 'dark');
    }

    function enableLightMode() {
        document.documentElement.classList.remove('dark-mode');
        document.documentElement.classList.add('light-mode');
        $('body').removeClass('dark-mode').addClass('light-mode');
        $('.color-mode-icon').removeClass('active');
        localStorage.setItem('theme', 'light');
    }

    function initializeTheme() {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'light') {
            enableLightMode();
        } else {
            enableDarkMode();
        }
    }

    initializeTheme();

    $('.color-mode').click(function () {
        const isDarkMode = $('body').hasClass('dark-mode');
        if (isDarkMode) {
            enableLightMode();
        } else {
            enableDarkMode();
        }
    });

    // HEADER ANIMATION
    $(".navbar").headroom();

    // PROJECT CAROUSEL INITIALIZATION
    let $carousel = $('.owl-carousel').owlCarousel({
        loop: false,
        margin: 30,
        nav: false,
        dots: false,
        responsive: {
            0: { items: 1 },
            600: { items: 2 },
            1000: { items: 3 }
        },
        onInitialized: function () {
            console.log('Carousel initialized');
            $carousel.trigger('refresh.owl.carousel'); // Force initial refresh
        }
    });

    // Custom navigation with immediate binding
    function bindNavigation() {
        $('.owl-prev').off('click').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Prev clicked');
            $carousel.trigger('prev.owl.carousel');
        });

        $('.owl-next').off('click').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Next clicked');
            $carousel.trigger('next.owl.carousel');
        });
    }

    bindNavigation();

    // PROJECT MODAL TRIGGER
    $('.project-card').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Project card clicked');
        const $card = $(this);
        const title = $card.find('h3').text();
        const description = $card.find('p').text();
        const frameworks = $card.find('.frameworks').text().replace('Frameworks: ', '');
        const githubLink = $card.find('a[href*="github.com"]').attr('href');
        const appLink = $card.find('a:contains("View Deployed App")').attr('href');

        $('#projectModalLabel').text(title);
        $('#modalDescription').text(description);
        $('#modalFrameworks').text('Frameworks: ' + frameworks);
        $('#modalGithubLink').attr('href', githubLink || '#').toggle(!!githubLink);
        $('#modalAppLink').attr('href', appLink || '#').toggle(!!appLink);

        $('#projectModal').modal('show');
    });

    // Refresh carousel after modal hide
    $('#projectModal').on('hidden.bs.modal', function () {
        console.log('Modal hidden, refreshing carousel');
        $carousel.trigger('refresh.owl.carousel');
        bindNavigation(); // Rebind navigation to ensure no loss of events
    });

    // FILTER FUNCTIONALITY
    $('.filter-button').click(function () {
        const filter = $(this).data('filter');
        console.log('Filter applied: ' + filter);
        $('.filter-button').removeClass('active');
        $(this).addClass('active');

        // Update visible items
        if (filter === 'all') {
            $('.project-card').show();
        } else {
            $('.project-card').hide();
            $(`.project-card[data-category*="${filter}"]`).show();
        }

        // Replace carousel items instead of destroying
        $carousel.trigger('replace.owl.carousel', [$('.project-card:visible')]).trigger('refresh.owl.carousel');
        bindNavigation(); // Rebind navigation after filter
    });

    // CHECK FOR INTERNAL IMAGE SLIDERS
    $('.owl-carousel-img').each(function () {
        const $imgContainer = $(this);
        if ($imgContainer.find('img').length > 1) {
            console.log('Multiple images found in project card, initializing mini-slider');
            $imgContainer.owlCarousel({
                items: 1,
                loop: true,
                nav: false,
                dots: true,
                autoplay: true,
                autoplayTimeout: 3000
            });
        }
    });

    // SMOOTH SCROLL
    $('.nav-link, .custom-btn-link').on('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 49
        }, 1000);
        event.preventDefault();
    });

    // TOOLTIP
    $('.footer ul li a').tooltip();

})(jQuery);