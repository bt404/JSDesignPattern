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

for (var i = 0; i < 1000; ++i) {
    throttle(function(){
        console.log(1);
    }, 1000);
}
