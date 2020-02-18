'use strict';


var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var likes = {
  MIN: 15,
  MAX: 200
};

const photosAmount = 25;

var getRandomPoint = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

var getRandomElement = function (arr) {
  return Math.floor(Math.random() * arr.length);
};
var getPhotos = function () {
  var photos = [];
  for (var i = 0; i <= photosAmount; i++) {
    var photosData = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomPoint(likes.min, likes.max),
      comments: getRandomElement(COMMENTS)
    }
    photos.push(photosData);
  }
  return photos;
}

var makeElement = function () {
  var cards = document.querySelector('.pictures');

  var template = document.querySelector('#picture').content.querySelector('.picture');

  for (var j = 0; j < 25; j++) {
    var element = template.cloneNode(true);

    cards.appendChild(element);
  }
  return
}
