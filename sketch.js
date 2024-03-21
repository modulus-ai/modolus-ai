// p5.js Code:

let nodes = [];
let vertices = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  for (let i = 0; i < 100; i++) {
    nodes[i] = new Node(random(width), random(height));
  }
  for (let i = 0; i < nodes.length-1; i++) {
    vertices[i] = new Vertex(nodes[i].x, nodes[i].y, nodes[i+1].x, nodes[i+1].y);
  }
}

function draw() {
  background(0);
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].move();
    nodes[i].display();
  }
  for (let i = 0; i < vertices.length; i++) {
    vertices[i].display();
  }
}

class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  move() {
    this.x = this.x + random(-0.1, 0.1); // Further reduced speed of movement
    this.y = this.y + random(-0.1, 0.1); // Further reduced speed of movement
  }

  display() {
    push();
    stroke(0, 255, 234); // Fluorescent blue
    strokeWeight(2);
    beginShape();
    for (let a = 0; a < TWO_PI; a += PI / 3) {
      let px = this.x + cos(a) * 2.5; // Node size remains the same
      let py = this.y + sin(a) * 2.5; // Node size remains the same
      vertex(px, py);
    }
    endShape(CLOSE);
    pop();
  }
}

class Vertex {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  display() {
    push();
    stroke(0, 255, 234, 50); // Fluorescent blue with reduced opacity for lighter color
    strokeWeight(0.5); // Reduced stroke weight for thinner vertices
    line(this.x1, this.y1, this.x2, this.y2);
    pop();
  }
}
