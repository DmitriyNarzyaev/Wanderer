import { Graphics } from "pixi.js";
import Container = PIXI.Container;

export default class Wall extends Container {
    public wall: Graphics
    private _wallSize:number = 40;

    constructor() {
        super();
        this.initialWall();
    }

    private initialWall():void {
        this.wall = new Graphics;
        this.wall.beginFill(0x555555);
        this.wall.drawRect(0, 0, this._wallSize, this._wallSize);
        this.addChild(this.wall);
    }
}
