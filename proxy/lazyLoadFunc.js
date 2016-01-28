/*
 * 直接返回函数的形式
 */

var myImage = (function () {
  var img = document.createElement('img');
  document.appendChild(img);

  return function (src) {
    img.src = src;
  }
})();

var proxyImage = (function () {
  var img = new Image();
  img.onload = function () {
    myImage(this.src);
  }

  return function (src) {
    myImage('file://...');
    img.src = src;
  }
})();

proxyImage('http://...');
