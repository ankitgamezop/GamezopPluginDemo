
import { _decorator, Component, Node, Prefab, instantiate, randomRangeInt, random, Vec3, randomRange, tween, toRadian, math } from 'cc';
import { Comet } from './Comet';
const { ccclass, property } = _decorator;

@ccclass('CometGenerator')
export class CometGenerator extends Component {
    
    @property({type :Prefab})
    private cometPrefabs = new Array<Prefab>();

    @property
    private interval = 5.0;
    private elapsed = 5.0;
    
    @property
    spawnRadius = 300;

    private isActive = true;

    @property({type : Node})
    private shipRef : Node = null as any;

    setActive(active : boolean){
            this.isActive = active;
    }

    start () {
        
    }

    private calculateCometPosition() : Vec3{
        let x = randomRange(-1,1) * this.spawnRadius;
        if(x <= 0) x = Math.min(-this.spawnRadius,x);
        else  x = Math.max(this.spawnRadius,x);

        let y = randomRange(-1,1) * this.spawnRadius;
        if(y <= 0) y = Math.min(-this.spawnRadius,y);
        else  y = Math.max(this.spawnRadius,y);
        
        return new Vec3(x,y,0);
    }

    update(dt : number){
        if(this.isActive){
            this.elapsed+=dt;
            if(this.elapsed > this.interval){
                let index = randomRangeInt(0,this.cometPrefabs.length);
                let newComet = instantiate(this.cometPrefabs[index]);
                let cometComp = newComet.getComponent(Comet);
                let pos = this.calculateCometPosition();
                this.node.addChild(newComet);
                newComet.setWorldPosition(pos);
                let dir = this.shipRef.getWorldPosition().subtract(newComet.worldPosition).normalize();
                cometComp?.setDirection(dir);
                this.elapsed = 0.0;
            }
        }
    }

    onDisable(){
        this.node.destroyAllChildren();
    }
}
