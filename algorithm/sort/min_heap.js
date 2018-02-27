function swap (con, i, j) {
  let temp = con[i];
  con[i] = con[j];
  con[j] = temp;
}

function minHeapify (con, i, length) {
  let small = i,
      left = 2 * i + 1,
      right = 2 * i + 2;
  if (left < length && con[i] > con[left]) {
    small = left;
  }
  if (right < length && con[small] > con[right]) {
    small = right;
  }
  if (small !== i) {
    swap(con, i, small);
    minHeapify(con, small, length);
  }
}

function buildMinHeap (con) {
  for (let last = Math.floor(con.length / 2 - 1); last >=0; --last) {
    minHeapify(con, last, con.length);
  }
}

function heapSort (con) {
  buildMinHeap(con);
  for (let i = con.length - 1; i > 0; --i) {
    swap(con, 0, i);
    minHeapify(con, 0, i);
  }
}

let con = [5, 3, 6, 1, 7, 10, 9, 2, 8, 101, 4];

heapSort(con);

console.log(con);
