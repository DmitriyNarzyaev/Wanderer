import { Sprite, TextStyle } from "pixi.js";
import Container = PIXI.Container;

export default class Start_Menu extends Container {
    private _background: PIXI.Sprite;
    private readonly _callback:()=>void;
    private _burronWidth:number = 120;

    constructor(buttonName:string, callback:()=>void = null) {
        super();
        this._callback = callback;
        this.initialPlayer();
        this.initialButton(buttonName, callback);
    }

    private initialPlayer():void {
		this._background = Sprite.from("title");
		this.addChild(this._background);
    }

    private initialButton(buttonName:string, callback:any):void {       //FIXME: CALLBACK
        const button:PIXI.Graphics = new PIXI.Graphics;
        button.buttonMode = true;
        button.interactive = true;
        button
            .beginFill(0x999922, 1)
            .drawRoundedRect(0, 0, this._burronWidth, 40, 10);
        button.x = this._background.width/2 - this._burronWidth/2;
        button.y = this._background.height/4;
        this.addChild(button);

        let textStyle:TextStyle = new PIXI.TextStyle ({
            fontFamily: 'Arial',
            fontSize: 24,
            fontWeight: 'bold',
            fill: ['#333333'],
        });

        const buttonText:PIXI.Text = new PIXI.Text (buttonName, textStyle);
        buttonText.x = (button.width - buttonText.width)/2;
        buttonText.y = (button.height - buttonText.height)/2;
        button.addChild(buttonText);

        if (callback) {
			button.addListener('pointertap', this.pointerTabHandler, this);
		}
    }
    
    private pointerTabHandler():void {
		this._callback();
    }
}
