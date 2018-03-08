/*
  删除一个字符串中出现次数最少的字符
 */
function deleteMinChar (str) {
  let min = Infinity,
      temp = {},
      ret = '';

  for (let i = 0; i < str.length; ++i) {
    if (temp[str[i]]) {
      ++temp[str[i]];
    } else {
      temp[str[i]] = 1;
    }
  }

  for (let key in temp) {
    if (temp[key] < min) {
      min = temp[key];
    }
  }

  for (let i = 0; i < str.length; ++i) {
    if (temp[str[i]] !== min) {
      ret += str[i];
    }
  }
  return ret;
}

console.log(deleteMinChar('aabbcccddd'));
