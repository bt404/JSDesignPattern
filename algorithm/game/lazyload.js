var lazyload = (function () {
  const DEFAULT_SRC = '';
  const THRESHOLD = 1.8;
  let items = [];
  function debounce () {}

  function init () {
    for (let item of Array.from(document.getElementsByClassName('.lazy'))) {
      items.push({
        el: item,
        y: getPosition(item);
      });
    }
    window.addEventListener('scroll', debounce(handler));
    window.addEventListener('wheel', debounce(handler));
  }

  function render (item) {
    const el = item.el;
    let src = el.getAttribute('data-src') || DEFAULT_SRC;
    el.onload = function () {
      let index = items.indexOf(item);
      items.splice(i, 1);
      el.classList.remove('lazy');
    }
    el.setAttribute('src', src);
  }

  function checkInViewport (item) {
    let windowHeight = document.documentElement.clientHeight || window.innerHeight;
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

    const height = (windowHeight + scrollTop) * window.devicePixelRatio * THRESHOLD;
    if (item.y < height) {
      render(item);
    }
  }

  function getPosition (el) {
    let top = el.offsetTop;
    const height = el.offsetHeight;
    el = el.offsetParent;
    while (el) {
      top += el.offsetTop;
      el = el.offsetParent;
    }
    return (top + height) * window.devicePixelRatio;
  }

  function handler () {
    for (let item of items) {
      checkInViewport(item);
    }
  }

})();
