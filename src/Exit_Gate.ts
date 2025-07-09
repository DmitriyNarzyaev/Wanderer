import { Sprite } from "pixi.js";
import Container = PIXI.Container;

export default class Exit_Gate extends Container {
    private _exitGate:PIXI.Sprite;
    
    constructor() {
        super();
        this.initialKey();
    }

    private initialKey():void {
        this._exitGate = Sprite.from("exitgate");
        this.addChild(this._exitGate);
    }
}
