class Player {
  constructor() {
    this.w = 80;
    this.h = 80;
    this.x = width / 2 - this.w / 2;
    this.y = height - this.h - 20;
    this.speed = 5;
    this.dir = 0;
  }

  show() {
    // fill(0, 0, 255);
    // rect(this.x, this.y, this.w, this.h);
    image(playerImage, this.x + 40, this.y + 40, this.w, this.h);
  }

  move() {
    this.x += this.speed * this.dir;
    this.x = constrain(this.x, 0, width - this.w);
  }

  setDir(dir) {
    this.dir = dir;
  }

  hits(enemy) {
    return (
      enemy.x + enemy.w > this.x &&
      enemy.x < this.x + this.w &&
      enemy.y + enemy.h > this.y &&
      enemy.y < this.y + this.h
    );
  }
}
