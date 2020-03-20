'use strict';

(function () {

  var cards = document.querySelector('.pictures');
  var filters = document.querySelector('.img-filters');
  var template = document.querySelector('#picture').content;
  var photosStorage = [];
  var form = document.querySelector('.img-filters__form');

  var removePhoto = function () {
    var photo = cards.querySelectorAll('.picture');
    photo.forEach(function (item) {
      item.remove();
    });
  };

  var makeElement = function (photos) {
    removePhoto();
    var photosFragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      var element = template.cloneNode(true);
      element.querySelector('.picture__img').src = photos[i].url;
      element.querySelector('.picture__comments').textContent = photos[i].comments.length;
      element.querySelector('.picture__likes').textContent = photos[i].likes;
      photosFragment.appendChild(element);
    }

    cards.appendChild(photosFragment);
    filters.classList.remove('img-filters--inactive');

  };

  form.addEventListener('click', function (evt) {
    var sortData = window.filters.sortData(photosStorage, evt.target.id);
    makeElement(sortData);
    var activeElement = form.querySelector('.img-filters__button--active');
    if (activeElement) {
      activeElement.classList.remove('img-filters__button--active');
    }
    evt.target.classList.add('img-filters__button--active');
  });


  var successHandler = function (photos) {
    var newPhotos = photos.slice(0);
    makeElement(newPhotos);
  };

  var init = function () {
    window.data.getPhotos();
    window.backend.loadData(function (photos) {
      photosStorage = photos;
      successHandler(photos);
    }, window.backend.errorHandler);
  };
  init();

  window.picture = {
    init: init,
    makeElement: makeElement,
    successHandler: successHandler
  };

})();
