import { Sprite } from "pixi.js";
import Container = PIXI.Container;
import Main_Container from "./Main_Container";

export default class Wall extends Container {
    private _wall: PIXI.Sprite;
    private _level:ILevel;

    constructor(level:ILevel) {
        super();
        this._level = level;
        this.stageLoader();
    }

    private stageLoader():void {
		for (let iterator:number = 0; iterator < this._level.walls.length; iterator++) {
			let blockX:number = this._level.walls[iterator].width * this._level.walls[iterator].x;
			let blockY:number = this._level.walls[iterator].height * this._level.walls[iterator].y;
			this._wall = Sprite.from("wall");
			
            this.addChild(this._wall);
			this._wall.x = blockX;
			this._wall.y = blockY;
			Main_Container.wallArray.push(this._wall);
		}
	}
}
