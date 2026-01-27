const gameArea = document.getElementById('gameArea');
const paddle = document.getElementById('paddle');
const message = document.getElementById('message');
const continueText = document.getElementById('continueText');
const websiteText = document.getElementById('websiteText');
websiteText.addEventListener('mouseover', function() {
    this.textContent = "INSERT COIN TO PLAY";
});
const targetText = "İSMAİLHAKKIGÜLER";
let bullets = [];
let targets = [];
let gameOver = false;
gameArea.addEventListener('mousemove', (e) => {
    const rect = gameArea.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    paddle.style.left = Math.max(0, Math.min(mouseX - paddle.offsetWidth / 2, gameArea.offsetWidth - paddle.offsetWidth)) + 'px';
});
gameArea.addEventListener('click', () => {
    if (gameOver) return;
    const bullet = document.createElement('div');
    bullet.className = 'bullet';
    bullet.style.left = paddle.offsetLeft + paddle.offsetWidth / 2 + 'px';
    bullet.style.bottom = paddle.offsetHeight + 10 + 'px';
    gameArea.appendChild(bullet);
    bullets.push(bullet);
});
function createTargets() {
    let x = 6; 
    let y = 11;
    for (let i = 0; i < targetText.length; i++) {
        const char = targetText[i];
        const target = document.createElement('div');
        target.className = 'target';
        target.textContent = char;
        target.style.left = x + 'px';
        target.style.top = y + 'px';
        target.style.fontWeight = 'bold';
        if (i < 11) {
            target.style.color = '#5690b6';
        } else {
            target.style.color = '#235b7b';
        }
        gameArea.appendChild(target);
        targets.push(target);
        
        const targetWidth = target.offsetWidth +-1; 
        x += targetWidth; 
    }
}
function updateGame() {
    if (gameOver) return;
  
    bullets.forEach((bullet, index) => {
        bullet.style.top = bullet.offsetTop - 3 + 'px'; 
        if (bullet.offsetTop < 0) {
            bullet.remove();
            bullets.splice(index, 1);
        } else {
            targets.forEach((target, tIndex) => {
                if (isColliding(bullet, target)) {
                    bullet.remove();
                    target.remove();
                    bullets.splice(index, 1);
                    targets.splice(tIndex, 1);
                    if (targets.length === 0) {
                        gameOver = true;
                        message.style.display = 'block';
                        continueText.style.display = 'block';
                        continueText.classList.add('blink');
                    }
                }
            });
        }
    });
    requestAnimationFrame(updateGame);
}
function isColliding(bullet, target) {
    const bulletRect = bullet.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    return (
        bulletRect.left < targetRect.right &&
        bulletRect.right > targetRect.left &&
        bulletRect.top < targetRect.bottom &&
        bulletRect.bottom > targetRect.top
    );
}
function startGame() {
    gameOver = false;
    message.style.display = 'none';
    continueText.style.display = 'none';
    continueText.classList.remove('blink');
    websiteText.style.display = 'block';
    targets.forEach(target => target.remove());
    bullets.forEach(bullet => bullet.remove());
    targets = [];
    bullets = [];
    createTargets();
    updateGame();
}
message.addEventListener('click', startGame);
continueText.addEventListener('click', startGame);
gameArea.addEventListener('click', () => {
    websiteText.style.display = 'none';
});
websiteText.addEventListener('mouseover', () => {
    websiteText.classList.add('blink');
});
websiteText.addEventListener('mouseout', () => {
    websiteText.classList.remove('blink');
    websiteText.style.animation = 'blink 1s infinite';
});
startGame();
