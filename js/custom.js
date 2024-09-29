(function ($) {

  "use strict";

  //--------VDNT change
      $(document).ready(function() {
        if (localStorage.getItem('darkMode') === 'enabled') {
            $('body').addClass('dark-mode');
            $('.color-mode-icon').addClass('active'); // Optional: Change the icon to active
        } else {
            $('body').removeClass('dark-mode');
        }
      });
//-------------------

    // COLOR MODE
    $('.color-mode').click(function(){
      $('body').toggleClass('dark-mode')
        $('.color-mode-icon').toggleClass('active')
    })

    // HEADER
    $(".navbar").headroom();

    // PROJECT CAROUSEL
    $('.owl-carousel').owlCarousel({
    	items: 1,
	    loop:true,
	    margin:10,
	    nav:true
	});

    // SMOOTHSCROLL
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
