import { Character } from "./Character.js";
import { Platform } from "./platform.js";

let character;
let platforms = [];
let score = 0;

function setup() {
    createCanvas(400, 600);

    // Create the character
    character = new Character(200, 500, 50, 50);

    // Create multiple platforms
    for (let i = 0; i < 10; i++) {
        let x = random(20, 320);
        let y = i * 60;
        platforms.push(new Platform(x, y, 80, 20));
    }

    textSize(24);
    textAlign(LEFT, TOP);
}

function draw() {
    background(200, 220, 255);

    // Character update and draw
    character.update();
    character.draw();

    // Scrolling effect
    if (character.y < height / 2) {
        let diff = (height / 2) - character.y;
        character.y = height / 2;
        platforms.forEach(p => p.y += diff);
        score += int(diff); // increase score as player rises
    }

    // Draw platforms and handle collisions
    for (let p of platforms) {
        p.draw();

        if (character.isColliding(p)) {
            character.jump();
        }

        // Recycle platform if it goes off bottom
        if (p.y > height) {
            p.y = 0;
            p.x = random(20, 320);
        }
    }

    // Draw score
    fill(0);
    text("Score: " + score, 10, 10);

    // Lose condition
    if (character.y > height) {
        noLoop();
        fill("red");
        textAlign(CENTER, CENTER);
        text("Game Over", width / 2, height / 2);
    }
}

function keyPressed() {
    if (key === " " && character.onGround) {
        character.jump();
    }
}
