const fetch = require("node-fetch");
//Q1
class LineItem {
  constructor(name, sku, listPrice, salePrice, quantity) {
    this.name = name;
    this.sku = sku;
    this.listPrice = listPrice;
    this.salePrice = salePrice;
    this.quantity = quantity;
  }

  getTotal() {
    return this.salePrice * this.quantity;
  }
}
//Q2
const HST = 0.13;
class Bill {
  constructor(arr) {
    this.arr = arr;
  }
  display() {
    this.arr.forEach((element) => {
      console.log(element);
    });
  }
  subtotal() {
    let subtotal = this.arr.reduce(
      (total, element) => total + element.getTotal(),
      0
    );
    return subtotal;
  }
  HST() {
    return this.subtotal() * HST;
  }
  total() {
    return this.subtotal() + this.HST();
  }
  m1() {
    let a = this.arr.filter(
      (element) => element.salePrice < element.listPrice * 0.25
    );
    return a;
  }
  format(){
      let sorted = this.arr.sort((n1,n2)=>n1.listPrice-n2.listPrice);
      return sorted;
  }
}
let ar = [
  new LineItem("tree", 123, 10, 20, 10),
  new LineItem("treee", 12, 13, 2, 10),
  new LineItem("treeee", 13, 11, 3, 10),
];

let b = new Bill(ar);
b.display();
console.log(b.subtotal());
console.log(b.HST());
console.log(b.total());
console.log(b.format());
console.log(b.m1());
console.log("\n");

//Q3
const todos = fetch("https://jsonplaceholder.typicode.com/todos")
  .then((res) => res.json())
  .then((data) => getTrues(data));

function getTrues(data) {
  let trues = data.filter((comment) => comment.completed === true);
  const sorted = data.sort((n1, n2) => n1.title.localeCompare(n2.title));

  console.log(sorted);
}
//Q4
arr2 = [1, 2, 3];
const arr3 = arr2.map((element) => element * 2);
console.log(arr3);
