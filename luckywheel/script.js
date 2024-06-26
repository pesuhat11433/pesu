const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spin-button');
const resultDiv = document.getElementById('result');
const popup = document.getElementById('popup');
const popupImg = document.getElementById('popup-img');
const closeBtn = document.getElementsByClassName('close')[0];
const prizes = ['Prize 1', 'Prize 2', 'Prize 3', 'Prize 4', 'Prize 5', 'Prize 6'];
const prizeImages = {
    'Prize 1': 'popup-img.png',
    'Prize 2': 'popup-img.png',
    'Prize 3': 'popup-img.png',
    'Prize 4': 'popup-img.png',
    'Prize 5': 'popup-img.png',
    'Prize 6': 'popup-img.png'
};

let startAngle = 0;
const arc = Math.PI / (prizes.length / 2);
let spinTimeout = null;
const wheelImage = new Image();
wheelImage.src = 'wheel.png'; // 上传的转盘图片路径

function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(startAngle);
    ctx.drawImage(wheelImage, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    ctx.restore();
}

function rotateWheel() {
    startAngle += Math.PI / 30;
    drawWheel();
    spinTimeout = requestAnimationFrame(rotateWheel);
}

function stopRotateWheel() {
    cancelAnimationFrame(spinTimeout);
    const degrees = startAngle * 180 / Math.PI + 90;
    const arcd = arc * 180 / Math.PI;
    const index = Math.floor((360 - (degrees % 360)) / arcd);
    const prize = prizes[index];
    resultDiv.innerHTML = `Congratulations! You won ${prize}`;
    showPopup(prize);
}

function showPopup(prize) {
    popupImg.src = prizeImages[prize];
    popup.style.display = 'block';
}

closeBtn.onclick = function() {
    popup.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == popup) {
        popup.style.display = 'none';
    }
}

spinButton.addEventListener('click', () => {
    resultDiv.innerHTML = '';
    rotateWheel();
    setTimeout(stopRotateWheel, 3000);
});

wheelImage.onload = function() {
    drawWheel();
};