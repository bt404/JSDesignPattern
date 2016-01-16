// AOP 编程使用继承的方式实现

class Component {
  constructor() {
  }

  doWork() {
  }
}


let log = (Target) => {
  return class extends Target {
    doWork() {
      console.log('do some extra work');
      super.doWork();
      console.log('do some extra work');
    }
  }
}

let create = function(Class, extensions) {
  let TargetClass = extensions.reduce((Raw, extension) => extension(Raw), Class);
  return new TargetClass();
}

let foo = create(Component, [log]);
foo.doWork();
