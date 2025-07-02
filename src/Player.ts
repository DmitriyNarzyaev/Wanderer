import { Graphics } from "pixi.js";
import Container = PIXI.Container;

export default class Player extends Container {
    public playerSpeed:number = 2.5;
    public playerDiagSpeed:number = 1.75;
    private _playerSize:number = 40;
    private _eyeSize:number = 4;


    constructor() {
        super();
        this.initialPlayer();
    }

    private initialPlayer():void {
        let player:Graphics = new Graphics;
        player.beginFill(0x999999);
        player.drawRect(-this._playerSize/2, -this._playerSize/2, this._playerSize, this._playerSize);
        this.addChild(player);

        let eyeL: Graphics = new Graphics;
        eyeL.beginFill(0x992222);
        eyeL.drawCircle(-this._playerSize/4, -this._playerSize/4, this._eyeSize);
        this.addChild(eyeL);

        let eyeR: Graphics = new Graphics;
        eyeL.beginFill(0x992222);
        eyeL.drawCircle(this._playerSize/4, -this._playerSize/4, this._eyeSize);
        this.addChild(eyeR);
    }
}
