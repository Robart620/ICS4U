
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

// let i = new LineItem("tree",123,10,20,10);
// console.log(i.getTotal());
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
    return (this.subtotal() * HST);
  }
  total() {
    return (this.subtotal() + this.HST());
  }
}
let ar = [
    new LineItem("tree",123,10,20,10),
    new LineItem("treee",12,13,2,10),
    new LineItem("treeee",13,11,3,10),

]
// console.log(ar);
let b = new Bill(ar);
console.log(b.subtotal());
console.log(b.HST());
console.log(b.total());

