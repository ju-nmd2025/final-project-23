import { Character } from "./Character.js";
import { Platform } from "./platform.js";

let character;
let platforms = [];
let score = 0;
let gameOver = false;

function setup() {
    createCanvas(400, 600);

    character = new Character(200, 500, 50, 50);

    platforms.push(new Platform(160, 570, 100, 20)); 
    character.y = 570 - character.h;

    for (let i = 0; i < 10; i++) {
        let x = random(20, 320);
        let y = i * 60;
        platforms.push(new Platform(x, y, 80, 20));
    }

    textSize(24);
    textAlign(LEFT, TOP);
}

function draw() {

    if (gameOver) {
        background(200, 220, 255);
        fill("red");
        textAlign(CENTER, CENTER);
        text("Game Over", width / 2, height / 2);
        text("Press R to Restart", width / 2, height / 2 + 40);
        return;
    }

    background(200, 220, 255);

    character.update();
    character.draw();

    character.onGround = false;

    if (character.y < height / 2) {
        let diff = height / 2 - character.y;
        character.y = height / 2;

        platforms.forEach(p => {
            p.y += diff;

            if (character.isColliding(p)) {
                character.y = p.y - character.h;
                character.vy = 0;
                character.onGround = true;
            }
        });

        score += int(diff);
    }

    for (let p of platforms) {
        p.draw();

        if (character.isColliding(p)) {
            character.y = p.y - character.h;
            character.vy = 0;
            character.onGround = true;
            character.jump();
        }

        if (p.y > height) {
            p.y = 0;
            p.x = random(20, 320);
        }
    }

    //score
    fill(0);
    textAlign(LEFT, TOP);
    text("Score: " + score, 10, 10);

    //gameover
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

//restart
function restartGame() {
    score = 0;
    gameOver = false;

    platforms = [];
    character = new Character(200, 500, 50, 50);

    platforms.push(new Platform(160, 570, 100, 20));
    character.y = 570 - character.h;

    for (let i = 0; i < 10; i++) {
        let x = random(20, 320);
        let y = i * 60;
        platforms.push(new Platform(x, y, 80, 20));
    }
}