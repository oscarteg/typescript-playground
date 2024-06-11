const elements = [1, 2, 3];
const array: any[] = ["A", "B", "C"];

array.push.apply(array, elements);

console.log(array);

const a: any[] = ["A", "B", "C"];
const b = [1, 2, 3];

a.push(b);

console.log(a);
console.log(Math.max(...elements));
console.log(Math.max.apply(null, elements));

// Apply will use the array as individual arguments
//

// Callo

// Bind
function Product(name: string, price: number): void {
	this.name = name;
	this.price = price;
}

function Pizza(name, price) {
	Product.call(this, name, price);
	this.category = "pizza";
}
const p = new Pizza("Pepperoni", 8.99);

export type {};
