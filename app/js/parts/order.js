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