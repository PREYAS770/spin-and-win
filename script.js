const wheel = document.getElementById('wheel');
const spinBtn = document.getElementById('spin');
const popup = document.getElementById('popup');
const prizeText = document.getElementById('prizeText');
const closeBtn = document.getElementById('close');

const prizes = [
  "₹50 Voucher",
  "Try Again",
  "₹20 Cashback",
  "Better Luck Next Time",
  "₹10 Discount",
  "Free Spin"
];

spinBtn.addEventListener('click', () => {
  const rand = Math.floor(Math.random() * 360) + 720; // Rotate 2–3 times
  wheel.style.transform = `rotate(${rand}deg)`;

  const resultIndex = Math.floor(Math.random() * prizes.length);
  const selectedPrize = prizes[resultIndex];

  setTimeout(() => {
    prizeText.innerText = `🎉 You won: ${selectedPrize}`;
    popup.classList.remove('hidden');
  }, 4000);
});

closeBtn.addEventListener('click', () => {
  popup.classList.add('hidden');
});