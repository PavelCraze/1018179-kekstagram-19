'use strict';

(function () {
  var ESC_KEY_CODE = 27;

  var bigPic = document.querySelector('.big-picture');
  var commentsBox = bigPic.querySelector('.social__comments');
  var closeButton = bigPic.querySelector('#picture-cancel');
  var cards = document.querySelector('.pictures');
  var filters = document.querySelector('.img-filters');
  var template = document.querySelector('#picture').content.querySelector('.picture');
  var photosStorage = [];
  var form = document.querySelector('.img-filters__form');

  var removePhoto = function () {
    var photo = cards.querySelectorAll('.picture');
    photo.forEach(function (item) {
      item.remove();
    });
  };

  var showComments = function (comment) {
    var commentTemplate = document.querySelector('.social__comment').cloneNode(true);
    var commentText = commentTemplate.querySelector('.social__text');
    var img = commentTemplate.querySelector('img');
    img.src = comment.avatar;
    img.alt = comment.name;
    commentText.textContent = comment.message;
    return commentTemplate;
  };

  var renderComments = function (comments, commentsCount) {
    var commentsFragment = document.createDocumentFragment();
    comments.slice(0, commentsCount).forEach(function (comment) {
      commentsFragment.append(showComments(comment));
    });
    commentsBox.querySelectorAll('.social__comment').forEach(function (comment) {
      comment.remove();
    });
    commentsBox.appendChild(commentsFragment);

  };

  var showBigPhoto = function (photos) {
    var commentsCount = 0;
    bigPic.classList.remove('hidden');
    var commentsShowed = bigPic.querySelector('.comments-showed');
    bigPic.querySelector('.big-picture__img').querySelector('img').src = photos.url;
    bigPic.querySelector('.likes-count').textContent = photos.likes;
    bigPic.querySelector('.comments-count').textContent = photos.comments.length;
    var commentsLoader = bigPic.querySelector('.social__comments-loader');
    commentsLoader.classList.remove('hidden');
    var commentsUploadHandler = function () {
      commentsCount += 5;
      renderComments(photos.comments, commentsCount);
      commentsShowed.textContent = Math.min(photos.comments.length, commentsCount);
      if (commentsCount > photos.comments.length) {
        commentsLoader.classList.add('hidden');
        commentsLoader.removeEventListener('click', commentsUploadHandler);
      }
    };
    commentsUploadHandler();
    commentsLoader.addEventListener('click', commentsUploadHandler);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEY_CODE) {
        bigPic.classList.add('hidden');
        commentsLoader.removeEventListener('click', commentsUploadHandler);
        document.querySelector('body').classList.remove('modal-open');
      }
    });
    closeButton.addEventListener('click', function () {
      bigPic.classList.add('hidden');
      commentsLoader.removeEventListener('click', commentsUploadHandler);
      document.querySelector('body').classList.remove('modal-open');
    });
  };

  var renderPhoto = function (photo) {
    var element = template.cloneNode(true);
    element.querySelector('.picture__img').src = photo.url;
    element.querySelector('.picture__comments').textContent = photo.comments.length;
    element.querySelector('.picture__likes').textContent = photo.likes;
    element.addEventListener('click', function () {
      showBigPhoto(photo);
      document.querySelector('body').classList.add('modal-open');
    });
    return element;
  };

  var makeElement = function (photos) {
    removePhoto();
    var photosFragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      photosFragment.appendChild(renderPhoto(photos[i]));
    }
    filters.classList.remove('img-filters--inactive');
    cards.appendChild(photosFragment);
    filters.classList.remove('img-filters--inactive');
  };

  form.addEventListener('click', window.debounce(function (evt) {
    var sortData = window.filters.sortData(photosStorage.slice(), evt.target.id);
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
    successHandler: successHandler,
    ESC_KEY_CODE: ESC_KEY_CODE
  };

})();
