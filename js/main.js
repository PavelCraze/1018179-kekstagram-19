'use strict';


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

var PHOTOS_AMOUNT = 25;
var photos = [];
var cards = document.querySelector('.pictures');
var template = document.querySelector('#picture').content;
var photosFragment = document.createDocumentFragment();

var getRandomPoint = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

var getRandomElement = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

var getPhotos = function () {
  for (var i = 1; i <= 25; i++) {
    var photosData = {
      url: 'photos/' + (i) + '.jpg',
      likes: getRandomPoint(Likes.min, Likes.max),
      comments: getRandomElement(COMMENTS)
    }
    photos.push(photosData);
  }
}
getPhotos();
console.log(photos)
var makeElement = function () {
  for (var j = 0; j < photos.length; j++) {
    var element = template.cloneNode(true);
    template.querySelector('.picture__img').src = photos[j].url;
    template.querySelector('.picture__comments').textContent = photos[j].comments;
    template.querySelector('.picture__likes').textContent = photos[j].likes;
    photosFragment.appendChild(element);
    console.log(element)
  }
  cards.appendChild(photosFragment)

}
makeElement();

