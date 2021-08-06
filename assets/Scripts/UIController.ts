
import { _decorator, Component, Node } from 'cc';
import { EGameState } from './GameController';
const { ccclass, property } = _decorator;

@ccclass('UIController')
export class UIController extends Component {
   @property({type : Node})
   uiStates = new Array<Node>();

   onGameStateChanged(newState : EGameState,lastState : EGameState){
       this.uiStates[newState as number].active = true;
       if(lastState != EGameState.NONE){
        this.uiStates[lastState as number].active = false;
       }
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
