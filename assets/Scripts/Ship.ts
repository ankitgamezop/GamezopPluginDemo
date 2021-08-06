
import { _decorator, Component, Node, systemEvent, SystemEventType, macro, director, Prefab, instantiate, tween, Vec3, BoxCollider2D, Contact2DType, Collider2D, IPhysics2DContact } from 'cc';
import { Bullet } from './Bullet';
import { GameController } from './GameController';
const { ccclass, property } = _decorator;

@ccclass('Ship')
export class Ship extends Component {

    @property
    angularSpeed = 10;

    @property({type : Node})
    bulletPosNode : Node = null as any;
    
    @property
    bulletFireInterval = .1;
    canFire = true;

   
    @property({type : Prefab})
    bulletPrefab : Prefab = null as any;

    onLoad(){
        systemEvent.on(SystemEventType.KEY_DOWN,this.onKeyDown,this);
        systemEvent.on(SystemEventType.KEY_UP,this.onKeyUp,this);

    }

    onEnable(){
        let collider = this.getComponent(Collider2D) as Collider2D;
        collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }

    onDisable(){
        let collider = this.getComponent(Collider2D) as Collider2D;
        collider.removeAll(this);
    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact| null) {
        let self = this;
        this.scheduleOnce(()=>{
            console.log("GAME OVER!!");
            systemEvent.emit(GameController.EVENT_GAME_OVER); 
        },.01);
        
    }

    reset(){
        this.canFire = false;
    }

    onKeyDown(event : KeyboardEvent){
        switch(event.keyCode){
            case macro.KEY.left:
                this.node.angle+=this.angularSpeed*director.getDeltaTime();
                break;
            case macro.KEY.right:
                this.node.angle-=this.angularSpeed*director.getDeltaTime();
                break;
            case macro.KEY.space:
                if(this.canFire){
                    let bullet = instantiate(this.bulletPrefab);
                    let bulletComp = bullet.getComponent(Bullet) as Bullet;
                    this.node.parent?.addChild(bullet);
                    let dir = this.bulletPosNode.getWorldPosition().subtract(this.node.getWorldPosition()).normalize();
                    console.log("bullet direction " + dir);
                    bulletComp.setDirection(dir);
                    bullet.setWorldPosition(this.bulletPosNode.getWorldPosition());
                    bullet.setWorldRotation(this.bulletPosNode.worldRotation.clone());
                    this.canFire = false;
                    this.scheduleOnce(()=>{
                        this.canFire = true;
                    },this.bulletFireInterval);
                }
                break;
        }
    }

    onKeyUp(event : KeyboardEvent){
        switch(event.keyCode){
            case macro.KEY.left:
                break;
            case macro.KEY.right:
                break;
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
