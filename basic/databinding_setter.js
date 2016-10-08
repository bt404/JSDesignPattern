/*
 * 使用 setter/getter 实现简单双向绑定
 * <input type="text" id="content" value="init" />
 */

function ViewModel (bindTo) {
    Object.defineProperty(this, 'value', {
        get: () => bindTo.value,
        set: val => bindTo.value = val
    });
}

var obj = new ViewModel(document.getElementById('content')),
    i = 0;

setInterval(() => {
    obj.value = ++i;
}, 1000);

