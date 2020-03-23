'use strict';

(function () {
  var sortDefault = function (arr) {
    return arr.slice();
  };

  var sortDiscussed = function (arr) {
    return arr.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  };

  var sortRandom = function (arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var J = Math.floor(Math.random() * i);
      var temp = arr[i];
      arr[i] = arr[J];
      arr[J] = temp;
    }
    return arr.slice(0, 10);
  };

  var sortData = function (data, sortType) {
    return sortFunctions[sortType](data);
  };

  var sortFunctions = {
    'filter-default': sortDefault,
    'filter-discussed': sortDiscussed,
    'filter-random': sortRandom
  };

  window.filters = {
    sortData: sortData
  };

})();
