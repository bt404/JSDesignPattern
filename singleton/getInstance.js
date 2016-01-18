var Singleton = function(name) {
    this.name = name;
    //this.instance = null; // 没有实际意义
};

Singleton.prototype.getName = function() {
    console.log(this.name);
};

Singleton.getInstance = function(name) {
    if (!this.instance) {// 实际的单例是绑定在Singleton上的
        this.instance = new Singleton(name);
    }
    return this.instance;
};

var a = Singleton.getInstance('ins a');
var b = Singleton.getInstance('ins b');

a.getName();
b.getName();

console.log(a.instance);            // null
console.log(Singleton.instance);

console.log(a === b);
