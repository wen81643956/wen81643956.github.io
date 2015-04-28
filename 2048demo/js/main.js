'use stricts';

var board = new Array();
var score = 0;
var hasConflicted = new Array();

$(document).ready(function () {
  prepearForMobile();
  newGame();
});

function prepearForMobile() {
  $('#grid-contrainer').css('width', '80px');
  $('#grid-contrainer').css('height', '80px');
  $('#grid-contrainer').css('padding', '15px');

  $('#grid-cell').css('width','80px');
  $('#grid-cell').css('height','80px')
}

//捕获键盘事件
$(document).keydown(function (event) {
  switch (event.keyCode) {
    case 37: //left
      if (moveLeft()) {
        setTimeout('randomNumber()', 210);
        setTimeout('isGameOver()', 300);
      }
      break;
    case 38: //up
      if (moveUp()) {
        setTimeout('randomNumber()', 210);
        setTimeout('isGameOver()', 300);
      }
      break;
    case 39: //right
      if (moveRight()) {
        setTimeout('randomNumber()', 210);
        setTimeout('isGameOver()', 300);
      }
      break;
    case 40: //down
      if (moveDown()) {
        setTimeout('randomNumber()', 210);
        setTimeout('isGameOver()', 300);
      }
      break;
    default: //default
      break;
  }
});
function newGame() {
  //初始化布局
  init();
  //随机生成2个数字
  randomNumber();
  randomNumber();
}

function init() {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      //绘制方格坐标
      var gridCell = $('#grid-cell-' + i + '-' + j);
      gridCell.css('top', calX(i));
      gridCell.css('left', calY(j));
    }
  }

  for (var i = 0; i < 4; i++) {
    board[i] = new Array();
    hasConflicted[i] = new Array();
    for (var j = 0; j < 4; j++) {
      board[i][j] = 0;
      hasConflicted[i][j] = false;
    }
  }

  updateBoardView();

  score = 0;
}

//刷新变动过得图形
function updateBoardView() {
  $('.number-cell').remove();
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      $('#grid-container').append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
      var theNumberCell = $('#number-cell-' + i + '-' + j);

      //数字为0不显示
      if (board[i][j] == 0) {
        theNumberCell.css('width', '0px');
        theNumberCell.css('height', '0px');
        theNumberCell.css('top', calX(i) + 40);
        theNumberCell.css('left', calY(j) + 40);
      }
      //显示数字，设置背景色和字体颜色
      else {
        theNumberCell.css('width', '80px');
        theNumberCell.css('height', '80px');
        theNumberCell.css('top', calX(i));
        theNumberCell.css('left', calY(j));
        theNumberCell.css('background-color', getBackground(board[i][j]));
        theNumberCell.css('color', getNumber(board[i][j]));
        theNumberCell.css('cursor', 'pointer');
        theNumberCell.text(board[i][j]);
      }

      hasConflicted[i][j] = false;
    }
  }
}

//更新分数
function updateScore(score) {
  $('#score').html(score);
}
//在格子上随机生成2或者4的数字
function randomNumber() {
  if (arrayFull(board)) {
    return false;
  }
  //随机一个位置
  var ranX = parseInt(Math.floor(Math.random() * 4));
  var ranY = parseInt(Math.floor(Math.random() * 4));

  //判断随机的位置是否已经有数字
  var times = 0;
  while (times < 50) {
    if (board[ranX][ranY] == 0) {
      break;
    }
    ranX = parseInt(Math.floor(Math.random() * 4));
    ranY = parseInt(Math.floor(Math.random() * 4));
    times++;
  }

  if (times == 50) {
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        if (board[i][j] == 0) {
          ranX = i;
          ranY = j;
        }
      }
    }
  }

  //随机一个数字
  var ranNum = parseInt(Math.random() * 2) == 1 ? 2 : 4;
  //在随机位置显示随机数字
  board[ranX][ranY] = ranNum;
  showNumber(ranX, ranY, ranNum);
  return true;
}

