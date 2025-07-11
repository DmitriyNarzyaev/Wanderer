import { Sprite } from "pixi.js";
import Container = PIXI.Container;
import Main_Container from "./Main_Container";

export default class Exit_Key extends Container {
    private _exitKey:PIXI.Sprite;
    private _exitKey2:PIXI.Sprite;
    private _exitKey3:PIXI.Sprite;
    private _keyWidth:number = 15;
    private _keyHeight:number = 30;

    constructor() {
        super();
        this.initialKey();
    }

    private initialKey():void {
        this._exitKey = Sprite.from("exitkey");
        this._exitKey.tint = 0x993535;
        this._exitKey.width = this._keyWidth;
        this._exitKey.height = this._keyHeight;
        this.addChild(this._exitKey);
    }
}
