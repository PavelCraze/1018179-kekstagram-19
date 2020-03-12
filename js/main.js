'use strict';

var PHOTOS_AMOUNT = 25;

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var Likes = {
  MIN: 15,
  MAX: 200
};


var cards = document.querySelector('.pictures');
var template = document.querySelector('#picture').content;


var getRandomPoint = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

var getPhotos = function () {
  var photos = [];
  for (var i = 1; i <= PHOTOS_AMOUNT; i++) {
    var photosData = {
      url: 'photos/' + i + '.jpg',
      likes: getRandomPoint(Likes.MIN, Likes.MAX),
      comments: getRandomPoint(0, COMMENTS.length)
    };
    photos.push(photosData);
  }
  return photos;
};

var makeElement = function (photos) {
  var photosFragment = document.createDocumentFragment();
  for (var i = 0; i < PHOTOS_AMOUNT; i++) {
    var element = template.cloneNode(true);
    element.querySelector('.picture__img').src = photos[i].url;
    element.querySelector('.picture__comments').textContent = photos[i].comments;
    element.querySelector('.picture__likes').textContent = photos[i].likes;
    photosFragment.appendChild(element);
  }
  cards.appendChild(photosFragment);
};
var init = function () {
  getPhotos();
  makeElement(getPhotos());
};
init();

var upload = document.querySelector('#upload-file');
var body = document.body;
var pictureEditor = document.querySelector('.img-upload__overlay');
var cancel = document.querySelector('.img-upload__cancel');
var scaleDown = document.querySelector('.scale__control--smaller');
var scaleUp = document.querySelector('.scale__control--bigger');
var scaleValue = document.querySelector('.scale__control--value');
var preview = document.querySelector('.img-upload__preview');
var uploadImg = preview.querySelector('img');
var effectRadio = document.querySelector('.effects__radio');
var effectValue = document.querySelector('.effect-level__value');


var SCALE_STEP = 25;

var ScaleRange = {
  MIN: 0,
  MAX: 100
};

var UploadHandler = function () {
  body.classList.add('modal-open');
  pictureEditor.classList.remove('hidden');
  scaleValue.value = '100%';

};
var onCancel = function () {
  body.classList.remove('modal-open');
  pictureEditor.classList.add('hidden');
  pictureEditor.value = ' ';
};

var scaleDownHandler = function () {
  if (parseInt(scaleValue.value, 10) > SCALE_STEP) {
    scaleValue.value = parseInt(scaleValue.value, 10) - SCALE_STEP + '%';
    uploadImg.style.transform = 'scale(' + parseInt(scaleValue.value, 10) / 100 + ')';
  }
};

var scaleUpHandler = function () {
  if (parseInt(scaleValue.value, 10) < ScaleRange.MAX) {
    scaleValue.value = parseInt(scaleValue.value, 10) + SCALE_STEP + '%';
    uploadImg.style.transform = 'scale(' + parseInt(scaleValue.value, 10) / 100 + ')';
  } else {
    uploadImg.style.transform = 'none';
  }
};

var effectChangeHandler = function () {
  console.log('Radio works');
};

upload.addEventListener('change', UploadHandler);
cancel.addEventListener('click', onCancel);
scaleDown.addEventListener('click', scaleDownHandler);
scaleUp.addEventListener('click', scaleUpHandler);



var inputHashtag = document.querySelector('.text__hashtags');
var submitButton = document.querySelector('#upload-submit');
var form = document.querySelector('.img-upload__form');

var HestagData = {
  START_POSITION: 0,
  MAX_COUNT: 5,
  MIN_LENGTH: 2,
  MAX_LENGTH: 20,
  VALID_POSITION: 1
};

var Message = {
  HESTAG_START: 'Хэш-тег начинается с символа #',
  HESTAG_MIN_SYMBOL: 'Хеш-тег не может состоять только из одной решётки',
  HESTAG_MAX_LENGTH: 'Максимальная длина одного хэш-тега ',
  HESTAG_VALUE_INCLUSIVE: ' имволов, включая решётку',
  HESTAG_NO_REPEAT: 'Один и тот же хэш-тег не может быть использован дважды',
  HESTAG_MAX_NUMBER: 'Хэштегов может быть максимум ',
  HESTAG_SEPARATOR: 'Хэш-теги разделяются пробелами'
};

