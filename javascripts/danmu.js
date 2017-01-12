var context = document.getElementById('context');
var t1 = document.getElementById('t1');
var position = 800;
var speed = 50;

function marquee() {
  if(t1.style.left.replace('px','') < -30) {
    clearInterval(time);
  }else {
    console.log(t1.style.left);
    t1.style.left = t1.style.left.replace('px','') - 5 + 'px';
  }
}
var time = setInterval(marquee,speed);

