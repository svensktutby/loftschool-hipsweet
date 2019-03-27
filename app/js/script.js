/* jshint esnext: true */

/* Accordion
 ******************************/
;(function () {
  var flag = true;

  $('.faq__answer:not(:first)').hide();

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
        currentContent.slideUp(duration, function () {
          flag = true;
        });
      }
    }
  });
}());
/* jshint esnext: true */

/* Map
 ******************************/
;(function () {
  ymaps.ready(init);

  function init() {
    // Создание карты.    
    var myMap = new ymaps.Map("map", {
      // Координаты центра карты.
      // Порядок по умолчанию: «широта, долгота».
      // Чтобы не определять координаты центра карты вручную,
      // воспользуйтесь инструментом Определение координат.
      center: [53.900000, 27.566670],
      // Уровень масштабирования. Допустимые значения:
      // от 0 (весь мир) до 19.
      zoom: 12,
      // Элементы управления в наборах подобраны оптимальным образом
      // для карт маленького, среднего и крупного размеров.
      // Также доступны наборы 'default' и 'largeMapDefaultSet'
      controls: ['smallMapDefaultSet'] // если оставить массив пустым, то никаких контроллов не будет
    });

    // (1) Добавление маркера на карту
    var myPlacemark = new ymaps.Placemark(
      [53.900000, 27.566670], // место установки маркера
      {
        hintContent: 'Center of Miensk', // при наведении
        balloonContent: 'Красноармейская улица, 6' // при клике
      }, {
        iconLayout: 'default#image',
        iconImageHref: './img/marker.png', // картинка маркера (путь указывать от файла HTML)
        iconImageSize: [42, 59], // размер маркера
        iconImageOffset: [-20, -60] // сдвиг маркера на карте
      });

    // (2) Подключение маркера на карту
    myMap.geoObjects.add(myPlacemark);


    myMap.behaviors.disable(['scrollZoom']);
  }
}());
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