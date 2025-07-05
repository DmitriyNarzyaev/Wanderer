import { Sprite } from "pixi.js";
import Container = PIXI.Container;

export default class Wall extends Container {
    public wall: PIXI.Sprite
    private _wallSize:number = 40;

    constructor() {
        super();
        this.initialPlayer();
    }

    private initialPlayer():void {
        this.wall = Sprite.from("wall");
        this.addChild(this.wall);
    }
}
