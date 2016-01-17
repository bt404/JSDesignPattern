/* 通过引入代理，将instance的结构和初始化，与创建单例这两个逻辑
 * 分离开来。此处代理仅负责创建单例。
 */

var DivNode = function(html) {
    this.html = html;
    this.init();
};

DivNode.prototype.init = function() {
    console.log('create ' + this.html);
};

var ProxySingleton = (function() {
    var instance = null;

    return function(html) {// 闭包的用法，创建作用域，返回一个函数替代正常写法中返回的函数。
        if (!instance) {
            instance = new DivNode(html);
        }
        return instance;
    }
})();

var a = new ProxySingleton('div a');
var b = new ProxySingleton('div b');

console.log(a === b);
