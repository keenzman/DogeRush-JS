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

const mouseObj = {
  horizontalPos: canvas.width / 2,
  verticalPos: canvas.height / 2,
  click: false,
};

let bgm = new Howl({
  src: ["./sounds/bgm.mp3"],
  autoplay: true,
  loop: true,
  volume: 0.3,
});

bgm.play();

canvas.addEventListener("mousedown", function (event) {
  mouseObj.click = true;
  // getting the x,y coords from the bounded canvas positions
  mouseObj.horizontalPos = event.x - canvasPosition.left;
  mouseObj.verticalPos = event.y - canvasPosition.top;
  // console.log(mouse.x, mouse.y)
});

canvas.addEventListener("mousedown", function (event) {
  mouseObj.click = false;
});

const playerAvatar = new Image();
playerAvatar.src = "./images/elon.png";

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
    this.spriteWidth = 496;
    this.spriteHeight = 701;
  }
  // update player pos
  update() {
    const distanceBetweenXAxis = this.xAxis - mouseObj.horizontalPos;
    const distanceBetweenYAxis = this.yAxis - mouseObj.verticalPos;
    // We want both x and y to change, so no else conditions
    // The 30 is used to stop the player teleporting instantly. Basically acts as delay.
    if (mouseObj.horizontalPos != this.xAxis) {
      this.xAxis -= distanceBetweenXAxis / 5;
    }
    if (mouseObj.verticalPos != this.yAxis) {
      this.yAxis -= distanceBetweenYAxis / 5;
    }
  }
  draw() {
    if (mouseObj.click) {
      ctx.beginPath();
      ctx.moveTo(this.xAxis, this.yAxis);
      ctx.lineTo(mouseObj.horizontalPos, mouseObj.verticalPos);
      ctx.stroke();
    }
    // ctx.fillStyle = "red";
    // ctx.beginPath();
    // ctx.arc(this.xAxis, this.yAxis, this.radius, 0, Math.PI * 2);
    // ctx.fill();
    // ctx.closePath();

    ctx.drawImage(
      playerAvatar,
      this.frameX * this.spriteWidth,
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.xAxis - 50,
      this.yAxis - 55,
      this.spriteWidth / 5,
      this.spriteHeight / 5
    );
  }
}
const player = new Player();

const dogeCoin = new Image();
dogeCoin.src = "./images/doge.png";

// Coins
const coinsArr = [];
class Coin {
  constructor() {
    this.xAxis = Math.random() * canvas.width;
    // The coins rise up from the bottom edge of canvas + 100
    this.yAxis = Math.random() * (canvas.height - 150) + 100;
    this.radius = 40;
    this.speed = Math.random() * 5 + 1;
    this.distance;
    this.counted = false;
  }
  update() {
    this.yAxis -= this.speed;
    const distanceBetweenHorizontalAxis = this.xAxis - player.xAxis;
    const distanceBetweenVerticalAxis = this.yAxis - player.yAxis;
    this.distance = Math.hypot(
      distanceBetweenHorizontalAxis,
      distanceBetweenVerticalAxis
    );
  }
  draw() {
    // ctx.fillStyle = "goldenrod";
    // ctx.beginPath();
    // ctx.arc(this.xAxis, this.yAxis, this.radius, 0, Math.PI * 2);
    // ctx.fill();
    // ctx.closePath();
    // ctx.stroke();

    ctx.drawImage(
      dogeCoin,
      this.xAxis - 46,
      this.yAxis - 40,
      this.radius * 2.2,
      this.radius * 2.2
    );
  }
}

let coinSound = new Howl({
  src: ["./sounds/coin.wav"],
});

const customConfetti = {
  particleCount: 150,
  startVelocity: 50,
  spread: 220,
  scalar: 0.3,
};

function handleCoin() {
  // Every 30 frames, add a coin to the array
  if (gameFrame % 30 == 0) {
    coinsArr.push(new Coin());
    // console.log(coinsArr.length);
  }
  for (let i = 0; i < coinsArr.length; i++) {
    // For each elem, call associated update and draw methods
    coinsArr[i].update();
    coinsArr[i].draw();
    if (coinsArr[i].yAxis < 0) {
      coinsArr.pop();
    }
    // circle collision algo
    else if (coinsArr[i].distance < coinsArr[i].radius + player.radius) {
      // console.log("collision");
      // count scores by 1 for each unique coin
      if (!coinsArr[i].counted) {
        score++;
        coinSound.play();
        confetti(customConfetti);
        coinsArr[i].counted = true;
        coinsArr.splice(i, 1);
      }
    }
  }
}

const background = new Image();
background.src = "./images/mars.png";

function handleBackground() {
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height * 1.5);
}

// Animation Loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleBackground();
  handleCoin();
  player.update();
  player.draw();
  // score placeholder
  ctx.fillStyle = "white";
  ctx.fillText("wow_suchCoins: " + score, 270, 45);
  gameFrame++;
  // console.log(gameFrame);
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", function () {
  canvasPosition = canvas.getBoundingClientRect();
});

// const reset = document.querySelector(".button__reset");
// reset.addEventListener("click", () => {
//   animate();
// });

const reset = document.querySelector(".button__reset");
reset.addEventListener("click", () => {
  score = 0;
});
