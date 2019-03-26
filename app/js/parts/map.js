/* jshint esnext: true */

/* Map
 ******************************/
;(function () {
  ymaps.ready(init);

  function init() {

    var myMap = new ymaps.Map('map', {
      center: [53.878173, 27.454207],
      zoom: 12,
      controls: ['smallMapDefaultSet']
    });


    // (1) Добавление маркера на карту
    var myPlacemark = new ymaps.Placemark(
      [53.878173, 27.454207], // место установки маркера
      {
        hintContent: 'My home!', // при наведении
        balloonContent: 'Янковского, 34' // при клике
      }, {
        iconLayout: 'default#image',
        iconImageHref: '../img/marker.png', // картинка маркера
        iconImageSize: [42, 59], // размер маркера
        iconImageOffset: [-20, -60] // сдвиг маркера на карте
      });

    // (2) Подключение маркера на карту
    myMap.geoObjects.add(myPlacemark);


    myMap.behaviors.disable(['scrollZoom']);
  }
}());