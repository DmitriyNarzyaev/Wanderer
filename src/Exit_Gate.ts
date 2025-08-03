import { Sprite } from "pixi.js";
import Container = PIXI.Container;

export default class Exit_Gate extends Container {
    public vortexContainer:PIXI.Container;
    public exitGateVortex:PIXI.Sprite;
    private _exitGateSprite:PIXI.Sprite;
    private _level:ILevel;
    
    constructor(level:ILevel) {
        super();
        this._level = level;
        this.initialGate();
        this.initialVortex();
    }

    private initialGate():void {
        let gateTexture:any = new PIXI.Texture(PIXI.utils.TextureCache["spritemap"]);
        let borders:PIXI.Rectangle = new PIXI.Rectangle(0, 0, this._level.items[1].width, this._level.items[1].height);
        gateTexture.frame = borders;
        this._exitGateSprite = new PIXI.Sprite(gateTexture);
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
