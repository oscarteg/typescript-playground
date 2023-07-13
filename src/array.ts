function removeDuplicates(nums: number[]): number {
  if (nums.length === 0) return 0;

  // unique items
  let k = 0;

  for (let i = 0; i < nums.length; i++) {
    // @ts-expect-error
    if (k < 2 || nums[i] > nums[k - 2]) {
      // @ts-expect-error
      nums[k] = nums[i];
      k++;
    }
  }

  console.log({ nums });

  return k;
}

console.log(removeDuplicates([1, 1, 1, 2, 2, 3]));
console.log(removeDuplicates([0, 0, 1, 1, 1, 1, 2, 3, 3]));
