'use strict';

window.onload = function () {
  /*
   用dom获取各个节点的id
   container：容器id
   list：图片列表id
   buttons：下方按钮组id
   prev：向左箭头id
   next：向右箭头id
   index：记录当前按钮索引值
   len：图片的个数
   animated：控制是否开启自动播放
   timer：定时器
   */
  var container = document.getElementById('container-img');
  var list = document.getElementById('list');
  var buttons = document.getElementById('buttons').getElementsByTagName('span');
  var prev = document.getElementById('prev');
  var next = document.getElementById('next');
  var index = 1;
  var len = 5;
  var animated = false;
  var timer;

  /*
   下方的按钮切换效果
   将原先按钮被选中的样式消除，
   并在当前选择的按钮添加选中的样式
   */
  function showButton() {
    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i].className == 'on') {
        buttons[i].className = '';
        break;
      }
    }
    buttons[index - 1].className = 'on';
  }

  /*
   图片切换的动画效果
   */
  function animate(offset) {

    //当图片的位移量=0时说明图片没有做变化，直接返回。
    if (offset == 0) {
      return;
    }

    animated = true; //动画效果开始为true
    var time = 300;  //设置图片切换动画切换时间
    var interval = 10; //设置次数
    var speed = offset / (time / interval); //算出图片偏移速度
    var left = parseInt(list.style.left) + offset; //图片偏移后的值


    /*
     控制图片偏移
     1.根据speed和位移值判断出向左还是向右
     2.控制当图片到最左的时候下一次位移到达最右的图
     3.控制当图片到最右的时候下一次位移到达最左的图
     */
    var go = function () {
      if ((speed > 0 && parseInt(list.style.left) < left ) || (speed < 0 && parseInt(list.style.left) > left)) {
        list.style.left = parseInt(list.style.left) + speed + 'px';
        setTimeout(go, interval);
      }
      else {
        list.style.left = left + 'px';
        if (left < (-600 * len)) {
          list.style.left = '-600px';
        }
        if (left > -200) {
          list.style.left = -600 * len + 'px';
        }
        animated = false;
      }
    };

    go();
  }

  /*
   设置定时器
   */
  function play() {
    timer = setTimeout(function () {
      next.onclick();
      play();
    }, 3000);
  }

  /*
   停止定时器
   */
  function stop() {
    clearInterval(timer);
  }

  /*
   下一张图片
   */
  next.onclick = function () {
    if (animated) {
      return;
    }
    index++;
    if (index > 5) {
      index = 1;
    }
    animate(-600);
    showButton();
  };

  /*
   上一张图片
   */
  prev.onclick = function () {
    if (animated) {
      return;
    }
    index--;
    if (index < 1) {
      index = 5;
    }
    animate(600);
    showButton();
  };

  /*
   控制图片下方按钮的显示
   */
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function () {
      if (animated) {
        return;
      }
      if (this.className == 'on') {
        return;
      }
      var myIndex = parseInt(this.getAttribute('index'));
      var offset = -600 * (myIndex - index);
      animate(offset);
      index = myIndex;
      showButton();
    }
  }

  container.onmouseover = stop;
  container.onmouseout = play;

  play();
};