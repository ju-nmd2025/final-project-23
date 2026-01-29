export class Platform {
    constructor(x, y, w = 80, h = 20, isObstacle = false, type = "normal") {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.isObstacle = isObstacle;
        this.type = type; // "normal", "moving", "breaking"

        // moving platform
        this.dir = 1;
        this.speed = 1.5;
        this.range = 60;
        this.startX = x;

        // breaking platform
        this.broken = false;
    }

    update() {
        if (this.type === "moving") {
            this.x += this.speed * this.dir;
            if (this.x > this.startX + this.range || this.x < this.startX - this.range) {
                this.dir *= -1;
            }
        }
    }

    draw() {
        if (this.broken) return;

        push();
        noStroke();

        let floatY = this.y + sin(frameCount * 0.02) * 5;

        // color by type
        if (this.type === "normal") fill(255, 230);
        if (this.type === "moving") fill(180, 230, 255);
        if (this.type === "breaking") fill(255, 200, 200);

        ellipse(this.x + this.w * 0.2, floatY + this.h * 0.5, this.w * 0.4, this.h * 1.2);
        ellipse(this.x + this.w * 0.5, floatY + this.h * 0.5, this.w * 0.6, this.h * 1.5);
        ellipse(this.x + this.w * 0.8, floatY + this.h * 0.5, this.w * 0.4, this.h * 1.2);

        // obstacle stays the same
        if (this.isObstacle) {
            fill("pink");
            ellipse(this.x, floatY, 14, 14);
        }

        pop();
    }
}

