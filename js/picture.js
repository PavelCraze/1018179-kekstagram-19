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

  // var showBigPhoto = function (photos) {
  //   var bigPic = document.querySelector('.big-picture');
  //   var commentsBox = bigPic.querySelector('.social__comments');
  //   var closeButton = bigPic.querySelector('#picture-cancel');
  //   bigPic.classList.remove('hidden');
  //   bigPic.querySelector('.big-picture__img').src = photos.url;
  //   bigPic.querySelector('.likes-count').textContent = photos.likes;
  //   bigPic.querySelector('.comments-count').textContent = photos.comments.length;
  //   closeButton.addEventListener('click', function () {
  //     bigPic.classList.add('hidden');
  //   });
  //   commentsBox.appendChild(function () {
  //     var comment = document.createElement('li');
  //     var commentText = comment.querySelector('.social__text');
  //     commentText.textContent = photos.comments.message;
  //     comment.classList.add('social__comment');
  //     var img = document.createElement('img');
  //     img.classList.add('social__picture');
  //     img.src = photos.comments.svg;
  //     img.alt = photos.comments.name;
  //     img.width = 35;
  //     img.height = 35;
  //     comment.appendChild(img);
  //     return comment;
  //   });
  // };

  var makeElement = function (photos) {
    removePhoto();
    var photosFragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      var element = template.cloneNode(true);
      element.querySelector('.picture__img').src = photos[i].url;
      element.querySelector('.picture__comments').textContent = photos[i].comments.length;
      element.querySelector('.picture__likes').textContent = photos[i].likes;
      // element.addEventListener('click', function () {
      //   showBigPhoto();
      //   document.querySelector('body').classList.add('modal-open');
      // });
      photosFragment.appendChild(element);
    }

    cards.appendChild(photosFragment);
    filters.classList.remove('img-filters--inactive');

  };

  form.addEventListener('click', window.debounce(function (evt) {
    var sortData = window.filters.sortData(photosStorage, evt.target.id);
    makeElement(sortData);
    var activeElement = form.querySelector('.img-filters__button--active');
    if (activeElement) {
      activeElement.classList.remove('img-filters__button--active');
    }
    evt.target.classList.add('img-filters__button--active');
  }));


  var successHandler = function (photos) {
    var newPhotos = photos.slice(0);
    makeElement(newPhotos);
  };

  var init = function () {
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
