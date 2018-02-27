'use strict';

function swap (data, i, j) {
  let temp = data[i];
  data[i] = data[j];
  data[j] = temp;
}

function maxHeapify (data, i, length) {
  let largest = i, left = 2*i+1, right = 2*i+2;
  if (left < length && data[i] < data[left]) {
    largest = left;
  }
  if (right < length && data[largest] < data[right]) {
    largest = right;
  }
  if (i != largest) {
    swap(data, i, largest);
    maxHeapify(data, largest, length);
  }
}

function buildMaxHeap (data) {
  let last = Math.floor(data.length / 2 - 1);
  for ( ; last >= 0; last--) {
    maxHeapify(data, last, data.length);
  }
}

function maxHeapSort (data) {
  buildMaxHeap(data);
  for (let i = data.length-1; i > 0; i--) {
    swap(data, 0, i);
    maxHeapify(data, 0, i);
  }
}

var data = [5, 3, 6, 1, 7, 10, 9, 2, 8, 101, 4];

maxHeapSort(data);

console.log(data);
