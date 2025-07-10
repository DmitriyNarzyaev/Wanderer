import { Sprite } from "pixi.js";
import Container = PIXI.Container;

export default class Player extends Container {
    public playerSpeed:number = 2.5;
    public playerDiagSpeed:number = 1.75;
    public playerCar:PIXI.Sprite;
    private _playerCarWidth:number = 40;
    private _playerCarHeight:number = 40;

    constructor() {
        super();
        this.initialPlayer();
    }

    private initialPlayer():void {
        this.playerCar = Sprite.from("car");
        this.playerCar.x -= this.playerCar.width/2;
        this.playerCar.y -= this.playerCar.height/2;
        this.playerCar.width = this._playerCarWidth;
        this.playerCar.height = this._playerCarHeight;
        this.addChild(this.playerCar);
    }
}
