'use strict';

(function () {
  var COMMENT_MAX_SIZE = 140;

  var HastagData = {
    START_POSITION: 0,
    MAX_COUNT: 5,
    MIN_LENGTH: 2,
    MAX_LENGTH: 20,
    VALID_POSITION: 1
  };

  var Message = {
    HASTAG_START: 'Хэш-тег начинается с символа #',
    HASTAG_MIN_SYMBOL: 'Хеш-тег не может состоять только из одной решётки',
    HASTAG_MAX_LENGTH: 'Максимальная длина одного хэш-тега ',
    HASTAG_VALUE_INCLUSIVE: ' имволов, включая решётку',
    HASTAG_NO_REPEAT: 'Один и тот же хэш-тег не может быть использован дважды',
    HASTAG_MAX_NUMBER: 'Хэштегов может быть максимум ',
    HASTAG_SEPARATOR: 'Хэш-теги разделяются пробелами'
  };

  var form = document.querySelector('.img-upload__form');
  var inputHashtag = document.querySelector('.text__hashtags');
  var inputComment = document.querySelector('.text__description');

  var validateHashtag = function (hashtag) {
    if (hashtag[HastagData.START_POSITION] !== '#') {
      inputHashtag.setCustomValidity(Message.HASTAG_START);
      return false;
    } else if (hashtag.length < HastagData.MIN_LENGTH) {
      inputHashtag.setCustomValidity(Message.HASTAG_MIN_SYMBOL);
      return false;
    } else if (hashtag.length > HastagData.MAX_LENGTH) {
      inputHashtag.setCustomValidity(Message.HASTAG_MAX_LENGTH + HastagData.MAX_LENGTH + Message.HASTAG_VALUE_INCLUSIVE);
      return false;
    } else if (hashtag.indexOf('#', HastagData.VALID_POSITION) > 0) {
      inputHashtag.setCustomValidity(Message.HASTAG_SEPARATOR);
      return false;
    }
    return true;
  };

  var submitButtonClickHandler = function () {
    if (inputHashtag.value !== '') {
      var hashtagArray = inputHashtag.value.toLowerCase().split(' ');
      for (var i = 0; i < hashtagArray.length; i++) {
        var isHashtagValid = validateHashtag(hashtagArray[i]);
        if (!isHashtagValid) {
          break;
        }
        var positionNextHashtag = i + 1;
        if (hashtagArray.indexOf(hashtagArray[i], positionNextHashtag) > 0) {
          inputHashtag.setCustomValidity(Message.HASTAG_NO_REPEAT);
          break;
        }
      }
      if (hashtagArray.length > HastagData.MAX_COUNT) {
        inputHashtag.setCustomValidity(Message.HASTAG_MAX_NUMBER + HastagData.MAX_COUNT);
      }
    }

    if (inputComment.value.length > COMMENT_MAX_SIZE) {
      inputComment.setCustomValidity('Длина комментария не должна превышать 140 символов');
    }
  };

  var inputHandler = function () {
    inputHashtag.setCustomValidity('');
  };

  var formSubmitHandler = function (evt) {
    evt.preventDefault();
    submitButtonClickHandler();
    window.backend.sendData(new FormData(form), successHandler, window.backend.errorHandler);
  };

  var successHandler = function () {
    window.preview.cancelButtonHandler();
    var main = document.querySelector('main');
    var successTemplate = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
    var successButton = successTemplate.querySelector('.success__button');
    main.appendChild(successTemplate);
    var closeSucces = function () {
      main.removeChild(successTemplate);
      document.removeEventListener('keydown', escDownHandler);
    };
    var escDownHandler = function (evt) {
      if (evt.keyCode === window.picture.ESC_KEY_CODE) {
        closeSucces();
      }
    };
    successTemplate.addEventListener('click', function () {
      closeSucces();
    });
    document.addEventListener('keydown', escDownHandler);
    successButton.addEventListener('click', function (evt) {
      closeSucces();
      evt.stopPropagation();
    });
    form.reset();
  };

  inputHashtag.addEventListener('input', inputHandler);
  form.addEventListener('submit', formSubmitHandler);

})();
