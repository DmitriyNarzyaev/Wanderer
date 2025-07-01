import { Graphics } from "pixi.js";
import Container = PIXI.Container;

export default class Player extends Container {
    public playerSpeed:number = 2.5;
    private _playerSize:number = 20;
    private _eyeSize:number = 4;

    constructor() {
        super();
        this.initialPlayer();
    }

    private initialPlayer():void {
        let player: Graphics = new Graphics;
        player.beginFill(0x999999);
        player.drawCircle(0, 0, this._playerSize);
        this.addChild(player);

        let eyeL: Graphics = new Graphics;
        player.beginFill(0x992222);
        player.drawCircle(-8, -5, this._eyeSize);
        this.addChild(eyeL);

        let eyeR: Graphics = new Graphics;
        player.beginFill(0x992222);
        player.drawCircle(8, -5, this._eyeSize);
        this.addChild(eyeR);
    }
}
