// Canvas Setup
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;

let score = 0;
let gameFrame = 0;
ctx.font = "50px Monospace";

// Mouse Interaction
// Gets the (0,0) coords from inside the box we defined, and not the edge of the default browser canvas
let canvasPosition = canvas.getBoundingClientRect();
// console.log(canvasPosition);

const mouse = {
  horizontalPos: canvas.width / 2,
  verticalPos: canvas.height / 2,
  click: false,
};

canvas.addEventListener("mousedown", function (event) {
  mouse.click = true;
  // getting the x,y coords from the bounded canvas positions
  mouse.horizontalPos = event.x - canvasPosition.left;
  mouse.verticalPos = event.y - canvasPosition.top;
  // console.log(mouse.x, mouse.y)
});

canvas.addEventListener("mousedown", function (event) {
  mouse.click = false;
});

class Player {
  constructor() {
    /* Contains all properties of Player obj.
       * These are initial coords before player starts moving.
       * It will start moving towards the mouse coords, when the vals are different 
         than the mouse obj coords (on lines 17 and 18) on first page load.
       */
    this.xAxis = canvas.width / 2;
    this.yAxis = canvas.height / 2;
    this.radius = 50;
    this.angle = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.frame = 0;
    // 1992/4 because there are 4 cols
    this.spriteWidth = 498;
    // 981/3 since there are 3 rows (in the spritesheet)
    this.spriteHeight = 327;
  }
  // update player pos
  update() {
    const dx = this.xAxis - mouse.horizontalPos;
    const dy = this.yAxis - mouse.verticalPos;
    // We want both x and y to change, so no else conditions
    // The 30 is used to stop the player teleporting instantly. Basically acts as delay.
    if (mouse.horizontalPos != this.xAxis) {
      this.xAxis -= dx / 5;
    }
    if (mouse.verticalPos != this.yAxis) {
      this.yAxis -= dy / 5;
    }
  }
  draw() {
    if (mouse.click) {
      ctx.lineWidth = 0.2;
      ctx.beginPath();
      ctx.moveTo(this.xAxis, this.yAxis);
      ctx.lineTo(mouse.horizontalPos, mouse.verticalPos);
      ctx.stroke();
    }
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.xAxis, this.yAxis, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}
const player = new Player();

// Coins
const coinsArr = [];
class Coin {
  constructor() {
    this.xAxis = Math.random() * canvas.width;
    // The coins rise up from the bottom edge of canvas + 100
    this.yAxis = canvas.height + 100;
    this.radius = 50;
    this.speed = Math.random() * 5 + 1;
    this.distance;
    this.counted = false;
  }
  update() {
    this.yAxis -= this.speed;
    const dx = this.xAxis - player.xAxis;
    const dy = this.yAxis - player.yAxis;
    this.distance = Math.sqrt(dx * dx + dy * dy);
  }
  draw() {
    ctx.fillStyle = "goldenrod";
    ctx.beginPath();
    ctx.arc(this.xAxis, this.yAxis, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
  }
}

function handleCoin() {
  // Every 50 frames, add a coin to the array
  if (gameFrame % 50 == 0) {
    coinsArr.push(new Coin());
    // console.log(coinsArr.length);
  }
  for (let i = 0; i < coinsArr.length; i++) {
    // For each elem, call associated update and draw methods
    coinsArr[i].update();
    coinsArr[i].draw();
  }

  for (let i = 0; i < coinsArr.length; i++) {
    // Note that the 0 - bit is to stop the coins from disappearing suddenly
    if (coinsArr[i].y < 0 - coinsArr[i].radius * 2) {
      // Removing one coin so that the arr. doesn't grow endlessly
      coinsArr.splice(i, 1);
    }
    // circle collision algo
    if (coinsArr[i].distance < coinsArr[i].radius + player.radius) {
      // console.log('collision');
      // count scores by 1 for each unique coin
      if (!coinsArr[i].counted) {
        score++;
        coinsArr[i].counted = true;
        coinsArr.splice(i, 1);
      }
    }
  }
}

// Animation Loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleCoin();
  player.update();
  player.draw();
  // score placeholder
  ctx.fillStyle = "black";
  ctx.fillText("Score: " + score, 550, 50);
  gameFrame++;
  // console.log(gameFrame);
  requestAnimationFrame(animate);
}
animate();
