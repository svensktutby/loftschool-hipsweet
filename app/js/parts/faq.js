/* jshint esnext: true */

/* Accordion
 ******************************/
;(function () {
  var flag = true;

  $('.faq__trigger').on('click', function (event) {
    event.preventDefault();

    var
      $this = $(this),
      container = $this.closest('.faq__list'),
      item = $this.closest('.faq__item'),
      currentContent = item.find('.faq__answer'),
      duration = 500;

    if (flag) {
      flag = false;

      if (!item.hasClass('faq__item--active')) {

        item.addClass('faq__item--active')
            .siblings()
            .removeClass('faq__item--active')
            .find('.faq__answer')
            .slideUp(duration);

        currentContent.slideDown(duration, function () {
          flag = true;
        });
      } else {

        item.removeClass('faq__item--active');
        currentContent.slideUp(function () {
          flag = true;
        });
      }
    }
  });

  $('.faq__answer').slideUp();
  $('.faq__answer:first').slideDown();

}());