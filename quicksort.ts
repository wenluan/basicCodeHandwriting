function quickSort(arr) {
  partition(arr, 0, arr.length - 1);
  return arr;
}

function partition(arr, lo, hi) {
  if (lo >= hi) return; // 递归跳出条件，能够直接求解的子问题
  const pivot = arr[hi];
  let i = lo;
  for (let j = lo; j < hi; j++) {
    if (arr[j] <= pivot) {
      swap(arr, i, j) // 交换 
      i++;
    }
  }
  swap(arr, i, hi);
  partition(arr, lo, i - 1);
  partition(arr, i + 1, hi);
}

function swap(arr, i, j) {
  let tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

const arr2 = [2, 5, 3, 1, 7];
console.log(quickSort(arr2));
