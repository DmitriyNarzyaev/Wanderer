import { Sprite } from "pixi.js";
import Container = PIXI.Container;

export default class Player extends Container {
    public playerSpeed:number = 2.5;
    public playerDiagSpeed:number = 1.75;
    public playerCar:PIXI.Sprite;

    constructor() {
        super();
        this.initialPlayer();
        this.testBG();
    }

    private initialPlayer():void {
        this.playerCar = Sprite.from("car");
        this.playerCar.x -= this.playerCar.width/2;
        this.playerCar.y -= this.playerCar.height/2;
        this.addChild(this.playerCar);
    }

    private testBG():void {
        let bg:PIXI.Graphics = new PIXI.Graphics
        bg
            .beginFill(0x550055)
            .drawRect(0, 0, this.playerCar.width, this.playerCar.height);

            bg.x -= this.playerCar.width/2;
            bg.y -= this.playerCar.height/2;
        this.addChildAt(bg, 0);

    }
}
