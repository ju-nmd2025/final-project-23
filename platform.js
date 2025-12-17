export class Platform {
    constructor(x, y, w = 80, h = 20, isObstacle = false) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.isObstacle = isObstacle;
    }

draw() {
    push();
    noStroke();

    let floatY = this.y + sin(frameCount * 0.02) * 5;

    fill(255, 230); 
    ellipse(this.x + this.w * 0.2, floatY + this.h * 0.5, this.w * 0.4, this.h * 1.2);
    ellipse(this.x + this.w * 0.5, floatY + this.h * 0.5, this.w * 0.6, this.h * 1.5);
    ellipse(this.x + this.w * 0.8, floatY + this.h * 0.5, this.w * 0.4, this.h * 1.2);

    if (this.isObstacle) {
    fill("pink");
    ellipse(this.x, floatY, 14, 14);
}

    pop(); }
    

}