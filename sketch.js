let moles = [];
let score = 0;
let timeLeft =   60;
let timer;
let gameEnded = false;
let Mx = [100, 100, 100, 300, 300, 300];
let My = [150, 300, 450, 150, 300, 450];
let index = 0
let index1 = 0

function setup() {
  createCanvas(400, 600);
  textAlign(CENTER, CENTER);
  textSize(24);
  timer = createP();
  setInterval(() => {
    if (!gameEnded) {
      timeLeft--;
      if (timeLeft <= 0) {
        gameEnded = true;
        timeLeft = 0;
      }
    }
  }, 1000);

  for (let i = 0; i < 7; i++) {
    moles.push(new Mole(Mx[index], My[index1]));
    index ++;
    index1 ++;
  }
}

function draw() {
  background(220);
     noFill()
    stroke(5)
    fill(100)
    ellipse(100, 150, 50);
    ellipse(300, 150, 50);
    ellipse(100, 300, 50);
    ellipse(300, 300, 50);
    ellipse(100, 450, 50);
    ellipse(300, 450, 50);
    noStroke()
  fill(0)
  text('Time: ' + timeLeft, 70, 50);
  text('Score: ' + score, 300, 50)
  if (!gameEnded) {
    for (let mole of moles) {
      mole.show();
      mole.update();
    }
  } else {
    fill(0);
    background(220)
    text("Game Over! Score: " + score, width / 2, height / 2);
  }
  
  
}

function mousePressed() {
  if (!gameEnded) {
    for (let mole of moles) {
      if (mole.hit(mouseX, mouseY)) {
        mole.hide();
        score++;
      }
    }
  }
}

class Mole {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.diameter = 50;
    this.visible = false;
    this.lastToggle = millis();
  }

  show() {
    if (millis() - this.lastToggle > 1000) {
      if (random(1) < 0.05) {
        this.visible = true;
        this.lastToggle = millis();
      }
    }

    if (this.visible) {
      fill(250, 0, 0);
      ellipse(this.x, this.y, this.diameter);
    }
  }

  update() {
    if (millis() - this.lastToggle > 1000 && this.visible) {
      this.visible = false;
      this.lastToggle = millis();
    }
  }

  hit(x, y) {
    let d = dist(x, y, this.x, this.y);
    return d < this.diameter / 2;
  }

  hide() {
    this.visible = false;
  }
  
}
