'use strict';

(function () {

  var defaultSort = document.querySelector('#filter-default');
  var discusssed = document.querySelector('#filter-discussed');
  var random = document.querySelector('#filter-random');


  var removeActiveFilter = function () {
    var filters = document.querySelector('.img-filters');
    var filterButton = filters.querySelectorAll('.img-filters__button');
    filterButton.forEach(function (button) {
      if (button.classList.contains('img-filters__button--active')) {
        button.classList.remove('img-filters__button--active');
      }
    });
  };

  var removePhoto = function () {
    var cards = document.querySelector('.pictures');
    var photo = cards.querySelectorAll('.picture');
    photo.forEach(function (item) {
      cards.removeChild(item);
    });
  };

  var sortDefault = function (arr) {
    return arr.slice();
  };

  var sortDiscussed = function (arr) {
    return arr.slice().sort(function (a, b) {
      return b.comments - a.comments;
    });
  };

  var sortRandom = function () {
    return Math.floor(Math.random());
  };


  var defaultChangeHandler = function (evt) {
    removePhoto();
    removeActiveFilter();
    evt.target.classList.add('img-filters__button--active');
  };

  var discussedChangeHandler = function (evt) {
    removePhoto();
    removeActiveFilter();
    evt.target.classList.add('img-filters__button--active');
  };

  var randomChangeHandler = function (evt) {
    removePhoto();
    removeActiveFilter();
    evt.target.classList.add('img-filters__button--active');
  };

  defaultSort.addEventListener('click', defaultChangeHandler);
  discusssed.addEventListener('click', discussedChangeHandler);
  random.addEventListener('click', randomChangeHandler);

})();
