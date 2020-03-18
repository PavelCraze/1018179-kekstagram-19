'use strict';

(function () {

  var cards = document.querySelector('.pictures');
  var template = document.querySelector('#picture').content;

  var makeElement = function (photos) {
    var photosFragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.PHOTOS_AMOUNT; i++) {
      var element = template.cloneNode(true);
      element.querySelector('.picture__img').src = photos[i].url;
      element.querySelector('.picture__comments').textContent = photos[i].comments;
      element.querySelector('.picture__likes').textContent = photos[i].likes;
      photosFragment.appendChild(element);
    }
    cards.appendChild(photosFragment);
  };


  var successHandler = function (photos) {
    window.data.getPhotos = photos.slice(0);
    makeElement(window.data.getPhotos);
  };



  var init = function () {
    window.data.getPhotos();
    makeElement(window.data.getPhotos());
    window.backend.loadData(successHandler, window.backend.errorHandler);
  };
  init();



})();
