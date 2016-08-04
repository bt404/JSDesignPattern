var throttle = function(fn, interval) {
    var timer,
        firsttime = true;

    return function() {
        var __me = this;
        var __args = arguments;
        
        if (firsttime) {
            fn.apply(__me, __args);
            return firsttime = false;
        }

        if (timer) {
            return false;
        }

        timer = setTimeout(function () {
            clearTimeout(timer);
            timer = null;
            fn.apply(__me, __args);
        }, interval || 1000);
    };
};

var foo = throttle(function(){console.log(arguments[0]);}, 10);

foo(1);
foo(2);
setTimeout(function(){foo(3);foo(4);}, 100);

