function multicast (fn) {
    return function (list, ...args) {
        if (Array.isArray(list)) {
            return list.map(item => fn.apply(this, [item, ...args]));
        } else {
            return fn.apply(list, ...args);
        }
    }
}

function setColor (el, color) {
    el.style.color = color;
}

var children = document.querySelectorAll('li:nth-child(2n+1)');
setColor(Array.from(children), 'red');
