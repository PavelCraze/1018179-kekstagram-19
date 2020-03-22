'use strict';

(function () {

  var Url = {
    POST: 'https://js.dump.academy/kekstagram',
    GET: 'https://js.dump.academy/kekstagram/data'
  };

  var SUCСESS_STATUS = 200;
  var TIME_OUT = 10000;

  var Messages = {
    RESPONSE: 'Статус ответа: ',
    CONNECTION_ERROR: 'Произошла ошибка соединения',
    TIME_ERROR: 'Запрос не успел выполниться за '
  };

  var getRequest = function (successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCСESS_STATUS) {
        successHandler(xhr.response);
      } else {
        errorHandler(Messages.RESPONSE + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      errorHandler(Messages.CONNECTION_ERROR);
    });
    xhr.addEventListener('timeout', function () {
      errorHandler(Messages.TIME_ERROR + xhr.timeout + 'мс');
    });

    xhr.timeout = TIME_OUT;
    return xhr;

  };


  var loadData = function (successHandler, errorHandler) {
    var xhr = getRequest(successHandler, errorHandler);
    xhr.open('GET', Url.GET);
    xhr.send();
  };

  var sendData = function (data, successHandler, errorHandler) {
    var xhr = getRequest(successHandler, errorHandler);
    xhr.addEventListener('load', function () {
      successHandler(xhr.response);
    });
    xhr.open('POST', Url.POST);
    xhr.send(data);
  };


  var errorHandler = function () {
    var errorTemplate = document.querySelectorAll('#error').content.querySelector('.error').cloneNode(true);
    var main = document.querySelector('main');
    var errorButton = errorTemplate.querySelector('.error__button');
    main.appendChild(errorTemplate);
    document.addEventListener('click', function () {
      main.removeChild(errorTemplate);
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.picture.ESC_KEY_CODE) {
        main.removeChild(errorTemplate);
      }
    });
    errorButton.addEventListener('click', function () {
      main.removeChild(errorTemplate);
    });

  };

  window.backend = {
    loadData: loadData,
    sendData: sendData,
    errorHandler: errorHandler
  };

})();
