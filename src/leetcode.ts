export function maxProfit(prices: number[]): number {
  const { maxProfit } = prices.reduce(
    ({ maxProfit, cost }, price) => {
      return {
        cost: Math.min(cost, price),
        maxProfit: Math.max(maxProfit, price - cost),
      };
    },
    { maxProfit: 0, cost: Infinity }
  );

  return maxProfit;
}

const RomanMap = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
} as const;

function romanToInt(s: string): number {
  const numbers: number[] = s.split("").map((v: string) => RomanMap[v]);

  return numbers.reduce(
    (acc, num, index) =>
      num < numbers[index + 1] ?? 0 ? acc - num : acc + num,
    0
  );
}

function canJump(nums: number[]): boolean {
  let left = nums[0];

  for (let i = 1; i < nums.length; i++) {
    if (left === 0) {
      return false;
    }
    left = Math.max(left - 1, nums[i]);
  }

  return true;
}

console.log(canJump([2, 3, 1, 1, 4]));

export {};
