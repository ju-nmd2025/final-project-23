export default class Character {

    	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
//		this.isOnPlatForm = false;
	}

    draw() {
        fill ("orange");
        rect(this.x, this.y, this.w, this.h);

        //ears
        fill ("darkorange");
        triangle (this.x, this.y, this.x + 10, this.y - 10, this.x + 20, this.y);
        triangle (this.x + this.w - 20, this.y, this.x + this.w - 10, this.y - 10, this.x + this.w, this.y);

        // eyes
        fill ("white");
        rect (this.x + 10, this.y + 10, 10, 10);
        rect (this.x + 30, this.y + 10, 10, 10);

        fill ("black");
        rect (this.x + 12, this.y + 12, 6, 6);
        rect (this.x + 32, this.y + 12, 6, 6);
    }

    isColliding(character, platform) {
    if (platform.y === character.y + character.w && platform.x <= character.x + character.w) {
        return true;
    } else {
        return false;
    }
}
}