
const canvas = document.getElementById('wheelcanvas');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spin');
const resultDiv = document.getElementById('result');

const prizes = ['₹10', '₹50', '₹100', 'Better Luck', '₹500', '₹200', '₹0', 'Try Again'];
const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#F7464A', '#46BFBD', '#FDB45C'];
const size = prizes.length;
const anglePerSlice = 2 * Math.PI / size;
let rotation = 0;
let isSpinning = false;

function drawWheel() {
  for (let i = 0; i < size; i++) {
    const startAngle = i * anglePerSlice;
    const endAngle = startAngle + anglePerSlice;

    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.arc(150, 150, 150, startAngle, endAngle);
    ctx.fillStyle = colors[i];
    ctx.fill();
    ctx.stroke();

    ctx.save();
    ctx.translate(150, 150);
    ctx.rotate(startAngle + anglePerSlice / 2);
    ctx.fillStyle = "#000";
    ctx.font = "16px Arial";
    ctx.fillText(prizes[i], 60, 10);
    ctx.restore();
  }
}

function spinWheel() {
  if (isSpinning) return;
  isSpinning = true;
  resultDiv.textContent = "";

  const spinAngle = Math.random() * 360 + 720; // 2-3 rotations
  const duration = 3000;
  const start = performance.now();

  function animate(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    rotation = spinAngle * easeOutCubic(progress);
    drawRotatedWheel(rotation);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      isSpinning = false;
      showResult(rotation);
    }
  }
  requestAnimationFrame(animate);
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function drawRotatedWheel(angle) {
  ctx.clearRect(0, 0, 300, 300);
  ctx.save();
  ctx.translate(150, 150);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.translate(-150, -150);
  drawWheel();
  ctx.restore();
}

function showResult(finalAngle) {
  const normalizedAngle = (360 - (finalAngle % 360)) % 360;
  const index = Math.floor(normalizedAngle / (360 / size));
  const prize = prizes[index];
  resultDiv.textContent = `You won: ${prize}`;
}

drawWheel();
spinBtn.addEventListener('click', spinWheel);
