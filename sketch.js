let player;
let bullets = [];
let enemies = [];
let score = 0;
let gameOver = false;
let win = false;
let mode = 0;

let visible = true;
let blinkInterval = 500;

let title = "Click to Start";
let intro1 =
  "Hey, newcomer! You have been selected as a pilot. Utilize the left and right arrow keys to direct your movement. At the right moment, unleash your firepower by deploying the spacebar.";
let winline =
  "Mission accomplished, pilot! Score secured: 10. Click to restart your operation.";
let failline =
  "Operation concluded. Crashed! Prepare for re-engagement – click to initiate mission restart.";

var index = 0;
var lastMillis = 0;

let titleScene;
let startScene;
let coverScene;

let enemyImage;
let playerImage;
let bulletImage;

function preload() {
  startScene = loadImage("assets/1.0.png");
  coverScene = loadImage("assets/2.0.png");
  enemyImage = loadImage("assets/enemy.png");
  playerImage = loadImage("assets/player.png");
  bgImage = loadImage("assets/bg.png");
  bulletImage = loadImage("assets/bullet.png");
}

function setup() {
  imageMode(CENTER);

  textFont("Oswald");

  createCanvas(600, 400);
  player = new Player();
}

function draw() {
  switch (mode) {
    case 0:
      scene1();
      break;
    case 1:
      scene2();
      break;
    case 2:
      game();
      break;
  }
}

function scene1() {
  background(0);
  startScene.resize(600, 400);
  image(startScene, 300, 200);
  textSize(18);
  fill(0);

  if (visible) {
    fill(0); // Text color when visible
    push();
    textAlign(CENTER);
    text(title, 305, 295);
    fill(255);
    text(title, 305, 293);
    pop();
  }

  if (millis() % (2.4 * blinkInterval) < blinkInterval) {
    visible = true;
  } else {
    visible = false;
  }
}

function scene2() {
  background(0);
  coverScene.resize(600, 400);
  image(coverScene, 300, 200);

  fill(0);
  textSize(14);
  textWrap(WORD);

  //typewriter
  text(intro1.substring(0, index), 335, 52, 180);
  if (millis() > lastMillis + 35) {
    index = index + 1;
    lastMillis = millis();
  }
}

function game() {
  background(0);
  bgImage.resize(600, 400);
  image(bgImage, 300, 200);

  // display score
  textSize(15);
  fill(255);
  text(`Score: ${score}`, 20, 30);

  if (!gameOver && !win) {
    player.show();
    player.move();

    // bullets
    for (let i = bullets.length - 1; i >= 0; i--) {
      bullets[i].show();
      bullets[i].move();

      // bullet-enemy collisions
      for (let j = enemies.length - 1; j >= 0; j--) {
        if (bullets[i].hits(enemies[j])) {
          bullets.splice(i, 1);
          enemies.splice(j, 1);
          score += 1;
          break;
        }
      }
    }

    // enemies
    if (random(1) < 0.02) {
      enemies.push(new Enemy());
    }

    for (let i = enemies.length - 1; i >= 0; i--) {
      enemies[i].show();
      enemies[i].move();

      // player-enemy collisions
      if (enemies[i].hits(player)) {
        gameOver = true;
        break;
      }
    }

    if (score >= 10) {
      win = true;
    }
  } else if (win) {
    // Win
    background(0);
    coverScene.resize(600, 400);
    image(coverScene, 300, 200);

    fill(0);
    textSize(15);
    textWrap(WORD);

    //typewriter
    text(winline.substring(0, index), 340, 74, 180);
    if (millis() > lastMillis + 35) {
      index = index + 1;
      lastMillis = millis();
    }
  } else {
    // Game over
    background(0);
    coverScene.resize(600, 400);
    image(coverScene, 300, 200);

    fill(0);
    textSize(15);
    textWrap(WORD);

    //typewriter
    text(failline.substring(0, index), 335, 75, 180);
    if (millis() > lastMillis + 35) {
      index = index + 1;
      lastMillis = millis();
    }
  }
}

function keyPressed() {
  if (!gameOver && !win) {
    if (keyCode === LEFT_ARROW) {
      player.setDir(-1);
    } else if (keyCode === RIGHT_ARROW) {
      player.setDir(1);
    } else if (key === " ") {
      let bullet = new Bullet(player.x + player.w / 2, height - 30);
      bullets.push(bullet);
    }
  }
}

function keyReleased() {
  if (!gameOver && !win) {
    if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
      player.setDir(0);
    }
  }
}

function mousePressed() {
  if (gameOver) {
    // Restart at scene 3
    mode = 3;
    player = new Player();
    bullets = [];
    enemies = [];
    score = 0;
    gameOver = false;
    win = false;
    index = 0;
    lastMillis = millis();
  } else if (win) {
    // Reset game to the start scene after winning
    mode = 0;
    player = new Player();
    bullets = [];
    enemies = [];
    score = 0;
    gameOver = false;
    win = false;
    index = 0;
    lastMillis = millis();
  } else {
    mode++;
    if (mode > 3) {
      mode = 3;
    }
    // Reset typewriter effect variables when switching scenes
    index = 0;
    lastMillis = millis();
  }
}