//动画效果生成数字
function showNumber(i, j, number) {
  var numberCell = $('#number-cell-' + i + '-' + j);
  numberCell.css('background-color', getBackground(number));
  numberCell.css('color', getNumber(number));
  numberCell.text(number);

  numberCell.animate({
    width: '80px',
    height: '80px',
    top: calX(i),
    left: calY(j)
  }, 50);
}

//左移动
function moveLeft() {
  if (!canMoveLeft(board)) {
    return false;
  }

  for (var i = 0; i < 4; i++) {
    for (var j = 1; j < 4; j++) {
      if (board[i][j] != 0) {
        for (var k = 0; k < j; k++) {
          if (board[i][k] == 0 && noBlockH(i, j, k, board)) {
            showMoveAnimation(i, j, i, k);
            board[i][k] = board[i][j];
            board[i][j] = 0;
            continue;
          }
          else if (board[i][k] == board[i][j] && noBlockH(i, j, k, board) && !hasConflicted[i][k]) {
            showMoveAnimation(i, j, i, k);
            board[i][k] += board[i][j];
            board[i][j] = 0;
            score += board[i][k];
            hasConflicted[i][k] = true;
            updateScore(score);
            continue;
          }
        }
      }
    }
  }
  setTimeout('updateBoardView()', 200);
  return true;
}

//上移
function moveUp() {
  if (!canMoveUp(board)) {
    return false;
  }

  for (var j = 0; j < 4; j++) {
    for (var i = 1; i < 4; i++) {
      if (board[i][j] != 0) {
        for (var k = 0; k < i; k++) {
          if (board[k][j] == 0 && noBlockV(j, i, k, board)) {
            showMoveAnimation(i, j, k, j);
            board[k][j] = board[i][j];
            board[i][j] = 0;
            continue;
          }
          else if (board[k][j] == board[i][j] && noBlockV(j, i, k, board) && !hasConflicted[k][j]) {
            showMoveAnimation(i, j, k, j);
            board[k][j] += board[i][j];
            board[i][j] = 0;
            score += board[k][j];
            hasConflicted[k][j] = true;
            updateScore(score);
            continue;
          }
        }
      }
    }
  }
  setTimeout('updateBoardView()', 200);
  return true;
}

//右移
function moveRight() {
  if (!canMoveRight(board)) {
    return false;
  }
  for (var i = 0; i < 4; i++) {
    for (var j = 2; j >= 0; j--) {
      if (board[i][j] != 0) {
        for (var k = 3; k > j; k--) {
          if (board[i][k] == 0 && noBlockH(i, k, j, board)) {
            showMoveAnimation(i, j, i, k);
            board[i][k] = board[i][j];
            board[i][j] = 0;
            continue;
          }
          else if (board[i][k] == board[i][j] && noBlockH(i, k, j, board) && !hasConflicted[i][k]) {
            showMoveAnimation(i, j, i, k);
            board[i][k] += board[i][j];
            board[i][j] = 0;
            score += board[i][k];
            hasConflicted[i][k] = true;
            updateScore(score);
            continue;
          }
        }
      }
    }
  }

  setTimeout('updateBoardView()', 200);
  return true;
}

//下移
function moveDown() {
  if (!canMoveDown(board)) {
    return false;
  }

  for (var j = 0; j < 4; j++) {
    for (var i = 2; i >= 0; i--) {
      if (board[i][j] != 0) {
        for (var k = 3; k > i; k--) {
          if (board[k][j] == 0 && noBlockV(j, k, i, board)) {
            showMoveAnimation(i, j, k, j);
            board[k][j] = board[i][j];
            board[i][j] = 0;
            continue;
          }
          else if (board[k][j] == board[i][j] && noBlockV(j, k, i, board) && !hasConflicted[k][j]) {
            showMoveAnimation(i, j, k, j);
            board[k][j] += board[i][j];
            board[i][j] = 0;
            score += board[k][j];
            hasConflicted[k][j] = true;
            updateScore(score);
            continue;
          }
        }
      }
    }
  }
  setTimeout('updateBoardView()', 200);
  return true;
}