var validateHashtag = function (hashtag) {
  if (hashtag[HestagData.START_POSITION] !== '#') {
    inputHashtag.setCustomValidity(Message.HESTAG_START);
    return false;
  } else if (hashtag.length < HestagData.MIN_LENGTH) {
    inputHashtag.setCustomValidity(Message.HESTAG_MIN_SYMBOL);
    return false;
  } else if (hashtag.length > HestagData.MAX_LENGTH) {
    inputHashtag.setCustomValidity(Message.HESTAG_MAX_LENGTH + HestagData.MAX_LENGTH + Message.HESTAG_VALUE_INCLUSIVE);
    return false;
  } else if (hashtag.indexOf('#', HestagData.VALID_POSITION) > 0) {
    inputHashtag.setCustomValidity(Message.HESTAG_SEPARATOR);
    return false;
  }
  return true;
};

var onSubmitButtonClick = function (evt) {
  if (inputHashtag.value !== '') {
    var hashtagArray = inputHashtag.value.toLowerCase().split(' ');
    for (var i = 0; i < hashtagArray.length; i++) {
      var isHashtagValid = validateHashtag(hashtagArray[i]);
      if (!isHashtagValid) {
        break;
      }
      var positionNextHashtag = i + 1;
      if (hashtagArray.indexOf(hashtagArray[i], positionNextHashtag) > 0) {
        inputHashtag.setCustomValidity(Message.HESTAG_NO_REPEAT);
        break;
      }
    }
    if (hashtagArray.length > HestagData.MAX_COUNT) {
      inputHashtag.setCustomValidity(Message.HESTAG_MAX_NUMBER + HestagData.MAX_COUNT);
    }
  }
};

var onInputInput = function () {
  inputHashtag.setCustomValidity('');
};

submitButton.addEventListener('click', onSubmitButtonClick);
inputHashtag.addEventListener('input', onInputInput);


var pinPosition = {
  MIN: 0,
  MAX: 450
};

var FilterCss = {
  none: {
    class: 'effects__preview--none'
  },
  chrome: {
    class: 'effects__preview--chrome',
    css: 'grayscale',
    max: 1,
    min: 0
  },
  sepia: {
    class: 'effects__preview--sepia',
    css: 'sepia',
    max: 1,
    min: 0
  },
  marvin: {
    class: 'effects__preview--marvin',
    css: 'invert',
    max: 100,
    min: 0,
    postFix: '%'
  },
  phobos: {
    class: 'effects__preview--phobos',
    css: 'blur',
    max: 3,
    min: 0,
    postFix: 'px'
  },
  heat: {
    class: 'effects__preview--heat',
    css: 'brightness',
    max: 3,
    min: 1
  }
};

var preview = document.querySelector('.img-upload__preview');
var effectValue = document.querySelector('[name="effect-level"]');
var line = document.querySelector('.effect-level__line');
var pin = document.querySelector('.effect-level__pin');
var blockPin = document.querySelector('.img-upload__effect-level');
var effectList = document.querySelector('.effects__list');

var makeValueFilter = function (value) {
  pin.style.left = value + 'px';
  line.style.width = value + 'px';
};

var filterChange = function (max, min, filter, position, filterPostfix) {
  var postFix = filterPostfix || '';
  var value = (max - min) * (position / pinPosition.MAX) + min;
  var change = '' + filter + '(' + value + postFix + ')';

  preview.style.filter = change;
  effectValue.value = value;
};

pin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var selectedFilter = document.querySelector('input[type="radio"]:checked').value;
  var startCoords = evt.clientX;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = startCoords - moveEvt.clientX;
    var position = pin.offsetLeft - shift;
    startCoords = moveEvt.clientX;

    if (position <= pinPosition.MIN) {
      position = pinPosition.MIN;
    }

    if (position > pinPosition.MAX) {
      position = pinPosition.MAX;
    }

    makeValueFilter(position);
    filterChange(FilterCss[selectedFilter].max, FilterCss[selectedFilter].min, FilterCss[selectedFilter].css, position, FilterCss[selectedFilter].postFix);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

var cheskScaleShow = function (elem) {
  return elem.value !== 'none' ? blockPin.classList.remove('hidden') : blockPin.classList.add('hidden');
};

effectList.addEventListener('click', function (evt) {
  var toggler = evt.target.closest('input');
  if (toggler) {
    makeValueFilter(pinPosition.MAX);
    preview.classList = 'img-upload__preview';
    preview.removeAttribute('style');
    preview.classList.add(FilterCss[toggler.value].class);
    cheskScaleShow(toggler);
  }
});

var makeDeafultFilter = function () {
  makeValueFilter(pinPosition.MAX);
  preview.removeAttribute('style');
  blockPin.classList.add('hidden');
  preview.classList = 'img-upload__preview';
};
