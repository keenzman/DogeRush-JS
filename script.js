const canvas = document.getElementById("#canvas");
const ctx = canvas.getContext("2d");
// canvas.width = 850;
// canvas.height = 450;

let size = 0;

function animate() {
  // ctx.fillStyle = "red";
  // ctx.beginPath();
  // ctx.arc(100, 300, size, 0, Math.PI * 2);
  // ctx.closePath();
  // ctx.fill();
  // ctx.stroke();

  ctx.beginPath();
  ctx.arc(100, 75, 50, 0, 2 * Math.PI);
  ctx.stroke();

  requestAnimationFrame(animate);
}
animate();
