/* 
    最终传入数组中，每个元素本身包含两层含义：
    1. 是否为负：为负表示之前出现过，但该负值的绝对值与出现过的值大小无关；
    2. 绝对值：该值的绝对值就是取反前，该位置实际存储的值，每轮循环前把他用绝对值还原，得到原有元素继续寻找负值，判断当前元素是否出现过；
*/

function findDuplicates (con) {
    let ret = [];
    for (let item of con) {
        let originItem = Math.abs(item);
        if (con[originItem-1] < 0) {
            ret.push(originItem);
        } else {
            con[originItem-1] *= -1;
        }
    }
    return ret;
}

let con = [1, 2, 3, 2, 3, 4, 5];
console.log(findDuplicates(con));
