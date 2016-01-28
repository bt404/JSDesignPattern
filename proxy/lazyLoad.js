/* 代理模式 */

var myImage = (function () {
  var img = document.createElement('img');
  document.appendChild(img);

  return {
    setSrc: function (src) {
        img.src = src;
    }
  }
})();


var proxyImage = (function () {
  var img = new Image();
  img.onload = function () {
    myImage.setSrc(this.src);
  }

  return {
    setSrc: function (src) {
      myImage.setSrc('file://...');
      img.src = src;
    }
  }
})();

proxyImage.setSrc('http://...');
