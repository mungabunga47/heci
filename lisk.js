if (!("classList" in document.documentElement)) {
    Object.defineProperty(HTMLElement.prototype, 'classList', {
        get: function() {
            var self = this;
            function update(fn) {
                return function(value) {
                    var classes = self.className.split(/\s+/),
                        index = classes.indexOf(value);
                    fn(classes, index, value);
                    self.className = classes.join(" ");
                }
            }
            return {
                add: update(function(classes, index, value) {
                    if (!~index) classes.push(value);
                }),
                remove: update(function(classes, index, value) {
                    if (~index) classes.splice(index, 1);
                })
            };
        }
    });
}

var gameArea = document.getElementById('gameArea');
var paddle = document.getElementById('paddle');
var message = document.getElementById('message');
var continueText = document.getElementById('continueText');
var websiteText = document.getElementById('websiteText');
var bulletSound = new Audio('tilt.mp3');
var gameOverSound = new Audio('gameover.mp3'); 

websiteText.addEventListener('mouseover', function() {
    this.textContent = "INSERT COIN TO PLAY";
});

var targetText = "İSMAİLHAKKIGÜLER";
var bullets = [];
var targets = [];
var gameOver = false;

gameArea.addEventListener('mousemove', function(e) {
    var rect = gameArea.getBoundingClientRect();
    var mouseX = e.clientX - rect.left;
    paddle.style.left = Math.max(0, Math.min(mouseX - paddle.offsetWidth / 2, gameArea.offsetWidth - paddle.offsetWidth)) + 'px';
});

gameArea.addEventListener('click', function() {
    if (gameOver) return;
    bulletSound.currentTime = 0; 
    bulletSound.play(); 

    var bullet = document.createElement('div');
    bullet.className = 'bullet';
    bullet.style.left = paddle.offsetLeft + paddle.offsetWidth / 2 + 'px';
    bullet.style.bottom = paddle.offsetHeight + 10 + 'px';
    gameArea.appendChild(bullet);
    bullets.push(bullet);
});

function createTargets() {
    var x = 6; 
    var y = 11;
    for (var i = 0; i < targetText.length; i++) {
        var char = targetText[i];
        var target = document.createElement('div');
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
        
        var targetWidth = target.offsetWidth - 1; 
        x += targetWidth; 
    }
}

function updateGame() {
    if (gameOver) return;
  
   
    for (var index = bullets.length - 1; index >= 0; index--) {
        var bullet = bullets[index];
        bullet.style.top = bullet.offsetTop - 3 + 'px'; 
        
        if (bullet.offsetTop < 0) {
            bullet.parentNode.removeChild(bullet); 
            bullets.splice(index, 1);
        } else {
            for (var tIndex = targets.length - 1; tIndex >= 0; tIndex--) {
                var target = targets[tIndex];
                if (isColliding(bullet, target)) {
                    
                    if (bullet.parentNode) bullet.parentNode.removeChild(bullet);
                    if (target.parentNode) target.parentNode.removeChild(target);
                    
                    bullets.splice(index, 1);
                    targets.splice(tIndex, 1);

                    if (targets.length === 0) {
                        gameOver = true;
                        gameOverSound.currentTime = 0;
                        gameOverSound.play(); 

                        message.style.display = 'block';
                        continueText.style.display = 'block';
                        continueText.classList.add('blink');
                    }
                    break; 
                }
            }
        }
    }
    
   
    if (window.requestAnimationFrame) {
        requestAnimationFrame(updateGame);
    } else {
        setTimeout(updateGame, 1000 / 60);
    }
}

function isColliding(bullet, target) {
    var bulletRect = bullet.getBoundingClientRect();
    var targetRect = target.getBoundingClientRect();
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
    
    
    for (var i = 0; i < targets.length; i++) {
        if (targets[i].parentNode) targets[i].parentNode.removeChild(targets[i]);
    }
    for (var j = 0; j < bullets.length; j++) {
        if (bullets[j].parentNode) bullets[j].parentNode.removeChild(bullets[j]);
    }
    
    targets = [];
    bullets = [];
    createTargets();
    updateGame();
}

message.addEventListener('click', startGame);
continueText.addEventListener('click', startGame);

gameArea.addEventListener('click', function() {
    websiteText.style.display = 'none';
});

websiteText.addEventListener('mouseover', function() {
    websiteText.classList.add('blink');
});

websiteText.addEventListener('mouseout', function() {
    websiteText.classList.remove('blink');
    websiteText.style.animation = 'blink 1s infinite';
});

startGame();
