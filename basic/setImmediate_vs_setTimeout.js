const fs = require('fs');

// 执行顺序确定，setImmediate 先执行
fs.readFile('./ajax_test.js', () => {
  setTimeout(() => {
    console.log('setTimeout');
  }, 0);

  setImmediate(() => {
    console.log('setImmediate');
  });
});

// 执行顺序不定
// setTimeout(() => {
//   console.log('setTimeout');
// }, 0);

// setImmediate(() => {
//   console.log('setImmediate');
// });
