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

console.log(makeThousands(-1234256789));
console.log(makeThousands(-1234256.789));

