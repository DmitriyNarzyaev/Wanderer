import Container = PIXI.Container;
import Player from "./Player";
import Global from "./Global";
import Collision_Checking from "./Collision_Checking";
import Start_Menu from "./Start_Menu";
import Button from "./Button";
import Wall from "./Wall";
import { Sprite } from "pixi.js";
import Exit_Key from "./Exit_Key";
import Exit_Gate from "./Exit_Gate";
import Score_Menu from "./Score_Menu";

export default class Main_Container extends Container {
	public static readonly WIDTH:number = 1280;
	public static readonly HEIGHT:number = 800;
	public static wallArray:Sprite[] = [];
	public static keyArray:Sprite[] = [];
	private BUTTON_LEFT:boolean = false;
	private BUTTON_RIGHT:boolean = false;
	private BUTTON_UP:boolean = false;
	private BUTTON_DOWN:boolean = false;
	private _startMenuContainer:Container;
	private _startMenu:Start_Menu;
	private _button:Button;
	private _background:PIXI.Graphics;
	private _player:Player;
	private _exitGate:Exit_Gate;
	private _wall:Wall
	private _key:Exit_Key
	private _keyIterator:number = 0;
	private _scoreMenu:Score_Menu;
	public static jsonLoader:XMLHttpRequest;
	private _levelIterator:number = 1;
	private _level:ILevel;

	constructor() {
		super();
		this._startMenuContainer = new Container;
		this.addChild(this._startMenuContainer);
		this.pictureLoader();
	}

	private pictureLoader():void {
		const picLoader:PIXI.Loader = new PIXI.Loader();
		picLoader
			.add("title", "title.jpg")
			.add("wall", "wall.png")
			.add("exitkey", "key.png")
			.add("exitgate", "exit.png")
			.add("vortex", "vortex.png")
			.add("car", "gamer.png")
			picLoader.load((loader, resources)=> {
			this.initialStartMenu("START");
		});
	}

	private initialStartMenu(buttonName:string):void {
		Main_Container.jsonLoader = new XMLHttpRequest();
		Main_Container.jsonLoader.responseType = "json";

		if(buttonName == "START"){
			Main_Container.jsonLoader.open("GET", "level1.json", true);
		} else if (buttonName == "LEVEL 2") {
			Main_Container.jsonLoader.open("GET", "level2.json", true);
		} else if (buttonName == "LEVEL 3") {
			Main_Container.jsonLoader.open("GET", "level1.json", true);
			this._levelIterator = 1;
		}

		Main_Container.jsonLoader.onreadystatechange = () => {
			this._startMenu = new Start_Menu();
			this._startMenu.x = Main_Container.WIDTH/2 - this._startMenu.width/2
			this._startMenuContainer.addChild(this._startMenu);

			this._button = new Button(buttonName, () => {this.startProject();});
			this._button.x = Main_Container.WIDTH/2 - this._button.width/2;
        	this._button.y = Main_Container.HEIGHT/3.5;
			this._startMenuContainer.addChild(this._button);
		};
		Main_Container.jsonLoader.send();
	}

	private startProject():void {
		this._level = Main_Container.jsonLoader.response;
		this.removeChild(this._startMenuContainer);
		this.initialBackground();
		this.initialWalls();
		this.initialExitKey();
		this.initialExitGate(this._level.items[1].x, this._level.items[1].y);
		this.initialPlayer(this._level.items[0].x, this._level.items[0].y);
		this.initialScoreMenu("0");

		window.addEventListener("keydown",
			(e:KeyboardEvent) => {
			this.keyDownHandler(e);
		},);
		window.addEventListener("keyup",
			(e:KeyboardEvent) => {
			this.keyUpHandler(e);
		},);
		Global.PIXI_APP.ticker.add(this.ticker, this);
	}

