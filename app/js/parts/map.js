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
      center: [53.878173, 27.454207],
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