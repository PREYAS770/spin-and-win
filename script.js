
const prizes = ["₹10", "₹20", "₹50", "₹100", "Try Again", "₹0"];
const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spinBtn');
const resultText = document.getElementById('resultText');

function drawWheel() {
  const angle = (2 * Math.PI) / prizes.length;
  prizes.forEach((prize, index) => {
    const startAngle = index * angle;
    const endAngle = startAngle + angle;
    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.arc(150, 150, 150, startAngle, endAngle);
    ctx.fillStyle = `hsl(${index * 60}, 80%, 60%)`;
    ctx.fill();
    ctx.fillStyle = "#000";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.translate(150, 150);
    ctx.rotate(startAngle + angle / 2);
    ctx.fillText(prize, 100, 10);
    ctx.rotate(-(startAngle + angle / 2));
    ctx.translate(-150, -150);
  });
}
drawWheel();

spinBtn.addEventListener("click", () => {
  const result = prizes[Math.floor(Math.random() * prizes.length)];
  resultText.textContent = "You got: " + result;
});
