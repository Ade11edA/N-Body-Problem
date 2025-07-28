class Body {
  constructor(x, y, m) {
    this.pos = createVector(x, y);
    this.vel =p5.Vector.random2D();
    this.vel.mult(0.1);
    this.acc = createVector(0, 0);
    this.mass = m;
    this.r = sqrt(this.mass) * 2;
    this.color = color(random(255), random(255), random(255));
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  attract(body) {
    let force = p5.Vector.sub(this.pos, body.pos);
    let distanceSq = constrain(force.magSq(), 100, 1000);
    let G = 1;
    let strength = (G * (this.mass * body.mass)) / distanceSq;
    force.setMag(strength);
    body.applyForce(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}

let bodies = [];
let numOfBodies = 5;


function setup() {
  createCanvas(500,500);
  for (let i = 0; i < numOfBodies; i++){
    let x = random(width);
    let y = random(height);
    let mass = random(10,100);
    bodies[i] = new Body(x, y, mass);
  }
  
}

function draw() {
  background(0, 10);
  for (let i = 0; i < bodies.length; i++){
    for(let j = 0; j < bodies.length; j++){
      if( i!= j){
        bodies[i].attract(bodies[j]);
      }
    }
  }
  for (let body of bodies){
    body.update();
    body.show();
  }
}