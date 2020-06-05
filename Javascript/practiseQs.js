const fetch = require("node-fetch");
// const students = [
//   { fName: "one", lName: "One", number: 1, grade: 12, numCources: 10 },
//   { fName: "two", lName: "Two0000", number: 2, grade: 2, numCources: 2 },
//   { fName: "three", lName: "Three", number: 3, grade: 3, numCources: 3 },
//   { fName: "four", lName: "Four", number: 4, grade: 4, numCources: 4 },
//   { fName: "five", lName: "Five", number: 5, grade: 5, numCources: 5 },
//   { fName: "six", lName: "Six", number: 6, grade: 6, numCources: 6 },
// ];

// //console.log(students.filter(student=>student.grade===10 && student.numCources>7))
// //console.log(students.sort((s1,s2)=>s1.grade-s2.grade));
// // const grads = students.filter(student=> student.grade===12);
// // const arr = grads.map(student=>`${student.fName}, ${student.number}`);
// // console.log(arr);
// // const gradeAvg = students.reduce((total,student)=>total+student.grade,0)/students.length;
// // console.log(sumAge);

class Rectangle{
    constructor(length, width){
        this.length = length;
        this.width = width;
    }

    getPerimeter(){
        return this.length*2+this.width*2;
    }
    getArea(){
        return this.length*this.width;
    }
}

const rec = new Rectangle(10,10);
console.log(rec.getArea());
console.log(rec.getPerimeter());

class Box extends Rectangle{
    constructor(length,width,depth){
        super(length,width);
        this.depth = depth;
    }
    getVolume(){
        return this.getArea()*this.depth;
    }
    getSurfaceArea(){
        return 2 * (this.width*this.length+this.width*this.depth+this.length*this.depth);
    }
}
const box = new Box(10,10,10);
console.log(box.getSurfaceArea());

const boxes = [
    new Box(10,10,10),
    new Box(10,1,10),
    new Box(10,10,10),
    new Box(10,0,10),
    new Box(10,0,10),
    new Box(10,0,10),
    new Box(10,0,10),
    new Box(10,0,10),
    new Box(10,0,10),
    new Box(10,0,10),
]
const cubes = boxes.filter(box => box.length===box.width && box.width===box.depth);
console.log(cubes)
const promise0 = 10;
const promise = fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);
    console.log("/n");
    console.log(
      data.sort((a, b) => a.address.city.localCompare(b.address.city))
    );
  });

const comments = fetch("https://jsonplaceholder.typicode.com/comments")
  .then((res) => res.json())
  .then((data) => getEmails(data));

function getEmails(data) {
  console.log(
    data.filter((comment) => comment.email.substring(0, 1).toLowerCase() == "m")
  );
}
