const BLACK = 'black';
const RED = 'red';

function Node (value) {
  this.value = value;
  this.parent = null;
  this.left = null;
  this.right = null;
  this.color = RED;
}

Node.prototype.parent = function () {
  return this.parent;
}

Node.prototype.grandfather = function () {
  return this.parent && this.parent.parent || null;
}

Node.prototype.uncle = function () {
  let grandfather = this.parent && this.parent.parent || null;
  if (!grandfather) {
    return null;
  } else if (this.parent === grandfather.left) {
    return grandfather.right;
  } else {
    return grandfather.left;
  }
}

let bst = (function () {
  var rootNode = null;

  function insertNode (node, value) {
    if (node.value >= value) {
      if (node.left) {
        insertNode(node.left, value);
      } else {
        let temp = new Node(value);
        temp.parent = node;
        node.left = temp;
        insertCase(temp);
      }
    } else {
      if (node.right) {
        insertNode(node.right, value);
      } else {
        let temp = new Node(value);
        temp.parent = node;
        node.right = temp;
        insertCase(temp);
      }
    }
  }

  /*
    添加元素分为以下4种情况：
    1. 如果根元素，直接置黑；
    2. 如果父元素为黑，不作处理；
    3. 如果父元素为红：
      * 如果叔父为红
      * 叔父为黑或不存在，当前元素和父元素构成的二连红形状：
        - 拐角型：旋转当前元素，对下降元素递归
        - 直线型：修改父元素和祖父元素颜色，旋转父元素
   */
  function insert (value) {
    if (rootNode) {
      insertNode(rootNode, value);
    } else {
      rootNode = new Node(value);
      rootNode.color = BLACK;
    }
    // console.log(rootNode);
  }

  // 这里实现的旋转，均是将参数元素上提一层，父元素下降一层
  function rotateLeft (node) {
    let leftChild = node.left,
        parent = node.parent,
        grandfather = node.grandfather();

    parent.right = leftChild;
    if (leftChild) {
      leftChild.parent = parent;
    }
    node.left = parent;
    parent.parent = node;

    if (parent === rootNode) {
      rootNode = node;
    }
    node.parent = grandfather;
    if (grandfather) {
      if (parent === grandfather.left) {
        grandfather.left = node;
      } else {
        grandfather.right = node;
      }
    }
  }

  function rotateRight (node) {
    let rightChild = node.right,
        parent = node.parent,
        grandfather = node.grandfather();

    parent.left = rightChild;
    if (rightChild) {
      rightChild.parent = parent;
    }
    node.right = parent;
    parent.parent = node;

    if (parent === rootNode) {
      rootNode = node;
    }
    node.parent = grandfather;
    if (grandfather) {
      if (parent === grandfather.left) {
        grandfather.left = node;
      } else {
        grandfather.right = node;
      }
    }
  }

  function insertCase (node) {
    // 根元素直接将元素置黑
    if (!node.parent) {
      rootNode = node;
      node.color = BLACK;
      return;
    }
    // 父元素为黑则不调整
    if (node && node.parent && node.parent.color === RED) {
      let uncle = node.uncle();
      // 叔父为红，则父元素和叔父均改为黑，祖父改为红，对祖父递归
      if (uncle && uncle.color === RED) {
        uncle.color = BLACK;
        node.parent.color = BLACK;
        node.grandfather().color = RED;
        insertCase(node.grandfather());
      } else if (node === node.parent.right && node.parent === node.grandfather().left) {
        // 拐角型二连红，对本身旋转，然后对下降的子元素（原父元素）递归
        rotateLeft(node);
        insertCase(node.left);
      } else if (node === node.parent.left && node.parent === node.grandfather().right) {
        rotateRight(node);
        insertCase(node.right);
      } else if (node === node.parent.left && node.parent === node.grandfather().left) {
        // 直线型二连红，当前元素为下层元素，修改父元素颜色为黑色，改祖父为红色，然后对父元素旋转
        node.parent.color = BLACK;
        node.grandfather().color = RED;
        rotateRight(node.parent);
      } else if (node === node.parent.right && node.parent === node.grandfather().right) {
        node.parent.color = BLACK;
        node.grandfather().color = RED;
        rotateLeft(node.parent);
      }
    }
  }

  function inOrder (node) {
    if (!node) {
      return;
    }
    if (node.left) {
      inOrder(node.left);
    }
    if (node.right) {
      inOrder(node.right);
    }
  }

  function getRoot () {
    return rootNode;
  }

  return {
    insert,
    getRoot,
    inOrder,
  };
})();

bst.insert(1);
bst.insert(7);
bst.insert(2);
bst.insert(6);
bst.insert(10);
bst.insert(4);
bst.insert(5);
bst.insert(8);
bst.insert(7);

bst.inOrder(bst.getRoot());
