
import { _decorator, Component, Node, Vec3, Contact2DType, BoxCollider2D, Collider2D, IPhysics2DContact, systemEvent, Game } from 'cc';
import { HUD } from './HUD';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {
    @property
    speed = 50.0;

    @property
    destructionTime = 1.0;
    elapsed = 0.0;

    direction = new Vec3();

    start(){
        let collider = this.getComponent(Collider2D) as Collider2D;
        collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        
    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact| null) {
        if(otherCollider.tag == 0){
            systemEvent.emit(HUD.EVENT_SCORE);
        }
    }

    setDirection(dir : Vec3){
        this.direction = dir;
    }

    
    update(dt : number){
        this.node.worldPosition = this.node.getWorldPosition().add(this.direction.clone().multiplyScalar(this.speed * dt));

        this.elapsed+=dt;
        if(this.elapsed > this.destructionTime){
            this.node.parent = null;
            this.destroy();
        }
    }

    onDestroy(){
   //     console.log("Bullet Destroyed");
    }
}
