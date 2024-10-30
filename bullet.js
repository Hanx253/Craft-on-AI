class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y - 75;
    this.r = 2;
    this.w = 20;
    this.h = 20;
    this.speed = 5;
  }

  show() {
    fill(0, 255, 255);
    noStroke();
    ellipse(this.x, this.y, this.r * 2);
    image(bulletImage, this.x, this.y, this.w, this.h);
  }

  move() {
    this.y -= this.speed;
  }

  hits(enemy) {
    let d = dist(this.x, this.y, enemy.x + enemy.w / 2, enemy.y + enemy.h / 2);
    return d < this.r + enemy.w / 2;
  }
}