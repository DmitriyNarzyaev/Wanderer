import { Sprite } from "pixi.js";
import Container = PIXI.Container;

export default class Player extends Container {
    public playerSpeed:number = 2.5;
    public playerDiagSpeed:number = 1.75;
    public playerCar:PIXI.Sprite;
    private _level:ILevel;

    constructor(level:ILevel) {
        super();
        this._level = level;
        this.initialPlayer();
    }

    private initialPlayer():void {
        // this.playerCar = Sprite.from("car");
        // this.playerCar.x -= this.playerCar.width/2;
        // this.playerCar.y -= this.playerCar.height/2;
        // this.playerCar.width = this._playerCarWidth;
        // this.playerCar.height = this._playerCarHeight;
        // this.addChild(this.playerCar);

        let playerTexture:any = new PIXI.Texture(PIXI.utils.TextureCache["spritemap"]);
        let borders:PIXI.Rectangle = new PIXI.Rectangle(60, 0, this._level.items[0].width, this._level.items[0].height);
        playerTexture.frame = borders;
        this.playerCar = new PIXI.Sprite(playerTexture);

        this.playerCar.x -= this.playerCar.width/2;
        this.playerCar.y -= this.playerCar.height/2;

        this.addChild(this.playerCar);
    }
}
