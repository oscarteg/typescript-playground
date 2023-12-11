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
        if (current.rightnode) {
          current = current.rightnode;
        } else {
          // insert node
          current.rightnode = new node(data);
          return current.rightnode;
        }
      } else {
        // search for an empty position in the left subtree
        if (current.leftnode) {
          current = current.leftnode;
        } else {
          // insert node
          current.leftnode = new node(data);
          return current.leftnode;
        }
      }
    }
  }
}

function buildTree(value: number[]): TreeNode {
  return new TreeNode();
}

function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null
): TreeNode | null {
  if (root == null) return null;

  root.insertnode(4);

  return root;
}

export {};
