/* jshint esnext: true */

/* Anchor scroll
 ******************************/
;(function () {
  //Плавный скролл по якорям
  $('a[href^="#"]').on('click', function (event) {
    event.preventDefault();

    var elementClick = $(this).attr('href'),
        destination = $(elementClick).offset().top;

    $('body,html').animate({scrollTop: destination}, 1000);
  });
}());