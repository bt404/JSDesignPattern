let p1 = {
  then: (resolve) => {
    setTimeout(() => resolve(1), 4000);
  }
};

let p2 = {
  then: (resolve) => {
    setTimeout(() => resolve(2), 2000);
  }
};

let p3 = {
  then: (resolve) => {
    setTimeout(() => resolve(3), 1000);
  }
};

function getPromise (id) {
  return function () {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(id), Math.random() * 1000);
    });
  }
}

let tasks = [
  Promise.resolve(getPromise(2)()),
  Promise.resolve(getPromise(1)()),
  Promise.resolve(getPromise(3)())
];


// 顺序执行数组中的 Promise
function sequence (tasks) {
  tasks.reduce((prev, cur) => {
    return prev.then(() => {
      return cur;
    })
    .then((val) => console.log(val));
  }, Promise.resolve())
  .then(() => console.log('all done'));
}

sequence(tasks);

Promise.all(tasks).then((data) => console.log(data));
