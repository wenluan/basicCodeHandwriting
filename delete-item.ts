const deleteItem = (arr: number[], num: number): number[] => {
    for (let i = 0; i < arr.length; i ++) {
        const item = arr[i];
        if (item === num) {
            console.log(arr, i);
            arr.splice(i, 1);
            i--;
        }
    }

    return arr;
}

const arr = deleteItem([1, 1, 2, 2, 3, 2], 2);
console.log(arr);