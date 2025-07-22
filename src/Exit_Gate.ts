import { Sprite } from "pixi.js";
import Container = PIXI.Container;

export default class Exit_Gate extends Container {
    public vortexContainer:PIXI.Container;
    public exitGateVortex:PIXI.Sprite;
    private _exitGateSprite:PIXI.Sprite;
    
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

        this.exitGateVortex = Sprite.from("vortex");
        this.exitGateVortex.x -= this.exitGateVortex.width/2;
        this.exitGateVortex.y -= this.exitGateVortex.height/2;
        this.exitGateVortex.alpha = 0;
        this.vortexContainer.addChild(this.exitGateVortex);

        this.vortexContainer.x += this._exitGateSprite.width/2;
        this.vortexContainer.y += this._exitGateSprite.height/2;
        this.vortexContainer.width = 0;
        this.vortexContainer.height = 0;
    }
}
