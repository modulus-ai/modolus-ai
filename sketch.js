class Neuron {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.connections = [];
    this.speedX = random(-1, 1)*0.2; // Random speed in the x direction
    this.speedY = random(-1, 1)*0.2; // Random speed in the y direction
  }

  connect(neuron) {
    this.connections.push(new Connection(this, neuron));
  }

  display() {
    stroke(255);
    strokeWeight(1);
    fill(0, 50, 255); // Fluorescent lila color
    // Draw the cell body as a smaller hexagon
    beginShape();
    for (let a = 0; a < TWO_PI; a += PI / 3) {
      let x = this.x + cos(a) * (16 * 0.3); // 70% smaller
      let y = this.y + sin(a) * (16 * 0.3); // 70% smaller
      vertex(x, y);
    }
    endShape(CLOSE);
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;
    // Bounce off the edges of the screen
    if (this.x < 0 || this.x > width) {
      this.speedX *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.speedY *= -1;
    }
  }
}

class Connection {
  constructor(from, to) {
    this.from = from;
    this.to = to;
    this.speed = random(0.01, 0.05);
    this.progress = 0;
  }

  display() {
    stroke(255, 20);
    strokeWeight(1);
    line(this.from.x, this.from.y, this.to.x, this.to.y);
  }

  update() {
    this.progress += this.speed;
    if (this.progress >= 1) {
      this.progress = 0;
    }
  }

  displayImpulse() {
    let x = lerp(this.from.x, this.to.x, this.progress);
    let y = lerp(this.from.y, this.to.y, this.progress);
    stroke(255);
    strokeWeight(1);
    point(x, y);
  }
}

// Create the network
let neurons = [];
let connections = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Create 25 neurons at random positions
  for (let i = 0; i < 25; i++) {
    let x = random(width);
    let y = random(height);
    neurons.push(new Neuron(x, y));
  }
  for (let i = 0; i < neurons.length; i++) {
    let neuronA = neurons[i];
    for (let j = i + 1; j < neurons.length; j++) {
      // Only create a connection 40% of the time
      if (random() < 0.4) {
        let neuronB = neurons[j];
        neuronA.connect(neuronB);
        connections.push(neuronA.connections[neuronA.connections.length - 1]);
      }
    }
  }
}

function draw() {
  background(0);
  for (let i = 0; i < neurons.length; i++) {
    neurons[i].display();
    neurons[i].move(); // Move the neurons
  }
  for (let i = 0; i < connections.length; i++) {
    connections[i].display();
    connections[i].update();
    connections[i].displayImpulse();
  }
}
