export class Character {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.vx = 0; 
        this.vy = 0;
        this.gravity = 0.6;
        this.speed = 8; // Horizontal speed
        this.onGround = false;
    }

    update() {
    this.vy += this.gravity;
    this.y += this.vy;
    this.x += this.vx;

    this.onGround = false; // You can only stand on platforms now
}


   jump() {
        this.vy = -12;
    }
    // Move left
    moveLeft() {
        this.vx = -this.speed; 
    }

    // Move right
    moveRight() {
        this.vx = this.speed;
    }
    // Stop horizontal movement
    stop() {
        this.vx = 0;
    }

    // Check for collisions with platforms
    isColliding(platform) {
    return (
        this.vy >= 0 &&
        this.y + this.h <= platform.y + 5 &&
        this.y + this.h + this.vy >= platform.y &&
        this.x + this.w > platform.x &&
        this.x < platform.x + platform.w
    );
}


    // character
    draw() {
        push();

        // Body
        fill("orange");
        rect(this.x + this.w * 0.25, this.y + this.h * 0.4, this.w * 0.5, this.h * 0.6, 10);

        // Head
        fill("orange");
        ellipse(this.x + this.w / 2, this.y + this.h * 0.25, this.w * 0.6, this.h * 0.5);

        // Eyes
        fill("white");
        ellipse(this.x + this.w * 0.35, this.y + this.h * 0.25, this.w * 0.1, this.h * 0.1);
        ellipse(this.x + this.w * 0.65, this.y + this.h * 0.25, this.w * 0.1, this.h * 0.1);

        fill("black");
        ellipse(this.x + this.w * 0.35, this.y + this.h * 0.25, this.w * 0.05, this.h * 0.05);
        ellipse(this.x + this.w * 0.65, this.y + this.h * 0.25, this.w * 0.05, this.h * 0.05);

        // Arms
        stroke("orange");
        strokeWeight(4);
        line(this.x, this.y + this.h * 0.5, this.x + this.w * 0.25, this.y + this.h * 0.5); // left
        line(this.x + this.w * 0.75, this.y + this.h * 0.5, this.x + this.w, this.y + this.h * 0.5); // right

        // Legs
        line(this.x + this.w * 0.35, this.y + this.h, this.x + this.w * 0.35, this.y + this.h + this.h * 0.25);
        line(this.x + this.w * 0.65, this.y + this.h, this.x + this.w * 0.65, this.y + this.h + this.h * 0.25);

        pop();
    }
}

