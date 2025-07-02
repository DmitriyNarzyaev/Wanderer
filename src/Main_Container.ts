import { Graphics } from "pixi.js";
import Container = PIXI.Container;
import Player from "./Player";
import Global from "./Global";
import Wall from "./Wall";
import Collision_Checking from "./Collision_Checking";

export default class Main_Container extends Container {
	public static readonly WIDTH:number = 1920;
	public static readonly HEIGHT:number = 1080;
	private BUTTON_LEFT:boolean = false;
	private BUTTON_RIGHT:boolean = false;
	private BUTTON_UP:boolean = false;
	private BUTTON_DOWN:boolean = false;
	private _background: Graphics;
	private _player:Player;
	private _wall:Wall

	constructor() {
		super();
		this.initialBackground();
		this.initialPlayer();
		this.initialWalls();

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

	private initialWalls():void {
		this._wall = new Wall;
		this._wall.x = 500;
		this._wall.y = 500;
		this.addChild(this._wall);
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
		this._player.playerSpeed = 2.5;
		this._player.playerDiagSpeed = 1.75;
    }

	private ticker():void {
		let canMove:boolean = true;
		if (this.BUTTON_LEFT == true && this.BUTTON_RIGHT == false && this.BUTTON_UP == false && this.BUTTON_DOWN == false) {
			this._player.x -= this._player.playerSpeed;
			this._player.rotation = Math.PI*1.5;
		}
		if (this.BUTTON_RIGHT == true && this.BUTTON_LEFT == false && this.BUTTON_UP == false && this.BUTTON_DOWN == false) {
			this._player.x += this._player.playerSpeed;
			this._player.rotation = Math.PI/2;
		}
		if (this.BUTTON_UP == true && this.BUTTON_LEFT == false && this.BUTTON_RIGHT == false && this.BUTTON_DOWN == false) {
			this._player.y -= this._player.playerSpeed;
			this._player.rotation = 0;
		}
		if (this.BUTTON_DOWN == true && this.BUTTON_LEFT == false && this.BUTTON_RIGHT == false && this.BUTTON_UP == false) {
			this._player.y += this._player.playerSpeed;
			this._player.rotation = Math.PI;
		}

		if (this.BUTTON_LEFT == true && this.BUTTON_UP == true) {
			this._player.rotation = (Math.PI*7)/4;
			this._player.x -= this._player.playerDiagSpeed;
			this._player.y -= this._player.playerDiagSpeed;
		}
		if (this.BUTTON_RIGHT == true && this.BUTTON_UP == true) {
			this._player.rotation = Math.PI/4;
			this._player.x += this._player.playerDiagSpeed;
			this._player.y -= this._player.playerDiagSpeed;
		}
		if (this.BUTTON_LEFT == true && this.BUTTON_DOWN == true) {
			this._player.rotation = (Math.PI*5)/4;
			this._player.x -= this._player.playerDiagSpeed;
			this._player.y += this._player.playerDiagSpeed;
		}
		if (this.BUTTON_RIGHT == true && this.BUTTON_DOWN == true) {
			this._player.rotation = (Math.PI*3)/4;
			this._player.x += this._player.playerDiagSpeed;
			this._player.y += this._player.playerDiagSpeed;
		}

		if (
			Collision_Checking.horizontal(this._player, this._wall) &&
			Collision_Checking.vertical(this._player, this._wall)
		){
			// this._player.playerSpeed = 0;
			// this._player.playerDiagSpeed = 0;
			this._wall.wall.tint = 0xff0000;
		} else {
			this._wall.wall.tint = 0xffffff;
		}
	}
}
