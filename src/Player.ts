import { Graphics } from "pixi.js";
import Container = PIXI.Container;

export default class Player extends Container {
    private _playerSize:number = 20;
    private _eyeSize:number = 4;

    constructor() {
        super();
        this.initialPlayer();
    }

    private initialPlayer():void {
        let player: PIXI.Graphics = new PIXI.Graphics;
        player.beginFill(0x999999);
        player.drawCircle(0, 0, this._playerSize);
        this.addChild(player);

        let eyeL: PIXI.Graphics = new PIXI.Graphics;
        player.beginFill(0x992222);
        player.drawCircle(-8, -5, this._eyeSize);
        this.addChild(eyeL);

        let eyeR: PIXI.Graphics = new PIXI.Graphics;
        player.beginFill(0x992222);
        player.drawCircle(8, -5, this._eyeSize);
        this.addChild(eyeR);
    }
}