	private removeLevel():void {
		this._levelIterator ++;
		console.log("LEVEL " + this._levelIterator);
		this.removeChild(this._background);
		this.removeChild(this._wall);
		Main_Container.wallArray = [];
		this.removeChild(this._key);
		Main_Container.keyArray = [];
		this._keyIterator = 0;
		this.removeChild(this._scoreMenu);
		this.removeChild(this._exitGate);
		this.removeChild(this._player);
		Global.PIXI_APP.ticker.remove(this.ticker, this);

		this._startMenuContainer = new Container;
		this.addChild(this._startMenuContainer);
		this.initialStartMenu("LEVEL " + this._levelIterator);
	}

	private initialBackground():void {
		this._background = new PIXI.Graphics;
		this._background
            .beginFill(0x384428)
            .drawRect(0, 0, Main_Container.WIDTH, Main_Container.HEIGHT);
        this.addChild(this._background);
	}

	private initialWalls():void {
		this._wall = new Wall(Main_Container.jsonLoader.response);
		this.addChild(this._wall);
	}
	
	private initialExitKey():void {
		this._key = new Exit_Key(Main_Container.jsonLoader.response);
		this.addChild(this._key);
	}

	private initialExitGate(gateX:number, gateY:number):void {
		this._exitGate = new Exit_Gate;
		this._exitGate.x = gateX;
		this._exitGate.y = gateY;
		this.addChild(this._exitGate);
	}

	private initialPlayer(playerX:number, playerY:number):void {
		this._player = new Player;
		this._player.x = playerX;
		this._player.y = playerY;
		this.addChild(this._player);
	}

	private initialScoreMenu(score:string):void {
		this._scoreMenu = new Score_Menu(score);
		this._scoreMenu.x = Main_Container.WIDTH - this._scoreMenu.width -45;
		this._scoreMenu.y = 45;
		this.addChild(this._scoreMenu);
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
		this.keyCollision();

		if (this.BUTTON_LEFT == true && this.BUTTON_UP == false && this.BUTTON_RIGHT == false && this.BUTTON_DOWN == false) {
			this._player.rotation = Math.PI*1.5;
			this.leftMove(false);
		}else if (this.BUTTON_UP == true && this.BUTTON_RIGHT == false && this.BUTTON_DOWN == false && this.BUTTON_LEFT == false) {
			this._player.rotation = 0;
			this.upMove(false);
		}else if (this.BUTTON_RIGHT == true && this.BUTTON_DOWN == false && this.BUTTON_LEFT == false && this.BUTTON_UP == false) {
			this._player.rotation = Math.PI/2;
			this.rightMove(false);
		}else if (this.BUTTON_DOWN == true && this.BUTTON_LEFT == false && this.BUTTON_UP == false && this.BUTTON_RIGHT == false) {
			this._player.rotation = Math.PI;
			this.downMove(false);
		}

		if (this.BUTTON_LEFT == true && this.BUTTON_UP == true && this.BUTTON_RIGHT == false && this.BUTTON_DOWN == false) {
			this._player.rotation = (Math.PI*7)/4;
			this.upMove(true);
			this.leftMove(true);
		}
		if (this.BUTTON_UP == true && this.BUTTON_RIGHT == true && this.BUTTON_DOWN == false && this.BUTTON_LEFT == false) {
			this._player.rotation = Math.PI/4;
			this.upMove(true);
			this.rightMove(true);
		}
		if (this.BUTTON_DOWN == true && this.BUTTON_LEFT == true && this.BUTTON_UP == false && this.BUTTON_RIGHT == false) {
			this._player.rotation = (Math.PI*5)/4;
			this.downMove(true);
			this.leftMove(true);
		}
		if (this.BUTTON_RIGHT == true && this.BUTTON_DOWN == true && this.BUTTON_LEFT == false && this.BUTTON_UP == false) {
			this._player.rotation = (Math.PI*3)/4;
			this.downMove(true);
			this.rightMove(true);
		}

		if (this._keyIterator == 3) {
			let gateRotationIterator:number = 0;
			gateRotationIterator += 1;
			this._exitGate.vortexContainer.rotation -= gateRotationIterator/20;
			if (this._exitGate.exitGateVortex.alpha < 1) {
				this._exitGate.exitGateVortex.alpha += .008;
			} 
			else {
				this._exitGate.exitGateVortex.alpha == 1;
			}
			if (this._exitGate.vortexContainer.width < 60) {
				this._exitGate.vortexContainer.width += .5;
				this._exitGate.vortexContainer.height += .5;
			}

			if (
				Collision_Checking.horizontal(this._player, this._exitGate) &&
				Collision_Checking.vertical(this._player, this._exitGate) &&
				this._exitGate.vortexContainer.width >= 60
			){
				this.removeLevel();
			}
		}
	}

