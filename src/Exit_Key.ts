import { Sprite } from "pixi.js";
import Container = PIXI.Container;
import Main_Container from "./Main_Container";

export default class Exit_Key extends Container {
    private _level:ILevel;
    private _exitKey:PIXI.Sprite;

    constructor(level:ILevel) {
        super();
        this._level = level;

        for (let iterator:number = 0; iterator < this._level.items.length; iterator++) {
            if (this._level.items[iterator].type == "key") {
                this._exitKey = Sprite.from("exitkey");
                this._exitKey.tint = 0x888888;
                this._exitKey.x = this._level.items[iterator].x;
                this._exitKey.y = this._level.items[iterator].y;
                this._exitKey.width = this._level.items[iterator].width;
                this._exitKey.height = this._level.items[iterator].height;
                this.addChild(this._exitKey);
                Main_Container.keyArray.push(this._exitKey);
            }
        }
    }
}
