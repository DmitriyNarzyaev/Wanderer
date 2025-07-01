import { Graphics } from "pixi.js";
import Container = PIXI.Container;

export default class Main_Container extends Container {
	public static readonly WIDTH:number = 1920;
	public static readonly HEIGHT:number = 1080;
	private _background: Graphics;

	constructor() {
		super();
		this.initialBackground();
	}

	private initialBackground():void {
		this._background = new Graphics;
		this._background.beginFill(0x00ff48);
		this._background.drawRect(0, 0, Main_Container.WIDTH, Main_Container.HEIGHT);
		this.addChild(this._background);
	}
}
