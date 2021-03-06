'use strict';

(function () {
  var SCALE_STEP = 25;

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var upload = document.querySelector('#upload-file');
  var body = document.body;
  var pictureEditor = document.querySelector('.img-upload__overlay');
  var cancel = document.querySelector('.img-upload__cancel');
  var scaleDown = document.querySelector('.scale__control--smaller');
  var scaleUp = document.querySelector('.scale__control--bigger');
  var scaleValue = document.querySelector('.scale__control--value');
  var preview = document.querySelector('.img-upload__preview').querySelector('img');
  var inputHashtag = document.querySelector('.text__hashtags');
  var inputComment = document.querySelector('.text__description');

  var ScaleRange = {
    MIN: 0,
    MAX: 100
  };

  var cancelButtonHandler = function () {
    body.classList.remove('modal-open');
    pictureEditor.classList.add('hidden');
    pictureEditor.value = ' ';
    makeDefaultFilter();
  };

  var scaleDownHandler = function () {
    if (parseInt(scaleValue.value, 10) > SCALE_STEP) {
      scaleValue.value = parseInt(scaleValue.value, 10) - SCALE_STEP + '%';
      preview.style.transform = 'scale(' + parseInt(scaleValue.value, 10) / 100 + ')';
    }
  };

  var scaleUpHandler = function () {
    if (parseInt(scaleValue.value, 10) < ScaleRange.MAX) {
      scaleValue.value = parseInt(scaleValue.value, 10) + SCALE_STEP + '%';
      preview.style.transform = 'scale(' + parseInt(scaleValue.value, 10) / 100 + ')';
    } else {
      preview.style.transform = 'none';
    }
  };

  cancel.addEventListener('click', cancelButtonHandler);
  scaleDown.addEventListener('click', scaleDownHandler);
  scaleUp.addEventListener('click', scaleUpHandler);
  document.addEventListener('keydown', function (evt) {
    if (document.activeElement === inputHashtag || document.activeElement === inputComment) {
      return;
    }
    if (evt.keyCode === window.picture.ESC_KEY_CODE) {
      cancelButtonHandler();
    }
  });

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

  var effectValue = document.querySelector('[name="effect-level"]');
  var depth = document.querySelector('.effect-level__depth');
  var pin = document.querySelector('.effect-level__pin');
  var blockPin = document.querySelector('.img-upload__effect-level');
  var effectList = document.querySelector('.effects__list');
  var makeValueFilter = function (value) {
    pin.style.left = value + 'px';
    depth.style.width = value + 'px';
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

  var makeDefaultFilter = function () {
    makeValueFilter(pinPosition.MAX);
    preview.removeAttribute('style');
    blockPin.classList.add('hidden');
    preview.classList = 'img-upload__preview';
  };

  var checkFileType = function (name) {
    return FILE_TYPES.some(function (item) {
      return name.endsWith(item);
    });
  };

  var loadImages = function (file) {
    if (file) {
      var fileName = file.name.toLowerCase();
      var matches = checkFileType(fileName);
      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          preview.src = reader.result;
        });
        reader.readAsDataURL(file);
        makeDefaultFilter();
      }
    }
  };

  var imagesChangeHandler = function () {
    var files = upload.files;
    Array.prototype.forEach.call(files, (function (file) {
      loadImages(file);
    }));
    effectList.addEventListener('click', filterChange);
    body.classList.add('modal-open');
    pictureEditor.classList.remove('hidden');
    scaleValue.value = '100%';
  };

  upload.addEventListener('change', imagesChangeHandler);

  window.preview = {
    cancelButtonHandler: cancelButtonHandler
  };
})();
