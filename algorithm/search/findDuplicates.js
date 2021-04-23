function findDuplicates (con) {
    let ret = [];
    for (let item of con) {
        let temp = Math.abs(item);
        if (con[temp-1] < 0) {
            ret.push(temp);
        } else {
            con[temp-1] *= -1;
        }
    }
    return ret;
}

let con = [1, 2, 3, 2, 3, 4, 5];
console.log(findDuplicates(con));
