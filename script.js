// Canvas Setup
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;

let score = 0;
let gameFrame = 0;
ctx.font = "50px Georgia";

// Mouse Interaction
// Gets the (0,0) coords from inside the box we defined, and not the edge of the default browser canvas
let canvasPosition = canvas.getBoundingClientRect();
console.log(canvasPosition);

const mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  click: false,
};

canvas.addEventListener("mousedown", function (event) {
  mouse.click = true;
  // getting the x,y coords from the bounded canvas positions
  mouse.x = event.x - canvasPosition.left;
  mouse.y = event.y - canvasPosition.top;
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
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
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
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    // We want both x and y to change, so no else conditions
    // The 30 is used to stop the player teleporting instantly. Basically acts as delay.
    if (mouse.x != this.x) {
      this.x -= dx / 10;
    }
    if (mouse.y != this.y) {
      this.y -= dy / 10;
    }
  }
  draw() {
    if (mouse.click) {
      ctx.lineWidth = 0.2;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    }
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}
const player = new Player();
