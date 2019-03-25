/* jshint esnext: true */

/* Order
******************************/
;(function() {
  var orderBlock = $('.order-block'),
      formOrder = $('#form-order'),
      inputs = formOrder.find('.form-order__input'),
      label = formOrder.find('.form-order__label'),
      checkbox = formOrder.find('.form-order__check'),
      userEmail = formOrder.find('#user-email'),
      userPhone = formOrder.find('#user-phone'),
      outerWidth = orderBlock.outerWidth();

      userPhone.mask("8 (999) 999-99-99");

  formOrder.on('submit', function(event) {

    inputs.each(function(i, elem) {
      var $this = $(this);
      
      $this.removeClass('input-error');

      if (!$this.val()) {
        event.preventDefault();
        
        $this.addClass('input-error');

        submitError(orderBlock);
      }
    });

    label.removeClass('checkbox-error');
    
    if (!checkbox.is(':checked')) {
      event.preventDefault();

      label.addClass('checkbox-error');

      submitError(orderBlock);
    }
  });

  function submitError (elem) {
    if (elem.hasClass('submit-error')) {
      elem.removeClass('submit-error');
    }
    elem.outerWidth(outerWidth).addClass('submit-error');
  }
}());
/* jshint esnext: true */

/* Slider (BX)
******************************/
;(function() {
  $('.popular-products__list--slider').bxSlider({
    controls: false
  });
}());
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