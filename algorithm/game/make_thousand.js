let makeThousands = data => {
    if (Number(data)) {
        let items = data.toString().split('.');
        let length = items[0].length;
        let times = Math.floor(length / 3);
        let count = length % 3 === 0 ? times - 1 : times;
        items[0] = items[0].split('');
        for (let i = 0; i < count; ++i) {
            items[0].splice(-(i + 1) * 3 - i, 0, ',');
        }
        items[0] = items[0].join('');
        return items.join('.');
    }
};

let makeThousands2nd = data => {
    if (Number(data)) {
        let items = data.toString().split('.');
        let temp = items[0];
        let i = temp.length;
        let ret = [];
        for (; i >= 3; i -= 3) {
            ret.push(temp.substr(i - 3, 3));
        }
        if (i > 0) {
            ret.push(temp.substr(0, i));
        }
        items[0] = ret.reverse().join(',');
        return items.join('.');
    }
};

console.log(makeThousands(-1234256789));
console.log(makeThousands2nd(-1234256789));

console.log('');

console.log(makeThousands(-1234256.789));
console.log(makeThousands2nd(-1234256.789));

