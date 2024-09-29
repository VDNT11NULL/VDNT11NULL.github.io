(function ($) {
  "use strict";

  $(document).ready(function() {
      // Check if darkMode is set in localStorage
      if (localStorage.getItem('darkMode') === null) {
          // If it doesn't exist, set darkMode to 'enabled' for default dark mode
          localStorage.setItem('darkMode', 'enabled');
      }

      // Apply dark mode based on the value in localStorage
      if (localStorage.getItem('darkMode') === 'enabled') {
          $('body').addClass('dark-mode');
          $('.color-mode-icon').addClass('active'); // Optional: Change the icon to active
      } else {
          $('body').removeClass('dark-mode');
      }
  });

  // COLOR MODE
  $('.color-mode').click(function() {
      // Toggle dark mode on click
      $('body').toggleClass('dark-mode');
      $('.color-mode-icon').toggleClass('active');

      // Update localStorage based on the new state
      if ($('body').hasClass('dark-mode')) {
          localStorage.setItem('darkMode', 'enabled');
      } else {
          localStorage.setItem('darkMode', 'disabled');
      }
  });

  // HEADER
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
