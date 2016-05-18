function debounce (fn, delay) {
    let timer = null;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    }
}

window.addEventListener('scroll', debounce(function() {
    console.log('scrolled');
}), 500);
