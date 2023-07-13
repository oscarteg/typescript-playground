// Definition for a binary tree node.
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }

  insertnode(value: number): TreeNode {
    while (true) {
      if (data > this.current.data) {
        // search for an empty position in the right subtree
        if (current.rightNode) {
          current = current.rightNode;
        } else {
          // insert node
          current.rightNode = new Node(data);
          return current.rightNode;
        }
      } else {
        // search for an empty position in the left subtree
        if (current.leftNode) {
          current = current.leftNode;
        } else {
          // insert node
          current.leftNode = new Node(data);
          return current.leftNode;
        }
      }
    }
  }
}

function buildTree(value: number[]): Treenode {}

function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null
): TreeNode | null {
  if (root == null) return null;
}

export {};
