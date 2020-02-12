'use strict';


var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
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
    comments: getRandomElement(COMMENTS),
    description: getRandomElement(DESCRIPTIONS),
  };
}

var makeElement = function (tagName, className, text) {
  var element = document.createElement(tagName);
  element.classList.add(className);
  if (text) {
    element.textContent = text;
  }
  return element;
};

var createCard = function (photo) {
  var photoItem = makeElement('a', 'picture');

  var picture = makeElement('img', 'picture__img');
  picture.src = photo.imgUrl;
  picture.alt = photo.text;
  photoItem.appendChild(picture);

  return photoItem;
};

var cards = document.querySelectorAll('.pictures');

var template = document.querySelector('#picture').content.querySelector('a');

for (var j = 0; j < 25; j++) {
  var element = template.cloneNode(true);
  element.children[0].textContent = j;
  cards[1].appendChild(element);
}
