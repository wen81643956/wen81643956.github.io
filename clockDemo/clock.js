var dom = document.getElementById('clock');
var ctx = dom.getContext('2d');
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width / 2;
var rem = width / 200;

function drawBackground() {
  ctx.save();
  ctx.translate(r, r);
  ctx.beginPath();
  ctx.lineWidth = 10 * rem;
  ctx.arc(0, 0, r - ctx.lineWidth / 2, 0, 2 * Math.PI, false);
  ctx.stroke();

  var hours = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
  ctx.font = 18 * rem + 'px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  hours.forEach(function (idx, val) {
    var rad = 2 * Math.PI / 12 * val;
    var x = Math.cos(rad) * (r - 30 * rem);
    var y = Math.sin(rad) * (r - 30 * rem);
    ctx.fillText(idx.toString(), x, y);
  })

  for (var i = 0; i < 60; i++) {
    var rad = 2 * Math.PI / 60 * i;
    var x = Math.cos(rad) * (r - 18 * rem);
    var y = Math.sin(rad) * (r - 18 * rem);
    ctx.beginPath();
    ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);
    if (i % 5 === 0) {
      ctx.fillStyle = 'black';
    } else {
      ctx.fillStyle = '#ccc';
    }
    ctx.fill();
  }

}

function drawHour(hour, mintues) {
  ctx.save();
  ctx.beginPath();
  ctx.rotate(2 * Math.PI / 12 * (hour + mintues / 60));
  ctx.lineWidth = 6 * rem;
  ctx.lineCap = 'round';
  ctx.moveTo(0, 10 * rem);
  ctx.lineTo(0, -r / 2);
  ctx.stroke();
  ctx.restore();
}

function drawMinutes(minutes, seconds) {
  ctx.save();
  ctx.beginPath();
  ctx.rotate(2 * Math.PI / 60 * (minutes + seconds / 60));
  ctx.lineWidth = 3 * rem;
  ctx.lineCap = 'round';
  ctx.moveTo(0, 10 * rem);
  ctx.lineTo(0, -r + 30 * rem);
  ctx.stroke();
  ctx.restore();
}

function drawSeconds(seconds) {
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = '#c14543';
  ctx.rotate(2 * Math.PI / 60 * seconds);
  ctx.moveTo(-2 * rem, 20 * rem);
  ctx.lineTo(2 * rem, 20 * rem);
  ctx.lineTo(1, -r + 18 * rem);
  ctx.lineTo(-1, -r + 18 * rem);
  ctx.fill();
  ctx.restore();
}

function drawDot() {
  ctx.beginPath();
  ctx.arc(0, 0, 3 * rem, 0, 2 * Math.PI, false);
  ctx.fillStyle = '#fff';
  ctx.fill();
}

function draw() {
  setInterval(function () {
    ctx.clearRect(0, 0, width, height);
    drawBackground();
    var data = new Date();
    drawHour(data.getHours(), data.getMinutes());
    drawMinutes(data.getMinutes(), data.getSeconds());
    drawSeconds(data.getSeconds());
    drawDot();
    ctx.restore();
  },1000);
}

draw();