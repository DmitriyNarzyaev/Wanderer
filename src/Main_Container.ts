import { Graphics } from "pixi.js";
import Container = PIXI.Container;
import Player from "./Player";

export default class Main_Container extends Container {
	public static readonly WIDTH:number = 1920;
	public static readonly HEIGHT:number = 1080;
	private _background: Graphics;
	private _player:Player;

	constructor() {
		super();
		this.initialBackground();
		this.initialPlayer();
	}

	private initialBackground():void {
		this._background = new Graphics;
		this._background.beginFill(0x00ff48);
		this._background.drawRect(0, 0, Main_Container.WIDTH, Main_Container.HEIGHT);
		this.addChild(this._background);
	}

	private initialPlayer():void {
		this._player = new Player;
		this._player.x = Main_Container.WIDTH/2 - this._player.width/2;
		this._player.y = Main_Container.HEIGHT/2 - this._player.height/2;
		this.addChild(this._player);
	}
}
