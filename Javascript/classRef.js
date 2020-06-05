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
