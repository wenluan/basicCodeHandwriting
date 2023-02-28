/** 二分查找数组中单一的数 */
/** [1, 1, 2, 3, 3, 4, 4, 5, 5] */

export const findSingle = (arr: number[]): number => {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        
    }
    return arr[left];
}

const nextPart = (arr: number[], left: number, right: number) => {
    const middle = Math.ceil((left + right) / 2);
    if (left >= right) {
        return null;
    }
    const pre = arr[middle - 1];
    const mid = arr[middle];
    const next = arr[middle + 1];
    if (pre !== mid && next !== mid) {
        return null;
    }
    if (pre === mid) {

    }
    const isLeft = pre === mid ? (middle - 1) % 2 === 0 : middle % 2 === 0;
    return isLeft ? {
        left,
        right: middle - 2,
    } : {
        left: middle + 2,
        right,
    }
}

const arr = [1, 1, 2, 3, 3, 4, 4, 5, 5];
console.log(findSingle(arr));