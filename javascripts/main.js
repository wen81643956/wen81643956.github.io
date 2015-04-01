'use strict';

window.onload = function () {
  var container = document.getElementById('container-img');
  var list = document.getElementById('list');
  var buttons = document.getElementById('buttons').getElementsByTagName('span');
  var prev = document.getElementById('prev');
  var next = document.getElementById('next');
  var index = 1;

  function showButton() {
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].className = '';
    }
    buttons[index - 1].className = 'on';
  }

  function animate(offset) {
    var time = 300;
    var interval = 10;
    var speed = offset / (time / interval);

    function go() {
      if ((speed < 0 && offset < 0 ) || (speed > 0 && offset > 0)) {
        list.style.left = parseInt(list.style.left) + speed + 'px';
        offset -= speed;
        setTimeout(go, interval);
      }
      else {
        list.style.left = parseInt(list.style.left) + offset + 'px';

        if (parseInt(list.style.left) <= (-600 * 6)) {
          list.style.left = -600 + 'px';
        }
        if (parseInt(list.style.left) >= 0) {
          list.style.left = (-600 * 5) + 'px';
        }
      }
    }

    go();
  }

  next.onclick = function () {
    index++;
    if (index > 5) {
      index = 1;
    }
    showButton();
    animate(-600);
  };

  prev.onclick = function () {
    index--;
    if (index < 1) {
      index = 5;
    }
    showButton();
    animate(600);
  };

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function () {
      if (this.className == 'on') {
        return;
      }
      var myIndex = parseInt(this.getAttribute('index'));
      var offset = -600 * (myIndex - index);
      index = myIndex;
      showButton();
      animate(offset);
    }
  }
//  setInterval(function() {
//    animate(-600,1)
//  },2000)
};