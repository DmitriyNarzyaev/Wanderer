import { TextStyle } from "pixi.js";
import Container = PIXI.Container;

export default class Score_Menu extends Container {
    private _scoreMenuWidth:number = 80;
    private _scoreMenuHeight:number = 20;
    public SCORE:string = "0";

    constructor() {
        super();
        this.initialBackground();
        this.textForScoreMenu(this.SCORE);
    }

    private initialBackground():void {       //FIXME: CALLBACK
        const menu:PIXI.Graphics = new PIXI.Graphics;
        menu
            .beginFill(0x888833, .8)
            .drawRoundedRect(0, 0, this._scoreMenuWidth, this._scoreMenuHeight, 5);
        this.addChild(menu);
    }
    
    private textForScoreMenu(score:string):void {
        let textStyle:TextStyle = new PIXI.TextStyle ({
            fontFamily: 'Arial',
            fontSize: 16,
            fontWeight: 'bold',
            fill: ['#503000'],
        });

        const menuText:PIXI.Text = new PIXI.Text ("Keys: " + score, textStyle);
        menuText.x = this._scoreMenuWidth/2 - menuText.width/2;
        this.addChild(menuText);
    }
}
