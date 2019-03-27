/* jshint esnext: true */

/* Smooth scroll to anchors
 ******************************/
;(function () {
  $('.our-products__order-link').on('click', function (event) {
    event.preventDefault();

    var target = $(this).attr('href'),
        anchor = $(target).offset().top;

    $('html, body').animate({scrollTop: anchor}, 1000);
  });
}());