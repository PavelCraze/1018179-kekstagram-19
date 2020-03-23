'use strict';

(function () {
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

  var getRandomPoint = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getRandomElement = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var getPhotos = function () {
    var photos = [];
    for (var i = 1; i <= PHOTOS_AMOUNT; i++) {
      var photosData = {
        url: 'photos/' + i + '.jpg',
        likes: getRandomPoint(Likes.MIN, Likes.MAX),
        comments: getRandomElement(COMMENTS)
      };
      photos.push(photosData);
    }
    return photos;
  };

  window.data = {
    getPhotos: getPhotos,
    getRandomPoint: getRandomPoint,
    PHOTOS_AMOUNT: PHOTOS_AMOUNT
  };

})();
