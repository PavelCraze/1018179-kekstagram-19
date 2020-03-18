'use strict';

(function () {
  var Url = {
    GET: 'https://js.dump.academy/kekstagram/data'
  };

  var loadData = function () {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', Url.GET);
  };

  window.backend = {
    loadData: loadData
  };
})();