	private keyCollision():void {
		for (let iterator:number = 0; iterator < Main_Container.keyArray.length; iterator ++) {
			let key: Sprite = Main_Container.keyArray[iterator];
			if (
				Collision_Checking.horizontal(this._player, key) &&
				Collision_Checking.vertical(this._player, key)
			) {
				this._keyIterator++;
				this._key.removeChild(key);
				this.removeChild(this._scoreMenu);
				this.initialScoreMenu(this._keyIterator as unknown as string);
			}
		}
	}

	private leftMove(diag:boolean):void{
		let speed:number;
		let limitX:number;
		let canMove:boolean = true;

		if (diag) {
			speed = this._player.playerDiagSpeed
		} else {
			speed = this._player.playerSpeed
		}

		for (let iterator:number = 0; iterator < Main_Container.wallArray.length; iterator ++) {
			let wall: Sprite = Main_Container.wallArray[iterator];
			limitX = wall.x + wall.width + this._player.width/2;
			if (
				this._player.x >= limitX &&
				this._player.x - speed < limitX &&
				Collision_Checking.vertical(this._player, wall)
			) {
				this._player.x = limitX;
				canMove = false;
			}
		};
		if (canMove) {
			this._player.x -= speed;
		}
	}

	private upMove(diag:boolean):void{
		let speed:number;
		let limitY:number;
		let canMove:boolean = true;

		if (diag) {
			speed = this._player.playerDiagSpeed
		} else {
			speed = this._player.playerSpeed
		}

		for (let iterator:number = 0; iterator < Main_Container.wallArray.length; iterator ++) {
			let wall: Sprite = Main_Container.wallArray[iterator];
			limitY = wall.y + wall.height + this._player.height/2;
			if (
				this._player.y >= limitY &&
				this._player.y - speed < limitY &&
				Collision_Checking.horizontal(this._player, wall)
			) {
				this._player.y = limitY;
				canMove = false;
			}
		};
		if (canMove) {
			this._player.y -= speed;
		}
	}

	private rightMove(diag:boolean):void{
		let speed:number;
		let limitX:number;
		let canMove:boolean = true;

		if (diag) {
			speed = this._player.playerDiagSpeed
		} else {
			speed = this._player.playerSpeed
		}

		for (let iterator:number = 0; iterator < Main_Container.wallArray.length; iterator ++) {
			let wall: Sprite = Main_Container.wallArray[iterator];
			limitX = wall.x - this._player.width / 2;
			if (
				this._player.x <= limitX &&
				this._player.x + speed > limitX &&
				Collision_Checking.vertical(this._player, wall)
			) {
				this._player.x = limitX;
				canMove = false;
			}
		};
		if (canMove) {
			this._player.x += speed;
		}
	}

	private downMove(diag:boolean):void{
		let speed:number;
		let limitY:number;
		let canMove:boolean = true;

		if (diag) {
			speed = this._player.playerDiagSpeed
		} else {
			speed = this._player.playerSpeed
		}

		for (let iterator:number = 0; iterator < Main_Container.wallArray.length; iterator ++) {
			let wall:Sprite = Main_Container.wallArray[iterator];
			limitY = wall.y - this._player.height / 2;
			if (
				this._player.y <= limitY &&
				this._player.y + speed > limitY &&
				Collision_Checking.horizontal(this._player, wall)
			) {
				this._player.y = limitY;
				canMove = false;
			}
		};
		if (canMove) {
			this._player.y += speed;
		}
	}
}
