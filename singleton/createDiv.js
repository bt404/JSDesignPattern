var createDiv = (function() {
    var instance = null;        // 闭包提供作用于封装instance变量

    var CreateDiv = function(html) {
        if (instance) {
            return instance;
        }
        this.html = html;
        this.init();
        return instance = this;
    };

    CreateDiv.prototype.init = function() {
        console.log('create ' + this.html);
    };

    return CreateDiv;   // 返回一个加工过的构造函数，因为要使用new创建，所以考虑用构造函数的方式
})();

var a = new createDiv('div A');
var b = new createDiv('div B');

console.log(a === b);
