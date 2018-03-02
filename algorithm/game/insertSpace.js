function spit (str) {
  str = str.toString();
  let ret = [];
  let i = 0;
  for (; i < str.length; i += 4) {
    ret.push(str.substr(i, 4));
  }
  if (i < str.length - 1) {
    ret.push(str.substr(i));
  }

  return ret.join(' ');
}

console.log(spit('asdfasdfasdfasdfasdfaksj234'));
