import { Character } from "./character.js";
import { Platform } from "./platform.js";

let character;
let platforms = [];
let score = 0;
let gameOver = false;

function setup() {
    createCanvas(400, 600);

    //character
    character = new Character(200, 500, 50, 50);

    //starting
    platforms.push(new Platform(160, 570, 100, 20));
    character.y = 570 - character.h;

    //clouds platform
    for (let i = 0; i < 10; i++) {
        let x = random(20, 320);
        let y = i * 60;
        platforms.push(new Platform(x, y, 80, 20));
    }

    // obstacles
    for (let i = 0; i < 2; i++) {
        let x = random(40, 360);
        let y = random(50, 500);
        platforms.push(new Platform(x, y, 0, 0, true));
    }

    textSize(24);
    textAlign(LEFT, TOP);
}

function draw() {
    background(200, 220, 255);

    if (gameOver) {
        fill("red");
        textAlign(CENTER, CENTER);
        text("Game Over", width / 2, height / 2);
        text("Press R to Restart", width / 2, height / 2 + 40);
        return;
    }

    //character update
    character.update();
    character.draw();
    character.onGround = false;
    
    if (character.y < height / 2) {
        let diff = height / 2 - character.y;
        character.y = height / 2;

        platforms.forEach(p => {
            p.y += diff;

            if (!p.isObstacle && character.isColliding(p)) {
                character.y = p.y - character.h;
                character.vy = 0;
                character.onGround = true;
            }
        });

        score += int(diff);
    }


    for (let p of platforms) {
    p.update();
    p.draw();

    // obstacle - game over
    if (p.isObstacle) {
        let d = dist(
            character.x + character.w / 2,
            character.y + character.h / 2,
            p.x,
            p.y
        );
        if (d < 18) gameOver = true;
    }

    // platform collision
    if (!p.isObstacle && !p.broken && character.isColliding(p)) {
        character.y = p.y - character.h;
        character.vy = -12;

        if (p.type === "breaking") {
            p.broken = true;
        }
    }

    // reset platform
    if (p.y > height) {
        p.y = 0;
        p.x = random(20, 320);
        p.broken = false;
    }
}


    //score
    fill(0);
    textAlign(LEFT, TOP);
    text("Score: " + score, 10, 10);

    //game over
    if (character.y > height + 100) {
        gameOver = true;
    }
}

function keyPressed() {
    if (key === "R" || key === "r") {
        restartGame();
        return;
    }

    if (keyCode === LEFT_ARROW || key === "A") {
        character.moveLeft();
    } else if (keyCode === RIGHT_ARROW || key === "D") {
        character.moveRight();
    }
}

function keyReleased() {
    if (
        keyCode === LEFT_ARROW || key === "A" ||
        keyCode === RIGHT_ARROW || key === "D"
    ) {
        character.stop();
    }
}

//restart game
function restartGame() {
    score = 0;
    gameOver = false;
    platforms = [];

    character = new Character(200, 500, 50, 50);

    //starting platform
    platforms.push(new Platform(160, 570, 100, 20));
    character.y = 570 - character.h;

    //platform
    for (let i = 0; i < 10; i++) {
        let x = random(20, 320);
        let y = i * 60;
        let types = ["normal", "moving", "breaking"];
        let type = random(types);
        platforms.push(new Platform(x, y, 80, 20, false, type));

    }

    //obstacles
    for (let i = 0; i < 2; i++) {
        let x = random(40, 360);
        let y = random(50, 500);
        platforms.push(new Platform(x, y, 0, 0, true));
    }
}