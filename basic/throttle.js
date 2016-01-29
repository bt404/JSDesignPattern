var throttle = function(fn, interval) {
    var timer,
        firsttime = true;

    return function() {
        var __me = this;
        
        if (firsttime) {
            fn.apply(__me, arguments);
            return firsttime = false;
        }

        if (timer) {
            return false;
        }

        timer = setTimeout(function () {
            clearTimeout(timer);
            timer = null;
            fn.apply(__me, arguments);
        }, interval || 1000);
    };
};

var foo = throttle(function(){console.log(arguments[0]);}, 10);

