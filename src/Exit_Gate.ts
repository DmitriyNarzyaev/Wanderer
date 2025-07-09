import { Sprite } from "pixi.js";
import Container = PIXI.Container;

export default class Exit_Gate extends Container {
    public vortexContainer:PIXI.Container;
    private _exitGateSprite:PIXI.Sprite;
    private _exitGateVortex:PIXI.Sprite;
    
    constructor() {
        super();
        this.initialGate();
        this.initialVortex();
    }

    private initialGate():void {
        this._exitGateSprite = Sprite.from("exitgate");
        this.addChild(this._exitGateSprite);
    }

    private initialVortex():void {
        this.vortexContainer = new PIXI.Container;
        this.addChild(this.vortexContainer);

        this._exitGateVortex = Sprite.from("vortex");
        this._exitGateVortex.width = 60;
        this._exitGateVortex.height = 60;
        this._exitGateVortex.x -= this._exitGateVortex.width/2;
        this._exitGateVortex.y -= this._exitGateVortex.height/2;
        this.vortexContainer.addChild(this._exitGateVortex);

        this.vortexContainer.x += this._exitGateSprite.width/2;
        this.vortexContainer.y += this._exitGateSprite.height/2;
    }
}
