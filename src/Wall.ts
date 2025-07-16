import { Sprite } from "pixi.js";
import Container = PIXI.Container;
import Main_Container from "./Main_Container";

export default class Wall extends Container {
    private _wall: PIXI.Sprite;
    private _level:ILevel;

    constructor(level:ILevel) {
        super();
        this._level = level;

        for (let iterator:number = 0; iterator < this._level.items.length; iterator++) {
            if (this._level.items[iterator].type == "wall") {
                let blockX:number = this._level.items[iterator].width * this._level.items[iterator].x;
                let blockY:number = this._level.items[iterator].height * this._level.items[iterator].y;
                this._wall = Sprite.from("wall");
                
                this.addChild(this._wall);
                this._wall.x = blockX;
                this._wall.y = blockY;
                Main_Container.wallArray.push(this._wall);
            }
		}
    }
}
