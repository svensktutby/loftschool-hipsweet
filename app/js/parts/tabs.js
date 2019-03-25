/* jshint esnext: true */

/* Tabs
******************************/
;(function() {
  var flag = true;

  $('.contributor__link').on('click', function(event) {
    event.preventDefault();

    var
      $this = $(this),
      item = $this.closest('.contributor'),
      container = $('.our-team__content'),
      content = container.find('.contributor-desc'),
      idx = item.index(),
      reqItem = content.eq(idx),
      activeItem = content.filter('.contributor-desc--active'),
      duration = 500;

      if (flag) {
        flag = false;

        item.addClass('contributor--active')
          .siblings()
          .removeClass('contributor--active');
        
        activeItem.fadeOut(duration, function() {
          reqItem.fadeIn(duration, function() {
            flag = true;
            $(this).addClass('contributor-desc--active')
            .siblings()
            .removeClass('contributor-desc--active');
          });
        });
      }
  });
}());