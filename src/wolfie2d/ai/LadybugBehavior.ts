import {SceneObject} from '../scene/SceneObject'
import {AnimatedSpriteType} from '../scene/sprite/AnimatedSpriteType'
import { Behavior } from './Behavior';
import { AnimatedSprite } from '../scene/sprite/AnimatedSprite';
import { Vector3 } from '../math/Vector3';

export class LadybugBehavior extends Behavior {
    private distance : number;
    private x : number;
    private y : number;
    public constructor() {
        super();
        this.distance = 10;
        this.y = 1;
    }
    public update(pos : Vector3) : void {
        if (this.frameCounter < this.distance) {
            let spriteY = pos.getY();

            pos.set(
                pos.getX(),
                spriteY + this.y, 
                pos.getZ(), 
                pos.getW());
        }
        else  {
            this.frameCounter = 0;
            this.y = -this.y;
        }
        this.frameCounter++;
        
    }
}