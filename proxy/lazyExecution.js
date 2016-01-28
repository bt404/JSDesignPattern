/*
 * 使用代理模式实现缓存命令，先在proxy提供的接口中缓存执行的操作，
 * 然后在真正的脚本加载完成后，使用本体中定义的函数重新执行缓存的操作
 */

var miniConsole = (function () {
  var cache = [];

  var handler = function (ev) {
    if (ev.key === 113) {
      var script = document.createElement('script');
      script.src = 'miniConsole.js';

      script.onload = function () {
        for (var i = 0, fn; fn = cache[i++]; ) {
          fn();
        }
      }

      document.getElementsByTagName('head')[0].appendChild(script);
      document.body.removeEventListener('keydown', handler);
    }
  };

  document.body.addEventListener('keydown', handler, false);

  return {
    log: function () {
      cache.push(function(){ miniConsole.log.apply(miniConsole, arguments); });
    }
  }
})();

miniConsole.log(1);

// miniConsole.js 文件

miniConsole = {
  log: function () {
    // 代码逻辑
  }
}
