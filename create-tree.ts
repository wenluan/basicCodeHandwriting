/** 根据数组构建树 */
interface TreeNode {
  children?: null | TreeNode[];
  name: number;
  id: number;
}

let arrP =[
  {name:123, id: 423},
  {name:111, id: 123},
  {name: 222, id: 123},
  {name: 211, id: 222},
  {name: 345, id: 325},
  {name: 444, id: 345},
  {name: 555, id: 444}
];

let tree = [
  {name: 123, id: 423, children: [{name: 111, id: 123}, {name: 222, id: 123, children: [{name: 211, id: 222}]}]},
  {name: 345, id: 325, children: [{name: 444, id: 345, children: [{name: 555, id: 444}]}]}
]

export const createTree = (arr: TreeNode[]) => {
  const result: TreeNode[] = [];
  // map key 是 name， value 是 children 的 id
  const map = new Map<number, TreeNode>();
  arr.forEach((item) => map.set(item.name, item));
  for (let i = 0; i < arr.length; i ++) {
    const { id } = arr[i];

    if (map.has(id)) {
      const children = map.get(id).children;
      if (!children) {
        map.get(id).children = [arr[i]]
      } else {
        children.push(arr[i]);
      }
    } else {
      result.push(arr[i]);
    }
  }

  return result;
}

console.log(JSON.stringify(createTree(arrP)));
