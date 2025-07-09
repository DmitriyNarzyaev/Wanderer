import { Sprite } from "pixi.js";
import Container = PIXI.Container;

export default class Exit_Key extends Container {
    private _exitKey1:PIXI.Sprite;
    private _exitKey2:PIXI.Sprite;
    private _exitKey3:PIXI.Sprite;
    private _keyWidth:number = 15;
    private _keyHeight:number = 30;

    constructor() {
        super();
        this.initialKey();
    }

    private initialKey():void {
        this._exitKey1 = Sprite.from("exitkey");
        this._exitKey1.tint = 0x993535;
        this._exitKey1.width = this._keyWidth;
        this._exitKey1.height = this._keyHeight;
        this._exitKey1.x = 45;
        this._exitKey1.y = 485;
        this.addChild(this._exitKey1);

        this._exitKey2 = Sprite.from("exitkey");
        this._exitKey2.tint = 0x359935;
        this._exitKey2.width = this._keyWidth;
        this._exitKey2.height = this._keyHeight;
        this._exitKey2.x = 365;
        this._exitKey2.y = 45;
        this.addChild(this._exitKey2);

        this._exitKey3 = Sprite.from("exitkey");
        this._exitKey3.tint = 0x353599;
        this._exitKey3.width = this._keyWidth;
        this._exitKey3.height = this._keyHeight;
        this._exitKey3.x = 845;
        this._exitKey3.y = 165;
        this.addChild(this._exitKey3);
    }
}
