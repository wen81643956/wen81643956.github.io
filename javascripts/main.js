'use strict';

window.onload = function () {
  var container = document.getElementById('container-img');
  var list = document.getElementById('list');
  var buttons = document.getElementById('buttons');
  var prev = document.getElementById('prev');
  var next = document.getElementById('next');

  next.onclick = function () {
    list.style.left = parseInt(list.style.left) - 600 + 'px';
    console.log(list.style.left);
  };
};