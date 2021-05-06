/* 
  判断两个字符串结构是否相同
*/

function stats(str) {
    let temp = {};
    let ret = [];
    for (let i = 0; i < str.length; ++i) {
        if (!temp[str[i]]) {
            temp[str[i]] = i;
        }
        ret.push(temp[str[i]]);
    }

    return ret;
}

function findSameStructure (left, right) {
    let statsLeft = stats(left);
    let statsRight = stats(right);

    return JSON.stringify(statsLeft) === JSON.stringify(statsRight);
}

let left = 'abbaca';
let right = 'deedfd';
let thrid = 'deedfe';
console.log(findSameStructure(left, right));
console.log(findSameStructure(left, thrid));
