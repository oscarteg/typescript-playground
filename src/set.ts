const set = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

const set2 = new Set([3, 4, 5, 12, 345]);

console.log(set.has(1));
console.log(set2.isSubsetOf(set));
console.log(set.intersection(set2));

export type {};
