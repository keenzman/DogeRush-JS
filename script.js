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
