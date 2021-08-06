
import { _decorator, Component, Node, systemEvent, Label } from 'cc';
import { GameController } from './GameController';
const { ccclass, property } = _decorator;

@ccclass('HUD')
export class HUD extends Component {
  
    static readonly EVENT_SCORE = 'SCORE';

    private score = 0;

    @property({type : Label})
    scoreLabel : Label = null as any;

    start () {
        systemEvent.on(HUD.EVENT_SCORE,()=>{
            this.score++;
            this.scoreLabel.string = this.score.toString();
        });
        systemEvent.on(GameController.EVENT_GAME_OVER,()=>{
           this.reset();
        });
    }

    private reset(){
        this.score = 0;
        this.scoreLabel.string = this.score.toString();
    }

    onEnable(){
        this.reset();
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
