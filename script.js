let dino;
let gravity = 0.6;
let obstacles = [];
let score = 0;

function setup() {
  createCanvas(800, 400);
  dino = new Dino();
  obstacles.push(new Obstacle());
}

function draw() {
    background(135, 206, 235); //небо
    fill(0, 128, 0); //земля
    rect(0, height * 0.8, width, height * 0.2); //Малюємо землю

  // Generate obstacles
  if (frameCount % 120 === 0) {
    obstacles.push(new Obstacle());
  }

  // Draw and update obstacles
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].show();
    obstacles[i].update();

    if (obstacles[i].hits(dino)) {
      gameOver();
    }

    // Remove obstacles that have moved offscreen
    if (obstacles[i].offscreen()) {
      obstacles.splice(i, 1);
      score++;
    }
  }

  // Update and show dino
  dino.update();
  dino.show();

  // Display score
  textSize(20);
  fill(0);
  text('Score: ' + score, 20, 30);
}

function keyPressed() {
  if (key === ' ') {
    dino.jump();
  }
}

function gameOver() {
  noLoop();
  textSize(40);
  fill(255, 0, 0);
  textAlign(CENTER, CENTER);
  text('Game Over!', width / 2, height / 2);
  text('Your score: ' + score, width / 2, height / 2 + 50);
}

class Dino {
  constructor() {
    this.size = 50;
    this.x = 100;
    this.y = height - this.size;
    this.velocityY = 0;
    this.gravity = gravity;
  }

  jump() {
    if (this.y === height - this.size) {
      this.velocityY = -15;
    }
  }

  update() {
    this.y += this.velocityY;
    this.velocityY += this.gravity;

    // Ground collision
    if (this.y >= height - this.size) {
      this.y = height - this.size;
      this.velocityY = 0;
    }
  }

  show() {
    textSize(this.size);
    text('🦕', this.x, this.y); // Використання емоджі для динозавра
  }
}

class Obstacle {
  constructor() {
    this.size = 50 ;
    this.x = width;
    this.y = height - this.size;
    this.speed = 5;
  }

  update() {
    this.x -= this.speed;
  }

  show() {
    textSize(this.size);
    text('🌵', this.x, this.y); 
  }

  hits(dino) {
    return (
      dino.y + dino.size >= this.y &&
      dino.x + dino.size >= this.x &&
      dino.x <= this.x + this.size
    );
  }

  offscreen() {
    return this.x < -this.size;
  }
}