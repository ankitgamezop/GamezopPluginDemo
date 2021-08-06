
import { _decorator, Component, Node, systemEvent, SystemEventType, PhysicsSystem2D, EPhysics2DDrawFlags } from 'cc';
import { CometGenerator } from './CometGenerator';
import { Ship } from './Ship';
import { UIController } from './UIController';
const { ccclass, property } = _decorator;


export enum EGameState{
    NONE = -1,
    START_MENU,
    GAMEPLAY,
    GAME_OVER
};

@ccclass('GameController')
export class GameController extends Component {
    @property({type : CometGenerator})
    cometGenerator : CometGenerator = null as any;

    @property({type : Ship})
    shipRef : Ship = null as any;

    @property({type : UIController})
    uiController : UIController = null as any;

    private currentState = EGameState.NONE;

    //events
    static readonly EVENT_GAME_OVER = 'GAME_OVER';


    onLoad(){
        // PhysicsSystem2D.instance.enable = true;
        // PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Aabb |
        // EPhysics2DDrawFlags.Pair |
        // EPhysics2DDrawFlags.CenterOfMass |
        // EPhysics2DDrawFlags.Joint |
        // EPhysics2DDrawFlags.Shape;

        systemEvent.on(GameController.EVENT_GAME_OVER,()=>{this.switchState(EGameState.GAME_OVER);},this);
        this.switchState(EGameState.START_MENU);
    }

    onDestroy(){
        systemEvent.removeAll(this);
    }

    switchState(newState : EGameState){
        
        this.uiController.onGameStateChanged(newState,this.currentState);
        this.currentState = newState;
        switch(this.currentState){
            case EGameState.START_MENU:
            case EGameState.GAME_OVER:
                
                this.cometGenerator.setActive(false);
                this.cometGenerator.node.active = false;
                break;
            case EGameState.GAMEPLAY:
                this.shipRef.node.active = true;
                this.cometGenerator.setActive(true);
                this.cometGenerator.node.active = true;
                break;
        
        }
        
    }


    btnStartGame(){
        this.switchState(EGameState.GAMEPLAY);
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
