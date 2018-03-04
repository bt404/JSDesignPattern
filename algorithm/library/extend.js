let extend = function (target, src, isdeep) {
    function isArray (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    }

    function isObject (obj) {
      return Object.prototype.toString.call(obj) === '[object Object]';
    }

    function deepClone (obj) {
      let ret;
      if (isObject(obj)) {
        ret = {};
        for (let key in obj) {
          ret[key] = deepClone(obj[key]);
        }
      } else if (isArray(obj)) {
        ret = [];
        for (let i = 0; i < obj.length; ++i) {
          ret[i] = deepClone(obj[i]);
        }
      } else {
        ret = obj;
      }
      return ret;
    }

    for (let key in src) {
      dest[key] = isdeep ? deepClone(src[key]) : src[key];
    }
};



//let src = {a: {b: 1}, c: 3};
let src = {a: {b: [1, 2]}, c: 3};

let dest = {};

extend(dest, src, true);

console.log(dest);
console.log(dest.a.b === src.a.b);

extend(dest, src, false);

console.log(dest);
console.log(dest.a.b === src.a.b);
