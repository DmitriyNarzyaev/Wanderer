import { Graphics } from "pixi.js";
import Container = PIXI.Container;
import Player from "./Player";
import Global from "./Global";

export default class Main_Container extends Container {
	public static readonly WIDTH:number = 1920;
	public static readonly HEIGHT:number = 1080;
	private BUTTON_LEFT:boolean = false;
	private BUTTON_RIGHT:boolean = false;
	private BUTTON_UP:boolean = false;
	private BUTTON_DOWN:boolean = false;
	private _background: Graphics;
	private _player:Player;

	constructor() {
		super();
		this.initialBackground();
		this.initialPlayer();

		window.addEventListener("keydown",
			(e:KeyboardEvent) => {this._player
			this.keyDownHandler(e);
		},);
		window.addEventListener("keyup",
			(e:KeyboardEvent) => {
			this.keyUpHandler(e);
		},);
		Global.PIXI_APP.ticker.add(this.ticker, this);
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
		this._player.interactive = true;
		this.addChild(this._player);
	}

	private keyDownHandler(e:KeyboardEvent):void {
		if (e.code == "ArrowLeft") {
			this.BUTTON_LEFT = true;
		}
		if (e.code == "ArrowRight") {
			this.BUTTON_RIGHT = true;
		}
		if (e.code == "ArrowUp") {
			this.BUTTON_UP = true;
		}
		if (e.code == "ArrowDown") {
			this.BUTTON_DOWN = true;
		}
	}

	private keyUpHandler(e:KeyboardEvent):void {
		if (e.code == "ArrowLeft") {
			this.BUTTON_LEFT = false;
		}
		if (e.code == "ArrowRight") {
			this.BUTTON_RIGHT = false;
		}
		if (e.code == "ArrowUp") {
			this.BUTTON_UP = false;
		}
		if (e.code == "ArrowDown") {
			this.BUTTON_DOWN = false;
		}
    }

	private ticker():void {
		if (this.BUTTON_LEFT == true) {
			this._player.x -= this._player.playerSpeed;
		}
		if (this.BUTTON_RIGHT == true) {
			this._player.x += this._player.playerSpeed;
		}
		if (this.BUTTON_UP == true) {
			this._player.y -= this._player.playerSpeed;
		}
		if (this.BUTTON_DOWN == true) {
			this._player.y += this._player.playerSpeed;
		}
	}
}
