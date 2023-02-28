class TreeNode {
    public value: number;
    public left: TreeNode | null = null;
    public right: TreeNode | null = null;
    constructor(num: number, left?: TreeNode, right?: TreeNode) {
        this.value = num;
        left && (this.left = left);
        right && (this.right = right);
    }
}

// 深度遍历 前序
const dfs = (node: TreeNode| null) => {
    if (!node) {
        return;
    }
    console.log(node.value);
    dfs(node.left);
    dfs(node.right);
}

// 广度遍历
const bfs = (node: TreeNode | null) => {
    const queue = [node];
    while (queue.length) {
        const node = queue.shift();
        node.left && queue.push(node.left);
        node.right && queue.push(node.right);
        console.log(node.value);
    }
}

const node1 = new TreeNode(1);
const node2 = new TreeNode(2);
const node3 = new TreeNode(3, node1, node2);
const node4 = new TreeNode(4);
const node5 = new TreeNode(5, node4);
const node6 = new TreeNode(6, node3, node5);

console.log('dfs:');
dfs(node6);
console.log('bfs:');
bfs(node6);
