
import { _decorator, Component, Node, Vec3, Collider2D, Contact2DType, IPhysics2DContact, Collider, BoxCollider2D, TiledUserNodeData } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Comet')
export class Comet extends Component {
    @property
    speed = 100.0;

    direction = new Vec3();

    @property
    destructionTime = 15.0;
    elapsed = 0.0;

    start(){
      //  console.log("Comet created");

        let collider = this.getComponent(Collider2D) as Collider2D;
        collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    
        
    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact| null) {
        let self = this;
        this.scheduleOnce(()=>{
            self.node.removeFromParent();
            self.destroy();
        },.01);
    }

    setDirection(dir : Vec3){
        this.direction = dir;
    }
    
    update(dt : number){
        if(!this.isValid) return;
        this.node.worldPosition = this.node.getWorldPosition().add(this.direction.clone().multiplyScalar(this.speed * dt));

        this.elapsed+=dt;
        if(this.elapsed > this.destructionTime){
            this.node.parent = null;
            this.destroy();
        }
    }

    onDestroy(){

        let collider = this.getComponent(BoxCollider2D) as BoxCollider2D;
        collider.off(Contact2DType.BEGIN_CONTACT);
     //   console.log("Comet Destroyed");
    }
}
