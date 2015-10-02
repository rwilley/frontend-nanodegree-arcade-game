// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x,
    this.y = y,
    this.speed = speed,
    this.sprite = 'images/enemy-bug.png'
};

// Update the enemy's position, required method for game
Enemy.prototype.update = function(dt) {
    this.y * dt;
    this.x = this.x + this.speed * dt;
    if (this.x + 100 >= 505) {
        this.x = -300;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function (x, y) {
this.x = x,
this.y = y,
speed = 20,
this.sprite = "images/char-boy.png"
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key){
    switch(key) {
        case "left":
            this.x -= 40;
            break;
        case "up":
            this.y -= 40;
            break;
        case "right":
            this.x += 40;
            break;
        case "down":
            this.y += 40;
            break;
    }

    //checks boundry
    if(this.x < 0) {
        this.x = 0;
    } else if (this.y < 0) {
        this.y = 0;
    } else if (this.x + 100 >= 505) {
        this.x = 505-100;
    } else if (this.y + 200 >= 606) {
        this.y = 606 - 200;
    }
};

Player.prototype.checkCollisions = function() {
    for(var i = 0; i < allEnemies.length; i++) {
        if (player.x < allEnemies[i].x + 50 &&
        player.x + 50 > allEnemies[i].x &&
        player.y < allEnemies[i].y + 50 &&
        player.y + 50 > allEnemies[i].y) {
            console.log("collision");
            alert("Opps, a bug got you. Time to try again.")
            player.x = 400;
            player.y = 400;
        }
    }
};

Player.prototype.checkFinished = function() {
    if(player.y < 2) {
        alert("You WIN!")
        player.x = 400;
        player.y = 400;
    }
};

Player.prototype.update = function(){
    Player.prototype.checkCollisions();
    Player.prototype.checkFinished();
};

//Enemies
var allEnemies = new Array();

var enemyOne = new Enemy(0, 50, 200);

var enemyTwo = new Enemy(-200, 135, 100);

var enemyThree = new Enemy(-50, 220, 75);

allEnemies.push(enemyOne, enemyTwo, enemyThree);

//Player
var player = new Player(400, 403);


// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
