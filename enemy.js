class Enemy {
  constructor() {
    this.w = 50;
    this.h = 50;
    this.x = random(width - this.w);
    this.y = 0;
    this.speed = 2;
  }

  show() {
    // fill(255, 0, 0);
    // rect(this.x, this.y, this.w, this.h);
    image(enemyImage, this.x + 25, this.y + 25, this.w, this.h);
  }

  move() {
    this.y += this.speed;
  }

  hits(player) {
    return (
      player.x + player.w > this.x &&
      player.x < this.x + this.w &&
      player.y + player.h > this.y &&
      player.y < this.y + this.h
    );
  }
}
