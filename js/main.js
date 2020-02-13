'use strict';


var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var LIKES = {
  MIN: 15,
  MAX: 200
};

var getRandomPoint = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomElement = function (arr) {
  var randomindex = Math.floor(Math.random() * arr.length);
  return arr[randomindex];
};
var photos = [];
for (var i = 0; i < 25; i++) {
  photos[i] = {
    url: 'photos/' + (i + 1) + '.jpg',
    likes: getRandomPoint(LIKES.MIN, LIKES.MAX),
    comments: getRandomElement(COMMENTS)
  };
}

var cards = document.querySelector('.pictures');

var template = document.querySelector('#picture').content.querySelector('.picture');

for (var j = 0; j < photos.length; j++) {
  var element = template.cloneNode(true);
  template.querySelector('img').src = photos[j].url;
  cards.appendChild(element);
}