//判断是否可以向左移动
function canMoveLeft(board) {
  for (var i = 0; i < 4; i++) {
    for (var j = 1; j < 4; j++) {
      if (board[i][j] != 0) {
        if (board[i][j - 1] == 0 || board[i][j] == board[i][j - 1]) {
          return true;
        }
      }
    }
  }
  return false;
}

//判断是否可以向右移动
function canMoveRight(board) {
  for (var i = 0; i < 4; i++) {
    for (var j = 2; j >= 0; j--) {
      if (board[i][j] != 0) {
        if (board[i][j + 1] == 0 || board[i][j] == board[i][j + 1]) {
          return true;
        }
      }
    }
  }
  return false;
}

//判断是否可以向上移动
function canMoveUp(board) {
  for (var j = 0; j < 4; j++) {
    for (var i = 1; i < 4; i++) {
      if (board[i][j] != 0) {
        if (board[i - 1][j] == 0 || board[i][j] == board[i - 1][j]) {
          return true;
        }
      }
    }
  }
  return false;
}

//判断是否可以向下移动
function canMoveDown(board) {
  for (var j = 0; j < 4; j++) {
    for (var i = 2; i >= 0; i--) {
      if (board[i][j] != 0) {
        if (board[i + 1][j] == 0 || board[i][j] == board[i + 1][j]) {
          return true;
        }
      }
    }
  }
  return false;
}

//数字移动动画
function showMoveAnimation(fromX, fromY, toX, toY) {
  var numberCell = $('#number-cell-' + fromX + '-' + fromY);
  numberCell.animate({
    top: calX(toX),
    left: calY(toY)
  }, 200);
}
//判断是否游戏结束
function isGameOver() {
  if (arrayFull(board) && noMove(board)) {
    gameOver();
  }
}

//判断是否能移动
function noMove(board) {
  if (canMoveUp(board) || canMoveRight(board) || canMoveDown(board) || canMoveLeft(board)) {
    return false;
  }
  return true;
}

//游戏结束
function gameOver() {
  if (confirm("游戏结束,是否要重新开始")) {
    newGame();
  }

}

//判断数字水平移动过程中是否障碍物
function noBlockH(row, col1, col2, board) {
  for (var i = col2 + 1; i < col1; i++) {
    if (board[row][i] != 0) {
      return false;
    }
  }
  return true;
}

//判断数字垂直移动过程中是否障碍物
function noBlockV(col, row1, row2, board) {
  for (var i = row2 + 1; i < row1; i++) {
    if (board[i][col] != 0) {
      return false;
    }
  }
  return true;
}

//判断格子是否被占满
function arrayFull(board) {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (board[i][j] == 0)
        return false;
    }
  }
  return true;
}

//根据不同的数字显示不同的背景色
function getBackground(board) {
  switch (board) {
    case 2:
      return '#eee4da';
      break;
    case 4:
      return '#ede0c8';
      break;
    case 8:
      return '#f2b197';
      break;
    case 16:
      return '#f59563';
      break;
    case 32:
      return '#f67c5f';
      break;
    case 64:
      return '#f65e3b';
      break;
    case 128:
      return '#edcf72';
      break;
    case 256:
      return '#edcc61';
      break;
    case 512:
      return '#9c0';
      break;
    case 1024:
      return '#33b5e5';
      break;
    case 2048:
      return '#09c';
      break;
    case 4096:
      return '#a6c';
      break;
    case 8192:
      return '#93c';
      break;
  }
  return 'black';
}

//数字小于4字体为#776e65，其他均为白色
function getNumber(number) {
  if (number <= 4) {
    return '#776e65';
  }
  else
    return 'white';
}

//计算top值
function calX(i) {
  return i * 100 + 20;
}

//计算left值
function calY(j) {
  return j * 100 + 20;
}

