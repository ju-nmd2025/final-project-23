export default class Character {

    	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
        this.headRadius = w * 0.75;
        this.color = 'orange';
//		this.isOnPlatForm = false;
	}

    draw() {const cat = {
            color: this.color,
            head: { x: this.x, y: this.y, radius: this.headRadius },
            body: { x: this.x, y: this.y + this.headRadius / 2, w: this.w, h: this.h },
            legs: [
                { x: this.x - this.w / 2, y: this.y + this.h, w: 10, h: 15 },
                { x: this.x + this.w / 2 - 10, y: this.y + this.h, w: 10, h: 15 },
                { x: this.x - this.w / 2, y: this.y + this.h - 10, w: 10, h: 15 },
                { x: this.x + this.w / 2 - 10, y: this.y + this.h - 10, w: 10, h: 15 },
            ],
            tail: { fromX: this.x + this.w / 2, fromY: this.y + this.h, toX: this.x + this.w / 2 + 10, toY: this.y + this.h + 40 },
            eyes: [
                { x: this.x - 10, y: this.y + 10 },
                { x: this.x + 10, y: this.y + 10 },
            ],
            nose: { x: this.x, y: this.y + 15 },
            ears: [
                { x1: this.x - 20, y1: this.y, x2: this.x - 5, y2: this.y - 15, x3: this.x, y3: this.y },
                { x1: this.x + 20, y1: this.y, x2: this.x + 5, y2: this.y - 15, x3: this.x, y3: this.y },
            ],
        };

        return cat;
    }
}

// Test
const myCat = new Character(50, 50, 40, 40);
console.log(myCat.draw());
 

    isColliding(character, platform);
    if (platform.y === character.y + character.w && platform.x <= character.x + character.w) {
        return true;
    } else {
        return false;
    }