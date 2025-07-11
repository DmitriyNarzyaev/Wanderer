import { Sprite } from "pixi.js";
import Container = PIXI.Container;
import Main_Container from "./Main_Container";

export default class Exit_Key extends Container {
    private _exitKey:PIXI.Sprite;
    private _keyWidth:number = 15;
    private _keyHeight:number = 30;

    constructor() {
        super();
        this.initialKey(45, 485);
        this.initialKey(365, 45);
        this.initialKey(845, 165);
    }

    private initialKey(keyX:number, keyY:number):void {
        this._exitKey = Sprite.from("exitkey");
        this._exitKey.tint = 0x888888;
        this._exitKey.width = this._keyWidth;
        this._exitKey.height = this._keyHeight;
		this._exitKey.x = keyX;
		this._exitKey.y = keyY;
        this.addChild(this._exitKey);
        Main_Container.keyArray.push(this._exitKey);
    }
}
